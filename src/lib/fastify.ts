import fastify, { RouteOptions } from 'fastify'

import userRoutes from '../routes/user-routes'

export const server = fastify()
  .addHook('onRoute', assertsResponseSchemaPresenceHook)
  .register(userRoutes)

export function assertsResponseSchemaPresenceHook(routeOptions: RouteOptions) {
  if (!routeOptions.schema || !routeOptions.schema.response) {
    throw new Error(`Missing response schema provided in route ${routeOptions.url}`)
  }
}
