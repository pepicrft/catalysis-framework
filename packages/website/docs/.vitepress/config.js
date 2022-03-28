import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Gestalt',
  description:
    'An opinionted and batteries-included Javascript framework for building web and desktop apps.',
  head: [
    ['meta', { name: 'twitter:site', content: '@gestaltjs' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    [
      'meta',
      {
        name: 'twitter:image',
        content:
          'https://raw.githubusercontent.com/gestaltjs/gestalt/main/packages/website/docs/public/logo.png',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
  ],
  themeConfig: {
    repo: 'gestaltjs/gestalt',
    docsDir: 'packages/website/docs',
    docsBranch: 'main',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',
    algolia: {
      appId: 'WA0ITB5XJR',
      apiKey: '77c0d7b65508f8626260896fcb575ed5',
      indexName: 'gestaltjs',
    },
    nav: [
      {
        text: 'Guide',
        link: '/guide/why-gestaltjs',
        activeMatch: '/guide/',
      },
      {
        text: 'Reference',
        link: '/reference/commands/build',
        activeMatch: '^/reference/',
      },
      {
        text: 'Contributors',
        link: '/contributors/get-started',
        activeMatch: '^/contributors/',
      },
      {
        text: 'Catalysis',
        link: '/catalysis/introduction',
        activeMatch: '^/catalysis/',
      },
      {
        text: 'Blog',
        link: '/blog/2022-03-14-cohesive-framework',
        activeMatch: '^/blog/',
      },
      {
        text: 'Release Notes',
        link: 'https://github.com/gestaltjs/gestalt/releases',
      },
      {
        text: 'Slack',
        link: 'https://join.slack.com/t/gestaltjs/shared_invite/zt-14azp22s4-sAWlH63i4K7_3DWfbxGvXw',
      },
      {
        text: 'Community',
        link: 'https://github.com/gestaltjs/gestalt',
      },
    ],

    sidebar: {
      '/guide/': getGuideSidebar(),
      '/contributors/': getContributorsSidebar(),
      '/blog/': getBlogSidebar(),
      '/catalysis/': getCatalysisSidebar(),
      '/reference/': getReferenceSidebar(),
    },
  },
})

function getGuideSidebar() {
  return [
    {
      text: 'Introduction',
      children: [
        { text: 'Why Gestalt?', link: '/guide/why-gestaltjs' },
        { text: 'Get started', link: '/guide/get-started' },
      ],
    },
  ]
}

function getContributorsSidebar() {
  return [
    {
      text: 'Introduction',
      children: [
        { text: 'Get started', link: '/contributors/get-started' },
        { text: 'Architecture', link: '/contributors/architecture' },
        { text: 'Error handling', link: '/contributors/errors' },
        { text: 'Logging', link: '/contributors/logging' },
        { text: 'Fixtures', link: '/contributors/fixtures' },
      ],
    },
  ]
}

function getBlogSidebar() {
  return [
    {
      text: 'Posts',
      children: [
        {
          text: 'Building a cohesive framework experience that sparks joy',
          link: '/blog/2022-03-14-cohesive-framework',
        },
        { text: 'Why Gestalt', link: '/blog/2022-01-19-why-gestalt' },
      ],
    },
  ]
}

function getCatalysisSidebar() {
  return [
    {
      text: 'Catalysis',
      children: [
        {
          text: 'Introduction',
          link: '/catalysis/introduction',
        },
      ],
    },
  ]
}

function getReferenceSidebar() {
  return [
    {
      text: 'Commands',
      children: [
        {
          text: 'gestalt build',
          link: '/reference/commands/build',
        },
      ],
    },
  ]
}
