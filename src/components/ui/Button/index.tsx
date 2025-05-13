import { forwardRef } from 'react'
import { StyledButton } from './styles'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: React.Ref<HTMLButtonElement>
  asChild?: boolean
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <StyledButton
        variant={variant}
        size={size}
        className={className}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button } 