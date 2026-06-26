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
    justify-center rounded-lg text-sm transition-all 
    duration-200 focus:outline-none
    active:scale-[0.97] select-none`;

  const variants = {
    primary: 'bg-purple-500/90 hover:bg-purple-500 text-white px-4 py-2 font-semibold shadow-sm hover:shadow-purple-500/10',
    secondary: 'bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/20 px-4 py-2 font-semibold',
    add: "bg-transparent hover:bg-white/5 text-zinc-400 hover:text-zinc-300 p-1 font-semibold",
    ghost: 'bg-transparent hover:bg-white/5 text-zinc-400 hover:text-zinc-300 p-1 font-semibold',
  };

  const classes = `${baseClasses} ${variants[variant] ?? variants.primary} ${className}`.trim();

  return (
    <button type={type} className={classes} {...props} onClick={event}  >
      {children}
    </button>
  );
};

export default Button;
