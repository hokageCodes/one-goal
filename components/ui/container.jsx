import { cn } from "@/lib/utils";

export default function Container({ children, className, as: Component = "div" }) {
  return (
    <Component className={cn("container mx-auto px-4 md:px-6", className)}>
      {children}
    </Component>
  );
}
