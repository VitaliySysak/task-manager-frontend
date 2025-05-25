import { cn } from "@/src/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-[var(--dark-grayish-blue)] animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
