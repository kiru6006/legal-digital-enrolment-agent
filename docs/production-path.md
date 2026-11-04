# AEMS Production Seam & Migration Path

This architectural document defines the technical strategy for replacing the browser-only prototype with the production **FastAPI + PostgreSQL + Temporal** backend without requiring redesign of the frontend user interface.

---

## 1. Architectural Seam Strategy

The frontend application is structured around clean domain interfaces and services. In production, mock repository implementations and `localStorage` persistence are substituted with authenticated REST and WebSocket adapters.

```
                    ┌────────────────────────────┐
                    │    React UI Components     │
                    │ (Pages, Tables, Dashboards)│
                    └─────────────┬──────────────┘
                                  │
                    ┌─────────────▼──────────────┐
                    │      Service Layer         │
                    │ (Workflow, Audit, Notifs)  │
                    └─────────────┬──────────────┘
                                  │
       ┌──────────────────────────┴──────────────────────────┐
       │                                                     │
┌──────▼─────────────────────┐              ┌────────────────▼───────────────┐
│     Prototype Mock Seam    │              │    Production REST Seam        │
│ • mockApplications.ts      │              │ • FastAPI Client (/api/v1/...) │
│ • in-memory store          │  ═════════►  │ • OAuth2 / OIDC Token Intercept│
│ • localStorage persistence │              │ • Server-Sent Events (SSE)     │
│ • simulated AI service     │              │ • Enterprise OCR & LLM Gateway │
└────────────────────────────┘              └────────────────┬───────────────┘
                                                             │
                                            ┌────────────────▼───────────────┐
                                            │   PostgreSQL + Temporal BPMN   │
                                            └────────────────────────────────┘
```

---

## 2. API Interface Contracts

### 2.1 Applications (`/api/v1/applications`)
- `GET /api/v1/applications`: Filter by `stage`, `priority`, `assignedOfficerId`, `search`, with cursor-based pagination.
- `GET /api/v1/applications/{id}`: Returns complete application dossier including documents, verification checklist, deficiencies, and audit events.
- `POST /api/v1/applications`: Submits a new application docket from candidate portal.
- `PATCH /api/v1/applications/{id}/transition`: Executes a state machine transition with role and reason enforcement.

### 2.2 Deficiencies (`/api/v1/deficiencies`)
- `POST /api/v1/applications/{id}/deficiencies`: Issues an official statutory deficiency notice.
- `POST /api/v1/applications/{id}/deficiencies/{defId}/rectify`: Uploads candidate rectification file with multipart form data.
- `PATCH /api/v1/applications/{id}/deficiencies/{defId}/resolve`: Marks deficiency resolved following officer re-review.

### 2.3 Immutable Audit Trail (`/api/v1/audit`)
- `GET /api/v1/audit`: Returns append-only system audit stream with cryptographic signatures.
- `POST /api/v1/audit`: Internal endpoint invoked by Temporal workflow engine on each state transition.

---

## 3. Production Infrastructure Components

| Subsystem | Prototype Implementation | Production Target Implementation |
|---|---|---|
| **Backend Runtime** | Browser client-side TypeScript | Python 3.11+ / FastAPI with Pydantic v2 data models |
| **Database** | In-browser memory + `localStorage` | PostgreSQL 16 with Row-Level Security (RLS) and JSONB schemas |
| **Workflow Engine** | Pure transition function table | **Temporal.io** or BPMN 2.0 workflow orchestrator with durable timers and SLAs |
| **Identity & Access** | Demo Role Switcher dropdown | OIDC / SAML 2.0 Identity Provider (e.g. Keycloak / Google Workspace) with mandatory TOTP MFA for officials |
| **Document Storage** | Simulated mock file metadata | S3 / GCS private bucket with pre-signed URLs, KMS encryption, and ClamAV antivirus quarantine pipeline |
| **AI Extraction & OCR** | Deterministic simulation (`aiDemoService.ts`) | Self-hosted Tesseract / AWS Textract OCR paired with enterprise Claude / Gemini models on private VPC endpoints |
| **Audit Log Store** | Appended state array | Write-once-read-many (WORM) durable audit table with periodic cryptographic hash chain anchoring |
| **Notifications** | In-app drawer simulation | Celery / RabbitMQ workers driving multi-channel delivery via Twilio SMS, SendGrid Email, and WebPush |
