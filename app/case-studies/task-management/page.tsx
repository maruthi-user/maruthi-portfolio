import type { Metadata } from "next";
import CaseStudy from "@/components/CaseStudy";
import InfoGrid from "@/components/InfoGrid";
import TaskWorkflowMock from "@/components/TaskWorkflowMock";

export const metadata: Metadata = {
  title: "Task Management case study | Maruthi Yenumula",
  description: "A full-stack task module with a role-aware review workflow, six views and server-enforced permissions.",
};

export default function TaskManagementCaseStudy() {
  return (
    <CaseStudy
      title="Task Management"
      subtitle="A task and review module inside the HRMS, built end to end: Spring Boot API and React interface."
      meta={[
        { label: "My role", value: "Software Developer Intern / Trainee" },
        { label: "Period", value: "Feb 2026 – Present" },
        { label: "Scope", value: "Backend and frontend, built full stack" },
        { label: "Users", value: "Six roles, from employee to super admin" },
      ]}
      problem="Teams track recurring and ad-hoc work against clients, and every piece of work has to be done, reviewed and approved by different people. The module has to show each person only their own part of that picture, stop anyone from skipping a step, and still be quick enough to use all day."
      myPart={[
        "Designed the task lifecycle as a state machine: Defined, In Progress, Executed, Reviewed, Re-submitted, Approved.",
        "Built the REST API in Spring Boot: filtered and paged task queries, status changes, activity notes, duplicate, recurring tasks, board, workload, Excel export and a Main Task / Sub Task catalogue.",
        "Wrote the role and ownership rules once on the server and mirrored them in the React app, so the UI offers only the moves the API will accept.",
        "Built the interface: Summary dashboard, editable List, drag-and-drop Board, Calendar, Gantt, Workload and a Master Data tab, with a mobile card layout.",
        "Added task reports to the reporting engine and later extended the module as users asked: role-specific dashboards, a team-lead card, inline editing and an edit-activity API.",
      ]}
      hardParts={[
        { title: "Permissions that depend on the relationship", text: "Whether you may edit, comment or move a task depends on your role and on how you relate to the task: assignee, reviewer, approver, or the lead or approver of the assignee. That relationship comes from the company's reporting hierarchy, so the check runs on live data for each request." },
        { title: "Field-level rules on a whole-record save", text: "The client sends the full task on every save, so the server compares each field with its stored value and asks for permission only for fields that really changed. If any changed field is off limits, the whole save is refused instead of silently dropping part of what was typed." },
        { title: "One rule set, two places", text: "The server class is the authority. The React app keeps a mirror of it, so menus, buttons and locked fields match what the API will accept, and a rule change is made in both places with the same wording." },
        { title: "Six views over one data layer", text: "A single hook fetches only what the open view needs: a paged feed for List, per-status columns for Board, date windows for Calendar and Gantt, and aggregate counts for Workload. Switching tabs resets filters so a view never inherits another view's state." },
        { title: "A board that does not jump around", text: "Each Board column loads in pages using a cursor on the last-updated time and id, newest first. Touching a task moves it to the top of its column, and dropping a card in the same column brings it up without logging a status change that did not happen." },
        { title: "Export equals what you see", text: "List, export and Workload build their filters from one specification, and the overdue rule lives in one place, so a number on a card and the rows behind it can never disagree." },
      ]}
      sections={[
        {
          title: "How it is built",
          intro: "Around thirty REST endpoints on the backend feed a React module with its own hooks, utilities and views.",
          node: (
            <InfoGrid
              cols={3}
              items={[
                { tag: "API", title: "Spring Boot REST", text: "Task, task-master and per-user task controllers with validated request DTOs, paged responses and consistent errors. Status moves use their own PATCH endpoint so they can go through one gate." },
                { tag: "Queries", title: "JPA Specifications", text: "Filters (search, status, assignee, reviewer, approver, client, dates, overdue) are composed as dynamic specifications, with indexes on status and on assignee plus status for the common lookups." },
                { tag: "Security", title: "Permissions and ownership", text: "Spring Security permissions (view, create, edit, delete, manage master data) guard the endpoints. A dedicated authorization class then decides what each user may do with each task." },
                { tag: "Data", title: "Tasks, notes and a catalogue", text: "A task carries client, main task, sub task, priority, dates and the people involved. Every status change and note is written to an activity log, and a Main Task / Sub Task catalogue replaces a spreadsheet of mappings." },
                { tag: "Recurring", title: "Series of tasks", text: "A recurring task expands into a series (daily up to yearly) with date checks and a hard cap on the number of occurrences, so a bad date cannot create thousands of rows." },
                { tag: "Frontend", title: "Views and inline editing", text: "A virtualised List with inline cell editors, a Board with smooth drag and drop, a Calendar, a Gantt, Workload cards and a detail panel with a rich-text editor. Tab order and default view are saved per user." },
              ]}
            />
          ),
        },
        {
          title: "Roles and what each can see",
          intro: "The List asks the API for the scope its role allows, and the server applies the same scope again, so the data is limited at the source.",
          node: (
            <InfoGrid
              cols={3}
              items={[
                { tag: "Employee", title: "Their own tasks", text: "Can create tasks only for themselves, move them through Defined, In Progress and Executed, and add notes while the task is still in their hands. No Master Data tab." },
                { tag: "Lead and Approver", title: "Own plus team", text: "See their own tasks and those of the people who report to them, or where they are named reviewer or approver. Leads review but never approve; approvers can approve or send work back." },
                { tag: "HR", title: "Manager of their own team", text: "Works the review flow for the people they lead or approve, not the whole company. Seeing every record is left to admins." },
                { tag: "Admin and Super Admin", title: "Whole organisation", text: "Can see every task and make any move the workflow allows. They still cannot undo an approval or step outside the lifecycle." },
                { tag: "Reviewer and approver pickers", title: "Only eligible people", text: "Reviewers are chosen from leads, approvers and admins; approvers from approvers and admins. A lead is deliberately excluded from being the approver of record." },
                { tag: "Master Data", title: "Everyone but employees", text: "Managing the shared Main Task and Sub Task catalogue needs its own permission, which employees do not hold." },
              ]}
            />
          ),
        },
      ]}
      mockTitle="Try the workflow rules"
      mockNote="An illustrative mock-up I built for this page. It re-implements the module's status rules with sample choices; it is not a screen from the client's system."
      stack={["Java 17", "Spring Boot", "Spring Security", "Spring Data JPA", "JPA Specifications", "Bean Validation", "React 19", "RTK Query", "Tailwind CSS", "Radix UI", "Recharts"]}
      learned="Putting the workflow into a single table of 'from status, to status, who' made everything else simpler: the API gate and the menus both read from the same idea. The part I would do earlier next time is writing the permission cases as a grid before coding, because the edge cases (rework, dual roles, approved records) only show up when you list every role against every status."
    >
      <TaskWorkflowMock />
    </CaseStudy>
  );
}
