import api from "./api";

export const getMyAppointments = () =>
  api.get("/appointments/my");

export const cancelAppointment = (id) =>
  api.post(`/appointments/${id}/cancel`);
