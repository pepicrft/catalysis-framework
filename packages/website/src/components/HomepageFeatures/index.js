import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

const FeatureList = [
  {
    emoji: '🧑‍🚀',
    title: 'Opinionated',
    description: (
      <>
        Through opinions we ensure consistency in projects and provide an
        beautifully integrated development experience.
      </>
    ),
  },
  {
    emoji: '🔋',
    title: 'Batteries-included',
    description: (
      <>
        We provide defaults for projects' common needs to get off your way in
        decision-making. Focus on building not plumbing.
      </>
    ),
  },
  {
    emoji: '🌱',
    title: 'Built for the long-term',
    description: (
      <>
        We are designed to last through a well architected and tested foundation
        and a healthy community that drives the project forward.
      </>
    ),
  },
]

function Feature({ emoji, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h2>{emoji}</h2>
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
