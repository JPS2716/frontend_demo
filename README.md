# ResourceX - University Resource Allocation

![ResourceX](assets/images/hero_dashboard_v2.png)

ResourceX is a unified university management platform designed to orchestrate campus operations, providing dynamic oversight over academic departments, faculty, staff, and institutional assets with incredible precision.

## 🚀 Progress Till Date

We have established the core front-end framework and structure of the application. The following milestones have been achieved:

- **Project Initialization**: Defined the foundational project structure consisting of `assets`, `css`, `js`, and `pages`.
- **Responsive Landing Page**: Built an engaging and modern landing page (`index.html`) highlighting key university-centric features like Department Orchestration, Role-Based Intelligence, and Asset Lifecycle Management.
- **Authentication Interface**: Created the Login UI (`login.html`) to facilitate accessing various modules.
- **Role-Based Dashboards**: Developed specialized HTML templates for all key university roles:
  - **Admin Dashboard** (`admin.html`): Top-level oversight and system management.
  - **Department Head Dashboard** (`department_head.html`): Tools for managing department budgets, overview, and request approvals.
  - **Registrar Dashboard** (`registrar.html`): Procurement and system expansion mechanisms.
  - **Requestor Dashboard** (`requestor.html`): Faculty/staff-facing dashboard for submitting and tracking resource requests.
  - **Staff Dashboard** (`staff.html`): Tools for tracking tickets, active ground work, and maintenance reporting.
  - **Profile Management** (`profile.html`): User preference and profile configurations.
- **Styling Architecture**: Formulated component-based CSS strategies (`layout.css`, `card.css`, `button.css`, `main.css`).

## 🔮 Future Progress & Implementation Plan

Moving forward, the primary focus transitions from static UI creation to backend integration, dynamic capabilities, and deployment.

1. **Backend Integration**: 
   - Construct robust APIs (Node.js/Express or similar) to replace static content.
   - Establish a centralized relational database (e.g., PostgreSQL) for tracking inventory, user profiles, departments, and procurement records.

2. **Authentication & Security**:
   - Implement real secure login flows (JWT/Sessions) mapped to actual user authorities.
   - Route guarding to ensure roles like Requestors cannot access Admin or Department Head metrics.

3. **Core Feature Logic Construction**:
   - **Request Lifecycle**: Hook up the request workflow so faculty or staff can make a request and the assigned Department Head receives a real-time notification to approve/deny.
   - **Budget Operations**: Develop logics to deduct department budgets automatically when requests are approved.
   - **Ticket Management**: Allow dynamically generated tickets for the physical staff based on maintenance requests.

4. **UI/UX Polish**:
   - Introduce modern frameworks (like React or Vue.js) if required for more fluid SPA capabilities.
   - Integrate toast notifications, loading skeletons, and interactive charts for metrics.
   - Implement proper responsive logic across all dashboard table views.

## 🛠 Features

- **Top-Down Visibility**: Instant visualization of operational capacity limits uniquely filtered per manager.
- **Budget Allocation**: Automated restrictions and financial oversight across active branches.
- **Live Inventory Indexing**: Instantly search hundreds of assets globally.
- **Predictive Maintenance Ticketing**: Swiftly triage ground-level repair logic directly to Staff.

---

*© 2024 ResourceX University System. All rights reserved.*
