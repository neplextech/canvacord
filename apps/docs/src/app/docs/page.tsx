const EXAMPLE_1 = `import { canvacord } from 'canvacord';
import fs from 'node:fs';

// triggered gif
const triggered = await canvacord.triggered(image);
triggered.pipe(fs.createWriteStream('triggered.gif'));

// image generation
const beautiful = await canvacord.beautiful(img);
const facepalm = await canvacord.facepalm(img);

// filters
const filtered = await canvacord
    .filters(512, 512)
    .drawImage(image)
    .hueRotate(90)
    .invert(2)
    .sepia(1)
    .opacity(0.5)
    .saturate(2)
    .encode();

// alternative syntax
const filtered = await canvacord(image, 512, 512)
    .hueRotate(90)
    .invert(2)
    .sepia(1)
    .opacity(0.5)
    .saturate(2)
    .encode();

fs.writeFileSync('filtered.png', filtered);`;

const EXAMPLE_2 = `import { Font, RankCardBuilder } from 'canvacord';
import { writeFile } from 'fs/promises';

// load default font
Font.loadDefault();

const card = new RankCardBuilder()
  .setUsername('Lost Ctrl')
  .setDisplayName('thearchaeopteryx')
  .setAvatar('...')
  .setCurrentXP(3800)
  .setRequiredXP(2500)
  .setLevel(54)
  .setRank(32)
  .setStatus('online');

const image = await card.build({
  format: 'png'
});

await writeFileSync('./card.png', data);`;

export default function Page() {
  return (
    <main className="container">
      <h1 className="text-3xl font-bold border-b">DOCS WIP</h1>
      <h1 className="text-xl font-bold">Canvacord</h1>
      <p>
        Easily generate images on-the-fly with node.js using wide range of
        templates.
      </p>

      <h2 className="font-semibold">Get started</h2>
      <p>Install canvacord using npm:</p>
      <code>npm i --save canvacord@beta</code>

      <h2 className="font-semibold text-lg">Example</h2>
      <h3 className="font-semibold">Image Generation</h3>
      <h4 className="font-medium">
        Using built-in templates (New &quot;Legacy api&quot;)
      </h4>

      <pre className="rounded-md bg-gray-100 dark:bg-background p-4 my-2">
        {EXAMPLE_1}
      </pre>

      <h4 className="font-medium">New XP Card</h4>

      <pre className="rounded-md bg-gray-100 dark:bg-background p-4 my-2">
        {EXAMPLE_2}
      </pre>
      {/* eslint-disable-next-line */}
      <img
        src="https://raw.githubusercontent.com/neplextech/canvacord/main/packages/canvacord/test/jsx/test2.svg"
        alt="xp-card"
        className="w-[50%] mb-6"
      />
    </main>
  );
}
