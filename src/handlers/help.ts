import axios, { AxiosError } from 'axios';
import { RichEmbed } from 'discord.js';

import { commands, colors } from '../constants';
import { GenericError } from '../errors';

const thumbnail =
  'https://raw.githubusercontent.com/google/material-design-icons/master/action/2x_web/ic_help_outline_white_48dp.png';

export default () => {
  try {
    return new RichEmbed({
      title: 'Help',
      color: colors.teal, // teal
      thumbnail: {
        url: thumbnail,
      },
      fields: Object.values(commands).map(com => ({
        name: com.key,
        value: com.desc,
      })),
      footer: {
        text: 'Issues? Ping me@jayantbhawal.in',
        icon_url:
          'https://cdn.discordapp.com/avatars/237945299320963074/f85545e2dbecade4f5271a321e001c48.png?size=256',
      },
    });
  } catch (_e) {
    const e = _e as AxiosError;
    console.error(e);

    return GenericError();
  }
};
