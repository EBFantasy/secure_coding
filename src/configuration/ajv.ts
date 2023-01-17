import fastify from 'fastify'
import newAjv from 'ajv'

const Fastify = fastify()

const ajv =  require('ajv')({ removeAdditional: false })

Fastify.addHook('onRoute', (routeOptions) => {
  const validate = ajv.compile(routeOptions.schema)
  routeOptions.schema = {
    body: validate,
    querystring: validate,
    params: validate,
  }
})

Fastify.patch('/user/:id', {
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' }
      },
      required: ['id']
    },
    body: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' }
          },
          additionalProperties: false
        }
      },
      required: ['user']
    }
  },
  handler: async (req, reply) => {
    const repo = dataSource.getRepository(User)
    const user = await repo.findOneBy({ id: req.params.id })
    repo.merge(user, req.body.user)
    await repo.save(user)
    reply.send(user)
  }
})