import { defineMiddleware, Response } from 'catalysisdev/middleware'

const authMiddleware = defineMiddleware((input) => {
  // Some authentication checks
  const response = new Response({ status: 401 })
  return { do: 'respond', with: response }
})

export default authMiddleware
