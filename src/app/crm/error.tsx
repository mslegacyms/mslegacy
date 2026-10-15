"use client";
export default function CrmError({ reset }: { reset: () => void }) {
  return <div role="alert" className="p-8 bg-white border rounded space-y-4"><h1 className="text-xl font-bold">This workspace could not be loaded</h1><p>Please retry. Sample records have not been substituted for your data.</p><button onClick={reset} className="rounded bg-[#10291f] text-white px-4 py-2">Try again</button></div>;
}
