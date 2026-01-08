# School Forum

School Forum is a split-stack project with a Quarkus-based API and an Angular
front end. This root README provides a quick orientation and common workflows;
see the component READMEs for full details.

## Project structure

- `api/` — Quarkus REST API service.
- `web-frontend/` — Angular web application.
- `Projektarbeit/` — project documentation and planning artifacts.
- `ScreensDesign/` — UI/UX design assets and screens.

## Prerequisites

- Java 8+ and Maven (via the included `mvnw`) for the API.
- Node.js + npm for the web front end.

## Quick start

### API (Quarkus)

```bash
cd api
./mvnw quarkus:dev
```

The API will run on `http://127.0.0.1:8080` in development mode. For additional
build and native-image instructions, see `api/README.md`.

### Web front end (Angular)

```bash
cd web-frontend
npm install
npm run start
```

The Angular dev server runs at `http://localhost:4200`. For build and test
commands, see `web-frontend/README.md`.

## Notes

- This repository contains multiple subprojects; run commands from the relevant
  subdirectory.
- If you change configuration in either service, update the corresponding
  component README as needed.
