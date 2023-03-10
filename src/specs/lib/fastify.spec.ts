import fastify from 'fastify'
import { expect } from 'chai'
import { assertsResponseSchemaPresenceHook } from '../../lib/fastify'

describe('fastify', function () {
  describe('hooks', function () {
    describe('#assertsResponseSchemaPresenceHook', function () {
      it('should throw an error no response schema is provided to unsafe route', function () {
        const server = fastify()
          .addHook('onRoute', assertsResponseSchemaPresenceHook)

        expect(() => server.get('/web-api/unsafe_route', () => 'unsafe route is me!'))
          .to.throw(Error, 'Missing response schema provided in route /web-api/unsafe_route')
      })
    })
  })
})
