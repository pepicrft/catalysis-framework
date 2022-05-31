import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

const FeatureList = [
  {
    title: 'Opinionated',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Through opinions we ensure consistency in projects and provide an
        beautifully integrated development experience.
      </>
    ),
  },
  {
    title: 'Batteries-included',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        We provide defaults for projects' common needs to get off your way in
        decision-making. Focus on building not plumbing.
      </>
    ),
  },
  {
    title: 'Built for the long-term',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        We are designed to last through a well architected and tested foundation
        and a healthy community that drives the project forward.
      </>
    ),
  },
]

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

// eslint-disable-next-line import/no-default-export
export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
