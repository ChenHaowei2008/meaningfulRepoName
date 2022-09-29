const token = process.env["token"];
const {Client, GatewayIntentBits, Interaction} = require("discord.js");
const cron = require("cron");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
})

const ExamDates = [
    "The exams for Tuesday 4/10 are\nEnglish Language P1 (1 h 50 m)\nPhysical Science (1 h 30 m)",
    "The exams for Wednesday 5/10 are\nMathematics P1 (1 h 15 m)\nMother Tongue P1 (1 h 30 m)",
    "The exams for Thursday 6/10 are\nEnglish Language P2 (1 h 50 m)\nGeography (1 h 30 m)",
    "The exams for Friday 7/10 are\nMother Tongue P2 (1 h 30 m)\nHistory (1 h 30 m)",
    "The exams for Monday 10/10 are\nLiterature (1 h 40 m)\nEnglish Language Listening Comprehension (1 h)",
    "The exams for Tuesday 11/10 are\nLife Science (1 h 30 m)\nMathematics P2 (1 h 15 m)\nMother Tongue Listening Comprehension (30 m)"
]
process.env.TZ = "Asia/Singapore"

function countDown(): String {
    const currentDate = new Date()
    const examStart = new Date(2022, 9, 4)
    const examEnd = new Date(2022, 9, 12)

    const daysLeftStart = Math.round(Math.abs((examStart.getTime() - currentDate.getTime())) / (24 * 60 * 60 * 1000))
    const daysLeftEnd = Math.round(Math.abs((examEnd.getTime() - currentDate.getTime())) / (24 * 60 * 60 * 1000))

    if(daysLeftStart > 0){
        return `There are only ${daysLeftStart} days until the exams start.`
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

client.on("interactionCreate", async (interaction: any) => {
    if(!interaction.isChatInputCommand()) return;

    const {commandName, options} = interaction;

    if(commandName === "days"){
        await interaction.reply(countDown())
    }else if(commandName === "info"){
        const dayNum = options.getInteger("day")
        if(dayNum){
            if(dayNum > 6){
                await interaction.reply("Please enter a day less than 6.")
            }else{
                await interaction.reply(ExamDates[dayNum + 1])
            }
        }else{
            if(new Date().getMonth() == 9){
                const monthDay = new Date().getDate()
                await interaction.reply(ExamDates[monthDay + 1])
            }else{
                await interaction.reply(ExamDates.join("\n"))
            }
        }
    }
})

client.login(token);

require('http').createServer((req: any, res: any) => res.end('.')).listen(3000)