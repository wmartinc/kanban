import { Check } from "lucide-react";

const AlertDialog = ({ title, description }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 w-auto max-w-xs bg-elevated border border-zinc-800 p-4 rounded-xl shadow-xl shadow-black/30 animate-[slideUp_0.3s_ease-out]">
      <div className="flex items-start gap-3">
        <Check className="size-5 mt-0.5 text-teal-400 shrink-0" />
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-semibold text-zinc-100">{title}</h1>
          <p className="text-xs text-zinc-400 mt-0.5 truncate">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default AlertDialog;