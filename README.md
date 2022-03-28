## Install and run
Init mongo image
```bash
docker-compose up -d
```

Create and fill the `.env` file
```bash
ENV=development
PORT=9001
MONGO_URI=mongodb://dev:dev@127.0.0.1:27017/payments?authSource=admin
```

Install dependencies, build (to generate tsoa routes and swagger) and run the demo data to check models
```bash
npm i
npm run build
npm run example
```

Start the project
```bash
npm run start:dev
```

Pass linter and tests
```bash
npm test
```

## Insomnia project
`payments-manager_insomnia.json`

-----
El planteamiendo de arquitectura consiste en tener varios servicios que llaman a implementaciones de una clase abstracta.