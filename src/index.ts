process.title = 'Roche Bot';
import { config } from 'dotenv';
config();

import { Client } from 'discord.js';

import { handleDebug, handleCommands } from './message-handlers';
import { PREFIX } from './constants';
import { getCmdAndPrefix } from './utils';

const client = new Client();
const { DISCORD_KEY } = process.env;

function handleMessage(messagePayload: any) {
  const { command, messagePrefix } = getCmdAndPrefix(messagePayload);

  switch (messagePrefix) {
    case PREFIX.TILDE:
      return handleDebug(messagePayload);
    default:
      return command && handleCommands(command, messagePayload);
  }
}

client.on('message', messagePayload => {
  try {
    let response = handleMessage(messagePayload);

    // Log outbound response
    console.log('>>>>>>>>>>', response, !!response);
    if (response) messagePayload.reply(response);
  } catch (e) {
    console.info('UNHANDLED EXCEPTION.');
    console.error(e);
  }
});

client
  .login(DISCORD_KEY)
  .then(() => {
    console.log('Roche Bot has loaded, and connected to Discord Servers.');
  })
  .catch(() => {
    console.warn('Roche Bot failed to connect Discord Servers.');
  });
