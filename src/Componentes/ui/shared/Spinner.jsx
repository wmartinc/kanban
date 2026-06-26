const Spinner = () => {
  return (
    <div className="w-full h-full flex items-center justify-center gap-2">
      <div className="size-3 rounded-full bg-purple-400/70 animate-bounce ease-in-out" ></div>
      <div className="size-3 rounded-full bg-teal-400/70 animate-bounce ease-in-out [animation-delay:100ms]" ></div>
      <div className="size-3 rounded-full bg-purple-400/70 animate-bounce ease-in-out [animation-delay:200ms]" ></div>
    </div>
  )
}

export default Spinner;