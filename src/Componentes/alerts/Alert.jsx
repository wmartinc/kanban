import { CircleCheck, CircleX } from "lucide-react";

/***
 * @param {object} props
 * @param {string} props.type - type of alert can be: success or error 
 */

const Alert = ({type}) => {
  const isSuccess = type === "success";
  const Icon = isSuccess ? CircleCheck : CircleX;

  return (
    <div className={`alert ${type}`} role="status" aria-live="polite">
      <span className={`flex-center size-9 shrink-0 rounded-full ${isSuccess ? "bg-teal-500/15 text-teal-400" : "bg-red-500/15 text-red-400"}`}>
        <Icon className="size-5" />
      </span>
      <div className="flex flex-col">
        <span className="text-sm font-semibold leading-tight text-zinc-100">
          {isSuccess ? "Success!" : "Error!"}
        </span>
        <span className="text-xs leading-snug text-zinc-400">
          {isSuccess ? "Process completed successfully!" : "Try again, something went wrong!"}
        </span>
      </div>
    </div>
  )
}

export default Alert;