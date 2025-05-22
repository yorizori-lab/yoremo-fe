"use client"

import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle, CheckCircle, Info } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, variant, ...props }) => (
        <Toast key={id} {...props} className="mx-auto" variant={variant}>
          <div className="flex items-start gap-3">
            {variant === "destructive" && (
              <AlertCircle className="h-5 w-5 text-white mt-0.5" />
            )}
            {variant === "success" && (
              <CheckCircle className="h-5 w-5 text-white mt-0.5" />
            )}
            {(!variant || variant === "default") && (
              <Info className="h-5 w-5 text-primary mt-0.5" />
            )}
            <div className="grid gap-1 flex-1">
              {title && <ToastTitle className="">{title}</ToastTitle>}
              {description && <ToastDescription className="">{description}</ToastDescription>}
            </div>
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}
