import * as dotenv from 'dotenv'
import path = require("path")

const envFile = process.env.NODE_ENV === 'test' ? '.test.env' : '.env'
dotenv.config({ path: path.resolve(process.cwd(), envFile) })

console.log('env: %s, db: %s', process.env.NODE_ENV, process.env.POSTGRES_DB)

export const POSTGRES_HOST = getOrThrow('POSTGRES_HOST')
export const POSTGRES_DB_PORT = Number.parseInt(getOrThrow('POSTGRES_DB_PORT') || '5432')
export const POSTGRES_USER = getOrThrow('POSTGRES_USER')
export const POSTGRES_PASSWORD = getOrThrow('POSTGRES_PASSWORD')
export const POSTGRES_DB = getOrThrow('POSTGRES_DB')
export const SYNCHRONIZE_DB = getOrThrow('SYNCHRONIZE_DB') == 'true'
export const DB_LOGGING = getOrThrow('DB_LOGGING') == 'true'
export const FASTIFY_PORT = Number.parseInt(getOrThrow('FASTIFY_PORT'))
export const FASTIFY_ADDR = getOrThrow('FASTIFY_ADDR')

function getOrThrow(property: string) {
  const value = process.env[property]

  if (typeof value === 'undefined') throw new Error(`${property} is empty`)
  return value
}
