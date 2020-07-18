import { inspect } from 'util';
import { RichEmbed, Message } from 'discord.js';

import ping from './handlers/ping';
import weather from './handlers/weather';
import richEmbed from './handlers/rich-embed';
import help from './handlers/help';
import { commands } from './constants';
import { CommandError } from './errors';

export function handleDebug(messagePayload: Message) {
  return '```js\n' + inspect(messagePayload, { depth: 1 }) + '\n```';
}

export async function handleCommands(message: string, messagePayload: Message) {
  let args = message.split(' ');
  let command = args[0];
  let params = args.length > 1 ? args.slice(1) : null;

  switch (command) {
    case commands.ping.key:
      return ping(messagePayload);
    case commands.re.key:
      return richEmbed(messagePayload.author);
    case commands.weather.key:
      if (!params?.length)
        return CommandError(
          'Incorrect usage.\nExample: `@Roche weather new delhi`'
        );
      return await weather(params.join(' '));
    case commands.help.key:
    default:
      return help();
  }
}
