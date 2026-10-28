"use client";

import { useState } from "react";

type Role = "Employee" | "Lead" | "Approver" | "HR" | "Admin" | "Super Admin";

const roles: Role[] = ["Employee", "Lead", "Approver", "HR", "Admin", "Super Admin"];

// A trimmed copy of the permission map the HRMS frontend uses (one list of
// permission strings per role). Only the permissions that decide which
// modules and tabs appear are kept here.
const LEADERSHIP = ["LEAVE_APPROVE", "COMPOFF_ADD", "CLAIMS_APPROVE", "CLAIMS_VIEW_ALL", "ATTENDANCE_APPROVE"];
const BASE = ["LEAVE_VIEW", "LEAVE_APPLY", "COMPOFF_VIEW", "ADVANCE_VIEW", "ADVANCE_APPLY", "CLAIMS_VIEW", "CLAIMS_APPLY", "ATTENDANCE_VIEW"];
const ADVANCE_ADMIN = ["ADVANCE_APPROVE", "ADVANCE_VIEW_ALL"];
const PEOPLE_ADMIN = ["COMPOFF_APPROVE", "HOLIDAY_ADD", "ALL_PROFILES", "ADD_USER", "UPDATE_USER", "AUDIT_LOG_VIEW", "ONBOARDING_APPLY"];

const perms: Record<Role, Set<string>> = {
  Employee: new Set(BASE),
  Lead: new Set([...BASE, ...LEADERSHIP, "LEAVE_VIEW_TEAM", "ATTENDANCE_VIEW_TEAM", "DSR_VIEW"]),
  Approver: new Set([...BASE, ...LEADERSHIP, ...ADVANCE_ADMIN, "LEAVE_VIEW_TEAM", "ATTENDANCE_VIEW_ALL", "DSR_VIEW"]),
  HR: new Set([...BASE, ...LEADERSHIP, ...ADVANCE_ADMIN, ...PEOPLE_ADMIN, "LEAVE_VIEW_TEAM", "ATTENDANCE_VIEW_ALL"]),
  Admin: new Set([...BASE, ...LEADERSHIP, ...ADVANCE_ADMIN, ...PEOPLE_ADMIN, "LEAVE_VIEW_ALL", "ATTENDANCE_VIEW_ALL"]),
  "Super Admin": new Set([...BASE, ...LEADERSHIP, ...ADVANCE_ADMIN, ...PEOPLE_ADMIN, "LEAVE_VIEW_ALL", "ATTENDANCE_VIEW_ALL"]),
};

const scope: Record<Role, string> = {
  Employee: "Only their own records.",
  Lead: "Their own records, plus the people who report to them as Team Lead.",
  Approver: "Their own records, plus the people they are recorded as approver for.",
  HR: "Approvals for the people they lead or approve, plus the HR app for people, reports and company-wide dashboards.",
  Admin: "Every record in the organisation.",
  "Super Admin": "Every record in the organisation.",
};

function tabsFor(role: Role) {
  const p = perms[role];
  const has = (k: string) => p.has(k);
  const manager = role === "Lead" || role === "Approver" || role === "HR";
  const wide = manager ? "Team" : "All";
  return [
    {
      module: "Leave & Comp-off",
      tabs: [
        "My Leaves",
        has("LEAVE_APPROVE") && "Pending Approval",
        has("LEAVE_VIEW_TEAM") && "Team Leaves",
        has("LEAVE_VIEW_ALL") && "All Leaves",
        "My CompOff",
        role !== "Employee" && `${wide} CompOff`,
        "Holidays",
        "Leaves Balance",
        "Policy",
      ],
    },
    {
      module: "Attendance",
      tabs: [
        "My Attendance",
        has("ATTENDANCE_APPROVE") && "Pending Approval",
        (has("ATTENDANCE_VIEW_TEAM") || has("ATTENDANCE_VIEW_ALL")) && `${wide} Attendance`,
      ],
    },
    {
      module: "Advances",
      tabs: [
        has("ADVANCE_APPLY") && "My Advance",
        has("ADVANCE_APPROVE") && "Pending Approval",
        has("ADVANCE_VIEW_ALL") && `${wide} Advance`,
      ],
    },
    {
      module: "Claims",
      tabs: [
        has("CLAIMS_APPLY") && "My Claims",
        has("CLAIMS_APPROVE") && "Pending Approval",
        has("CLAIMS_VIEW_ALL") && `${wide} Claims`,
      ],
    },
  ].map((m) => ({ ...m, tabs: m.tabs.filter(Boolean) as string[] }));
}

