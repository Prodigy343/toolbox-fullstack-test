# Full Stack Challenge — Frontend

React client built with **React + React Bootstrap**, bundled with **Webpack**.
It consumes the API's `GET /files/data` endpoint and renders the data in a
table (columns: File Name, Text, Number, Hex), with a dropdown to filter by
file name (backed by `GET /files/list`).

## Requirements

- Node.js **16** (see [`.nvmrc`](.nvmrc)) — `nvm use`
- The API should be running on `http://localhost:3000` (the dev server proxies
  `/files/*` to it — see `webpack.config.js`).

## Install & run

```bash
npm install
npm start
npm run build
npm test
npm run test:coverage
```

