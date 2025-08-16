// src/services/trackService.js
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`;

async function http(path = "", opts = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
    ...opts,
  });
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const body = isJson ? await res.json() : null;
  if (!res.ok) throw new Error(body?.error || res.statusText || "Request failed");
  return body;
}

export const TrackAPI = {
  list:   ()      => http(""),
  create: (data)  => http("",       { method: "POST", body: JSON.stringify(data) }),
  update: (id,d)  => http(`/${id}`, { method: "PUT",  body: JSON.stringify(d) }),
  delete: (id)    => http(`/${id}`, { method: "DELETE" }),
};
