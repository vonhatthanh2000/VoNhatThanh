# 99Tech Code Challenge

This project represents a basic CRUD server with JWT authentication

1. Install NPM packages

```sh
yarn install
```

2. Copy sample env
   In Linux/Mac

```sh
cp .env.example .env
```

In Windows

```sh
copy .env.example .env
```

3. Run docker to init database

```sh
docker compose up -d
```

4. Run migration to init database structure

```sh
yarn dbm:run
```

Note: drop database

```sh
yarn dbm:drop
```

5. Run seed to get sample data

```sh
yarn seed
```

6. Run server

```sh
yarn start:dev
```
