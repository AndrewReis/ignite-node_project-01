# Why fastify
> Recebe mais updates que o express atualmente.
> Mais popular e muito parecido com a sintaxe do express
> Suporte para typescript
> Suporte para assincronismo

# Setup typescript
``` bash
npm i -D @types/node
```
``` bash
npm i -D typescript
```

``` bash
npx tsc --init
```

## Ways Convert TS to JS
**(native)**
``` bash
npx tsc getting-started-typescript/type.ts
```
**Libs**
> Only development environment
``` bash
npm i -D tsx
```

# Knex commands
npm run knex -- migrate:make migrationName
npm run knex -- migrate:latest
npm run knex -- migrate:rollback