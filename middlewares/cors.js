const allowedCors = [
  'http://localhost:3000',
  'https://localhost:3000',
  'https://movies-explorer.elena.nomoredomains.rocks/api/',
  'http://movies-explorer.elena.nomoredomains.rocks/api/',
];

const corsOption = (req, res, next) => {
  const { origin } = req.headers;

  // Сохраняем источник запроса в переменную origin

  // проверяем, что источник запроса есть среди разрешённых

  const { method } = req;

  const requestHeaders = req.headers['access-control-request-headers'];

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника

    res.header('Access-Control-Allow-Origin', origin);

    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)

    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);

    res.header('Access-Control-Allow-Headers', requestHeaders);

    // завершаем обработку запроса и возвращаем результат клиенту

    return res.end();
  }

  return next();
};

module.exports = corsOption;
