"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { X, Filter } from "lucide-react"

interface ProductFiltersProps {
  onFiltersChange: (filters: any) => void
}

export function ProductFilters({ onFiltersChange }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [inStockOnly, setInStockOnly] = useState(false)

  const brands = ["Apple", "Samsung", "Nike", "Adidas", "Sony", "LG"]
  const ratings = [5, 4, 3, 2, 1]

  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked ? [...selectedBrands, brand] : selectedBrands.filter((b) => b !== brand)
    setSelectedBrands(newBrands)
    updateFilters({ brands: newBrands })
  }

  const handleRatingChange = (rating: number, checked: boolean) => {
    const newRatings = checked ? [...selectedRatings, rating] : selectedRatings.filter((r) => r !== rating)
    setSelectedRatings(newRatings)
    updateFilters({ ratings: newRatings })
  }

  const updateFilters = (newFilters: any) => {
    onFiltersChange({
      priceRange,
      brands: selectedBrands,
      ratings: selectedRatings,
      inStockOnly,
      ...newFilters,
    })
  }

  const clearAllFilters = () => {
    setPriceRange([0, 1000])
    setSelectedBrands([])
    setSelectedRatings([])
    setInStockOnly(false)
    onFiltersChange({})
  }

  const hasActiveFilters = selectedBrands.length > 0 || selectedRatings.length > 0 || inStockOnly

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          <h3 className="font-semibold">Filters</h3>
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            <X className="w-4 h-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedBrands.map((brand) => (
            <Badge key={brand} variant="secondary" className="cursor-pointer">
              {brand}
              <X className="w-3 h-3 ml-1" onClick={() => handleBrandChange(brand, false)} />
            </Badge>
          ))}
          {selectedRatings.map((rating) => (
            <Badge key={rating} variant="secondary" className="cursor-pointer">
              {rating}+ Stars
              <X className="w-3 h-3 ml-1" onClick={() => handleRatingChange(rating, false)} />
            </Badge>
          ))}
          {inStockOnly && (
            <Badge variant="secondary" className="cursor-pointer">
              In Stock
              <X className="w-3 h-3 ml-1" onClick={() => setInStockOnly(false)} />
            </Badge>
          )}
        </div>
      )}

      {/* Price Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={(value) => {
              setPriceRange(value)
              updateFilters({ priceRange: value })
            }}
            max={1000}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Brands */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Brands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
              />
              <label htmlFor={brand} className="text-sm cursor-pointer">
                {brand}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Rating */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Customer Rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {ratings.map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={selectedRatings.includes(rating)}
                onCheckedChange={(checked) => handleRatingChange(rating, checked as boolean)}
              />
              <label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer">
                {rating} Stars & Up
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Availability */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={inStockOnly}
              onCheckedChange={(checked) => {
                setInStockOnly(checked as boolean)
                updateFilters({ inStockOnly: checked })
              }}
            />
            <label htmlFor="in-stock" className="text-sm cursor-pointer">
              In Stock Only
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
