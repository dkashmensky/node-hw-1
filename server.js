const logger = require('./js/logger');
const utils = require('./js/utils');
const http = require('http');
const url = require('url');
const qs = require('querystring');

const requestListener = function (req, res) {
  const parsedUrl = url.parse(req.url);
  const payload = logger.writeLog(req);
  
  if (parsedUrl.pathname === '/get_file' && req.method === 'GET') {
    const jsonFile = utils.getLogFile();
    res.writeHead(200, {'Content-type': 'application/json'});
    res.end(JSON.stringify({status: 'OK', response: jsonFile}));
  } else if (parsedUrl.pathname === '/get_file_date' && parsedUrl.query != '' && req.method === 'GET') {
    const jsonDateFile = utils.getDateLog(qs.parse(parsedUrl.query));
    res.writeHead(200, {'Content-type': 'application/json'});
    res.end(JSON.stringify({status: 'OK', response: jsonDateFile}));
  } else {
    res.writeHead(200, {'Content-type': 'application/json'});
    res.end(JSON.stringify({status: 'OK', response: payload}));
  }
}

const server = http.createServer(requestListener);
server.listen(8080);