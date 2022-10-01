const fs = require('node:fs')
const path = require('node:path')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord.js')
const { client, guild } = require('./config.json')

const commands = [];
const commandFiles = fs.readdirSync(path.join(__dirname, '/commands')).filter((file: string) => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(path.join(__dirname, '/commands'), file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken("super secret token");

rest.put(Routes.applicationGuildCommands(client, guild), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
