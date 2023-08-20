import { JSX, Builder, StyleSheet, loadImage } from '../src/index';
import { writeFileSync } from 'fs';
import { manropeBold } from './common';
import { randomInt } from 'crypto';
import path = require('path');

const colors = {
  LightGray: '#A0A1A3',
  Gray: '#474B4E',
  DarkGray: '#272A2D',
  White: '#FFFFFF',
  Green: '#22A559',
  Yellow: '#F0B332',
  Red: '#F24043',
  Blue: '#8ACDFF'
} as const;

function RankCard({
  avatar,
  level,
  xp,
  requiredXP,
  rank,
  username,
  status
}: {
  avatar: string;
  level: number;
  xp: number;
  requiredXP: number;
  rank: number;
  username: string;
  status: 'online' | 'idle' | 'dnd' | 'invisible';
}) {
  const fixed = (v: number) => {
    const formatter = new Intl.NumberFormat('en-US', { notation: 'compact' });
    return formatter.format(v);
  };

  const percentage = ((xp / requiredXP) * 100).toFixed(2);

  const statusColor =
    status === 'online'
      ? colors.Green
      : status === 'idle'
      ? colors.Yellow
      : status === 'dnd'
      ? colors.Red
      : colors.Gray;

  return (
    <div tw="flex bg-[#2F3136]/80 h-[80%] w-[95%] items-center justify-around rounded-3xl">
      <div tw="flex relative">
        <img src={avatar} alt="avatar" tw={`h-[311px] w-[311px] rounded-full mr-8 border-[#272A2D]/80 border-8`} />
        <div
          tw={`bg-[${statusColor}] h-16 w-16 rounded-full flex absolute bottom-12 right-5 border-[#272A2D]/80 border-8`}
        ></div>
      </div>
      <div tw="flex flex-col">
        <div tw="flex items-end justify-between">
          <h1 tw="text-white text-6xl">{username}</h1>
          <h1 tw="text-[#A7A7A7] text-4xl">{percentage}%</h1>
        </div>
        <div tw="flex bg-[#292929]/70 h-[50px] w-[1413px] rounded-full">
          <div tw={`flex bg-[#5865F2] h-[50px] w-[${percentage}%] rounded-full`}></div>
        </div>
        <div tw="flex justify-between w-[55%] font-bold">
          <h1 tw="text-4xl">
            <span tw="text-[#A7A7A7] mr-2">LEVEL:</span>
            <span tw="text-white">{level}</span>
          </h1>
          <h1 tw="text-4xl">
            <span tw="text-[#A7A7A7] mr-2">XP:</span>
            <span tw="text-white">
              {fixed(xp)}/{fixed(requiredXP)}
            </span>
          </h1>
          <h1 tw="text-4xl">
            <span tw="text-[#A7A7A7] mr-2">RANK:</span>
            <span tw="text-white">#{rank}</span>
          </h1>
        </div>
      </div>
    </div>
  );
}

async function main() {
  const bg = await loadImage(path.join(__dirname, 'background.jpg'));

  const styles = StyleSheet.create({
    root: {
      fontFamily: manropeBold.name,
      display: 'flex',
      backgroundImage: `url("${bg.toDataURL()}")`,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '1.5rem'
    }
  });

  const builder = new Builder(2000, 512);

  builder.style = styles.root;

  builder.addComponent(
    <RankCard
      {...{
        avatar: 'https://cdn.discordapp.com/avatars/916316955772862475/1c03b69ec36f2fda15a0131cdbd70018.png?size=2048',
        level: 54,
        xp: 2548,
        requiredXP: 3796,
        rank: 31,
        username: 'Lost Ctrl',
        status: 'online'
      }}
    />
  );

  const pngBuildStart = performance.now();
  builder
    .build({
      debug: false
    })
    .then((data) => {
      const pngBuildEnd = performance.now();
      console.log(`PNG Build Time: ${(pngBuildEnd - pngBuildStart).toFixed(2)}ms`);
      writeFileSync(`${__dirname}/jsx/test2.png`, data);
    });

  const svgBuildStart = performance.now();
  builder
    .build({
      format: 'svg'
    })
    .then((data) => {
      const svgBuildEnd = performance.now();
      console.log(`SVG Build Time: ${(svgBuildEnd - svgBuildStart).toFixed(2)}ms`);
      writeFileSync(`${__dirname}/jsx/test2.svg`, data);
    });
}

main();
