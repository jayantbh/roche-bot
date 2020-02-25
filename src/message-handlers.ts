import { inspect } from 'util';

import ping from './handlers/ping';

export function handleDebug(messagePayload: any) {
  return '```js\n' + inspect(messagePayload, { depth: 1 }) + '\n```';
}

export function handleCommands(message: string, messagePayload: any) {
  let args = message.split(' ');
  let command = args[0];
  let params = args.length > 1 ? args.slice(1) : null;
  let hasParams = params && params.length > 0;

  let user = messagePayload.author;

  switch (command) {
    case 'ping':
      return ping(messagePayload);
    default:
      return 'No command supplied.';
  }
  return false;
}
