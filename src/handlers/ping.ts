export default (messagePayload: any) => {
  let sentAt = messagePayload.createdTimestamp;
  let now = new Date().getTime();
  return Math.abs(now - sentAt) + 'ms';
};
