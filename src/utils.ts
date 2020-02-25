import { prefixes } from './constants';

const { BOT_ID } = process.env;
const mentionString = `<@!${BOT_ID}>`;

export const isDirectedMessage = (message: any) => {
  const hasMention = message.mentions.users.has(BOT_ID);

  return message.content.trim().startsWith(mentionString) && hasMention;
};

export const getCommand = (message: string) =>
  message.slice(mentionString.length + 1);

export const getCmdAndPrefix = (messagePayload: any) => {
  let message = messagePayload.content.trim();
  if (!isDirectedMessage(messagePayload)) return {};

  const command = getCommand(message);

  // Don't process if message is somehow without text content
  if (!message.length) return {};

  let messagePrefix = prefixes.find(pfx => command.startsWith(pfx));

  return { command, messagePrefix };
};
