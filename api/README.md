# Full Stack Challenge — API

REST API built with **Node.js + Express**. It consumes the provided external
"Secret" API, validates/reformats the CSV files, and exposes the result as JSON.

## Requirements

- Node.js **14** (see [`.nvmrc`](.nvmrc)) — `nvm use`
- No global libraries, environment variables, or OS-specific configuration are
  required. The app runs with sensible defaults out of the box.

## Install & run

```bash
npm install
npm start          # starts the API on http://localhost:3000
npm test           # runs the Mocha + Chai test suite
npm run lint       # checks code style with StandardJS
```

## Endpoints

| Method | Path                     | Description                                                        |
| ------ | ------------------------ | ------------------------------------------------------------------ |
| GET    | `/files/data`            | Formatted + validated data for every file (JSON array).            |
| GET    | `/files/data?fileName=X` | _(bonus)_ Same as above, filtered to a single file.                |
| GET    | `/files/list`            | _(bonus)_ Raw list of files as returned by the external API.       |

### Example success response (`GET /files/data`)

```json
[
  {
    "file": "file1.csv",
    "lines": [
      {
        "text": "RgTya",
        "number": 64075909,
        "hex": "70ad29aacf0b690b0467fe2b2767f765"
      }
    ]
  }
]
```

## Processing rules

1. List the files via the external `GET /v1/secret/files`.
2. Download each file via `GET /v1/secret/file/{file}`.
3. Parse the strict CSV (`file,text,number,hex`); discard lines that don't have
   enough/valid data and tolerate empty files.
4. Skip files that fail to download.
5. Build one `{ file, lines }` object per file.

## Project layout

```
src/
  config.js              # defaults (port, external API base URL + key)
  app.js                 # express app (middleware + routes + error handler)
  server.js              # entry point (npm start)
  routes/files.js        # /files/data, /files/list
  services/
    externalApi.js       # client for the external "Secret" API
    csvParser.js         # strict CSV parsing + line validation
    filesService.js      # orchestration (list -> download -> parse)
test/
  files.test.js          # Mocha + Chai + supertest (external API mocked with nock)
```

## Tech / constraints

- JavaScript (ES6+), CommonJS modules — **no Babel, TypeScript, Dart or Elm**.
- `express`, `mocha`, `chai` as required by the challenge.
- `node-fetch@2` (HTTP client, Node 14 compatible), `cors`, plus `supertest` /
  `nock` for testing.

## Linting (StandardJS)

Code style is enforced with [StandardJS](https://standardjs.com/):

```bash
npm run lint        # check for style issues
npm run lint:fix    # auto-fix what it can
```

Mocha's test globals (`describe`, `it`, …) are whitelisted via the
`standard.env` field in `package.json`.
