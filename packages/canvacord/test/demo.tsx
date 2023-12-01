import { JSX, Builder, Font } from '../dist';
import { writeFileSync } from 'fs';

interface Props {
  text: string;
}

class Design extends Builder<Props> {
  constructor() {
    // set width and height
    super(500, 500);
    // initialize props
    this.bootstrap({ text: '' });
  }

  setText(text: string) {
    this.options.set('text', text);
    return this;
  }

  // this is where you have to define output ui
  async render() {
    return (
      <div
        className="flex items-center justify-center h-full w-full"
        style={{
          background: 'linear-gradient(0deg, #5865f2, #00bbff)'
        }}
      >
        <h1 className="text-white font-bold text-7xl">{this.options.get('text')}</h1>
      </div>
    );
  }
}

// usage

// load font
Font.loadDefault();

// create design
const design = new Design().setText('Hello World');
const image = design.build({ format: 'png' });

image.then((i) => {
  writeFileSync('test.png', i);
});
