const fs = require('fs');

exports.writeLog = req => {
  let logFile;
  const logFilePath = './logs/log.json';

  // get log file, if not found create new log file
  try {
    logFile = fs.readFileSync(logFilePath, 'utf8');
  } catch(err) {
    logFile = createNewLogFile(logFilePath);
  }

  const logObject = JSON.parse(logFile);

  // create new object with request data and push it into logs array
  const newLog = new Object();
  newLog.method = req.method;
  newLog.url = req.url;
  newLog.time = Date.now();
  logObject.logs.push(newLog);

  fs.writeFileSync(logFilePath, JSON.stringify(logObject), 'utf8');

  // return current logs to send it back in json payload
  return newLog;
}

// Utility functions
function createNewLogFile(path) {
  fs.writeFileSync(path, JSON.stringify({logs:[]}), 'utf8');
  return fs.readFileSync(path, 'utf8');
}