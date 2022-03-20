import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'GestaltJS',
  description:
    'An opinionted and batteriees-included Javascript framework for building web and desktop apps.',
  themeConfig: {
    repo: 'gestaltjs/gestalt',
    docsDir: 'packages/website/docs',
    docsBranch: 'main',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'Guide', link: '/', activeMatch: '^/$|^/guide/' },
      {
        text: 'Contributors',
        link: '/contributors/get-started',
        activeMatch: '^/contributors/',
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
    },
  },
})

function getGuideSidebar() {
  return [
    {
      text: 'Introduction',
      children: [
        { text: 'Why GestaltJS?', link: '/guide/why-gestaltjs' },
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
        { text: 'Why GestaltJS', link: '/blog/2022-01-19-why-gestalt' },
      ],
    },
  ]
}
