const token = process.env["token"];
const {Client, GatewayIntentBits} = require("discord.js");
const cron = require("cron");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
})
process.env.TZ = "Asia/Singapore"

function countDown(msg: any) : void {
    const currentDate = new Date()
    const examStart = new Date(2022, 9, 4)
    const examEnd = new Date(2022, 9, 12)

    const daysLeftStart = Math.round(Math.abs((examStart.getTime() - currentDate.getTime())) / (24 * 60 * 60 * 1000))
    const daysLeftEnd = Math.round(Math.abs((examEnd.getTime() - currentDate.getTime())) / (24 * 60 * 60 * 1000))

    if(msg){
      msg.channel.send(`There are ${daysLeftStart} days until the exams start and ${daysLeftEnd} days until the exams end.`)
    } else{
        const channel = client.guilds.cache.get("880067516423094312").channels.cache.get("880067516423094315")
        if(daysLeftStart > 0){
            channel.send(`There are only ${daysLeftStart} days until the exams start.`)
        } else{
            channel.send(`Rejoice! There are only ${daysLeftEnd} until the exams end.`)
        }
    }
}

client.on("ready", () => {
    console.log("Running")
    
    const reminderCron = new cron.CronJob("00 00 19 * * *", countDown)

    reminderCron.start()
})

client.on("messageCreate", async (msg: { content: any; }) =>{
    if(msg.content == ".days"){
        countDown(msg)
    }
})

client.login(token);

require('http').createServer((req: any, res: any) => res.end('.')).listen(3000)