const path = require('path'),
  rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public', 'uploads'),
  port: 8000,
  facebook: {
    appId: '2801087116627448',
    appSecret: '0e1f9d675df81d5f5392ea33b9ad4fe0'
  }
};