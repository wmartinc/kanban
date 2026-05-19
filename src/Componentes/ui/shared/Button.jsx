const Button = ({
  type = 'button',
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseClasses =
    `inline-flex items-center hover:cursor-pointer w-[200px]
    justify-center rounded-md p-2 text-sm font-semibold transition-colors 
    duration-200 hover:shadow-md focus:outline-none
    hover:border border-white/25
    active:scale-[0.98]`;

  const variants = {
    primary: 'bg-sky-500 text-white hover:bg-sky-400',
    secondary: 'bg-slate-700 text-white hover:bg-slate-600',
    ghost: 'bg-transparent text-white hover:bg-white/10',
  };

  const classes = `${baseClasses} ${variants[variant] ?? variants.primary} ${className}`.trim();

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
