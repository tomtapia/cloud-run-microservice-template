This project is a microservice template built with **TypeScript** and the **NestJS** framework. The project follows a **Clean Architecture** pattern, organized into the following layers: `domain`, `application`, and `infrastructure`.

The microservice follows **The Twelve-Factor App** principles:
- Configuration is managed via a `.env` file, and no secrets or environment-specific values are hard-coded.
- Code should be portable and suitable for deployment in cloud environments.
- The project should support easy scaling, minimal differences between environments, and be easy for new developers to onboard.

The service runs on **Cloud Run**, so it must remain stateless, serverless, and cloud-agnostic.

We use **structured logging** with **Pino** in JSON format, which is compatible with **Google Cloud Logging**. Logs should automatically correlate request logs and container logs for traceability.

Please ensure that any updates to the code:
- Follow Clean Architecture principles.
- Use TypeScript and NestJS (especially in the `infrastructure` layer).
- Respect environment configuration and use `.env` for all external variables.
- Maintain structured logging with Pino, properly integrated with Cloud Logging.
- Preserve separation of concerns between `domain`, `application`, and `infrastructure`.
