import { Plus } from "lucide-react";

const Button = ({
  type = 'button',
  children,
  variant = 'primary',
  className = '',
  event,
  ...props
}) => {
  const baseClasses =
    `inline-flex items-center hover:cursor-pointer 
    justify-center rounded-md text-sm  transition-colors 
    duration-200 hover:shadow-md focus:outline-none
    hover:border text-white`;

  const variants = {
    primary: 'bg-emerald-500 text-white hover:bg-emerald-400 border-white/25 px-4 py-2 font-semibold',
    secondary: 'bg-emerald-900/30 text-white hover:bg-emerald-800/40 border-white/25 px-4 py-2 font-semibold',
    add: "bg-transparent hover:bg-white/10 border-white/25 p-1 font-semibold",
    ghost: 'bg-transparent hover:bg-white/10 border-white/25 p-1 font-semibold',
  };

  const classes = `${baseClasses} ${variants[variant] ?? variants.primary} ${className}`.trim();

  return (
    <button type={type} className={classes} {...props} onClick={event}  >
      {variant === "add" ? <Plus className="size-4" /> : ""}
      {children}
    </button>
  );
};

export default Button;
