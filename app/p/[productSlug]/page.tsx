"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Plus, Minus } from "lucide-react"
import { useCart } from "@/lib/cart"

interface ProductPageProps {
  params: {
    productSlug: string
  }
}

// Mock product data
const mockProduct = {
  id: "1",
  name: "iPhone 15 Pro Max",
  slug: "iphone-15-pro-max",
  price: 1199,
  originalPrice: 1299,
  rating: 4.8,
  reviewCount: 2847,
  images: [
    "/iphone-15-pro-max-front.png",
    "/iphone-15-pro-max-back.png",
    "/iphone-15-pro-max-side.png",
    "/iphone-15-pro-max-camera.png",
  ],
  category: "Electronics",
  brand: "Apple",
  inStock: true,
  stockCount: 15,
  description:
    "The iPhone 15 Pro Max features a stunning titanium design, the powerful A17 Pro chip, and an advanced camera system that takes mobile photography to the next level.",
  features: [
    "6.7-inch Super Retina XDR display",
    "A17 Pro chip with 6-core GPU",
    "Pro camera system with 48MP main camera",
    "Up to 29 hours video playback",
    "Titanium design with textured matte glass back",
  ],
  variants: {
    storage: ["128GB", "256GB", "512GB", "1TB"],
    color: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
  },
  specifications: {
    Display: "6.7-inch Super Retina XDR",
    Chip: "A17 Pro",
    Camera: "48MP Main, 12MP Ultra Wide, 12MP Telephoto",
    Battery: "Up to 29 hours video playback",
    Storage: "128GB, 256GB, 512GB, 1TB",
    "Operating System": "iOS 17",
  },
}

const mockReviews = [
  {
    id: "1",
    user: "John D.",
    rating: 5,
    date: "2024-01-15",
    title: "Amazing phone!",
    content: "The camera quality is incredible and the battery life is excellent. Highly recommend!",
  },
  {
    id: "2",
    user: "Sarah M.",
    rating: 4,
    date: "2024-01-10",
    title: "Great upgrade",
    content: "Coming from iPhone 13, this is a significant improvement. The titanium feels premium.",
  },
]

export default function ProductPage({ params }: ProductPageProps) {
  const { productSlug } = params
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedStorage, setSelectedStorage] = useState("128GB")
  const [selectedColor, setSelectedColor] = useState("Natural Titanium")
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  const discountPercentage = mockProduct.originalPrice
    ? Math.round(((mockProduct.originalPrice - mockProduct.price) / mockProduct.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    addItem({
      productId: mockProduct.id,
      name: mockProduct.name,
      price: mockProduct.price,
      image: mockProduct.images[0],
      quantity,
      variant: {
        storage: selectedStorage,
        color: selectedColor,
      },
    })
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
          <a href="/c/electronics" className="hover:text-blue-600">
            Electronics
          </a>
          <span>/</span>
          <span className="text-gray-900">{mockProduct.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={mockProduct.images[selectedImage] || "/placeholder.svg"}
                alt={mockProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {mockProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-blue-600" : "border-transparent"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${mockProduct.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">{mockProduct.brand}</p>
              <h1 className="font-serif font-bold text-3xl text-gray-900 mb-4">{mockProduct.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(mockProduct.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {mockProduct.rating} ({mockProduct.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">${mockProduct.price}</span>
                {mockProduct.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">${mockProduct.originalPrice}</span>
                    <Badge className="bg-red-500">Save {discountPercentage}%</Badge>
                  </>
                )}
              </div>
            </div>

            {/* Variants */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Storage</label>
                <Select value={selectedStorage} onValueChange={setSelectedStorage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProduct.variants.storage.map((storage) => (
                      <SelectItem key={storage} value={storage}>
                        {storage}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProduct.variants.color.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.min(mockProduct.stockCount, quantity + 1))}
                  disabled={quantity >= mockProduct.stockCount}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-1">{mockProduct.stockCount} items in stock</p>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!mockProduct.inStock}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {mockProduct.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
              <Button variant="outline" className="w-full bg-transparent" size="lg">
                Buy Now
              </Button>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-5 h-5 text-green-600" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="w-5 h-5 text-green-600" />
                <span>2-year warranty included</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw className="w-5 h-5 text-green-600" />
                <span>30-day return policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({mockProduct.reviewCount})</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-6">{mockProduct.description}</p>
                  <h3 className="font-semibold text-lg mb-4">Key Features</h3>
                  <ul className="space-y-2">
                    {mockProduct.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-4">
                    {Object.entries(mockProduct.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                        <span className="font-medium text-gray-700">{key}</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {mockReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold">{review.title}</h4>
                          <p className="text-sm text-gray-600">
                            by {review.user} on {review.date}
                          </p>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
