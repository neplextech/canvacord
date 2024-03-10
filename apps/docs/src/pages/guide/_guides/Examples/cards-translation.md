## Cards Translation

The `setTextStyles` method is used to customize the text styles for different elements in a rank card or leaderboard. This method allows for the modification of default labels for level, experience points (XP), and rank display.

## Usage

For Rank Card or Leaderboard :
```ts
const rankCard = new RankCardBuilder()
    .setTextStyles({
        level: 'NIVEAU :', // Custom text for the level
        xp: 'EXP :',       // Custom text for the experience points
        rank: 'CLASSEMENT :' // Custom text for the rank
    })
```

# Output
![xp-card](https://raw.githubusercontent.com/neplextech/canvacord/main/packages/canvacord/test/normal/cardTranslated.svg)
