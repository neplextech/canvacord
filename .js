const { writeFileSync } = require('fs');
const x = require('./');

x.ImageGen.changeMyMind("https://cdn.discordapp.com/attachments/983755478024728676/987337247214936184/unknown.png", "https://cdn.discordapp.com/attachments/814055106147385384/987563932518588466/unknown.png").then(v => {
    writeFileSync("./i.png", v)
})
