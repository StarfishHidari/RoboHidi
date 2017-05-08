'use strict';

var _disord = require('disord.js');

var _disord2 = _interopRequireDefault(_disord);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sqlite = require('sqlite');

var _sqlite2 = _interopRequireDefault(_sqlite);

var _commonTags = require('common-tags');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client = new _disord2.default.Client();

client.on('ready', function () {
  console.log('I am ready!');
});

client.on('message', function (message) {
  if (message.content === ping) {
    message.reply('pong!');
  }
});

client.login('MjMzNzQzMDQwOTQwOTk4NjU2.C_FXMQ.uZqGsymHwvPw_RvECO6TAmj7wnY');