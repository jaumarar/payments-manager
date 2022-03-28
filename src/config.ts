declare const process: {
  env: Record<string, string>
}

export const config = {
  env: process.env.ENV,
  port: process.env.PORT,
  mongo: {
    uri: process.env.MONGO_URI
  }
}