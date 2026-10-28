import type { Metadata } from "next";
import CaseStudy from "@/components/CaseStudy";
import HrmsMock from "@/components/HrmsMock";
import InfoGrid from "@/components/InfoGrid";
import RoleAccessMock from "@/components/RoleAccessMock";

export const metadata: Metadata = {
  title: "HRMS case study | Maruthi Yenumula",
  description: "A role-based HRMS: leave, attendance, advances, claims and approvals, with permissions that shape every screen.",
};

export default function HrmsCaseStudy() {
  return (
    <CaseStudy
      title="HRMS"
      subtitle="A role-based Human Resource Management System for First Partner Consulting."
      meta={[
        { label: "My role", value: "Software Developer Intern / Trainee" },
        { label: "Period", value: "Feb 2026 – Present" },
        { label: "Focus", value: "Frontend, API integration, role-based UI" },
        { label: "Also", value: "Task Management, built full stack (separate case study)" },
      ]}
      problem="One company, six kinds of user. An employee applies for leave, a team lead approves it, HR looks across the company and an admin sees everything. Leave, attendance, advances and claims each move through approval states, and every person should see only the records and buttons that belong to their role, with the screens always in step with the status the backend holds."
      myPart={[
        "Built the React screens for Leave and Comp-off (apply, history, balance, holidays, policy), Attendance (check-in / check-out and approvals), Employee Advances, Claims, Daily Status Reports and the HR dashboard.",
        "Implemented the role-based UI for six roles: a permission map decides which apps, sidebar modules, tabs and actions each user gets.",
        "Built Pending Approval queues with live count badges and My / Team / All views that match the data scope the API returns.",
        "Integrated the Spring Boot REST APIs through RTK Query, using their Swagger / OpenAPI contracts, with validation, loading and error states.",
        "Built the shared pieces: data table with column reorder and saved layouts, generic filters, pagination, Excel export, login and forgot-password screens, and the password-change tab in the profile.",
        "Also worked with the team on Users, Onboarding and Reports. Task Management was my own full-stack module.",
      ]}
      hardParts={[
        { title: "Four layers of role-based UI", text: "Access is decided at the app launcher (the HR app is locked to HR and admins, CRM needs a separate flag), the sidebar (modules filtered by role and permission), the tabs and buttons inside each module, and the data itself (the screen sends a scope with each request, such as ALL for admins and a role-based scope for everyone else, and the API returns only what that role may see)." },
        { title: "Approval queues that stay honest", text: "Each Pending Approval tab shows a live count, fetched with a one-row query that reads the total from the paged response. Dashboard cards deep-link into a module with filters in the URL, and those links are honoured only if the signed-in role may open that tab." },
        { title: "One table for every module", text: "Leave, attendance, advances, claims and DSR all use the same data table and generic filter, configured per module with column and filter config files. Users can reorder columns and the layout is saved for them, so a new module is mostly configuration." },
        { title: "Exports and rate limits", text: "Exports are queue-based and capped on the server. The download endpoints return a file, so an error also arrives as a file; I turn that back into JSON so a toast can show the server's real message, such as the \"try again after 5 minutes\" limit." },
        { title: "Sessions that fail cleanly", text: "When the JWT expires or the API returns 401, the app clears the session, shows a session-expired modal and sends the user to the login page for the right app. Public pages such as activate-account and reset-password are never interrupted by a stale token." },
        { title: "Working in a shared codebase", text: "The repository has several developers and a backend team moving at the same time, so I leaned on the Swagger contracts, shared components and small, focused commits to keep the frontend and API aligned." },
      ]}
      sections={[
        {
          title: "How the app is put together",
          intro: "A Vite + React 19 single-page app with a Spring Boot API behind it. Everything below the shell is lazy-loaded, so a user only downloads the modules they open.",
          node: (
            <InfoGrid
              cols={3}
              items={[
                { tag: "Shell", title: "Launcher, sidebar and top bar", text: "An app launcher (HRMS, Human Resources, CRM and three external apps) feeds a sidebar built from one config file, so adding a module is a config change. The layout is responsive and has a dark mode." },
                { tag: "Routing", title: "Public and signed-in routers", text: "Login, register, activate-account and password reset live in a public router; everything under /app sits inside the shell. Every page is a lazy route with its own loading state." },
                { tag: "Data", title: "Redux Toolkit and RTK Query", text: "One API slice with a shared base query that adds the bearer token, handles 401 and 429, and unwraps file-download errors. Each module has its own endpoints file (leave, advances, claims, attendance, tasks and more)." },
                { tag: "Modules", title: "Feature folders", text: "Each module follows the same shape: a page with tabs, feature components per tab, table components, and a shared folder for columns, filter config and constants." },
                { tag: "UI kit", title: "Radix primitives with Tailwind", text: "Dialogs, selects, popovers, tooltips and toasts come from Radix UI wrapped in a small component library, so behaviour and accessibility are consistent across screens." },
                { tag: "Guards", title: "Global safety nets", text: "A missed-checkout popup, a session watcher and a processing overlay that blocks the page while a submit, approval or export is in flight, so nothing is sent twice." },
              ]}
            />
          ),
        },
        {
          title: "Roles, permissions and what each person sees",
          intro: "Six roles come back from the API after login. A permission map lists what each can do, and the UI reads it to show or hide apps, modules, tabs and buttons. Pick a role to see the same app reshape itself.",
          node: <RoleAccessMock />,
        },
      ]}
      mockTitle="Follow a request through its statuses"
      mockNote="An illustrative mock-up I built for this page. The status names are the ones the system uses; there is no real employee data."
      stack={["React 19", "Vite", "Redux Toolkit / RTK Query", "Tailwind CSS", "Radix UI", "react-hook-form", "Recharts", "Spring Boot REST APIs", "Swagger / OpenAPI"]}
      learned="Approval workflows look simple until you list every state and every role. Writing the statuses and the permission table down first, then building the screens from that table, saved me a lot of rework. I also learned that hiding a button is only the UI half of security: the server has to say no too."
    >
      <HrmsMock />
    </CaseStudy>
  );
}
