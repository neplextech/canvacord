const canvacord = require("../index");

const users = [
    {
        xp: 500,
        requiredXP: 845,
        username: 'Gamer',
        handle: '1000',
        avatar: 'https://cdn.discordapp.com/embed/avatars/0.png',
        status: 'dnd'
    },
    {
        xp: 467,
        requiredXP: 754,
        username: 'Player',
        handle: 'player',
        avatar: 'https://cdn.discordapp.com/embed/avatars/2.png',
        status: 'idle'
    },
    {
        xp: 450,
        requiredXP: 500,
        username: 'Nerd',
        avatar: 'https://cdn.discordapp.com/embed/avatars/4.png',
        status: 'online'
    }
];

Promise.all(users.map((userData) => {
    const rank = new canvacord.Rank()
        .setAvatar(userData.avatar)
        .setCurrentXP(userData.xp)
        .setRequiredXP(userData.requiredXP)
        .setStatus(userData.status)
        .setProgressBar("#5865F2")
        .setProgressBarTrack("#F6F6F6")
        .setUsername(userData.username)
        .setDiscriminator(userData.handle)
        .setMinXP(300);

    return rank.build()
        .then(data => {
            canvacord.write(data, `${__dirname}/${userData.username}.png`);
        });
}));