import 'source-map-support/register';
import 'dotenv/config';
import express from 'express';
import server from './inits/express';
import { config } from './config';
import connect from './inits/mongoose';

async function init(): Promise<void> {
  await connect()

  const expressServer = express();

  const srv = await server(expressServer);

  srv.listen(config.port, () => {
    console.log('Deploy ready');
  });
}

void init();