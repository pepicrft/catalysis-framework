import { defineMiddleware, Request, Response } from 'gestaltjs/middleware'

export default defineMiddleware((request) => {
  const response = new Response({
    status: 200,
  })
  return response
})
