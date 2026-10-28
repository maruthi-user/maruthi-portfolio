// All portfolio content lives here. Edit this file to update the site.

export const profile = {
  name: "Maruthi Yenumula",
  role: "Java Full Stack Developer",
  location: "Hyderabad, India",
  email: "maruthiy310@gmail.com",
  github: "https://github.com/maruthi-user",
  linkedin: "https://www.linkedin.com/in/maruthi-y-5512a4423",
  // Put the updated resume PDF in /public and set e.g. "/Maruthi_Yenumula_Resume.pdf".
  // While this is null the "Download resume" buttons are hidden.
  resumeUrl: "/Maruthi_Yenumula_Resume.pdf" as string | null,
  tagline:
    "I build role-based web apps with Java, Spring Boot and React: clean APIs, careful validation and interfaces people can actually use.",
  about: [
    "I'm an MCA graduate (2025) who has spent the last 8+ months as an intern at First Partner Consulting, working on two client-facing systems at the same time: an HRMS and a Budget Estimation System.",
    "Outside work I build my own products end to end: a farmer-to-customer marketplace with OTP login, a Telugu audio-first health app for villages, and a small animation study. I like projects where the user is not a developer.",
  ],
};

export const stats = [
  { value: "8+", label: "months of real client work" },
  { value: "2", label: "client systems in parallel" },
  { value: "3", label: "personal projects shipped" },
];

export const experience = {
  company: "First Partner Consulting",
  role: "Software Developer Intern / Trainee",
  location: "Hyderabad, India",
  period: "Feb 2026 – Present",
  duration: "8+ months",
  summary:
    "Working on client-facing systems since 26 Feb 2026, in Agile sprints with backend, QA and product teams: the company HRMS (frontend and API integration, plus the Task Management module end to end) and a Budget Estimation System.",
  projects: [
    {
      slug: "hrms",
      name: "HRMS",
      subtitle: "Human Resource Management System · frontend and API integration",
      href: "/case-studies/hrms",
      stack: ["React 19", "Vite", "Redux Toolkit / RTK Query", "Tailwind CSS", "Radix UI", "Spring Boot REST APIs", "Swagger / OpenAPI"],
      bullets: [
        "Built the React screens for Leave and Comp-off, Attendance, Employee Advances, Claims, Daily Status Reports and the HR dashboard, integrated with the Spring Boot REST APIs, and contributed to Users, Onboarding and Reports.",
        "Implemented role-based UI for six roles (Employee, Lead, Approver, HR, Admin, Super Admin): a permission map decides which apps, sidebar modules, tabs and actions each person sees.",
        "Built the approval flows on the client: Pending Approval queues with live count badges, and scoped views (My / Team / All) that match the data scope the backend returns.",
        "Shared building blocks: a reusable data table with column reordering and saved layouts, a generic filter component, server-side pagination, Excel export with error handling, and a processing lock that blocks double submits.",
        "Handled the session end to end: JWT login, automatic logout and a session-expired modal when the token expires or the API returns 401.",
      ],
    },
    {
      slug: "task-management",
      name: "Task Management",
      subtitle: "Module inside the HRMS · backend and frontend",
      href: "/case-studies/task-management",
      stack: ["Java 17", "Spring Boot", "Spring Security", "Spring Data JPA", "Specifications", "React 19", "RTK Query", "Tailwind CSS"],
      bullets: [
        "Built both sides of the module: REST APIs and role rules in Spring Boot, and six views in React (Summary, List, Board, Calendar, Gantt, Workload) plus a Master Data tab.",
        "Designed the task lifecycle (Defined, In Progress, Executed, Reviewed, Re-submitted, Approved) as a state machine, enforced on the server and mirrored in the UI so buttons never offer a move the API would refuse.",
        "Wrote the role and ownership rules once in a server-side authorization class: who can see, edit, comment on and move a task depends on role, assignee, reviewer, approver and the reporting hierarchy.",
        "Added recurring tasks, an activity log per task, duplicate, Excel export and task reports in the reporting engine, with dynamic JPA Specifications and paginated queries for the Board columns.",
      ],
    },
    {
      slug: "bes",
      name: "BES",
      subtitle: "Budget Estimation System · client: a retail manufacturer",
      href: "/case-studies/bes",
      stack: ["React.js", "Tailwind CSS", "Swagger REST APIs"],
      bullets: [
        "Built responsive React screens for service-wise budget estimation and payment tracking.",
        "Created dynamic forms that change their fields and sections based on the selected service type.",
        "Integrated the screens with existing REST APIs to fetch, submit and refresh estimate and payment data.",
        "Built reusable components, client-side validation and clear loading, success and error states.",
      ],
    },
  ],
};

