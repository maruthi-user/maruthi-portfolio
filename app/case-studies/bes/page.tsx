import type { Metadata } from "next";
import CaseStudy from "@/components/CaseStudy";
import BesMock from "@/components/BesMock";

export const metadata: Metadata = {
  title: "BES case study | Maruthi Yenumula",
  description: "Service-wise budget estimation and payment tracking for a retail manufacturer.",
};

export default function BesCaseStudy() {
  return (
    <CaseStudy
      title="Budget Estimation System"
      subtitle="Service-wise budget estimates and payment tracking for a retail manufacturer client."
      meta={[
        { label: "My role", value: "Software Developer Intern / Trainee" },
        { label: "Period", value: "Feb 2026 – Present" },
        { label: "Focus", value: "React frontend and API integration" },
        { label: "Client", value: "Retail manufacturer" },
      ]}
      problem="Each kind of service is estimated with different inputs, and the client also needs to follow what has been paid against each estimate. One fixed form cannot cover every service type."
      myPart={[
        "Built responsive React screens for service-wise budget estimation and payment tracking.",
        "Created dynamic forms whose fields and sections change with the selected service type.",
        "Integrated the screens with the existing REST APIs to fetch, submit and refresh estimate and payment data.",
        "Added reusable components, client-side validation and loading, success and error states.",
      ]}
      hardParts={[
        { title: "Forms that change shape", text: "Different services need different fields, so the form is driven by the selected service type. In the mock-up below each service is described as data and the form is rendered from it." },
        { title: "Keeping data current", text: "The screens retrieve, submit and refresh estimate and payment data through the existing REST APIs." },
        { title: "Clear states", text: "Every request has a visible loading, success and error state, so users know whether their action worked." },
        { title: "Working in parallel", text: "I worked on this at the same time as the HRMS project, in the same sprints." },
      ]}
      mockTitle="Try the dynamic estimate form"
      stack={["React.js", "Tailwind CSS", "Swagger REST APIs"]}
      learned="Dynamic forms are easier to extend when each variant is described as data instead of hard-coded markup, and validation stays consistent when the rules live next to the field definitions."
    >
      <BesMock />
    </CaseStudy>
  );
}
