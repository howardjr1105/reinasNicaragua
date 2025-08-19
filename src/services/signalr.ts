import * as signalR from "@microsoft/signalr";

class SignalRService {
  private connection: signalR.HubConnection | null = null;
  private handlers = new Map<string, Set<(...args: any[]) => void>>();
  private connecting: Promise<void> | null = null;
  private hubUrl: string | null = null;

  public isConnected(): boolean {
    return this.connection?.state === signalR.HubConnectionState.Connected;
  }

  public async start(hubUrl: string): Promise<void> {
    this.hubUrl = hubUrl;
    if (this.isConnected()) return;
    if (this.connecting) return this.connecting;

    if (!this.connection) {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl)
        .withAutomaticReconnect({ nextRetryDelayInMilliseconds: ctx => {
          // Exponential backoff up to 10s
          const retries = ctx.previousRetryCount ?? 0;
          return Math.min(10000, 1000 * Math.pow(2, retries));
        }})
        .build();

      // Re-wire handlers after reconnect
      this.connection.onreconnected(() => {
        this.rebindHandlers();
      });
    }

    this.connecting = this.connection
      .start()
      .then(() => {
        this.rebindHandlers();
      })
      .finally(() => {
        this.connecting = null;
      });

    return this.connecting;
  }

  public async stop(): Promise<void> {
    if (this.connection) {
      try { await this.connection.stop(); } catch {}
    }
  }

  public async joinGroup(groupName: string): Promise<void> {
    if (!this.hubUrl) throw new Error("SignalR not started: missing hubUrl");
    if (!this.isConnected()) await this.start(this.hubUrl);
    await this.connection!.invoke("AddToGroup", groupName);
  }

  public async send(groupName: string, payload: any): Promise<void> {
    if (!this.hubUrl) throw new Error("SignalR not started: missing hubUrl");
    if (!this.isConnected()) await this.start(this.hubUrl);
    const message = typeof payload === "string" ? payload : JSON.stringify(payload);
    await this.connection!.invoke("SendMessage", groupName, message);
  }

  public on<T extends any[]>(eventName: string, handler: (...args: T) => void): void {
    if (!this.connection) {
      // Lazy init connection holder; real binding happens in rebindHandlers()
      this.handlers.set(eventName, (this.handlers.get(eventName) || new Set()).add(handler));
      return;
    }
    // Prevent duplicate registrations
    const set = this.handlers.get(eventName) || new Set();
    if (!set.has(handler)) {
      set.add(handler);
      this.handlers.set(eventName, set);
      this.connection.on(eventName, handler as any);
    }
  }

  public off<T extends any[]>(eventName: string, handler: (...args: T) => void): void {
    if (!this.connection) {
      const set = this.handlers.get(eventName);
      if (set) set.delete(handler);
      return;
    }
    this.connection.off(eventName, handler as any);
    const set = this.handlers.get(eventName);
    if (set) set.delete(handler);
  }

  private rebindHandlers() {
    if (!this.connection) return;
    for (const [event, set] of this.handlers.entries()) {
      // Remove all first to avoid duplicates after reconnect
      for (const handler of set) {
        this.connection!.off(event, handler as any);
      }
      for (const handler of set) {
        this.connection!.on(event, handler as any);
      }
    }
  }
}

export const signalRService = new SignalRService();
