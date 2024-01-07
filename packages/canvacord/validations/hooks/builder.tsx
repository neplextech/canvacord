/** @jsx JSX.createElement */
/** @jsxFrag JSX.Fragment */
import { JSX, useState, Font, createGIF, Builder } from "canvacord";
import { createWriteStream } from "fs";

function Rotation() {
  const [count, setCount] = useState(0);

  setCount(count + 1);

  return (
    <div className="h-full w-full bg-indigo-600 flex items-center justify-center">
      <h1
        className="text-9xl text-white font-bold"
        style={{ transform: `rotate(${count}deg)` }}
      >
        {count}°
      </h1>
    </div>
  );
}

class Demo extends Builder {
  constructor() {
    super(512, 512);
  }

  public async render() {
    return <Rotation />;
  }
}

// load font
Font.loadDefault();

const demo = new Demo();
demo.setIterations(360);

const gif = createGIF(demo, {
  repeat: 0,
  delay: 15,
  dispose: 0,
  framerate: 15,
  quality: 10,
});

gif.then((stream) => {
  stream.pipe(createWriteStream(`${__dirname}/output/test.gif`));
});
