const ExamDates = [
    "The exams for Tuesday 4/10 are\nEnglish Language P1 (1 h 50 m)\nPhysical Science (1 h 30 m)",
    "The exams for Wednesday 5/10 are\nMathematics P1 (1 h 15 m)\nMother Tongue P1 (1 h 30 m)",
    "The exams for Thursday 6/10 are\nEnglish Language P2 (1 h 50 m)\nGeography (1 h 30 m)",
    "The exams for Friday 7/10 are\nMother Tongue P2 (1 h 30 m)\nHistory (1 h 30 m)",
    "The exams for Monday 10/10 are\nLiterature (1 h 40 m)\nEnglish Language Listening Comprehension (1 h)",
    "The exams for Tuesday 11/10 are\nLife Science (1 h 30 m)\nMathematics P2 (1 h 15 m)\nMother Tongue Listening Comprehension (30 m)"
]
const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Shows info for exams")
        .addIntegerOption((option: any) =>
            option.setName('day')
                .setDescription('The day to show info of')),
    async execute(interaction: any){
        const dayNum = interaction.options.getInteger("day")
        if(dayNum){
            if(dayNum > 6 && dayNum < 1){
                await interaction.reply("Please enter a valid exam date")
            }else{
                await interaction.reply(ExamDates[dayNum - 1])
            }
        }else{
            const currentDate = new Date()
            if(currentDate.getMonth() == 9 && currentDate.getDay() < 6 && currentDate.getDate() > 0){
                await interaction.reply(ExamDates[currentDate.getDay() - 1])
            }else{
                await interaction.reply(ExamDates.join("\n"))
            }
        }
    }
}
export {}