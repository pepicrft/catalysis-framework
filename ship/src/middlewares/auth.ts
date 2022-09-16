import { defineMiddleware, Request, Response } from 'gestaltjs/middleware'

const authMiddleware = defineMiddleware((request) => {
  const response = new Response({
    status: 200,
  })
  return response
})

export default authMiddleware
