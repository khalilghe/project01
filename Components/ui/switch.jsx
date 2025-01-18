"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const Switch = React.forwardRef(({ className, onCheckedChange, ...props }, ref) => {
  const [open, setOpen] = React.useState(false)
  const [pendingState, setPendingState] = React.useState(props.checked)

  const handleToggle = () => {
    setOpen(true)
    setPendingState(!props.checked)
  }

  const handleConfirm = () => {
    onCheckedChange(pendingState)
    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <>
      <SwitchPrimitives.Root
        className={cn(
          "peer inline-flex h-6 w-11 shrink-0 cursor-pointer data-[state=checked]:bg-blue-500 items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-blue-100  ",
          className
        )}
        checked={props.checked}
        onCheckedChange={handleToggle}
        {...props}
        ref={ref}
      >
        <SwitchPrimitives.Thumb
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-white  shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
          )}
        />
      </SwitchPrimitives.Root>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>
              Are you sure you want to change this setting?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
})

Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }

