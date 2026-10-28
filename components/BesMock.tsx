"use client";

import { useState } from "react";

type Field = { key: string; label: string; unit: string; rate: number };

// The form below changes completely when the service type changes.
const services: Record<string, { label: string; fields: Field[] }> = {
  installation: {
    label: "Installation",
    fields: [
      { key: "units", label: "Number of units", unit: "units", rate: 4500 },
      { key: "hours", label: "Technician hours", unit: "hrs", rate: 600 },
    ],
  },
  transport: {
    label: "Transport",
    fields: [
      { key: "km", label: "Distance", unit: "km", rate: 28 },
      { key: "trips", label: "Number of trips", unit: "trips", rate: 1200 },
      { key: "load", label: "Loading charge", unit: "loads", rate: 350 },
    ],
  },
  maintenance: {
    label: "Maintenance",
    fields: [
      { key: "visits", label: "Site visits", unit: "visits", rate: 1800 },
      { key: "parts", label: "Spare parts allowance", unit: "sets", rate: 2500 },
    ],
  },
};

const payments = [
  { ref: "EST-2041", service: "Installation", amount: 54000, status: "Paid" },
  { ref: "EST-2042", service: "Transport", amount: 31800, status: "Partially paid" },
  { ref: "EST-2043", service: "Maintenance", amount: 12400, status: "Pending" },
];

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

const badge: Record<string, string> = {
  Paid: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  "Partially paid": "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  Pending: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
};

export default function BesMock() {
  const [service, setService] = useState("installation");
  const [values, setValues] = useState<Record<string, string>>({});
  const def = services[service];

  const lines = def.fields.map((f) => {
    const qty = Number(values[`${service}.${f.key}`]) || 0;
    return { ...f, qty, amount: qty * f.rate };
  });
  const subtotal = lines.reduce((s, l) => s + l.amount, 0);
  const gst = Math.round(subtotal * 0.18);

  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
      <div className="rounded-2xl border border-line bg-surface p-5">
        <p className="font-semibold">New estimate</p>

        <label className="mt-4 block text-sm text-muted" htmlFor="service">Service type</label>
        <select
          id="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="mt-1 w-full rounded-lg border border-line bg-bg px-3 py-2 text-sm"
        >
          {Object.entries(services).map(([k, s]) => (
            <option key={k} value={k}>{s.label}</option>
          ))}
        </select>

        <div className="mt-4 space-y-3">
          {def.fields.map((f) => {
            const id = `${service}.${f.key}`;
            return (
              <div key={id}>
                <label htmlFor={id} className="block text-sm text-muted">
                  {f.label} <span className="text-xs">({inr(f.rate)} per {f.unit})</span>
                </label>
                <input
                  id={id}
                  inputMode="numeric"
                  value={values[id] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [id]: e.target.value.replace(/\D/g, "") }))}
                  placeholder="0"
                  className="mt-1 w-full rounded-lg border border-line bg-bg px-3 py-2 text-sm"
                />
              </div>
            );
          })}
        </div>

        <dl className="mt-5 space-y-1 border-t border-line pt-4 text-sm">
          <div className="flex justify-between text-muted"><dt>Subtotal</dt><dd>{inr(subtotal)}</dd></div>
          <div className="flex justify-between text-muted"><dt>GST (18%)</dt><dd>{inr(gst)}</dd></div>
          <div className="flex justify-between text-base font-semibold"><dt>Estimated total</dt><dd>{inr(subtotal + gst)}</dd></div>
        </dl>
      </div>

      <div className="rounded-2xl border border-line bg-surface p-5">
        <p className="font-semibold">Payment tracking</p>
        <ul className="mt-4 space-y-3">
          {payments.map((p) => (
            <li key={p.ref} className="flex items-center justify-between gap-3 rounded-xl border border-line bg-bg p-3 text-sm">
              <div>
                <p className="font-medium">{p.ref}</p>
                <p className="text-xs text-muted">{p.service}</p>
              </div>
              <div className="text-right">
                <p>{inr(p.amount)}</p>
                <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${badge[p.status]}`}>{p.status}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
