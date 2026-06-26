const variants = {
  cancel: "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
  confirm: "bg-purple-500/80 hover:bg-purple-500 text-white rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
  accept: "bg-teal-500/80 hover:bg-teal-500 text-white rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
}

const DialogButton = ({ children, variant }) => {
  return (
    <button className={`cursor-pointer ${variants[variant]} `}>
      {children}
    </button>
  )
}

export default DialogButton;