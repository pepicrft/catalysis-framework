// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  guideSidebar: ['guide/why', 'guide/get-started', 'guide/directory-structure'],
  contributorsSidebar: [
    'contributors/get-started',
    'contributors/principles',
    'contributors/errors',
    'contributors/eslint-rules',
    'contributors/automation',
    {
      type: 'category',
      label: 'Decision record',
      items: ['contributors/decision-record/2022-09-01-pnpm'],
    },
  ],
}

module.exports = sidebars
