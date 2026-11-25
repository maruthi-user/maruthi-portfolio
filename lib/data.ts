// All portfolio content lives here. Edit this file to update the site.

import { experiencePeriod } from "./experience";

export const profile = {
  name: "Maruthi Yenumula",
  role: "Java Full Stack Developer",
  location: "Hyderabad, India",
  email: "maruthiy310@gmail.com",
  github: "https://github.com/maruthi-user",
  linkedin: "https://www.linkedin.com/in/maruthi-y-5512a4423",
  photo: "/profile-office.png" as string | null,
  // Put the updated resume PDF in /public and set e.g. "/Maruthi_Yenumula_Resume.pdf".
  // While this is null the "Download resume" buttons are hidden.
  resumeUrl: "/Maruthi_Yenumula_Resume.pdf" as string | null,
  tagline:
    "I build Spring Boot APIs and React applications. At First Partner Consulting, I contribute to an HRMS and own its Task Management module end to end.",
  about: [
    "I'm an MCA graduate (2025) and a Software Developer Intern / Trainee at First Partner Consulting, Hyderabad, since February 2026. I build React workflows across the HRMS and develop its Task Management API and interface end to end.",
    "Outside work I build my own products end to end: a farmer-to-customer marketplace with OTP login, and a Telugu audio-first health app for villages. I like projects where the user is not a developer.",
  ],
};

export const experience = {
  company: "First Partner Consulting",
  role: "Software Developer Intern / Trainee",
  location: "Hyderabad, India",
  period: experiencePeriod,
  summary:
    "Building an HRMS in Agile sprints with backend, QA and product teams. My work spans React interfaces and API integration across the HRMS, plus end-to-end development of its Task Management module.",
  contributions: [
    "Delivered the Task Management API and React interface, with six views covering planning, tracking and workload.",
    "Built role-aware screens and approval queues across leave, attendance, advances, claims and daily status reports.",
    "Created shared tables, filters and saved column layouts for use across HRMS modules.",
  ],
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
  decision: string;
  nextStep: string;
  stack: string[];
  repo: string;
  live: string | null;
  shots: Shot[];
  phone?: boolean;
};

export const projects: Project[] = [
  {
    slug: "f2home",
    name: "F2Home",
    tag: "Full stack",
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
    decision: "OTP sign-in lets farmers use a phone number instead of remembering a password. Rate limits protect the OTP endpoints. The current IndexedDB marketplace makes the interface demonstrable, but orders are not yet shared between devices.",
    nextStep: "Move listings, carts and orders onto the API before treating the marketplace as a multi-user product.",
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
      { src: "/projects/f2home/marketplace.webp", w: 1600, h: 799, caption: "Marketplace with category filters and live counts" },
      { src: "/projects/f2home/signup.webp", w: 1600, h: 797, caption: "Sign-up: phone number, role choice, then OTP verification" },
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
    tag: "Accessibility prototype",
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
    decision: "Recorded prompts and a speaker button make the interface usable without relying only on reading. Voice search adds a second input option; icons and touch controls remain available when speech recognition is unavailable.",
    nextStep: "Validate the flows with Telugu-speaking users, then connect verified provider and booking data. The current prototype does not make real appointments.",
    stack: ["HTML5", "CSS3", "JavaScript (ES6+)", "Web Speech API", "localStorage", "Node.js"],
    repo: "https://github.com/maruthi-user/arogya-mitra",
    live: "https://arogya-mitra-lime.vercel.app/",
    phone: true,
    shots: [
      { src: "/projects/arogya/home.webp", w: 638, h: 991, caption: "Home: emergency 108, doctor, medicine, bookings" },
      { src: "/projects/arogya/language.webp", w: 800, h: 419, caption: "Choose Telugu or English" },
      { src: "/projects/arogya/village.webp", w: 800, h: 718, caption: "Pick your village" },
      { src: "/projects/arogya/symptoms.webp", w: 649, h: 956, caption: "Symptoms and highlighted danger signs" },
      { src: "/projects/arogya/doctors.webp", w: 660, h: 954, caption: "Nearby doctors with call and book buttons" },
      { src: "/projects/arogya/booking.webp", w: 648, h: 980, caption: "Choose a day and time slot" },
    ],
  },
];

// `strong` = used in my shipped projects or day-to-day work. `familiar` = learned or used in a smaller way.
// Move a skill between the two lists to change how it is shown.
export const skills: { group: string; strong: string[]; familiar: string[] }[] = [
  {
    group: "Backend",
    strong: ["Java 17", "Spring Boot", "Spring Security (JWT)", "Spring Data JPA", "Hibernate", "REST APIs", "Bean Validation", "Flyway", "Swagger / OpenAPI"],
    familiar: ["Maven"],
  },
  {
    group: "Frontend",
    strong: ["React.js", "Redux Toolkit / RTK Query", "Tailwind CSS", "Vite", "JavaScript (ES6+)", "HTML5", "CSS3"],
    familiar: ["Next.js"],
  },
  { group: "Databases", strong: ["PostgreSQL", "SQL"], familiar: ["MySQL", "MongoDB"] },
  { group: "DevOps & Cloud", strong: ["Docker", "GitHub Actions", "CI/CD"], familiar: ["Kubernetes", "Jenkins", "AWS EC2 / ELB / S3", "Render"] },
  { group: "Testing & Tools", strong: ["JUnit", "Postman", "Git & GitHub", "Agile / Scrum"], familiar: ["VS Code"] },
  { group: "GenAI", strong: [], familiar: ["LangChain", "LLM API integration", "Prompt engineering"] },
];

export const education = [
  {
    short: "MCA",
    degree: "Master of Computer Applications (MCA)",
    school: "Mohan Babu University, Tirupati",
    period: "2023 – 2025",
  },
  {
    short: "B.Sc Computer Science",
    degree: "Bachelor of Science in Computer Science",
    school: "Acharya Nagarjuna University, Guntur",
    period: "2020 – 2023",
  },
];
