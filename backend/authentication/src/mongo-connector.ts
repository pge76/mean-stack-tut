import mongoose, { Connection, ConnectionOptions } from 'mongoose'

export class MongoConnector {
  private mongoConnection: Connection;

  public connect (): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const options: ConnectionOptions = {
        keepAlive: true,
        useNewUrlParser: true // TODO: whats that?
      }

      mongoose.Promise = global.Promise;

      this.mongoConnection = mongoose.connection
      const mongoDbUrl = 'mongodb://' +
                         process.env.MONGO_DB_USERNAME +
                         ':' +
                         process.env.MONGO_DB_PASSWORD +
                         '@' +
                         process.env.MONGO_DB_HOST +
                         (process.env.MONGO_DB_PORT ? ':' + process.env.MONGO_DB_PORT + '/' : '/') +
                         process.env.MONGO_DB_DATABASE +
                         (process.env.MONGO_DB_PARAMETERS ? process.env.MONGO_DB_DATABASE : '')

      mongoose.connect(mongoDbUrl, options).then(() => {
        console.log('MongoDB connected [%s]', mongoDbUrl)
        resolve()
      }).catch((e) => {
        console.error('MongoDB failed to start for url [%s] with [%s]', mongoDbUrl, e)
        reject(e)
      })

      mongoose.connection.on('connected', () => {
        console.log('Connected to database')
      })
    })
  }

  public disconnect (): Promise<void> {
    return this.mongoConnection.close()
  }
}
