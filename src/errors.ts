import { RichEmbed } from 'discord.js';
import { colors } from './constants';

export const CommandError = (description: string) =>
  new RichEmbed({
    title: 'Command Error',
    description,
    color: colors.red,
  });

export const CustomError = (title: string, description: string) =>
  new RichEmbed({
    title,
    description,
    color: colors.red,
  });

export const GenericError = () =>
  new RichEmbed({
    title: 'Generic Error',
    color: colors.red, // red
    description:
      "Sorry! I couldn't reply to your message. Check server logs for details.",
  });
