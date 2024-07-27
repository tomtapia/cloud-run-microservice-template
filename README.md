# Cloud Run Microservice Template

[![Build Status](https:\/\/img.shields.io\/github\/actions\/workflow\/status\/tomtapia\/cloud-run-microservice-template\/cloud-run-deployer.yml)](https:\/\/github.com\/tomtapia\/cloud-run-microservice-template\/actions)
[![License](https:\/\/img.shields.io\/github\/license\/tomtapia\/cloud-run-microservice-template)](https:\/\/github.com\/tomtapia\/cloud-run-microservice-template\/blob\/main\/LICENSE)

## Microservice Template for GCP Cloud Run

This project is a template for creating microservices on Google Cloud Platform's Cloud Run using the NestJS framework. It leverages the powerful features of NestJS for building efficient, reliable, and scalable server-side applications while providing a structured logging mechanism with Pino.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)
- [Project Directory Structure](#project-directory-structure)

## Features

- **NestJS**: Progressive Node.js framework for building efficient and scalable server-side applications.
- **Structured Logging**: JSON formatted logger using Pino, parsable by Cloud Logging, with automatic correlation of container logs to a request log.
- **Cloud Run**: Serverless containerized applications that automatically scale.
- **Environment Configuration**: All external variables are loaded at the start of the project through the `.env` file.

## Prerequisites

* Enable the Cloud Run API via the [console](https:\/\/console.cloud.google.com\/apis\/library\/run.googleapis.com) or CLI:

  ```bash
  gcloud services enable run.googleapis.com
  ```

* Create a `.env` file in your local with the minimal parameters.
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

#### Development Mode

```bash
npm run start
```

#### Watch Mode

```bash
npm run start:dev
```

#### Production Mode

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

## Project Directory Structure

```bash
├── src
│   ├── infrastructure
│   │   ├── env
│   │   │   └── index.ts
│   │   ├── http
│   │   │   └── controllers
│   │   │       └── home.controller.ts
│   │   ├── ioc
│   │   │   ├── app.module.ts
│   │   │   └── infrastructure.module.ts
│   │   └── logger
│   │       ├── gcp.logger.ts
│   │       ├── index.ts
│   │       └── request.logger.ts
│   └── main.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── .dockerignore
├── .eslintrc.js
├── .gcloudignore
├── .gitignore
├── .prettierrc
├── Dockerfile
├── LICENSE
├── README.md
├── nest-cli.json
├── package-lock.json
├── package.json
├── tsconfig.build.json
└── tsconfig.json
```
