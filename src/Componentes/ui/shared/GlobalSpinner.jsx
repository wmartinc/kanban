const GlobalSpinner = () => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/40">
      <div className="h-15 w-15 rounded-full border-4 border-white/20 border-t-purple-400 animate-spin" />
    </div>
  )
}

export default GlobalSpinner;