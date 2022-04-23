export type MainTarget = {
  product: 'web' | 'desktop'
}

export type SharedTarget = {
  shared: ''
}

export type TargetType = 'main' | 'shared'

export type Target = (MainTarget | SharedTarget) & {
  type: TargetType
  name: string
}
