import "reflect-metadata"
import { AppDataSource } from "./lib/typeorm"
import { FASTIFY_ADDR, FASTIFY_PORT } from './lib/dotenv'
import fastify from 'fastify'

console.log('hello world')

const server = fastify()

server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})

async function run() {
await AppDataSource.initialize()
  await server.listen({ port: FASTIFY_PORT, host: FASTIFY_ADDR })
}
run().catch(console.error)

