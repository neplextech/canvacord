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
          name: "custom-image-generation.md",
          displayName: "Custom Image Generation",
          component: lazy(() => import('../_guides/Examples/custom-image-generation.md')),
        },
{
          name: "gif-generation.md",
          displayName: "Gif Generation",
          component: lazy(() => import('../_guides/Examples/gif-generation.md')),
        },
{
          name: "greetings-card.md",
          displayName: "Greetings Card",
          component: lazy(() => import('../_guides/Examples/greetings-card.md')),
        },
{
          name: "image-generation.md",
          displayName: "Image Generation",
          component: lazy(() => import('../_guides/Examples/image-generation.md')),
        },
{
          name: "leaderboard-image-generation.md",
          displayName: "Leaderboard Image Generation",
          component: lazy(() => import('../_guides/Examples/leaderboard-image-generation.md')),
        },
{
          name: "rank-card.md",
          displayName: "Rank Card",
          component: lazy(() => import('../_guides/Examples/rank-card.md')),
        }
      ]
    },
{
      name: "welcome",
      displayName: "Welcome",
      pages: [
        {
          name: "welcome.md",
          displayName: "Welcome",
          component: lazy(() => import('../_guides/Welcome/welcome.md')),
        }
      ]
    },
];
