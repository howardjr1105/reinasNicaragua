// src/config.ts

const URL = "https://localhost:7093";
export const API = {
  Authenticate: `${URL}/api/Auth/authenticate`,
  Ronda: `${URL}/api/Ronda`,
  Participantes: `${URL}/api/Participantes`,
  NotificationHub: `${URL}/notificationHub`,
  Promedios: `${URL}/api/Promedios`,
  ListarTop6: `${URL}/api/Promedios/ListarTop6`,
  ListarTop3: `${URL}/api/Promedios/ListarTop3`,
  ListarGanadora: `${URL}/api/Promedios/ListarGanadora`,
  ActualizarTop10: `${URL}/api/Participantes/ActualizarTop10`,
  ActualizarTop6: `${URL}/api/Participantes/ActualizarTop6`,
  ActualizarTop3: `${URL}/api/Participantes/ActualizarTop3`,
  Votacion: `${URL}/api/Votacion`,

  // Agrega más propiedades según necesites
};
