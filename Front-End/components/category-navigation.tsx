"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const categories = [
  { name: "Gömlekler", href: "/category/shirts" },
  { name: "Pantolonlar", href: "/category/pants" },
  { name: "Ceketler", href: "/category/jackets" },
  { name: "Ayakkabılar", href: "/category/shoes" },
]

export function CategoryNavigation() {
  const pathname = usePathname()

  return (
    <NavigationMenu className="mx-auto max-w-screen-xl">
      <NavigationMenuList className="flex-wrap">
        {categories.map((category) => {
          const isActive = pathname === category.href

          return (
            <NavigationMenuItem key={category.name}>
              <Link href={category.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    isActive ? "bg-gray-100 text-gray-900 font-semibold" : "text-gray-700 hover:bg-gray-50",
                  )}
                >
                  {category.name}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
