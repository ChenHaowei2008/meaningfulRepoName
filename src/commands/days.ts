import { countDown } from "../index.js";
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("days")
        .setDescription("Shows how many days left until exam starts or ends"),
    async execute(interaction: any){
        await interaction.reply(countDown())
    }
}
export {};