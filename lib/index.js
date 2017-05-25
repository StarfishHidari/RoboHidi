'use strict';

require('babel-register');

var _discord = require('discord.js');

var _discord2 = _interopRequireDefault(_discord);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sqlite = require('sqlite');

var _sqlite2 = _interopRequireDefault(_sqlite);

var _commonTags = require('common-tags');

var _database = require('./database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*jslint node: true, esversion:6 */
var client = new _discord2.default.Client();
var db = new _database2.default();

var ownerId = "142109768323039232";

function isInt(value) {
  return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}

client.on('ready', function () {
  console.log('I am ready!');
});

db.init();
var lastMessage = {};
client.on('message', function (message) {
  db.logMessage(message.id, message.author.id, message.content);
  if (message.content.startsWith('ping')) {
    message.reply('pong!');
  }
  if (!message.content.startsWith('!')) {
    return;
  }
  // Stripping of the !
  var commandParameters = message.content.substring(1);
  console.log(commandParameters);
  commandParameters = commandParameters.split(" ");
  var command = commandParameters.shift();
  command = command.toLowerCase();
  var args = commandParameters;
  console.log(command + ': ' + args);
  if (command === "msgcount") {
    var id = message.mentions.users.array()[0].id;
    console.log('id: ' + id);
    var messageCount = db.getMessageCount(id, function (msgCount) {
      message.reply('Message count for ' + message.mentions.users.array()[0].username + ': ' + msgCount);
    });
  }

  if (command === "clean") {
    if (message.author.id != ownerId) {
      message.reply('You do not have permission to use this command!');
    } else {
      db.clean("audits");
      db.clean("audit_args");
      db.clean("message_log");
      db.clean("msg_count");
      message.reply('database cleaned!');
    }
  }
  if (command === "wipe") {
    if (message.author.id != ownerId) {
      message.reply('You do not have permission to use this command!');
    } else {
      db.wipe("audits");
      db.wipe("audit_args");
      db.wipe("msg_count");
      db.wipe("message_log");
      message.reply('database wiped!');
    }
  }
});

client.login('MjMzNzQzMDQwOTQwOTk4NjU2.C_J6ag.YkOLUiRoZaDyvbPQNwVz0chJVsY');