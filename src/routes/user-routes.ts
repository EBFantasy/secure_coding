import { FastifyInstance, FastifyPluginOptions } from "fastify"

import { AppDataSource } from '../lib/typeorm'
import { User } from '../entity/User'

import { CreateUserRequestBody as CreateUserRequestBodyInterface } from '../../types/CreateUserRequestBody'
import { CreateUserResponseBody as CreateUserResponseBodyInterface } from '../../types/createUserResponseBody'

import CreateUserRequestBody from '../schemas/CreateUserRequestBody.json'
import CreateUserResponseBody from '../schemas/CreateUserResponseBody.json'

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
    newUser.firstName = firstname
    newUser.lastName = lastname
    newUser.email = email

    await newUser.setPassword(password, passwordConfirmation)
    const createdUser = await userRepository.save(newUser)
    const id = createdUser.id.toString() // waiting for uuid migration
    return reply.status(201).send({ id, firstname, lastname, email })
  })

  done()
}
