import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Truck, Shield, Headphones } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="font-serif font-bold text-4xl lg:text-6xl text-gray-900 dark:text-white leading-tight">
                  <span className="block">Discover Amazing Products.</span>
                  <span className="text-primary-custom">Shop with Confidence.</span>
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Your one-stop destination for quality products, exceptional service, and unbeatable prices.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary-custom hover:bg-primary-custom/90 text-white px-8 py-3 text-lg"
                >
                  <Link href="/c/featured">
                    Shop Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-primary-custom text-primary-custom hover:bg-primary-50 px-8 py-3 text-lg bg-transparent"
                >
                  <Link href="/c/new-arrivals">Browse Collections</Link>
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-green-500" />
                  <span>Free shipping over $50</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>30-day returns</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20 rounded-3xl p-8 flex items-center justify-center">
                <img
                  src="/modern-ecommerce-hero.png"
                  alt="Featured Products"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-serif font-bold text-3xl lg:text-4xl text-gray-900 dark:text-white">
              Featured Collections
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our curated selection of premium products across various categories.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer dark:bg-gray-800">
              <CardHeader className="p-0">
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20 rounded-t-lg overflow-hidden">
                  <img
                    src="/electronics-category.png"
                    alt="Electronics"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="font-serif text-xl mb-2 dark:text-white">Electronics</CardTitle>
                <CardDescription className="text-base leading-relaxed mb-4 dark:text-gray-300">
                  Latest gadgets and tech essentials for modern living.
                </CardDescription>
                <Button
                  asChild
                  variant="outline"
                  className="w-full bg-transparent border-primary-custom text-primary-custom hover:bg-primary-50"
                >
                  <Link href="/c/electronics">Shop Electronics</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer dark:bg-gray-800">
              <CardHeader className="p-0">
                <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/20 dark:to-green-800/20 rounded-t-lg overflow-hidden">
                  <img
                    src="/fashion-clothing-category.png"
                    alt="Fashion"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="font-serif text-xl mb-2 dark:text-white">Fashion</CardTitle>
                <CardDescription className="text-base leading-relaxed mb-4 dark:text-gray-300">
                  Trendy clothing and accessories for every style.
                </CardDescription>
                <Button
                  asChild
                  variant="outline"
                  className="w-full bg-transparent border-primary-custom text-primary-custom hover:bg-primary-50"
                >
                  <Link href="/c/fashion">Shop Fashion</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer dark:bg-gray-800">
              <CardHeader className="p-0">
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/20 dark:to-purple-800/20 rounded-t-lg overflow-hidden">
                  <img
                    src="/home-decor-category.png"
                    alt="Home & Garden"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="font-serif text-xl mb-2 dark:text-white">Home & Garden</CardTitle>
                <CardDescription className="text-base leading-relaxed mb-4 dark:text-gray-300">
                  Beautiful items to make your house a home.
                </CardDescription>
                <Button
                  asChild
                  variant="outline"
                  className="w-full bg-transparent border-primary-custom text-primary-custom hover:bg-primary-50"
                >
                  <Link href="/c/home-garden">Shop Home & Garden</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-serif font-bold text-3xl lg:text-4xl text-gray-900 dark:text-white">Why Choose Us</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experience the difference with our commitment to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto">
                <Truck className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-serif text-xl font-semibold dark:text-white">Fast & Free Shipping</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Free shipping on orders over $50. Express delivery available.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-serif text-xl font-semibold dark:text-white">Secure Shopping</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your data is protected with industry-leading security measures.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto">
                <Headphones className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-serif text-xl font-semibold dark:text-white">24/7 Support</h3>
              <p className="text-gray-600 dark:text-gray-300">Our customer service team is here to help you anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-primary-custom">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <h2 className="font-serif font-bold text-3xl lg:text-4xl text-white">Stay in the Loop</h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Subscribe to our newsletter for exclusive deals, new arrivals, and style inspiration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-primary-300"
              />
              <Button className="bg-white text-primary-custom hover:bg-gray-100 px-6 py-3">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
