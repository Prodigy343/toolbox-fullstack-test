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
npm start          # webpack-dev-server on http://localhost:8080
npm run build      # production build into dist/
npm test               # Jest unit tests (optional bonus)
npm run test:coverage  # ...with a coverage report
```

## Project layout

```
public/index.html          # HTML template
src/
  index.jsx                 # entry point (mounts <App/>, imports Bootstrap CSS)
  App.jsx                   # functional component + Hook Effects (data + filter)
  api/filesApi.js           # fetch wrappers (/files/data, /files/list)
  components/FilesTable.jsx # React Bootstrap table
  components/FileFilter.jsx # file-name dropdown filter
  __tests__/                # Jest + React Testing Library suites
webpack.config.js          # webpack + dev-server (+ API proxy) config
babel.config.json          # @babel/preset-env + preset-react (JSX)
jest.config.js             # jsdom environment + setup
```

## Tech / constraints

- JavaScript (ES6+) with functional components and Hook Effects.
- **No TypeScript, Dart or Elm.** Babel is used only to compile JSX/ESM for the
  Webpack build (it is not in the frontend's forbidden list).
- `react`, `react-bootstrap`, `webpack` as required by the challenge.

## Not yet wired (optional bonus)

- Redux for state management.
