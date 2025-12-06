const BASE_URL = "http://localhost:3000";

async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Request failed");
  }

  if (res.status === 204) return null;
  return res.json();
}

export default apiFetch;