export type Shot = {
  src: string;
  w: number;
  h: number;
  caption: string;
};

export type Project = {
  slug: string;
  name: string;
  tag: string;
  year: string;
  pitch: string;
  why: string;
  highlights: string[];
  status: string;
  stack: string[];
  repo: string;
  live: string | null;
  shots: Shot[];
  animated?: boolean;
  phone?: boolean;
};

export const projects: Project[] = [
  {
    slug: "f2home",
    name: "F2Home",
    tag: "Full stack · Flagship",
    year: "2026",
    pitch:
      "A farmer-to-customer marketplace where farmers list produce, customers buy directly, and an admin approves new farmers.",
    why: "Local farmers lose a large share of the price to middlemen. I wanted a simple marketplace that works for farmers with only a phone number.",
    highlights: [
      "Phone number + OTP login with JWT access/refresh tokens, a custom Spring Security filter chain and Bucket4j rate limiting on OTP endpoints.",
      "Separate experiences for farmers, customers and admins: marketplace, cart with minimum-order rules, order requests, My Farm sales dashboard and delivery radius settings.",
      "Perishables (vegetables and fruits) auto-expire after 48 hours, so stale listings never reach customers.",
      "PostgreSQL schema under Flyway migrations, springdoc OpenAPI docs, JUnit tests, Actuator health checks, Spring profiles and GitHub Actions CI.",
      "Dockerised API served together with the built React app from one deploy. Dark mode included.",
    ],
    status:
      "Auth and user backend run on Spring Boot and PostgreSQL. Marketplace, cart and order data currently live client-side (IndexedDB); moving them onto the API is the next step.",
    stack: [
      "Java 17",
      "Spring Boot",
      "Spring Security",
      "JPA",
      "PostgreSQL",
      "Flyway",
      "React 19",
      "Redux Toolkit",
      "RTK Query",
      "Vite",
      "Docker",
      "GitHub Actions",
    ],
    repo: "https://github.com/maruthi-user/F2Home",
    live: null,
    shots: [
      { src: "/projects/f2home/signup.webp", w: 1600, h: 797, caption: "Sign-up: phone number, role choice, then OTP verification" },
      { src: "/projects/f2home/marketplace.webp", w: 1600, h: 799, caption: "Marketplace with category filters and live counts" },
      { src: "/projects/f2home/cart.webp", w: 1600, h: 801, caption: "Customer cart with minimum items and minimum value rules" },
      { src: "/projects/f2home/farmer-marketplace.webp", w: 1600, h: 795, caption: "Farmer view of their own live listings" },
      { src: "/projects/f2home/farmer-orders.webp", w: 1600, h: 799, caption: "Farmer order requests: accept or reject (dark mode)" },
      { src: "/projects/f2home/my-farm.webp", w: 1600, h: 795, caption: "My Farm: sales, revenue and listing status" },
      { src: "/projects/f2home/delivery-settings.webp", w: 1600, h: 724, caption: "Delivery settings: farm location, radius and delivery days" },
    ],
  },
  {
    slug: "arogya-mitra",
    name: "Arogya Mitra",
    tag: "Frontend · Accessibility",
    year: "2026",
    pitch:
      "A Telugu, audio-first app that helps villagers find nearby doctors, clinics and pharmacies, built for people who may not read well.",
    why: "Health information is hard to reach for low-literacy users. Every screen uses large icons, spoken prompts and one clear action.",
    highlights: [
      "Telugu and English, with recorded voice prompts and a speaker button on every screen.",
      "Voice search in te-IN: say a symptom, a medicine or \"108\".",
      "Symptom picker with highlighted danger signs that route straight to the 108 emergency screen.",
      "Nearby providers sorted by open status and distance, one-tap call, and slot booking with a My bookings list.",
      "Medicine search showing which pharmacy has it. Plain HTML, CSS and JavaScript with a tiny Node server, no build step.",
    ],
    status:
      "Frontend only: all data is stored in the browser (localStorage) and the doctor list is sample data.",
    stack: ["HTML5", "CSS3", "JavaScript (ES6+)", "Web Speech API", "localStorage", "Node.js"],
    repo: "https://github.com/maruthi-user/arogya-mitra",
    live: "https://arogya-mitra-lime.vercel.app/",
    phone: true,
    shots: [
      { src: "/projects/arogya/language.webp", w: 800, h: 419, caption: "Choose Telugu or English" },
      { src: "/projects/arogya/village.webp", w: 800, h: 718, caption: "Pick your village" },
      { src: "/projects/arogya/home.webp", w: 638, h: 991, caption: "Home: emergency 108, doctor, medicine, bookings" },
      { src: "/projects/arogya/symptoms.webp", w: 649, h: 956, caption: "Symptoms and highlighted danger signs" },
      { src: "/projects/arogya/doctors.webp", w: 660, h: 954, caption: "Nearby doctors with call and book buttons" },
      { src: "/projects/arogya/booking.webp", w: 648, h: 980, caption: "Choose a day and time slot" },
    ],
  },
  {
    slug: "lotus-ui",
    name: "Lotus UI",
    tag: "Frontend · Animation",
    year: "2026",
    pitch:
      "An interactive lotus that grows from an emerald bud into a golden bloom: a quiet study of colour, time and patience.",
    why: "I wanted to practise pure front-end craft: SVG and canvas animation, colour and motion, with no UI library doing the work for me.",
    highlights: [
      "The lotus is drawn and animated in SVG with hand-written JavaScript; drifting light particles run on a separate canvas layer.",
      "Tailwind CSS v4 with Vite, custom fonts and a dark colour scheme.",
      "Deployed on Vercel as a static site.",
    ],
    status: "Finished as a small study.",
    stack: ["JavaScript", "SVG", "Canvas", "Vite", "Tailwind CSS v4", "Vercel"],
    repo: "https://github.com/maruthi-user/lotus-UI",
    live: "https://lotus-ui-fx6c.vercel.app/",
    animated: true,
    shots: [
      { src: "/projects/lotus/bloom.webp", w: 800, h: 402, caption: "The bloom animation, recorded from the live site" },
    ],
  },
];

export const skills = [
  { group: "Backend", items: ["Java 17", "Spring Boot", "Spring Security (JWT)", "Spring Data JPA", "Hibernate", "REST APIs", "Bean Validation", "Flyway", "Swagger / OpenAPI", "Maven"] },
  { group: "Frontend", items: ["React.js", "Next.js", "Redux Toolkit / RTK Query", "Tailwind CSS", "Vite", "JavaScript (ES6+)", "HTML5", "CSS3"] },
  { group: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "SQL"] },
  { group: "DevOps & Cloud", items: ["Docker", "Kubernetes", "Jenkins", "GitHub Actions", "AWS EC2 / ELB / S3", "Render", "CI/CD"] },
  { group: "Testing & Tools", items: ["JUnit", "Postman", "Git & GitHub", "VS Code", "Agile / Scrum"] },
  { group: "GenAI", items: ["LangChain", "LLM API integration", "Prompt engineering"] },
];

export const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    school: "Mohan Babu University, Tirupati",
    period: "2023 – 2025",
  },
  {
    degree: "Bachelor of Science in Computer Science",
    school: "Acharya Nagarjuna University, Guntur",
    period: "2020 – 2023",
  },
];
