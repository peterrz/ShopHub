"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Search, User, Menu, X, Heart, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth"
import { useI18n } from "@/lib/i18n"
import { MiniCart } from "@/components/cart/mini-cart"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { LanguageToggle } from "@/components/i18n/language-toggle"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, signOut } = useAuth()
  const { t, direction } = useI18n()

  const handleSignOut = () => {
    signOut()
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50 dark:bg-gray-900/95 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-custom rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif font-bold text-xl text-gray-900 dark:text-white">ShopHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/c/electronics"
              className="text-gray-600 hover:text-primary-custom transition-colors dark:text-gray-300"
            >
              {t("nav.electronics")}
            </Link>
            <Link
              href="/c/fashion"
              className="text-gray-600 hover:text-primary-custom transition-colors dark:text-gray-300"
            >
              {t("nav.fashion")}
            </Link>
            <Link
              href="/c/home-garden"
              className="text-gray-600 hover:text-primary-custom transition-colors dark:text-gray-300"
            >
              {t("nav.home-garden")}
            </Link>
            <Link
              href="/search"
              className="text-gray-600 hover:text-primary-custom transition-colors dark:text-gray-300"
            >
              {t("nav.search")}
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className={`flex items-center gap-4 ${direction === "rtl" ? "flex-row-reverse" : ""}`}>
            {/* Search Icon (Mobile) */}
            <Button variant="ghost" size="sm" className="lg:hidden">
              <Search className="w-5 h-5" />
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Toggle */}
            <LanguageToggle />

            {/* Wishlist */}
            <Button variant="ghost" size="sm" className="relative">
              <Heart className="w-5 h-5" />
              <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs">0</Badge>
            </Button>

            {/* Cart */}
            <MiniCart />

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {user ? (
                  <>
                    <div className="px-2 py-1.5 text-sm font-medium">{user.name}</div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/account">{t("nav.account")}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account/orders">{t("nav.orders")}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account/wishlist">{t("nav.wishlist")}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      {t("nav.signout")}
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/auth/signin">{t("nav.signin")}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/auth/signup">{t("nav.signup")}</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 dark:border-gray-800">
            <nav className="flex flex-col gap-4">
              <Link
                href="/c/electronics"
                className="text-gray-600 hover:text-primary-custom transition-colors dark:text-gray-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.electronics")}
              </Link>
              <Link
                href="/c/fashion"
                className="text-gray-600 hover:text-primary-custom transition-colors dark:text-gray-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.fashion")}
              </Link>
              <Link
                href="/c/home-garden"
                className="text-gray-600 hover:text-primary-custom transition-colors dark:text-gray-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.home-garden")}
              </Link>
              <Link
                href="/search"
                className="text-gray-600 hover:text-primary-custom transition-colors dark:text-gray-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.search")}
              </Link>
              {user && (
                <>
                  <hr className="my-2" />
                  <Link
                    href="/account"
                    className="text-gray-600 hover:text-primary-custom transition-colors dark:text-gray-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("nav.account")}
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="text-left text-gray-600 hover:text-primary-custom transition-colors dark:text-gray-300"
                  >
                    {t("nav.signout")}
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
