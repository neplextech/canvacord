import { lazy } from 'react';

export default function GuideData() {
    return null;
}

export const pages = [
{
      name: "examples",
      displayName: "Examples",
      pages: [
        {
          name: "custom-card.md",
          displayName: "Custom Card",
          component: lazy(() => import('../_guides/Examples/custom-card.md')),
        },
{
          name: "custom-image-generation.md",
          displayName: "Custom Image Generation",
          component: lazy(() => import('../_guides/Examples/custom-image-generation.md')),
        },
{
          name: "image-generation.md",
          displayName: "Image Generation",
          component: lazy(() => import('../_guides/Examples/image-generation.md')),
        },
{
          name: "rank-card.md",
          displayName: "Rank Card",
          component: lazy(() => import('../_guides/Examples/rank-card.md')),
        }
      ]
    }
];
