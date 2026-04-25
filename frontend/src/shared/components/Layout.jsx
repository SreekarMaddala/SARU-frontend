import Header from "./Header";

export default function Layout({ children, variant = "public" }) {
  const bgClass =
    variant === "public"
      ? "bg-gradient-to-br from-gray-950 via-saru-slate-dark to-black text-saru-cyan"
      : "bg-saru-black text-saru-cyan min-h-screen";

  return (
    <div className={bgClass}>
      <Header variant={variant} />
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}

