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
    hover:border `;

  const variants = {
    primary: 'bg-sky-500 text-white hover:bg-sky-400 w-[200px] border-white/25 p-2 font-semibold',
    secondary: 'bg-white text-black hover:bg-transparent hover:text-white w-[200px] border-white/25 p-2 font-semibold',
    ghost: 'bg-transparent text-white hover:bg-white/10 w-[200px] border-white/25 p-2 font-semibold',
    add: "bg-white/10 text-white p-1 border border-white/25 gap-2  hover:border-white"
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
