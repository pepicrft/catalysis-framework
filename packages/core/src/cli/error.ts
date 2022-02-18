class Fatal extends Error {
  message: string
  next: string

  constructor(message: string, next: string) {
    super(message)
    this.message = message
    this.next = next
  }
}

export class Bug extends Fatal {}
export class Abort extends Fatal {}

export const handler = (error: Error): Promise<Error> => {
  return Promise.resolve(error)
}
