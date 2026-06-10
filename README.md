# Full Stack JS Code Challenge

Two independent projects:

| Folder                     | What it is                              | Node |
| -------------------------- | --------------------------------------- | ---- |
| [`api/`](./api)            | Node.js + Express REST API              | 14   |
| [`frontend/`](./frontend)  | React + React Bootstrap client (Webpack)| 16   |

The API consumes the provided external "Secret" API, validates and reformats
the CSV files, and exposes them at `GET /files/data`. The frontend consumes that
endpoint and renders the data in a table.

## Run locally

Two terminals (start the API first):

```bash
# Terminal 1 — API (http://localhost:3000)
cd api && npm install && npm start

# Terminal 2 — Frontend (http://localhost:8080)
cd frontend && npm install && npm start
```

The frontend dev server proxies `/files/*` to the API, so no extra
configuration is needed.

## Run with Docker (optional bonus)

```bash
docker compose up --build
# open http://localhost:8080
```

## Tests

```bash
cd api && npm test        # Mocha + Chai (external API mocked)
cd frontend && npm test   # Jest (optional bonus)
```

