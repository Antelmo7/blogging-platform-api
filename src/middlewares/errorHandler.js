export function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Unexpected Error';

  console.error(`[ERROR] ${new Date().toISOString()} - ${statusCode} - ${message}`);

  if (error.stack) {
    console.error(error.stack);
  }

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
}