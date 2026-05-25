
const variants = {
  cancel: "bg-neutral-800 hover:bg-neutral-700 text-white rounded-md px-3 py-1",
  confirm: "bg-fuchsia-600 hover:bg-fuchsia-800 text-white rounded-md px-3 py-1",
  accept: "border border-olive-500 text-white rounded-md px-3 py-1 m-auto",
}

const DialogButton = ({ children, variant }) => {
  return (
    <button className={`cursor-pointer ${variants[variant]} text-sm font-mono transition duration-500`}>
      {children}
    </button>
  )
}

export default DialogButton;