import React from "react";

export default function StatCard({ image, label, value, status }) {
  return (
    <div className="relative bg-saru-slate-dark rounded-2xl border border-saru-teal/30 shadow-md p-6 cursor-pointer transform transition-all hover:scale-105 hover:shadow-saru-cyan/40">
      {/* Green circular image */}
      <img
        src={image}
        alt={label}
        className="absolute -top-5 -right-5 w-16 h-16 opacity-70"
      />
      <div className="relative z-10 space-y-2">
        <p className="text-saru-teal-light text-sm font-medium">{label}</p>
        <h3 className="text-white font-bold text-xl">{value}</h3>
        <span className="text-saru-cyan text-xs">{status}</span>
      </div>
    </div>
  );
}
