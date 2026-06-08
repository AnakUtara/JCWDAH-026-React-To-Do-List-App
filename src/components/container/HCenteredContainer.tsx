import type { ReactNode } from "react"

type Props = {
  children: ReactNode
  className?: string
  zIndex?: number
}

const HCenteredContainer = ({ children, className, zIndex }: Props) => {
  return (
    <div
      className={`relative z-${zIndex ?? 30} container mx-auto max-w-81.75 md:max-w-135.25 ${className}`}
    >
      {children}
    </div>
  )
}
export default HCenteredContainer
