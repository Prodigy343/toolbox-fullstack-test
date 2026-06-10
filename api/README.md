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
npm start
npm test
npm run lint
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

## Linting (StandardJS)

Code style is enforced with [StandardJS](https://standardjs.com/):

```bash
npm run lint        # check for style issues
npm run lint:fix    # auto-fix what it can
```

Mocha's test globals (`describe`, `it`, …) are whitelisted via the
`standard.env` field in `package.json`.
