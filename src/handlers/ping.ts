import { Message } from 'discord.js';

export default (messagePayload: Message) => {
  let sentAt = messagePayload.createdTimestamp;
  let now = new Date().getTime();
  return Math.abs(now - sentAt) + 'ms';
};
