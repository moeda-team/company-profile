# Nodeworks Company Profile Frontend

Vite and TypeScript frontend for the Nodeworks company profile site. It includes the interactive company site and contact forms that connect to the Go API.

## Requirements

- Node.js
- pnpm
- The companion `company-be-service` API for live contact forms and booking availability

## Run locally

From this directory:

```sh
cp .env.example .env.local
pnpm install
pnpm dev
```

Vite serves the site at `http://localhost:5173` by default. In development, the API client defaults to `http://localhost:8080` when `VITE_API_BASE_URL` is not set. Start the backend and PostgreSQL separately; see the companion [`company-be-service README`](../company-be-service/README.md) when both folders are checked out together.

## Configuration

See [`.env.example`](.env.example):

| Variable | Description | Local example |
| --- | --- | --- |
| `VITE_API_BASE_URL` | Origin used for API requests | `http://localhost:8080` |

Vite embeds this value into the frontend at build time. On the VPS deployment it defaults to `/`, so browser API requests use the website origin and Nginx proxies `/api/` to the backend on the shared Docker network. If using a separate backend origin, set it to the deployed HTTPS origin in the build environment. The generated Content Security Policy permits connections only to the configured origin. Configure the backend's `CORS_ORIGIN` to the exact origin serving this frontend.

## Deploy with GitHub Actions

The [deploy workflow](.github/workflows/deploy.yml) builds a production image, sends it over SSH, and starts [Compose](compose.yaml) on the VPS. It runs on pushes to `main` or manually. Configure GitHub repository secrets `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY` (the private deployment key), and `VPS_SSH_KNOWN_HOSTS` (the VPS SSH host-key line, checked against a trusted fingerprint). If the SSH key is encrypted, also set `VPS_SSH_PASSPHRASE` to its passphrase; the workflow loads the key into an SSH agent. The optional GitHub repository variable `VITE_API_BASE_URL` defaults to `/` so API traffic uses the shared-network proxy. Other optional variables are `VPS_PORT` (default `22`) and `VPS_PLATFORM` (default `linux/amd64`; use `linux/arm64` for an ARM VPS). Vite embeds `VITE_API_BASE_URL` during the image build, so a runtime `.env` file would not change the served frontend.

Install Docker Engine and Compose v2 on the VPS and give the SSH user access to Docker. The workflow creates `~/company-profile/frontend` and the shared `nodeworks` Docker network. The web container is bound to `127.0.0.1:8081` on the VPS. Point your HTTPS reverse proxy's website virtual host to that address, and configure the backend's `CORS_ORIGIN` to the website's exact HTTPS origin. Nginx serves the built static files and forwards `/api/` requests to `api:8080` on the shared network. Deploy the backend before testing forms and booking availability.

## Contact and booking integration

The API client is in [`src/contact-api.ts`](src/contact-api.ts). It handles the standard API envelope (`success`, `data`, `error`) and provides calls to:

- `GET /api/slots?month=YYYY-MM`
- `POST /api/bookings`
- `POST /api/briefs`

The Book a Call calendar uses API slot data as its source of truth. It displays scheduled dates and times, disables dates without available slots, and shows unavailable times as disabled. It submits the selected RFC 3339 timestamp unchanged. The schedule timezone is controlled by the backend (`Asia/Jakarta` by default); the visitor timezone is sent only as optional metadata. If another visitor books a selected slot first, the API returns `409` and the calendar reloads availability.

For full request/response schemas and interactive API examples, start the backend and open [`http://localhost:8080/docs`](http://localhost:8080/docs). The shared docs index is [`../docs/README.md`](../docs/README.md); see the [API reference](../docs/api.md), [booking availability](../docs/booking-availability.md), [local setup](../docs/setup.md), and [production configuration](../docs/deployment.md) for feature-specific details.

## Useful commands

```sh
pnpm dev       # Start Vite development server
pnpm build     # Type-check and create production assets in dist/
pnpm preview   # Preview the production build locally
```

The visual system and interaction guidance is in [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) and [`docs/design-system/`](docs/design-system/).
