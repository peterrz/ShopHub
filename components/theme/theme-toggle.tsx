"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/lib/theme"
import { Sun, Moon, Palette } from "lucide-react"

export function ThemeToggle() {
  const { theme, primaryColor, setTheme, setPrimaryColor, toggleTheme } = useTheme()

  const colors = [
    { name: "Blue", value: "blue" as const, color: "bg-blue-500" },
    { name: "Green", value: "green" as const, color: "bg-green-500" },
    { name: "Purple", value: "purple" as const, color: "bg-purple-500" },
    { name: "Orange", value: "orange" as const, color: "bg-orange-500" },
    { name: "Red", value: "red" as const, color: "bg-red-500" },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          {theme === "light" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="w-4 h-4 mr-2" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="w-4 h-4 mr-2" />
          Dark
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <div className="px-2 py-1.5 text-sm font-medium flex items-center">
          <Palette className="w-4 h-4 mr-2" />
          Primary Color
        </div>

        {colors.map((color) => (
          <DropdownMenuItem
            key={color.value}
            onClick={() => setPrimaryColor(color.value)}
            className="flex items-center justify-between"
          >
            <span>{color.name}</span>
            <div
              className={`w-4 h-4 rounded-full ${color.color} ${
                primaryColor === color.value ? "ring-2 ring-offset-2 ring-gray-400" : ""
              }`}
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
