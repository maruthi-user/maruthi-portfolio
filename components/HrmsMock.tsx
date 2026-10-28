"use client";

import { useState } from "react";

type Stage = "Manager review" | "HR review" | "Approved" | "Rejected";
type Role = "Employee" | "Manager" | "Admin";

type LeaveRequest = {
  id: number;
  employee: string;
  team: string;
  type: string;
  dates: string;
  days: number;
  stage: Stage;
};

const requests: LeaveRequest[] = [
  { id: 101, employee: "Asha Rao", team: "Platform", type: "Casual leave", dates: "12–14 Nov", days: 3, stage: "Manager review" },
  { id: 102, employee: "Asha Rao", team: "Platform", type: "Comp-off", dates: "2 Nov", days: 1, stage: "Approved" },
  { id: 103, employee: "Vikram Nair", team: "Platform", type: "Sick leave", dates: "6 Nov", days: 1, stage: "HR review" },
  { id: 104, employee: "Meera Iyer", team: "Design", type: "Casual leave", dates: "20–22 Nov", days: 3, stage: "Manager review" },
  { id: 105, employee: "Rohan Shah", team: "Design", type: "Advance request", dates: "n/a", days: 0, stage: "HR review" },
  { id: 106, employee: "Kiran Das", team: "Finance", type: "Casual leave", dates: "28 Nov", days: 1, stage: "Rejected" },
];

// Each role sees only the records it is allowed to see.
const viewer = { Employee: "Asha Rao", Manager: "Platform" } as const;

function visibleTo(role: Role, r: LeaveRequest) {
  if (role === "Employee") return r.employee === viewer.Employee;
  if (role === "Manager") return r.team === viewer.Manager;
  return true;
}

const steps = ["Submitted", "Manager review", "HR review", "Approved"] as const;

function stepState(stage: Stage, step: (typeof steps)[number]) {
  if (stage === "Rejected") return step === "Submitted" ? "done" : "idle";
  const order = steps.indexOf(step);
  const current = steps.indexOf(stage);
  if (order < current) return "done";
  if (order === current) return stage === "Approved" ? "done" : "current";
  return "idle";
}

const badge: Record<Stage, string> = {
  "Manager review": "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  "HR review": "bg-sky-500/15 text-sky-700 dark:text-sky-300",
  Approved: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  Rejected: "bg-red-500/15 text-red-700 dark:text-red-300",
};

export default function HrmsMock() {
  const [role, setRole] = useState<Role>("Employee");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const rows = requests.filter((r) => visibleTo(role, r));
  const selected = rows.find((r) => r.id === selectedId) ?? rows[0];

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-semibold">Leave requests</p>
        <div role="tablist" aria-label="View as role" className="inline-flex rounded-full border border-line bg-bg p-1 text-sm">
          {(["Employee", "Manager", "Admin"] as Role[]).map((r) => (
            <button
              key={r}
              role="tab"
              aria-selected={role === r}
              onClick={() => {
                setRole(r);
                setSelectedId(null);
              }}
              className={`rounded-full px-4 py-1.5 transition ${role === r ? "bg-accent text-accent-fg" : "text-muted hover:text-fg"}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <p className="border-b border-line bg-surface-2 px-4 py-2 text-xs text-muted">
        Viewing as <strong className="text-fg">{role}</strong>:{" "}
        {role === "Employee" && "only your own requests are visible."}
        {role === "Manager" && "requests from your team (Platform) are visible."}
        {role === "Admin" && "every request across the company is visible."}
      </p>

      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Employee</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Dates</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => setSelectedId(r.id)}
                  className={`cursor-pointer border-t border-line transition hover:bg-surface-2 ${selected?.id === r.id ? "bg-surface-2" : ""}`}
                >
                  <td className="px-4 py-3">{r.employee}</td>
                  <td className="px-4 py-3 text-muted">{r.type}</td>
                  <td className="px-4 py-3 text-muted">{r.dates}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${badge[r.stage]}`}>{r.stage}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selected && (
          <aside className="border-t border-line p-5 lg:border-l lg:border-t-0" aria-label="Approval progress">
            <p className="text-sm font-semibold">{selected.employee} · {selected.type}</p>
            <p className="text-xs text-muted">{selected.days ? `${selected.days} day(s)` : "Amount request"} · {selected.dates}</p>
            <ol className="mt-5 space-y-4">
              {steps.map((s) => {
                const st = stepState(selected.stage, s);
                return (
                  <li key={s} className="flex items-center gap-3 text-sm">
                    <span
                      className={`grid size-6 place-items-center rounded-full text-xs ${
                        st === "done" ? "bg-accent text-accent-fg" : st === "current" ? "border-2 border-accent text-accent" : "border border-line text-muted"
                      }`}
                    >
                      {st === "done" ? "✓" : ""}
                    </span>
                    <span className={st === "idle" ? "text-muted" : "text-fg"}>{s}</span>
                  </li>
                );
              })}
            </ol>
            {selected.stage === "Rejected" && <p className="mt-4 text-sm text-red-600 dark:text-red-300">Rejected at manager review.</p>}
          </aside>
        )}
      </div>
    </div>
  );
}
