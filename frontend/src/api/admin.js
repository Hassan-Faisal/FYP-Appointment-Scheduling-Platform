import api from "./api";

export const adminApi = {
  dashboard: () => api.get("/admin/dashboard-stats"),

  doctors: () => api.get("/admin/users?role=doctor"),
  patients: () => api.get("/admin/users?role=patient"),

  blockUser: (id) => api.patch(`/admin/user/${id}/block`),
  unblockUser: (id) => api.patch(`/admin/user/${id}/unblock`),

  createDoctor: (data) => api.post("/admin/create-doctor", data),

  appointments: () => api.get("/admin/appointments"),
  reschedule: (id, data) =>
    api.patch(`/admin/appointment/${id}/reschedule`, data),

  addAvailability: (data) => api.post("/admin/availability", data),
  addBreak: (data) => api.post("/admin/break", data),
};
