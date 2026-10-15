import React from "react";
/** Render template values as React text; raw HTML is never interpreted. */
export function DocumentText({ text }: { text: string }) {
  return <div className="prose prose-sm max-w-none text-slate-900 leading-relaxed font-serif">
    {text.split("\n").map((line, index) => {
      const value = line.trim();
      if (value.startsWith("# ")) return <h1 key={index} className="text-2xl font-bold text-center mb-8">{value.slice(2)}</h1>;
      if (value.startsWith("#### ")) return <h4 key={index} className="text-xs font-bold mt-4 mb-2">{value.slice(5)}</h4>;
      if (value.startsWith("### ")) return <h3 key={index} className="text-sm font-bold mt-5 mb-3">{value.slice(4)}</h3>;
      if (value.startsWith("* ")) return <p key={index} className="ml-6 mb-2 text-xs">• {value.slice(2)}</p>;
      if (value === "---") return <hr key={index} className="my-6 border-slate-600" />;
      return value ? <p key={index} className="mb-3 text-xs whitespace-pre-wrap">{value}</p> : <div key={index} className="h-2" />;
    })}
  </div>;
}
