import express from 'express';
import { config } from '../config';
import {ValidateError} from '@tsoa/runtime';

type ApiResponseError = {
  code: string;
  message: string;
};

export type ApiResponse<T> = {
  data: T;
  error?: ApiResponseError;
};

export enum ApiResponseErrorCode {
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  VALIDATION_FAILED = 'VALIDATION_FAILED'
}

export default async (server: express.Express): Promise<express.Express> => {
  // Config
  server.enable('trust proxy');
  server.set('port', config.port);
  server.set('env', config.env);

  // Request is json
  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());

  await registerRoutes(server);

  errorMiddleware(server);

  return server;
};

async function registerRoutes(server: express.Express) {
  server.use('/docs/swagger.json', async (_, res) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
    // @ts-ignore
    return res.send(await import('../../docs/swagger.json'));
  });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
    // @ts-ignore
  const { RegisterRoutes } = await import('../routes/routes'); // eslint-disable-line @typescript-eslint/naming-convention

  RegisterRoutes(server);

  notFoundRoute(server);
}

function notFoundRoute(server: express.Express): void {
  server.use((
    req: express.Request,
    res: express.Response
  ): void => {
    res
      .status(404)
      .send({
        error: {
          code: ApiResponseErrorCode.NOT_FOUND,
          message: 'Url not found or method not implemented'
        },
        data: {
          url: req.url,
          method: req.method
        }
      } as ApiResponse<{ url: string; method: string }>);
  });
}
function errorMiddleware(server: express.Express): void {
  server.use((
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ): express.Response | void => {
    // Tsoa error
    if (err instanceof ValidateError) {
      return res
        .status(400)
        .send({
          error: {
            code: ApiResponseErrorCode.VALIDATION_FAILED,
            message: 'Validation failed'
          },
          data: err.fields
        } as ApiResponse<unknown>);
    }

    // Generic error
    res
      .status(500)
      .send({
        error: {
          code: ApiResponseErrorCode.INTERNAL_ERROR,
          message: err.message
        },
        data: err.stack
      } as ApiResponse<string>);
  });
}