import { Collection, Interaction} from "discord.js"
import { RequestListener, ServerResponse } from "http"

const token = process.env["token"]
const {Client, GatewayIntentBits} = require("discord.js")
const cron = require("cron")
const fs = require("node:fs")
const path = require("node:path")

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
})

client.commands = new Collection()
const commandFiles = fs.readdirSync(__dirname + "/commands").filter((file: any) => file.endsWith(".js"))

for (const file of commandFiles) {
    const filePath = path.join(__dirname + "/commands", file)
    const command = require(filePath)

    client.commands.set(command.data.name, command);
}

process.env.TZ = "Asia/Singapore"

export function countDown(): String {
    const currentDate = new Date()
    const examStart = new Date(2022, 9, 4)
    const examEnd = new Date(2022, 9, 12)

    const daysLeftStart = Math.round(Math.abs((examStart.getTime() - currentDate.getTime())) / (24 * 60 * 60 * 1000))
    const daysLeftEnd = Math.round(Math.abs((examEnd.getTime() - currentDate.getTime())) / (24 * 60 * 60 * 1000))

    if(daysLeftStart > 0){
        return `There are only ${daysLeftStart} days until the exams start. <@&1025024319564283987>`
    } 
    return `Rejoice! There are only ${daysLeftEnd} until the exams end.`
}

client.on("ready", () => {
    console.log("Running")
    
    const reminderCron = new cron.CronJob("00 00 19 * * *", () => {
        const channel = client.guilds.cache.get("880067516423094312").channels.cache.get("880067516423094315")
        channel.send(countDown())
    })

    reminderCron.start()
})

client.on("interactionCreate", async (interaction: Interaction) => {
    if(!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if(!command) return

    try{
        await command.execute(interaction);
    }catch(error){
        console.error(error)
        await interaction.reply("My creator is stupid and let an error slip through")
    }
})

client.login("ODkwNTQ1NjA2OTk5ODM0NjQ1.GWyt2a._rPv_iJ7_2c82N8tL6uk9UQmayD2QUdyDhSuRQ");

require('http').createServer((_req: RequestListener, res: ServerResponse) => res.end('.')).listen(3000)

