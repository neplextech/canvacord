import nextMDX from '@next/mdx';
import { remarkCodeHike } from '@code-hike/mdx';
import remarkGfm from 'remark-gfm';

const withMDX = nextMDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [
            [
                remarkCodeHike,
                {
                    lineNumbers: true,
                    showCopyButton: true,
                    theme: 'github-dark-dimmed',
                    autoImport: true,
                    autoLink: true
                }
            ],
            remarkGfm
        ],
        providerImportSource: '@mdx-js/react'
    }
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    typescript: {
        ignoreBuildErrors: true
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    swcMinify: true,
    redirects: async () => {
        return [
            { source: '/guide', destination: 'https://canvacord.neplex.dev', permanent: true },
            { source: '/examples', destination: 'https://canvacord.neplex.dev/examples/introduction', permanent: true }
        ]
    }
    // experimental: {
    //     mdxRs: true
    // }
};

export default withMDX(nextConfig);
