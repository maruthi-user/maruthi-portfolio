import type { Metadata } from "next";
import CaseStudy from "@/components/CaseStudy";
import HrmsMock from "@/components/HrmsMock";

export const metadata: Metadata = {
  title: "HRMS case study | Maruthi Yenumula",
  description: "Role-based leave, attendance and advances workflows with multi-stage approvals.",
};

export default function HrmsCaseStudy() {
  return (
    <CaseStudy
      title="HRMS"
      subtitle="A role-based Human Resource Management System for First Partner Consulting."
      meta={[
        { label: "My role", value: "Software Developer Intern / Trainee" },
        { label: "Period", value: "Feb 2026 – Present" },
        { label: "Focus", value: "Frontend workflows and API integration" },
        { label: "Modules", value: "Leave, Attendance, Employee Advances" },
      ]}
      problem="Leave, attendance and advance requests need to move through several approvers, and each person should only see the records that belong to their role. The screens have to stay in step with the backend status at every stage."
      myPart={[
        "Built the Leave Management screens: apply for leave, leave history and comp-off balance.",
        "Built Attendance records and Employee Advance request screens.",
        "Implemented multi-stage approval states and role-scoped views for employee, manager and administrator.",
        "Integrated Spring Boot REST APIs using their Swagger/OpenAPI contracts, with validation and live status updates.",
      ]}
      hardParts={[
        { title: "Role-scoped visibility", text: "The same screens show different records and actions depending on who is signed in: employee, manager or administrator. The mock-up below shows the idea." },
        { title: "Multi-stage approvals", text: "A request moves through several approval stages before reaching a final state. The screens reflect the status returned by the backend and update as it changes." },
        { title: "Keeping forms and payloads aligned", text: "I used the Swagger/OpenAPI contracts together with reusable React components so that frontend forms and backend payloads stay aligned." },
        { title: "Working in parallel", text: "I worked on this at the same time as a second client project (BES), in the same sprints." },
      ]}
      mockTitle="Try the role-scoped view"
      stack={["React.js", "Next.js", "Tailwind CSS", "Spring Boot REST APIs", "Swagger / OpenAPI"]}
      learned="Approval workflows look simple until you list every state and every role. Writing the states down first, then building the UI from that table, saved me a lot of rework. I also learned to read API contracts carefully before building a form."
    >
      <HrmsMock />
    </CaseStudy>
  );
}
