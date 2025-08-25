import { useEffect, useState } from "react";
import { Button, Select, Modal, message, Table } from "antd";
import { API } from "../config";
import { signalRService } from "../services/signalr";
import type { ColumnType } from "antd/es/table";

type Props = {};

function Admin({}: Props) {
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setUsuario(parsedData);
    }
  }, []);
  useEffect(() => {
    fetch(API.Ronda)
      .then((response) => response.json())
      .then((dataRondas) => setDataRondas(dataRondas));
  }, []);
  useEffect(() => {
    fetch(API.Participantes)
      .then((response) => response.json())
      .then((dataCandidata) => setDataCandidata(dataCandidata));
  }, []);
  const [usuario, setUsuario] = useState<respuesta>();
  const [dataRondas, setDataRondas] = useState<rondas[]>([]);
  const [dataRondasPremdio, setDataRondasPromedio] = useState<number | null>(null);
  const [dataCandidata, setDataCandidata] = useState<response>();
  const [selectedRonda, setSelectedRonda] = useState<number | null>(null);
  const [data, setData] = useState<top[]>([]);
  const [selectedCandidata, setSelectedCandidata] = useState<number | null>(
    null
  );
  // Helper para recargar candidatas activas
  const reloadCandidatas = async () => {
    try {
      const resp = await fetch(API.Participantes);
      const json = await resp.json();
      setDataCandidata(json);
    } catch (e) {
      // silencioso: evitar romper flujo si falla
    }
  };
  // SignalR ahora es gestionado por signalRService (singleton)
  const handleRondaChange = (value: number) => {
    console.log(`selected ronda ${value}`);
    setSelectedRonda(value);
  };
  const loadPromedios = async () => {
    setData([]);
    if (dataRondasPremdio === null) return;
    let json: any = null;
    if (dataRondasPremdio === 0) {
      json = await fetchJsonSafe(`${API.Promedios}`);
    } else if (dataRondasPremdio > 0 && dataRondasPremdio < 7) {
      json = await fetchJsonSafe(`${API.Promedios}/${dataRondasPremdio}`);
    } else if (dataRondasPremdio === 7) {
      json = await fetchJsonSafe(`${API.ListarGanadora}`);
    }
    if (json && json.data) {
      setData(json.data);
    }
  };
  const handleRondaPromedioChange = (value: number) => {
    console.log(`selected ronda Promedio ${value}`);
    setDataRondasPromedio(value);
  };

  const handleCandidataChange = (value: number) => {
    console.log(`selected candidata ${value}`);
    setSelectedCandidata(value);
  };
  interface response {
    seccess: Boolean;
    message: String;
    data: Participante[];
  }
  interface Participante {
    participanteId: number;
    nombre: string;
    edad: number;
    departamento: string;
    peso: number;
    estatura: number;
    biografia: string;
  }
  interface respuesta {
    seccess: Boolean;
    message: String;
    data: objeto;
  }
  interface objeto {
    usuario_id: Number;
    autenticado: Boolean;
    rol_id: Number;
  }
  interface rondas {
    ronda_ID: Number;
    nombre: String;
  }
  interface top {
    participanteId: Number;
    rondaId?: Number;
    nombre: string;
    departamento: string;
    puntajeFinal: Number;
    rango: Number;
  }
  const optionsRondas = dataRondas.map((ronda) => ({
    value: ronda.ronda_ID,
    label: ronda.nombre,
  }));
  /* const RondasPromedio: rondas[] = [
    { ronda_ID: 1, nombre: "Promedio 4 rondas" },
    { ronda_ID: 2, nombre: "Top 6" },
    { ronda_ID: 3, nombre: "Top 3" },
    { ronda_ID: 4, nombre: "Top 1" },
  ];*/
  const RondasPromedio = dataRondas;
  let optionsRondasPromedio = RondasPromedio.map((promedio) => ({
    value: promedio.ronda_ID,
    label: promedio.nombre,
  }));
  optionsRondasPromedio = optionsRondasPromedio.concat({
    value: 0,
    label: "Promedios 4 rondas",
  });
  const optionsCandidatas = dataCandidata?.data.map((participante) => ({
    value: participante.participanteId,
    label: participante.departamento,
  }));
  // Helper para parsear respuestas, mostrando errores si no son JSON
  const fetchJsonSafe = async (url: string) => {
    try {
      const resp = await fetch(url);
      const text = await resp.text();
      try {
        return JSON.parse(text);
      } catch (e) {
        // Respuesta no es JSON, mostrar el texto devuelto por el servidor
        messageApi.error(text || "Respuesta no válida del servidor");
        return null;
      }
    } catch (err: any) {
      messageApi.error(err?.message || "Error de red");
      return null;
    }
  };
  useEffect(() => {
    if (!usuario) return;
    let mounted = true;
    const handler = (message: string) => {
      if (!mounted) return;
      console.log("Received message:", message);
      // Aquí podrías actualizar UI o redirigir
    };

    (async () => {
      try {
        await signalRService.start(API.NotificationHub);
        const groupName = `Group_${usuario.data.rol_id}`;
        await signalRService.joinGroup(groupName as unknown as string);
        console.log(`Joined group ${groupName}`);
        signalRService.on("ReceiveMessage", handler);
      } catch (err) {
        console.error("Error connecting to SignalR hub", err);
      }
    })();

    return () => {
      mounted = false;
      signalRService.off("ReceiveMessage", handler);
    };
  }, [usuario]);

  const sendMessageCand = async () => {
    if (selectedRonda !== null && selectedCandidata !== null) {
      const message = {
        ronda_id: selectedRonda,
        participante_id: selectedCandidata,
      };
      const groupName = `Group_1`;

      try {
        await signalRService.start(API.NotificationHub);
        await signalRService.send(groupName, message);
        console.log("Mensaje enviado:", message);
      } catch (err) {
        console.error("Error sending message", err);
      }
    } else {
      console.log("Seleccione una ronda y una candidata antes de enviar.");
    }
  };
  const sendMessageEspera = async () => {
      const message = {
        pagina: "Espera",
      };
      const groupName = `Group_1`;

      try {
        await signalRService.start(API.NotificationHub);
        await signalRService.send(groupName, message);
        console.log("Mensaje enviado:", message);
      } catch (err) {
        console.error("Error sending message", err);
      }
  };
  const sendMessageHome = async () => {
      const message = {
        pagina: "Home",
      };
      const groupName = `Group_1`;

      try {
        await signalRService.start(API.NotificationHub);
        await signalRService.send(groupName, message);
        console.log("Mensaje enviado:", message);
      } catch (err) {
        console.error("Error sending message", err);
      }
  };
  const sendMessageFinal = async () => {
      const message = {
        pagina: "Final",
        ronda_id: 7,
      };
      const groupName = `Group_1`;

      try {
        await signalRService.start(API.NotificationHub);
        await signalRService.send(groupName, message);
        console.log("Mensaje enviado:", message);
      } catch (err) {
        console.error("Error sending message", err);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isPdfLoading, setIsPdfLoading] = useState(false);

  useEffect(() => {
    if (!isModalOpen) return;
    loadPromedios();
  }, [isModalOpen, dataRondasPremdio]);

  const showModal = () => {
    if (!isModalOpen) {
      setIsModalOpen(true);
    } else {
      // Si ya está abierto, recarga los datos
      loadPromedios();
    }
  };

  const [isTop10, setIsTop10] = useState(false);
  useEffect(() => {
    if (!isTop10) return;
    (async () => {
      await fetchJsonSafe(API.ActualizarTop10);
      setIsTop10(false);
      if (isModalOpen) await loadPromedios();
      await reloadCandidatas();
      setSelectedCandidata(null);
    })();
  }, [isTop10]);
  const top10 = () => {
    setIsTop10(true);
    messageApi.info("Lista Actualizada");
  };
  const [isTop6, setIsTop6] = useState(false);
  useEffect(() => {
    if (!isTop6) return;
    (async () => {
      await fetchJsonSafe(API.ActualizarTop6);
      setIsTop6(false);
      if (isModalOpen) await loadPromedios();
      await reloadCandidatas();
      setSelectedCandidata(null);
    })();
  }, [isTop6]);
  const top6 = () => {
    setIsTop6(true);
    messageApi.info("Lista Actualizada");
  };
  const [isTop3, setIsTop3] = useState(false);
  useEffect(() => {
    if (!isTop3) return;
    (async () => {
      await fetchJsonSafe(API.ActualizarTop3);
      setIsTop3(false);
      if (isModalOpen) await loadPromedios();
      await reloadCandidatas();
      setSelectedCandidata(null);
    })();
  }, [isTop3]);
  const top3 = () => {
    setIsTop3(true);
    messageApi.info("Lista Actualizada");
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Descarga y muestra el PDF para la ronda seleccionada en dataRondasPremdio
  const openReportePDF = async () => {
    if (dataRondasPremdio === null) {
      messageApi.warning("Seleccione una ronda válida para ver el PDF");
      return;
    }
    setIsPdfLoading(true);
    try {
      // Intento 1: ruta por segmento: /ReportePDF/{id}
      let resp = await fetch(`${API.ReportePDF}/${dataRondasPremdio}`, {
        headers: { Accept: "application/pdf" },
      });
      // Si falla, intento 2: query string: /ReportePDF?rondaId={id}
      if (!resp.ok) {
        resp = await fetch(`${API.ReportePDF}?rondaId=${dataRondasPremdio}`, {
          headers: { Accept: "application/pdf" },
        });
      }
      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(text || "No fue posible obtener el PDF");
      }
      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      setIsPdfOpen(true);
    } catch (err: any) {
      messageApi.error(err?.message || "Error al generar el reporte PDF");
    } finally {
      setIsPdfLoading(false);
    }
  };

  const closeReportePDF = () => {
    setIsPdfOpen(false);
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
  };

  const columns: ColumnType<top>[] = [
    {
      title: "Rango",
      dataIndex: "rango",
      key: "rango",
      align: "center",
      //sorter: (a, b) => a.rango - b.rango, // Permite ordenar la columna
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      align: "center",
    },
    {
      title: "Departamento",
      dataIndex: "departamento",
      key: "departamento",
      align: "center",
    },
    {
      title: "Puntaje Final",
      dataIndex: "puntajeFinal",
      key: "puntajeFinal",
      align: "center",
      //sorter: (a, b) => a.puntajeFinal - b.puntajeFinal, // Ordenamiento opcional
    },
  ];

  return (
    <div className="centrar">
      
      <div>
        <h2>Candidata</h2>
        <Select
          style={{ width: 120 }}
          options={optionsCandidatas}
          value={selectedCandidata ?? undefined}
          onChange={handleCandidataChange}
        />
        <h2>Ronda</h2>
        <Select
          style={{ width: 120 }}
          options={optionsRondas}
          onChange={handleRondaChange}
        />
        <Button type="primary" onClick={sendMessageCand}>
          Enviar
        </Button>
      </div>
      <div>
        <Button type="dashed" onClick={sendMessageEspera}>
          Espera
        </Button>
        <Button type="dashed" onClick={sendMessageHome}>
          Home
        </Button>
        <Button type="dashed" onClick={sendMessageFinal}>
          Final
        </Button>
      </div>
      <div>
        <>
          <Select
            style={{ width: 120 }}
            options={optionsRondasPromedio}
            onChange={handleRondaPromedioChange}
          />
          <Button
            type="primary"
            onClick={showModal}
            disabled={dataRondasPremdio === null}
          >
            Listar
          </Button>
          <Button
            type="default"
            loading={isPdfLoading}
            onClick={openReportePDF}
            disabled={!dataRondasPremdio || dataRondasPremdio <= 0}
            style={{ marginLeft: 8 }}
          >
            Ver PDF
          </Button>
          <>
            {contextHolder}
            <Button type="primary" onClick={top10}>
              Top 10
            </Button>
          </>
          <Button type="primary" onClick={top6}>
            Top 6
          </Button>
          <Button type="primary" onClick={top3}>
            Top 3
          </Button>
          <Modal
            title="Listado por promedios"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key="cancel" onClick={handleCancel}>
                Cancelar
              </Button>,
              <Button key="ok" type="primary" onClick={handleOk}>
                Aceptar
              </Button>,
            ]}
          >
            <Table
              columns={columns}
              dataSource={data}
              pagination={false} // Configura paginación
              rowKey="participanteId"
              bordered
              size="middle"
            />
          </Modal>
          <Modal
            title="Reporte PDF"
            open={isPdfOpen}
            onCancel={closeReportePDF}
            footer={[
              <Button key="close" onClick={closeReportePDF}>
                Cerrar
              </Button>,
            ]}
            width={900}
            centered
            styles={{ body: { padding: 0 } }}
          >
            {pdfUrl ? (
              <iframe
                src={pdfUrl}
                title="Reporte PDF"
                style={{ width: "100%", height: "80vh", border: "none" }}
              />
            ) : (
              <div style={{ padding: 24 }}>No hay contenido para mostrar.</div>
            )}
          </Modal>
        </>
      </div>
    </div>
  );
}
export default Admin;
