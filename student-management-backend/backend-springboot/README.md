# Student Management System — Spring Boot backend

This folder is a standalone Java 21 / Spring Boot 3 backend for the React interface in
`artifacts/student-management`.

## Local run

Requirements:

- Java 17+ (Java 21 recommended)
- Maven 3.9+

From this folder:

```bash
mvn spring-boot:run
```

The API binds to `0.0.0.0` and is available locally at:

- API: http://localhost:8080/api
- Health: http://localhost:8080/api/healthz
- H2 console: http://localhost:8080/h2-console

H2 console connection values:

```text
JDBC URL: jdbc:h2:file:./data/student-management
User: sa
Password:
```

The database is file-based and is created under `backend-springboot/data/`, so records
survive application restarts.

## React local API routing

The generated React client uses `/api/...` paths. When running the React app with Vite,
point those requests at the local Spring Boot API using the client base URL:

```ts
import { setBaseUrl } from "@workspace/api-client-react";
setBaseUrl("http://localhost:8080");
```

In a browser-only local setup, this is the only host mapping required; no public domain
or DNS route is needed. The backend allows CORS from `localhost` and `127.0.0.1` ports.