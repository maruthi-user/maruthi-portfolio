"use client";

import { useState } from "react";

type Flow = {
  name: string;
  intro: string;
  main: { status: string; note: string }[];
  exits: { status: string; from: string; note: string }[];
};

// Status names are the backend enums the screens render; the notes say what
// the UI shows or enables at that point.
const flows: Flow[] = [
  {
    name: "Leave",
    intro: "A leave request has a short lifecycle: it is decided once, from the approver's Pending Approval tab.",
    main: [
      { status: "PENDING", note: "Appears in the approver's Pending Approval tab, with a count badge on the tab." },
      { status: "APPROVED", note: "The request leaves the approval queue and shows as approved in the employee's history." },
    ],
    exits: [
      { status: "REJECTED", from: "PENDING", note: "The approver declines it; the employee sees the new status on My Leaves." },
      { status: "CANCELLED", from: "PENDING", note: "Cancelled before a decision was made." },
    ],
  },
  {
    name: "Advance",
    intro: "An advance does not end at approval: it is paid out and then recovered, so the screens track money moving over time.",
    main: [
      { status: "PENDING", note: "Waiting in Pending Approval for an approver, HR or admin." },
      { status: "APPROVED", note: "Approved as requested, or APPROVED_WITH_REVISED_AMOUNT when the approver changes the amount." },
      { status: "PROCESSING", note: "The approved amount is being processed for payment." },
      { status: "RECOVERY_IN_PROGRESS", note: "Recovered month by month, with a monthly-recovery action and a recovery history." },
      { status: "CLOSED", note: "Fully recovered." },
    ],
    exits: [{ status: "REJECTED", from: "PENDING", note: "Declined at the approval step." }],
  },
  {
    name: "Claims",
    intro: "Claims start as a draft the employee can keep editing, then go through approval and payment.",
    main: [
      { status: "DRAFT", note: "Saved but not submitted yet, so the employee can keep editing." },
      { status: "PENDING_APPROVAL", note: "Submitted, waiting in the approver's queue." },
      { status: "APPROVED", note: "Approved and waiting for payment." },
      { status: "PAID", note: "Marked paid, one at a time or in bulk, by someone with payment scope." },
    ],
    exits: [{ status: "REJECTED", from: "PENDING_APPROVAL", note: "Declined at the approval step." }],
  },
  {
    name: "Onboarding",
    intro: "A new joiner passes two reviews before an account exists, so the flow has two approver roles.",
    main: [
      { status: "PENDING_TL", note: "The registration form is submitted and waits on the Team Lead approvals page." },
      { status: "TL_APPROVED", note: "The Team Lead approved; the request moves on to HR." },
      { status: "PENDING_HR", note: "Waits on the HR approvals page." },
      { status: "HR_APPROVED", note: "HR has approved; the joiner can now activate the account." },
      { status: "ACCOUNT_ACTIVATED", note: "The joiner sets a password on the activate-account page." },
    ],
    exits: [
      { status: "TL_REJECTED", from: "PENDING_TL", note: "Stopped at the Team Lead step." },
      { status: "HR_REJECTED", from: "PENDING_HR", note: "Stopped at the HR step." },
      { status: "CANCELLED", from: "any open step", note: "Withdrawn before activation." },
    ],
  },
];

const pretty = (s: string) => s.replace(/_/g, " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase());

export default function HrmsMock() {
  const [flowIdx, setFlowIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const flow = flows[flowIdx];
  const step = flow.main[Math.min(stepIdx, flow.main.length - 1)];

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-semibold">Request lifecycle</p>
        <div role="tablist" aria-label="Module" className="inline-flex flex-wrap rounded-full border border-line bg-bg p-1 text-sm">
          {flows.map((f, i) => (
            <button
              key={f.name}
              role="tab"
              aria-selected={flowIdx === i}
              onClick={() => {
                setFlowIdx(i);
                setStepIdx(0);
              }}
              className={`rounded-full px-4 py-1.5 transition ${flowIdx === i ? "bg-accent text-accent-fg" : "text-muted hover:text-fg"}`}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>

      <p className="border-b border-line bg-surface-2 px-4 py-2 text-xs text-muted">{flow.intro}</p>

      <div className="grid gap-6 p-5 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <ol className="space-y-3" aria-label="Status path">
            {flow.main.map((s, i) => {
              const done = i < stepIdx;
              const current = i === stepIdx;
              return (
                <li key={s.status}>
                  <button
                    onClick={() => setStepIdx(i)}
                    className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left text-sm transition ${
                      current ? "border-accent bg-surface-2" : "border-line hover:bg-surface-2"
                    }`}
                  >
                    <span
                      className={`grid size-6 shrink-0 place-items-center rounded-full text-xs ${
                        done ? "bg-accent text-accent-fg" : current ? "border-2 border-accent text-accent" : "border border-line text-muted"
                      }`}
                    >
                      {done ? "✓" : i + 1}
                    </span>
                    <span className={current || done ? "text-fg" : "text-muted"}>{pretty(s.status)}</span>
                    <span className="ml-auto hidden font-mono text-[11px] text-muted sm:inline">{s.status}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <aside className="space-y-4" aria-label="What the screen does">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-gold">At this step</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{step.note}</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-gold">Ways out</p>
            <ul className="mt-2 space-y-2 text-sm">
              {flow.exits.map((e) => (
                <li key={e.status} className="rounded-xl border border-line bg-bg p-3">
                  <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-xs text-red-700 dark:text-red-300">{pretty(e.status)}</span>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">
                    From {e.from === "any open step" ? e.from : pretty(e.from)}. {e.note}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
