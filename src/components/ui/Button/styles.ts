import { craft, embroider } from "@dennerrondinely/tailor";
import { type ButtonProps } from "./index";

const buttonEmbroider = embroider({
  base: "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
});

export const StyledButton = craft<ButtonProps>("button")({
  ...buttonEmbroider,
  dynamic: {
    "bg-primary text-primary-foreground shadow hover:bg-primary/90": (props) =>
      props.variant === "default",
    "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90":
      (props) => props.variant === "destructive",
    "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground":
      (props) => props.variant === "outline",
    "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80": (
      props
    ) => props.variant === "secondary",
    "hover:bg-accent hover:text-accent-foreground": (props) =>
      props.variant === "ghost",
    "text-primary underline-offset-4 hover:underline": (props) =>
      props.variant === "link",
    "h-9 px-4 py-2": (props) => props.size === "default",
    "h-8 rounded-md px-3 text-xs": (props) => props.size === "sm",
    "h-10 rounded-md px-8": (props) => props.size === "lg",
    "h-9 w-9": (props) => props.size === "icon",
  },
});
