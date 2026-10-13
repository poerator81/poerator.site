export function FieldList({ fields }: { fields: [label: string, value: string][] }) {
  return (
    <dl className="space-y-2 font-mono text-sm">
      {fields.map(([label, value]) => (
        <div key={label} className="flex flex-wrap gap-x-3">
          <dt className="text-surface-muted">{label}:</dt>
          <dd className="text-white">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
