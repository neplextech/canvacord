import { createCanvasImage } from '../canvas/utils';
import { IImageGenerationTemplate, ImageGenerationStep, ImageGenerationTemplate } from '../canvas/ImageGen';
import { ImageSource } from '../helpers';
import { ImageFactory } from './AssetsFactory';
import type { Image, SKRSContext2D } from '@napi-rs/canvas';

export class TemplateImage {
  #resolved: Image | null = null;
  public constructor(public source: ImageSource) {}

  public resolved() {
    return this.#resolved != null;
  }

  public async resolve(): Promise<Image> {
    if (this.#resolved) return this.#resolved;
    return (this.#resolved = await createCanvasImage(this.source));
  }
}

export const createTemplate = <F extends (...args: any[]) => any, P extends Parameters<F>>(
  cb: (...args: P) => IImageGenerationTemplate
) => {
  return (...args: Parameters<typeof cb>) => {
    const template = cb(...args);

    return ImageGenerationTemplate.from(template);
  };
};

export const TemplateFactory = {
  Affect: createTemplate((image: ImageSource) => {
    return {
      steps: [
        {
          image: [
            {
              source: new TemplateImage(ImageFactory.AFFECT),
              x: 0,
              y: 0
            }
          ]
        },
        {
          image: [
            {
              source: new TemplateImage(image),
              x: 180,
              y: 383,
              width: 200,
              height: 157
            }
          ]
        }
      ]
    };
  }),
  Triggered: createTemplate((image: ImageSource) => {
    const src = new TemplateImage(image);
    const factory = new TemplateImage(ImageFactory.TRIGGERED);

    return {
      gif: {
        repeat: 0,
        delay: 15
      },
      width: 256,
      height: 310,
      steps: (() => {
        const d: ImageGenerationStep[] = [];

        const BR = 30;
        const LR = 20;

        for (let i = 0; i < 9; i++) {
          d.push({
            image: [
              {
                source: src,
                x: Math.floor(Math.random() * BR) - BR,
                y: Math.floor(Math.random() * BR) - BR,
                width: 256 + BR,
                height: 310 - 54 + BR
              },
              {
                source: factory,
                x: Math.floor(Math.random() * LR) - LR,
                y: 310 - 54 + Math.floor(Math.random() * LR) - LR,
                width: 256 + LR,
                height: 54 + LR
              }
            ]
          });
        }

        return d;
      })()
    };
  }),
  Fuse: createTemplate((destination: ImageSource, source: ImageSource) => {
    return {
      steps: [
        {
          image: [
            {
              source: new TemplateImage(destination),
              x: 0,
              y: 0
            }
          ]
        },
        {
          preprocess(canvas, ctx) {
            ctx.globalCompositeOperation = 'multiply';
          }
        },
        {
          image: [
            {
              source: new TemplateImage(source),
              x: 0,
              y: 0
            }
          ]
        }
      ]
    };
  }),
  Kiss: createTemplate((image1: ImageSource, image2: ImageSource) => {
    return {
      steps: [
        {
          image: [
            {
              source: new TemplateImage(ImageFactory.KISS),
              x: 0,
              y: 0
            }
          ]
        },
        {
          image: [
            {
              source: new TemplateImage(image1),
              x: 370,
              y: 25,
              width: 200,
              height: 200
            }
          ]
        },
        {
          image: [
            {
              source: new TemplateImage(image2),
              x: 150,
              y: 25,
              width: 200,
              height: 200
            }
          ]
        }
      ]
    };
  }),
  Spank: createTemplate((image1: ImageSource, image2: ImageSource) => {
    return {
      width: 500,
      height: 500,
      steps: [
        {
          image: [
            {
              source: new TemplateImage(ImageFactory.SPANK),
              x: 0,
              y: 0,
              width: 500,
              height: 500
            }
          ]
        },
        {
          image: [
            {
              source: new TemplateImage(image1),
              x: 350,
              y: 220,
              width: 120,
              height: 120
            }
          ]
        },
        {
          image: [
            {
              source: new TemplateImage(image2),
              x: 225,
              y: 5,
              width: 140,
              height: 140
            }
          ]
        }
      ]
    };
  }),
  Slap: createTemplate((image1: ImageSource, image2: ImageSource) => {
    return {
      width: 1000,
      height: 500,
      steps: [
        {
          image: [
            {
              source: new TemplateImage(ImageFactory.BATSLAP),
              x: 0,
              y: 0,
              width: 1000,
              height: 500
            }
          ]
        },
        {
          image: [
            {
              source: new TemplateImage(image1),
              x: 350,
              y: 70,
              width: 220,
              height: 220
            }
          ]
        },
        {
          image: [
            {
              source: new TemplateImage(image2),
              x: 580,
              y: 260,
              width: 200,
              height: 200
            }
          ]
        }
      ]
    };
  }),
  Beautiful: createTemplate((image: ImageSource) => {
    return {
      width: 376,
      height: 400,
      steps: [
        {
          image: [
            {
              source: new TemplateImage(ImageFactory.BEAUTIFUL),
              x: 0,
              y: 0,
              width: 376,
              height: 400
            }
          ]
        },
        {
          image: [
            {
              source: new TemplateImage(image),
              x: 258,
              y: 28,
              width: 84,
              height: 95
            }
          ]
        },
        {
          image: [
            {
              source: new TemplateImage(image),
              x: 258,
              y: 229,
              width: 84,
              height: 95
            }
          ]
        }
      ]
    };
  }),
  Facepalm: createTemplate((image: ImageSource) => {
    return {
      width: 632,
      height: 357,
      steps: [
        {
          preprocess(canvas, ctx) {
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
        },
        {
          image: [
            {
              source: new TemplateImage(image),
              x: 199,
              y: 112,
              width: 235,
              height: 235
            }
          ]
        },
        {
          image: [
            {
              source: new TemplateImage(ImageFactory.FACEPALM),
              x: 0,
              y: 0,
              width: 632,
              height: 357
            }
          ]
        }
      ]
    };
  }),
  Rainbow: createTemplate((image: ImageSource) => {
    return {
      steps: [
        {
          image: [
            {
              source: new TemplateImage(image),
              x: 0,
              y: 0
            }
          ]
        },
        {
          image: [
            {
              source: new TemplateImage(ImageFactory.RAINBOW),
              x: 0,
              y: 0
            }
          ]
        }
      ]
    };
  }),
  Rip: createTemplate((image: ImageSource) => {
    return {
      width: 244,
      height: 253,
      steps: [
        {
          image: [
            {
              source: new TemplateImage(ImageFactory.RIP),
              x: 0,
              y: 0
            }
          ]
        },
        {
          image: [
            {
              source: new TemplateImage(image),
              x: 63,
              y: 110,
              width: 90,
              height: 90
            }
          ]
        }
      ]
    };
  }),
  Trash: createTemplate((image: ImageSource) => {
    return {
      steps: [
        {
          image: [
            {
              source: new TemplateImage(ImageFactory.TRASH),
              x: 0,
              y: 0
            }
          ]
        },
        {
          image: [
            {
              source: new TemplateImage(image),
              x: 309,
              y: 0,
              width: 309,
              height: 304
            }
          ]
        }
      ]
    };
  }),
  Hitler: createTemplate((image: ImageSource) => {
    return {
      steps: [
        {
          image: [
            {
              source: new TemplateImage(ImageFactory.HITLER),
              x: 0,
              y: 0
            }
          ]
        },
        {
          image: [
            {
              source: new TemplateImage(image),
              x: 46,
              y: 43,
              width: 140,
              height: 140
            }
          ]
        }
      ]
    };
  }),
  Distracted: createTemplate((image1: ImageSource, image2: ImageSource, image3?: ImageSource | null) => {
    return {
      steps: (() => {
        const clipCircle = (ctx: SKRSContext2D, width: number, height: number) => {
          ctx.save();
          ctx.globalCompositeOperation = 'destination-in';
          ctx.beginPath();
          ctx.arc(width / 2, height / 2, width / 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        };

        const ret: ImageGenerationStep[] = [
          {
            image: [
              {
                source: new TemplateImage(ImageFactory.DISTRACTED),
                x: 0,
                y: 0
              }
            ]
          },
          {
            image: [
              {
                source: new TemplateImage(image1),
                x: 180,
                y: 90,
                width: 150,
                height: 150,
                postprocess(canvas, ctx) {
                  clipCircle(ctx, 150, 150);
                }
              }
            ]
          },
          {
            image: [
              {
                source: new TemplateImage(image2),
                x: 480,
                y: 35,
                width: 130,
                height: 130,
                postprocess(canvas, ctx) {
                  clipCircle(ctx, 130, 130);
                }
              }
            ]
          }
        ];

        if (image3) {
          ret.push({
            image: [
              {
                source: new TemplateImage(image3),
                x: 730,
                y: 110,
                width: 130,
                height: 130,
                postprocess(canvas, ctx) {
                  clipCircle(ctx, 130, 130);
                }
              }
            ]
          });
        }

        return ret;
      })()
    };
  })
};
