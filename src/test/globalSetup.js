import { MongoMemoryServer } from 'mongodb-memory-server'

// This file is used to set up a MongoDB instance in memory for testing purposes. 
// It creates a new instance of MongoMemoryServer, sets the DATABASE_URL environment variable to the URI of the in-memory database, 
// and stores the instance in a global variable for later use in tests.
export default async function globalSetup() {
  const instance = await MongoMemoryServer.create({
    binary: {
      version: '6.0.4',
    },
  })
  global.__MONGOINSTANCE = instance
  process.env.DATABASE_URL = instance.getUri()
}
