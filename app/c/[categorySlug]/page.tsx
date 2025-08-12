"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCard } from "@/components/product/product-card"
import { ProductFilters } from "@/components/product/product-filters"
import { Grid, List, SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface CategoryPageProps {
  params: {
    categorySlug: string
  }
}

// Mock product data
const mockProducts = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    slug: "iphone-15-pro-max",
    price: 1199,
    originalPrice: 1299,
    rating: 4.8,
    reviewCount: 2847,
    image: "/iphone-15-pro-max.png",
    category: "Electronics",
    inStock: true,
    isNew: true,
    isSale: true,
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    price: 1099,
    rating: 4.7,
    reviewCount: 1923,
    image: "/samsung-galaxy-s24-ultra.png",
    category: "Electronics",
    inStock: true,
    isNew: true,
  },
  {
    id: "3",
    name: "Nike Air Max 270",
    slug: "nike-air-max-270",
    price: 150,
    originalPrice: 180,
    rating: 4.5,
    reviewCount: 892,
    image: "/nike-air-max-270.png",
    category: "Fashion",
    inStock: true,
    isSale: true,
  },
  {
    id: "4",
    name: "MacBook Pro 16-inch",
    slug: "macbook-pro-16",
    price: 2499,
    rating: 4.9,
    reviewCount: 1456,
    image: "/macbook-pro-16-inch.png",
    category: "Electronics",
    inStock: false,
  },
  {
    id: "5",
    name: "Adidas Ultraboost 22",
    slug: "adidas-ultraboost-22",
    price: 190,
    rating: 4.6,
    reviewCount: 634,
    image: "/adidas-ultraboost-22.png",
    category: "Fashion",
    inStock: true,
  },
  {
    id: "6",
    name: "Sony WH-1000XM5",
    slug: "sony-wh-1000xm5",
    price: 399,
    originalPrice: 449,
    rating: 4.8,
    reviewCount: 2103,
    image: "/sony-wh-1000xm5.png",
    category: "Electronics",
    inStock: true,
    isSale: true,
  },
]

export default function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = params
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [filters, setFilters] = useState({})

  const categoryName = categorySlug.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())

  // Filter products based on category
  const filteredProducts = mockProducts.filter(
    (product) => categorySlug === "featured" || product.category.toLowerCase() === categoryName.toLowerCase(),
  )

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters)
    // Apply filters logic here
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <a href="/" className="hover:text-blue-600">
            Home
          </a>
          <span>/</span>
          <span className="text-gray-900">{categoryName}</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="font-serif font-bold text-3xl lg:text-4xl text-gray-900 mb-2">{categoryName}</h1>
            <p className="text-gray-600">Showing {filteredProducts.length} products</p>
          </div>

          {/* Sort and View Controls */}
          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Customer Rating</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            {/* Mobile Filter Toggle */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <ProductFilters onFiltersChange={handleFiltersChange} />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <ProductFilters onFiltersChange={handleFiltersChange} />
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button variant="default">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
