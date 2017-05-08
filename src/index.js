import Discord from 'disord.js';
import path from 'path'
import sqlite from 'sqlite'
import { oneLine } from 'common-tags'

const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', (message) => {
  if (message.content === ping) {
    message.reply('pong!');
  }
});

client.login();