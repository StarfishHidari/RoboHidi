/*jslint node: true, esversion:6 */
import 'babel-register';
import Discord from 'discord.js';
import path from 'path';
import sqlite from 'sqlite';
import { oneLine } from 'common-tags';
import Database from './database';
const client = new Discord.Client();
var db = new Database();

var ownerId = "142109768323039232";

function isInt(value) {
  return !isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10));
}

client.on('ready', () => {
  console.log('I am ready!');
});

db.init();
var lastMessage = {};
client.on('message', (message) => {
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
	if(command === "msgcount") {
		var id = message.mentions.users.array()[0].id;
		console.log('id: ' + id);
		var messageCount = db.getMessageCount(id, (msgCount) => {
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