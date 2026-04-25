import React from "react";

const variantStyles = {
  primary:
    "bg-saru-teal text-saru-black hover:bg-saru-teal-dark focus:ring-saru-teal",
  secondary:
    "bg-saru-cyan/10 text-saru-cyan border border-saru-cyan/30 hover:bg-saru-cyan/20 focus:ring-saru-cyan",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  outline:
    "border-2 border-saru-cyan text-saru-cyan hover:bg-saru-cyan hover:text-saru-black focus:ring-saru-cyan",
  ghost:
    "text-saru-cyan hover:text-saru-teal hover:bg-saru-cyan/5 focus:ring-saru-cyan",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm rounded-md",
  md: "px-4 py-2 text-base rounded-lg",
  lg: "px-6 py-3 text-lg rounded-xl",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  loading = false,
  className = "",
  onClick,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-saru-black disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${base} ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size] || sizeStyles.md} ${className}`}
      {...props}
    >
      {loading && (
        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  );
}

