import { ImageGenerationStep, ImageGenerationTemplate } from '../canvas/ImageGen';
import { ImageSource } from '../helpers';
import { ImageFactory } from './AssetsFactory';

export const TemplateFactory: Record<string, (image: ImageSource) => ImageGenerationTemplate> = {
  Affect: (image: ImageSource) => {
    return {
      steps: [
        {
          image: [
            {
              source: ImageFactory.AFFECT,
              x: 0,
              y: 0
            }
          ]
        },
        {
          image: [
            {
              source: image,
              x: 180,
              y: 383,
              width: 200,
              height: 157
            }
          ]
        }
      ]
    };
  },
  Triggered: (image: ImageSource) => {
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
                source: image,
                x: Math.floor(Math.random() * BR) - BR,
                y: Math.floor(Math.random() * BR) - BR,
                width: 256 + BR,
                height: 310 - 54 + BR
              },
              {
                source: ImageFactory.TRIGGERED,
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
  }
};
