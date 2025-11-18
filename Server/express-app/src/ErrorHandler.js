export default function errorHandler(err, req, res, next) {
  console.error("ERROR:", err);
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server error",
  });
}
