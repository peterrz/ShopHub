"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductCard } from "@/components/product/product-card"
import { Search, X } from "lucide-react"

// Mock search results
const mockSearchResults = [
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
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState(mockSearchResults)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    // Simulate search delay
    setTimeout(() => {
      // Filter mock results based on query
      const filtered = mockSearchResults.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()),
      )
      setSearchResults(filtered)
      setIsSearching(false)
    }, 500)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="max-w-2xl mx-auto mb-12">
          <h1 className="font-serif font-bold text-3xl lg:text-4xl text-gray-900 mb-6 text-center">Search Products</h1>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-10 py-3 text-lg"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {isSearching ? "Searching..." : `Search results for "${searchQuery}"`}
              </h2>
              <p className="text-gray-600">
                {searchResults.length} {searchResults.length === 1 ? "result" : "results"} found
              </p>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : !isSearching && searchQuery ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No products found for "{searchQuery}"</p>
                <p className="text-sm text-gray-500">Try searching with different keywords</p>
              </div>
            ) : null}
          </div>
        )}

        {/* Popular Searches */}
        {!searchQuery && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Popular Searches</h2>
            <div className="flex flex-wrap gap-2">
              {["iPhone", "Samsung", "Nike", "MacBook", "Headphones", "Sneakers"].map((term) => (
                <Button key={term} variant="outline" size="sm" onClick={() => handleSearch(term)}>
                  {term}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
