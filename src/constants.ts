export enum PREFIX {
  TILDE = '~',
}

export const prefixes = [...Object.values(PREFIX)];

export const colors = {
  red: 13632027,
  teal: 3980765,
  sepia: 15119458,
  blue: 2201300,
};

export const commands = {
  help: {
    key: 'help',
    desc: 'Show this output',
  },
  ping: {
    key: 'ping',
    desc:
      'Show the time difference in ms between when the message was created on your client, and the time when it was received on the server.',
  },
  re: {
    key: 're',
    desc: 'Show a Discord RichEmbed message example.',
  },
  weather: {
    key: 'weather',
    desc:
      'Weather at a given location, powered by OpenWeatherMap. Example: `<mention> weather hyderabad`.',
  },
};
