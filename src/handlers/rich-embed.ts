import { RichEmbed, User } from 'discord.js';

const description = `
This is a random description. 👌
Here you go, have some code:
\`\`\`js
console.log('lol');
\`\`\`
😱

> Interesting stuff, innit?
`;

export default (user: User) =>
  new RichEmbed({
    title: 'Rich Message Preview',
    description,
    color: 2201300,
    author: {
      name: user.username + '#' + user.discriminator,
      icon_url: user.displayAvatarURL,
    },
    thumbnail: {
      url:
        'https://cdn.discordapp.com/app-icons/679978639713894431/d54543e8c90b34b25b8bcd6200de0942.png?size=512',
    },
  });
