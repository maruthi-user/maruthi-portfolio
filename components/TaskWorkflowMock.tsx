"use client";

import { useState } from "react";

type Role = "Employee" | "Lead" | "Approver" | "HR" | "Admin" | "Super Admin";
type Relation = "own" | "team" | "other";
type Status = "Defined" | "In Progress" | "Executed" | "Re-submitted" | "Reviewed" | "Approved";

const roles: Role[] = ["Employee", "Lead", "Approver", "HR", "Admin", "Super Admin"];
const statuses: Status[] = ["Defined", "In Progress", "Executed", "Reviewed", "Re-submitted", "Approved"];

const dot: Record<Status, string> = {
  Defined: "bg-slate-400",
  "In Progress": "bg-blue-500",
  Executed: "bg-violet-500",
  Reviewed: "bg-cyan-500",
  "Re-submitted": "bg-amber-500",
  Approved: "bg-emerald-500",
};

// The workflow itself, independent of who is acting. Every role's options are
// a subset of this table, and nobody can leave Approved.
const FLOW_NEXT: Record<Status, Status[]> = {
  Defined: ["In Progress", "Executed"],
  "In Progress": ["Defined", "Executed"],
  Executed: ["Reviewed", "Re-submitted", "Approved"],
  "Re-submitted": ["Defined", "In Progress", "Executed"],
  Reviewed: ["Re-submitted", "Approved"],
  Approved: [],
};

const fullAccess = (r: Role) => r === "Admin" || r === "Super Admin";

// Same decision order as the server-side authorization class, simplified to
// the three relations this demo lets you pick.
function nextStatuses(role: Role, rel: Relation, current: Status, dualRole: boolean): Status[] {
  const own = rel === "own";
  const team = rel === "team" && role !== "Employee";
  if (current === "Approved") return [];
  if (current === "Re-submitted") return own ? ["Defined", "In Progress", "Executed"] : [];
  if (fullAccess(role)) return FLOW_NEXT[current];
  if (own) {
    return current === "Defined" || current === "In Progress" ? ["Defined", "In Progress", "Executed"] : [];
  }
  if (team && (role === "Lead" || role === "Approver" || role === "HR")) {
    if (current === "Executed") return ["Reviewed", "Re-submitted"];
    if (current === "Reviewed" && (role === "Approver" || role === "HR" || dualRole)) return ["Re-submitted", "Approved"];
  }
  return [];
}

function canEdit(role: Role, rel: Relation, current: Status, dualRole: boolean) {
  if (current === "Approved") return false;
  if (fullAccess(role)) return true;
  const own = rel === "own";
  const team = rel === "team" && role !== "Employee";
  const base = role === "HR" ? own || team : own || (team && (role === "Lead" || role === "Approver"));
  // A user with no further legal move on the record gets it read-only.
  return base && nextStatuses(role, rel, current, dualRole).length > 0;
}

function canComment(role: Role, rel: Relation, current: Status) {
  if (current === "Approved") return false;
  const own = rel === "own";
  const team = rel === "team" && role !== "Employee";
  if (current === "Re-submitted") return own || fullAccess(role) || team;
  if (fullAccess(role)) return true;
  if (!own && !team) return false;
  if (role === "Employee") return current === "Defined" || current === "In Progress";
  if (role === "Lead") return current !== "Reviewed";
  return true;
}

function Pill({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
        ok ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" : "bg-surface-2 text-muted line-through decoration-muted/50"
      }`}
    >
      {label}
    </span>
  );
}

export default function TaskWorkflowMock() {
  const [role, setRole] = useState<Role>("Employee");
  const [rel, setRel] = useState<Relation>("own");
  const [status, setStatus] = useState<Status>("Defined");
  const [dual, setDual] = useState(false);

  const effectiveRel: Relation = role === "Employee" && rel === "team" ? "other" : rel;
  const moves = nextStatuses(role, effectiveRel, status, dual);
  const edit = canEdit(role, effectiveRel, status, dual);
  const comment = canComment(role, effectiveRel, status);

  const relations: { key: Relation; label: string; disabled?: boolean }[] = [
    { key: "own", label: "Assigned to me" },
    { key: "team", label: "A reportee's task", disabled: role === "Employee" },
    { key: "other", label: "Someone else's task" },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="space-y-4 border-b border-line p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <p className="font-semibold">Who can move this task?</p>
          <div role="tablist" aria-label="Signed in as" className="flex flex-wrap gap-1 rounded-3xl border border-line bg-bg p-1 text-sm">
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

        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-xs uppercase tracking-wide text-muted">The task is</span>
          {relations.map((o) => (
            <button
              key={o.key}
              disabled={o.disabled}
              onClick={() => setRel(o.key)}
              className={`rounded-full border px-3 py-1 text-xs transition ${
                effectiveRel === o.key ? "border-accent bg-surface-2 text-fg" : "border-line text-muted hover:text-fg"
              } disabled:cursor-not-allowed disabled:opacity-40`}
            >
              {o.label}
            </button>
          ))}
          {role === "Lead" && effectiveRel === "team" && (
            <label className="ml-auto flex items-center gap-2 text-xs text-muted">
              <input type="checkbox" checked={dual} onChange={(e) => setDual(e.target.checked)} className="accent-[var(--accent)]" />
              I am also the recorded approver
            </label>
          )}
        </div>
      </div>

      <div className="grid gap-6 p-5 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-gold">Current status</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {statuses.map((s) => (
              <li key={s}>
                <button
                  onClick={() => setStatus(s)}
                  aria-pressed={status === s}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition ${
                    status === s ? "border-accent bg-surface-2" : "border-line text-muted hover:text-fg"
                  }`}
                >
                  <span className={`size-2 rounded-full ${dot[s]}`} aria-hidden />
                  {s}
                </button>
              </li>
            ))}
          </ul>

          <p className="mt-6 font-mono text-xs uppercase tracking-wider text-gold">The status menu offers</p>
          <div className="mt-3 min-h-10">
            {moves.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {moves.map((s) => (
                  <li key={s} className="flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1.5 text-sm text-fg">
                    <span className={`size-2 rounded-full ${dot[s]}`} aria-hidden />
                    {s}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted">
                {status === "Approved"
                  ? "Nothing. Approved is final for every role, admins included."
                  : "Nothing. This role has no move from here, so the status control stays locked."}
              </p>
            )}
          </div>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-gold">What else is open</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Pill ok={edit} label="Edit task" />
            <Pill ok={comment} label="Add activity note" />
            <Pill ok={edit && status !== "Re-submitted"} label="Change assignee" />
          </div>
          <ul className="mt-4 space-y-2 text-xs leading-relaxed text-muted">
            <li>The menu is built from the same rule table the API checks, so a button is never shown for a move the server would refuse.</li>
            {status === "Re-submitted" && <li>During rework, assignee, reviewer and approver are frozen. Only the assignee can move it on.</li>}
            {role === "Lead" && <li>A Lead can review but not approve, unless they are also the recorded approver for that person.</li>}
            <li>Moving to Executed or beyond also needs Client, Main Task and Sub Task to be filled in.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
