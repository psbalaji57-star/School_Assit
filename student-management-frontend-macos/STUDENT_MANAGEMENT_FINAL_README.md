# Student Management System

This project includes:

- `backend-springboot/` — Java Spring Boot 3 REST API with JPA, file-based H2, validation, CORS, H2 Console, seeded data, and the complete student-management API.
- `artifacts/student-management/` — React + Vite admin dashboard with student, attendance, performance, leave, class, settings, and Excel report workflows.

## Run the Spring Boot backend locally

Requirements: Java 17+ and Maven 3.9+ (Java 21 is recommended).

```bash
cd backend-springboot
mvn spring-boot:run
```

The backend binds to `0.0.0.0` and is available at:

- API: `http://localhost:8080/api`
- Health: `http://localhost:8080/api/healthz`
- H2 Console: `http://localhost:8080/h2-console`

The H2 JDBC URL is:

```text
jdbc:h2:file:./data/student-management
```

## Run the React UI locally

In another terminal from the project root:

```bash
cp artifacts/student-management/.env.example artifacts/student-management/.env
pnpm install
pnpm --filter @workspace/student-management run dev
```

Open `http://localhost:5173`.

The `.env.example` points the generated API client at the Spring Boot server:

```text
VITE_API_BASE_URL=http://localhost:8080
```

No public domain or DNS mapping is required for local runs. The UI uses the local
Spring Boot host directly, and the backend allows CORS from localhost and 127.0.0.1.

## Build checks

```bash
cd backend-springboot && mvn -DskipTests package
cd ../..
pnpm --filter @workspace/student-management run typecheck
```