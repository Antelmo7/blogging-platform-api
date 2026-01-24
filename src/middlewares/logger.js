export async function loggerMiddleware(req, res, next) {
  const timeStamp = new Date().toISOString();
  const message = `[${timeStamp}] ${req.method} - ${req.url} Ip: ${req.ip}`
  console.log(message);

  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${timeStamp}] RESPONSE: ${res.statusCode} - ${duration}ms`);
  });

  next();
}