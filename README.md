# Roche Bot

An experimental Discord bot.  
[![Discord Chat](https://img.shields.io/discord/237946295824809984?color=%23738ad6&logo=discord&logoColor=white&style=for-the-badge)](https://discord.gg/DY7GN95)

## Instructions

`yarn install` first.

### Development

`yarn start` in one terminal, and `yarn serve` in another to build and serve the bot.  
Keep both running.

### Deployed Usage

`yarn build` once, and `yarn serve`.  
You could use something like [`forever`](https://www.npmjs.com/package/forever) to keep the bot alive even after crashes.  
Ensure that the `yarn serve` command is being run "forever".
