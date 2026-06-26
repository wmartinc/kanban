import { AlertCircle, Check } from "lucide-react";
import DialogButton from "./DialogButton";

const baseClasses = "fixed bottom-4 right-4 z-50 w-auto max-w-xs"
const variants = {
  alert: "",
  confirmation: "",
  prompt: ""
}

const AlertDialog = ({ title, description, onConfirm, onCancel, variant }) => {
  return (
    <div className={`${baseClasses} ${variants[variant]} bg-elevated border border-zinc-800 p-4 rounded-xl shadow-xl shadow-black/30 animate-[slideUp_0.3s_ease-out]`}>
      <div className="flex items-start gap-3">
        {variant === "confirmation" && <AlertCircle className="size-5 mt-0.5 text-amber-400 shrink-0" />}
        {variant === "advise" && <Check className="size-5 mt-0.5 text-teal-400 shrink-0" />}
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-semibold text-zinc-100">{title}</h1>
          <p className="text-xs text-zinc-400 mt-0.5 truncate">{description}</p>
        </div>
      </div>
      {variant === "confirmation" && <div className="flex gap-2 mt-3 justify-end">
        <DialogButton variant="cancel">Cancelar</DialogButton>
        <DialogButton variant="confirm">Confirmar</DialogButton>
      </div>}
      {
        variant === "prompt" && <div className="flex justify-end mt-3"><DialogButton variant="accept">Aceptar</DialogButton></div>
      }
    </div>
  )
}

export default AlertDialog;