function sidebarFor(role: Role) {
  const p = perms[role];
  return [
    "Dashboard",
    "Attendance",
    "Task Management",
    "Advance Management",
    "Claims",
    "Leave Management",
    p.has("DSR_VIEW") && "DSR",
    role !== "Employee" && "Onboarding",
  ].filter(Boolean) as string[];
}

function appsFor(role: Role) {
  const hrApp = role === "HR" || role === "Admin" || role === "Super Admin";
  const hrModules = ["HR Dashboard", "Attendance", "Leave Management", "Advance", "Claims", "Users Management", "DSR", "Reports"];
  return [
    { name: "HRMS", open: true, note: "open to every signed-in user" },
    { name: "Human Resources", open: hrApp, note: hrApp ? hrModules.join(" · ") : "Access denied toast" },
    { name: "CRM", open: false, badge: "Needs flag", note: "opens only for users granted the separate CRM access flag, whatever their role" },
  ];
}

export default function RoleAccessMock() {
  const [role, setRole] = useState<Role>("Employee");
  const apps = appsFor(role);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="flex flex-col gap-3 border-b border-line p-4 lg:flex-row lg:items-center lg:justify-between">
        <p className="font-semibold">Same app, six different screens</p>
        <div role="tablist" aria-label="Sign in as role" className="flex flex-wrap gap-1 rounded-3xl border border-line bg-bg p-1 text-sm">
          {roles.map((r) => (
            <button
              key={r}
              role="tab"
              aria-selected={role === r}
              onClick={() => setRole(r)}
              className={`rounded-full px-3.5 py-1.5 transition ${role === r ? "bg-accent text-accent-fg" : "text-muted hover:text-fg"}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <p className="border-b border-line bg-surface-2 px-4 py-2 text-xs text-muted">
        Signed in as <strong className="text-fg">{role}</strong>. Data scope: {scope[role]}
      </p>

      <div className="grid gap-6 p-5 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-6">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-gold">Apps in the launcher</h3>
            <ul className="mt-3 space-y-2">
              {apps.map((a) => (
                <li key={a.name} className="rounded-xl border border-line bg-bg p-3 text-sm">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">{a.name}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        a.open
                          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                          : a.badge
                            ? "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                            : "bg-red-500/10 text-red-700 dark:text-red-300"
                      }`}
                    >
                      {a.badge ?? (a.open ? "Opens" : "Locked")}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted">{a.note}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-gold">HRMS sidebar</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {sidebarFor(role).map((s) => (
                <li key={s} className="rounded-full border border-line bg-bg px-3 py-1 text-xs text-muted">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-wider text-gold">Tabs inside each module</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {tabsFor(role).map((m) => (
              <div key={m.module} className="rounded-xl border border-line bg-bg p-3">
                <p className="text-sm font-semibold">{m.module}</p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {m.tabs.map((t) => (
                    <li
                      key={t}
                      className={`rounded-md px-2 py-1 text-xs ${
                        t === "Pending Approval" ? "bg-amber-500/15 text-amber-700 dark:text-amber-300" : "bg-surface-2 text-muted"
                      }`}
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted">
            Switch roles to watch tabs appear and disappear. This is only the UI layer: the Spring Boot API checks permissions on its own as well.
          </p>
        </div>
      </div>
    </div>
  );
}
