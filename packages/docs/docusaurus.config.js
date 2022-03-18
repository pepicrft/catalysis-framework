// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/dracula')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'GestaltJS',
  tagline:
    'A batteries-included opinionated framework for building web, desktop, and mobile apps with Javascript',
  url: 'https://docs.gestaltjs.com',
  baseUrl: '/',
  staticDirectories: ['static'],
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'gestaltjs',
  projectName: 'gestalt',

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/gestaltjs/gestalt/tree/main/packages/docs',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/gestaltjs/gestalt/tree/main/packages/docs',
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
      navbar: {
        title: 'GestaltJS',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'tutorial/intro',
            position: 'left',
            label: 'Tutorial',
          },
          {
            type: 'doc',
            docId: 'contributors/release',
            position: 'left',
            label: 'Contributors',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://join.slack.com/t/gestaltjs/shared_invite/zt-14azp22s4-sAWlH63i4K7_3DWfbxGvXw',
            label: 'Slack',
            position: 'right',
          },
          {
            href: 'https://github.com/gestaltjs/gestalt/discussions',
            label: 'Community',
            position: 'right',
          },
          {
            href: 'https://github.com/gestaltjs/gestalt',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      image: 'img/ogimage.png',
      footer: {
        style: 'light',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/tutorial/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/7gvRstAKTU',
              },
              {
                label: 'Reddit',
                href: 'https://www.reddit.com/r/gestaltjs/',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/gestaltjs',
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
        copyright: `Copyright © ${new Date().getFullYear()} GesatltJS. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
}

module.exports = config
