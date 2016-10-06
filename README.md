# Tic Tac Toe

> an implementation of non-recursive [minimax alpha-beta pruning](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning) inspirated by [Carsten Koenig](https://github.com/CarstenKoenig) awesome [Othello Game in Elm](https://github.com/CarstenKoenig/ElmOthello). Thank you Carsten!

__[Live Demo](https://tic-tac-toe.linklet.run)__

## Setup

```bash
npm install
```

## Dev

```bash
npm start
```

__open [http://localhost:3000](http://localhost:3000)__

## Production build

```bash
npm run build
```

## Docker deployment

```bash
docker build -t tic-tac-toe .
docker run  -d \
  -p 8080:80 \
  -e ENDPOINT_TOKEN=yourJWToken \
  -e ENDPOINT=https://tic-tac-toe.linklet.run/default \
  -e CONFIG_VARS=ENDPOINT,ENDPOINT_TOKEN \
  tic-tac-toe
```
