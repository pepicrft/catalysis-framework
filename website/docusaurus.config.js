// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Catalysis',
  tagline: 'A framework for crafting digital experiences with web technologies',
  url: 'https://catalysis.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'catalysisdev',
  projectName: 'framework',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        appId: 'WA0ITB5XJR',
        apiKey: '77c0d7b65508f8626260896fcb575ed5',
        indexName: 'catalysisdev',
        contextualSearch: true,
      },
      navbar: {
        title: 'Catalysis',
        logo: {
          alt: 'Catalysis Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'guide/why',
            position: 'left',
            label: 'Guide',
          },
          {
            type: 'doc',
            docId: 'contributors/get-started',
            position: 'left',
            label: 'Contributors',
          },
          {
            href: 'https://github.com/catalysisdev/framework',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Slack',
                href: 'https://join.slack.com/t/catalysisdev/shared_invite/zt-14azp22s4-sAWlH63i4K7_3DWfbxGvXw',
              },
              {
                label: 'Forum',
                href: 'https://github.com/catalysisdev/framework/discussions',
              },
              {
                label: 'Telegram',
                href: 'https://t.me/catalysisdev',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Catalysis, Inc. Built with love from Europe.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
}

module.exports = config
