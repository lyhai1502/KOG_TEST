import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
    return (
        <nav aria-label="Breadcrumb" className={cn("flex items-center space-x-1 text-sm", className)}>
            <Link href="/buyer/dashboard" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                <Home className="h-4 w-4" />
            </Link>

            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <div key={index} className="flex items-center space-x-1">
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        {item.href && !isLast ? (
                            <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                                {item.label}
                            </Link>
                        ) : (
                            <span className={cn(isLast ? "font-medium text-foreground" : "text-muted-foreground")}>{item.label}</span>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
