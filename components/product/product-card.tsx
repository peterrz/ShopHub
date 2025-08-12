"use client"

import type React from "react"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart"
import { useI18n } from "@/lib/i18n"

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    price: number
    originalPrice?: number
    rating: number
    reviewCount: number
    image: string
    category: string
    inStock: boolean
    isNew?: boolean
    isSale?: boolean
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { t } = useI18n()

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  return (
    <Card className="group cursor-pointer border-0 shadow-md hover:shadow-xl transition-all duration-300 dark:bg-gray-800">
      <Link href={`/p/${product.slug}`}>
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && <Badge className="bg-green-500 hover:bg-green-600">{t("common.new")}</Badge>}
            {product.isSale && discountPercentage > 0 && (
              <Badge className="bg-red-500 hover:bg-red-600">-{discountPercentage}%</Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-3 right-3 w-8 h-8 p-0 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault()
              // Add to wishlist logic
            }}
          >
            <Heart className="w-4 h-4" />
          </Button>

          {/* Quick Add to Cart */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              className="w-full bg-primary-custom hover:bg-primary-custom/90"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {product.inStock ? t("cart.add-to-cart") : t("cart.out-of-stock")}
            </Button>
          </div>
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/p/${product.slug}`}>
          <div className="space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">{product.category}</p>
            <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-custom transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">({product.reviewCount})</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900 dark:text-white">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 dark:text-gray-400 line-through">${product.originalPrice}</span>
              )}
            </div>

            {/* Stock Status */}
            {!product.inStock && (
              <Badge variant="secondary" className="text-red-600">
                {t("cart.out-of-stock")}
              </Badge>
            )}
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}
