import React from "react";

interface ProjectMediaPlaceholderProps {
  hideText?: boolean;
}

export const ProjectMediaPlaceholder = ({ hideText = false }: ProjectMediaPlaceholderProps) => {
  return (
    <div className="w-full h-full min-h-[160px] bg-dark-luxury-gradient relative flex items-center justify-center p-6 bg-luxury-grid overflow-hidden border border-gold-elegant">
      {/* Abstract Grid styling overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,110,58,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,110,58,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-40"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#10291f_95%)]"></div>

      {!hideText && (
        <div className="text-center space-y-2 z-10 font-sans">
          <svg className="w-8 h-8 text-[#8b6e3a] mx-auto animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-[10px] tracking-widest text-[#8b6e3a] uppercase font-bold block bg-[#8b6e3a]/10 border border-[#8b6e3a]/20 px-2.5 py-0.5 rounded w-fit mx-auto">
            Media Pending Permission
          </span>
          <span className="text-[9px] text-slate-400 block font-semibold uppercase tracking-wider">
            Project visuals available after authorization
          </span>
        </div>
      )}
    </div>
  );
};
