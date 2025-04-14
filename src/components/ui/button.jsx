
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

// Add buttonVariants function to match the TypeScript version
const buttonVariants = ({ variant, size, className }) => {
  return cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
      "bg-primary text-primary-foreground hover:bg-primary/90": variant === "default",
      "bg-destructive text-destructive-foreground hover:bg-destructive/90": variant === "destructive",
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground": variant === "outline",
      "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
      "bg-background hover:bg-accent hover:text-accent-foreground": variant === "ghost",
      "text-primary underline-offset-4 hover:underline": variant === "link",
      "h-10 px-4 py-2": size === "default",
      "h-9 rounded-md px-3": size === "sm",
      "h-11 rounded-md px-8": size === "lg",
      "h-8 rounded-md px-2 text-xs": size === "xs",
    },
    className
  )
}

const Button = React.forwardRef(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"
Button.defaultProps = {
  variant: "default",
  size: "default",
  asChild: false
}

export { Button, buttonVariants }
