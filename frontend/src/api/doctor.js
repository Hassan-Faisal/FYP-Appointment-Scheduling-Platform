import api from "./api";

export const doctorApi = {
  dashboardStats: () => api.get("/doctor/dashboard-stats"),
  today: () => api.get("/doctor/today"),
  upcoming: () => api.get("/doctor/upcoming"),
  history: () => api.get("/doctor/history"),

  complete: (id) => api.post(`/doctor/complete/${id}`),
  cancel: (id) => api.post(`/doctor/cancel/${id}`),
  noShow: (id, by) =>
    api.post(`/doctor/no-show/${id}`, null, {
      params: { no_show_by: by },
    }),
};
