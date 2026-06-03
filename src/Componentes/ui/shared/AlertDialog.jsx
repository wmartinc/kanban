// We will have 3 types of dialogs: alerts, confirmations and prompts. Each of them will have a different structure and behavior.

import { AlertTriangle } from "lucide-react";
import Button from "./Button";
import { AlertTriangleIcon } from "lucide-react";
import { AlertCircle } from "lucide-react";
import DialogButton from "./DialogButton";
import { Check } from "lucide-react";

const baseClasses = "fixed text-center md:bottom-15 md:right-0 w-full bottom-2 right-0 h-35"
const variants = {
  alert: "flex items-center",
  confirmation: "flex-col",
  prompt: "flex-col"
}

const AlertDialog = ({ title, description, onConfirm, onCancel, variant }) => {
  return (
    <div className={`${baseClasses} ${variants[variant]} bg-neutral-950 flex gap-4 sm:w-80 h-auto animacion border border-white/20 p-2 text-white rounded-md`}>
      <div className="flex">
        {variant === "confirmation" && <AlertCircle className="size-6 m-4 stroke-olive-500" />}
        {variant === "advise" && <Check className="size-6 m-4 stroke-green-500" />}
        <div className="flex items-center flex-col flex-1">
          <h1 className="text-lg font-semibold">{title}</h1>
          <p className="text-sm text-ellipsis max-w-50 overflow-hidden text-nowrap">{description}</p>
        </div>
      </div>
      {variant === "confirmation" && <div className="w-full flex justify-center gap-2">
        <DialogButton variant="cancel">Cancelar</DialogButton>
        <DialogButton variant="confirm">Confirmar</DialogButton>
      </div>}
      {
        variant === "prompt" && <DialogButton variant="accept">Aceptar</DialogButton>
      }
    </div>
  )
}

export default AlertDialog;