// @ts-nocheck
import { JSX, Builder, loadImage, StyleSheet } from '../src/index';

import { writeFileSync } from 'fs';
import { roboto } from './common';

const styles = StyleSheet.create({
  root: {
    fontFamily: roboto.name,
    display: 'flex'
  }
});

async function main() {
  const builder = new Builder(800, 185);

  builder.style = styles.root;

  builder.addComponent(
    <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
      <div tw="bg-gray-100 flex w-full">
        <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
          <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
            <span>Ready to dive in?</span>
            <span tw="text-teal-600">Start your free trial today.</span>
          </h2>
          <div tw="mt-8 flex md:mt-0">
            <div tw="flex rounded-md shadow">
              <a tw="flex items-center justify-center rounded-md border border-transparent bg-teal-600 px-5 py-3 text-base font-medium text-white">
                Get started
              </a>
            </div>
            <div tw="ml-3 flex rounded-md shadow">
              <a tw="flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-teal-600">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const pngBuildStart = performance.now();
  builder
    .build({
      debug: false
    })
    .then((data) => {
      const pngBuildEnd = performance.now();
      console.log(`PNG Build Time: ${(pngBuildEnd - pngBuildStart).toFixed(2)}ms`);
      writeFileSync(`${__dirname}/jsx/test.png`, data);
    });

  const svgBuildStart = performance.now();
  builder
    .build({
      format: 'svg'
    })
    .then((data) => {
      const svgBuildEnd = performance.now();
      console.log(`SVG Build Time: ${(svgBuildEnd - svgBuildStart).toFixed(2)}ms`);
      writeFileSync(`${__dirname}/jsx/test.svg`, data);
    });
}

main();
