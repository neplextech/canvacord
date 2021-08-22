# Hello!
This document is for people who want to contribute to this project!

# Code Style
## Linters
We are using ESLint to lint the code. You should run `npm run lint` and fix the errors (if any) before pushing.

## Formatting
We are using **[Prettier](https://prettier.io)** to format the code. You can run `npm run format` to do so.

## File names
- Always use `PascalCase` for the files containing classes (example: `RankCard`, `SpotifyCard`, `Canvacord` etc.)

## Some Rules
- Use `camelCase` for `Function names`, `Variables`, etc. and `PascalCase` for `Class name`
- Do not make unused variables/imports
- Don't forget to write `JSDOC`
- Always write function return type:
```ts
const sum = (): number => 2 + 2;
```

- Use English language

# Pull Requests
- Use English language
- Properly specify your changes. Example:

```
⚡ | Update some method

Now something runs smoothly and provides best performance
```

- Run tests, formatting, etc. before making Pull Requests
- Always use **[Conventional Commit Messages](https://ccm.snowflakedev.org)**
