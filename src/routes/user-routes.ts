import { FastifyInstance, FastifyPluginOptions } from "fastify"

import { AppDataSource } from '../lib/typeorm'
import { User } from '../entities/user'

import { CreateUserRequestBody as CreateUserRequestBodyInterface } from '../../types/createUserRequestBody.schema'
import { CreateUserResponseBody as CreateUserResponseBodyInterface } from '../../types/createUserResponseBody.schema'

import CreateUserRequestBody from '../schemas/createUserRequestBody.schema.json'
import CreateUserResponseBody from '../schemas/createUserResponseBody.schema.json'

export default function registerUserRoute(server: FastifyInstance, opts: FastifyPluginOptions, done: (err?: Error) => void) {
  const userRepository = AppDataSource.getRepository(User)

  server.post<{
    Body: CreateUserRequestBodyInterface
    Reply: CreateUserResponseBodyInterface
  }>('/web-api/users', {
    schema: {
      body: CreateUserRequestBody,
      response: {
        201: CreateUserResponseBody
      }
    }
  }, async (request, reply) => {
    const { firstname, lastname, email, password, passwordConfirmation } = request.body

    const newUser = new User()
    newUser.firstname = firstname
    newUser.lastname = lastname
    newUser.email = email

    await newUser.setPassword(password, passwordConfirmation)
    const createdUser = await userRepository.save(newUser)
    const id = createdUser.id.toString() // waiting for uuid migration
    return reply.status(201).send({ id, firstname, lastname, email })
  })

  done()
}
