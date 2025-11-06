export function notFound(_req, res, _next) {
  res.status(404).json({ error: "Route not found" });
}
export function errorHandler(err, _req, res, _next) {
  const status = err.status || err.statusCode || 500;
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "ValidationError",
      details: Object.fromEntries(Object.entries(err.errors).map(([k,v]) => [k, v.message]))
    });
  }
  res.status(status).json({ error: err.message || "Internal Server Error" });
}
