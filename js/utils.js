let fs = require('fs');

exports.getLogFile = () => {
  return JSON.parse(fs.readFileSync('./logs/log.json', 'utf8'));
}

exports.getDateLog = params => {
  let returnData = [];

  if(params['start'] && params['end']) {
    const logFile = JSON.parse(fs.readFileSync('./logs/log.json', 'utf8'));
    returnData = logFile.logs.filter( item => {
      return item.time >= params.start && item.time <= params.end;
    });
  }

  return returnData;
}