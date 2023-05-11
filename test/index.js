const canvacord = require("../index");

const users = [
    {
        xp: 500,
        requiredXP: 845,
        username: 'Gamer',
        handle: '1000',
        avatar: 'https://cdn.discordapp.com/embed/avatars/0.png'
    },
    {
        xp: 467,
        requiredXP: 754,
        username: 'Player',
        handle: 'player',
        avatar: 'https://cdn.discordapp.com/embed/avatars/1.png'
    },
    {
        xp: 200,
        requiredXP: 400,
        username: 'Nerd',
        avatar: 'https://cdn.discordapp.com/embed/avatars/2.png'
    }
];

Promise.all(users.map((userData) => {
    const rank = new canvacord.Rank()
        .setAvatar(userData.avatar)
        .setCurrentXP(userData.xp)
        .setRequiredXP(userData.requiredXP)
        .setStatus("dnd")
        .setProgressBar(["#000000", "#FEFEFE"], "GRADIENT", true)
        .setProgressBarTrack("#FFFFFF")
        .setUsername(userData.username)
        .setDiscriminator(userData.handle)
        .setMinXP(300);

    return rank.build()
        .then(data => {
            canvacord.write(data, `${__dirname}/${userData.username}.png`);
        });
}));