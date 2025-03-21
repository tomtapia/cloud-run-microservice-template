# Cloud Run Microservice Template

[![Build Status](https:\/\/img.shields.io\/github\/actions\/workflow\/status\/tomtapia\/cloud-run-microservice-template\/cloud-run-deployer.yml)](https:\/\/github.com\/tomtapia\/cloud-run-microservice-template\/actions)
[![License](https:\/\/img.shields.io\/github\/license\/tomtapia\/cloud-run-microservice-template)](https:\/\/github.com\/tomtapia\/cloud-run-microservice-template\/blob\/main\/LICENSE)

## Microservice Template for GCP Cloud Run

This project is a template for creating microservices on Google Cloud Platform's Cloud Run using the NestJS framework. It leverages the powerful features of NestJS for building efficient, reliable, and scalable server-side applications while providing a structured logging mechanism with Pino.

## Table of Contents

- [Cloud Run Microservice Template](#cloud-run-microservice-template)
  - [Microservice Template for GCP Cloud Run](#microservice-template-for-gcp-cloud-run)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
    - [Development Mode](#development-mode)
    - [Watch Mode](#watch-mode)
    - [Production Mode](#production-mode)
  - [Testing](#testing)
  - [Contributing](#contributing)
  - [Support](#support)
  - [License](#license)
  - [📁 Project Structure](#-project-structure)
    - [💡 Layer Responsibilities](#-layer-responsibilities)

## Features

- **NestJS**: Progressive Node.js framework for building efficient and scalable server-side applications.
- **Structured Logging**: JSON formatted logger using Pino, parsable by Cloud Logging, with automatic correlation of container logs to a request log.
- **Cloud Run**: Serverless containerized applications that automatically scale.
- **Environment Configuration**: All external variables are loaded at the start of the project through the `.env` file.

## Prerequisites

- Enable the Cloud Run API via the [console](https:\/\/console.cloud.google.com\/apis\/library\/run.googleapis.com) or CLI:

  ```bash
  gcloud services enable run.googleapis.com
  ```

- Create a `.env` file in your local with the minimal parameters.

  ```dosini
  GOOGLE_CLOUD_PROJECT=
  APP_NAME=
  APP_DESCRIPTION=
  API_VERSION=
  PORT=
  ```

## Installation

Clone the repository:

```bash
git clone https://github.com\/tomtapia\/cloud-run-microservice-template.git
cd cloud-run-microservice-template
```

Install dependencies:

```bash
npm install
```

## Running the Application

### Development Mode

```bash
npm run start
```

### Watch Mode

```bash
npm run start:dev
```

### Production Mode

```bash
npm run start:prod
```

## Testing

To run tests:

```bash
npm run test
```

To run end-to-end tests:

```bash
npm run test:e2e
```

## Contributing

We welcome contributions! Please see the [contributing guidelines](CONTRIBUTING.md) for more details.

## Support

Please use the issue tracker for bug reports, feature requests, and submitting pull requests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

¡Aquí tienes la sección lista en formato Markdown para que la pegues directamente en tu `README.md` o en la documentación del proyecto!

---

## 📁 Project Structure

This project follows a **Clean Architecture** approach, organizing the code into three main layers: `domain`, `application`, and `infrastructure`. Each layer has a distinct responsibility to ensure separation of concerns, testability, and maintainability.

```bash
├── src                                     # Main application source code
│   ├── domain                              # Domain layer: core business logic, entities, and contracts
│   │   ├── models                          # Core domain models/entities
│   │   ├── repositories                    # Abstract repository interfaces (contracts)
│   │   └── services                        # Domain services (pure business logic, no side effects)
│   ├── application                         # Application layer: use cases, DTOs, and application services
│   │   ├── use-cases                       # Application-specific business logic
│   │   ├── dto                             # Data Transfer Objects used between layers
│   │   └── services                        # Application-level services orchestrating use cases
│   ├── infrastructure                      # Infrastructure layer: technical implementations, framework integrations
│   │   ├── api-clients/                    # HTTP clients for external APIs (REST, GraphQL, etc.)
│   │   ├── cache/                          # Cache adapters (e.g., Redis, in-memory)
│   │   ├── database/                       # DB configuration, ORM integration, custom repository implementations
│   │   ├── env                             # Loads and validates environment variables from .env
│   │   │   └── index.ts                    # Entry point for accessing environment configs
│   │   ├── http                            # HTTP adapter using NestJS (controllers, middleware, filters, views)
│   │   │   ├── controllers                 # REST API controllers (public-facing endpoints)
│   │   │   │   ├── home.controller.ts      # Root/home endpoint
│   │   │   │   └── metadata.controller.ts  # Exposes service metadata
│   │   │   ├── filters                     # Global filters for handling HTTP exceptions
│   │   │   │   └── http-exception.filter.ts
│   │   │   ├── middleware                  # Global HTTP middleware (e.g., security, compression)
│   │   │   │   ├── compression.middleware.ts
│   │   │   │   └── helmet.middleware.ts
│   │   │   ├── public                      # Public static assets
│   │   │   │   ├── favicon.ico     
│   │   │   │   └── favicon.webp
│   │   │   └── views                       # View templates for rendering HTML (if applicable)
│   │   │       └── metadata.hbs
│   │   ├── ioc                             # Inversion of Control (dependency injection modules)
│   │   │   ├── app.module.ts               # Main NestJS application module
│   │   │   └── infrastructure.module.ts    # Infrastructure-specific providers and bindings
│   │   └── logger                          # Structured logging using Pino, compatible with Cloud Logging
│   │       ├── gcp.logger.ts               # Logger configuration for GCP
│   │       ├── index.ts                    # Logger entry point
│   │       └── request.logger.ts           # Middleware or interceptor for per-request logging
│   │   ├── messaging/                      # Pub/Sub, Kafka, or other message brokers integration
│   │   ├── security/                       # Authentication, authorization strategies and utilities
│   │   ├── storage/                        # File storage (local, GCS, S3, etc.)
│   │   ├── cqrs/                           # CQRS handlers for command and query logic
│   │   ├── commands/                       # Command handlers (create, update, delete operations)
│   │   └── queries/                        # Query handlers (read-only operations)
│   └── main.ts                             # Application entry point (starts the NestJS app)
├── test                                    # End-to-end or integration tests
│   └── app.e2e-spec.ts                     # Basic E2E test for application startup
├── .dockerignore                           # Files and folders to ignore during Docker image build
├── .eslintrc.js                            # ESLint config for code quality and style
├── .gcloudignore                           # Files to exclude during Google Cloud deployment
├── .gitignore                              # Git ignored files
├── .prettierrc                             # Prettier configuration for code formatting
├── Dockerfile                              # Docker build configuration for Cloud Run
├── LICENSE                                 # Project license
└── README.md                               # Project documentation (you are here!)
```

---

### 💡 Layer Responsibilities

- **`domain/`**: Pure business logic. No framework or infrastructure-specific code. Should be reusable and testable in isolation.
- **`application/`**: Application workflows (use cases). Coordinates domain logic and maps inputs/outputs.
- **`infrastructure/`**: Implements contracts from domain, handles external services (HTTP, DB, logging, etc.).
