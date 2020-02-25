import { inspect } from 'util';
import { RichEmbed, Message } from 'discord.js';

import ping from './handlers/ping';
import weather from './handlers/weather';
import richEmbed from './handlers/rich-embed';

export function handleDebug(messagePayload: Message) {
  return '```js\n' + inspect(messagePayload, { depth: 1 }) + '\n```';
}

const commandError = (description: string) =>
  new RichEmbed({
    title: 'Command Error',
    description,
    color: 13632027,
  });

export async function handleCommands(message: string, messagePayload: Message) {
  let args = message.split(' ');
  let command = args[0];
  let params = args.length > 1 ? args.slice(1) : null;

  switch (command) {
    case 'ping':
      return ping(messagePayload);
    case 're':
      return richEmbed(messagePayload.author);
    case 'weather':
      if (!params?.length)
        return commandError(
          'Incorrect usage.\nExample: `@Roche weather new delhi`'
        );
      return await weather(params.join(' '));
    default:
      return 'No command supplied.';
  }
}
