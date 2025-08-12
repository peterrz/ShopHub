"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useCart } from "@/lib/cart"
import { useAuth } from "@/lib/auth"
import { CreditCard, Truck, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface CheckoutForm {
  // Shipping Address
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string

  // Payment
  cardNumber: string
  expiryDate: string
  cvv: string
  cardName: string

  // Billing same as shipping
  billingDifferent: boolean
  billingAddress?: {
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")
  const [currentStep, setCurrentStep] = useState("shipping")

  const [form, setForm] = useState<CheckoutForm>({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    billingDifferent: false,
  })

  const shippingCost = totalPrice > 50 ? 0 : 9.99
  const tax = totalPrice * 0.08
  const finalTotal = totalPrice + shippingCost + tax

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif font-bold text-3xl text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some items to your cart before checking out.</p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/c/featured">Start Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleInputChange = (field: keyof CheckoutForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const validateShipping = () => {
    const required = ["firstName", "lastName", "email", "address", "city", "state", "zipCode"]
    return required.every((field) => form[field as keyof CheckoutForm])
  }

  const validatePayment = () => {
    return form.cardNumber && form.expiryDate && form.cvv && form.cardName
  }

  const handlePlaceOrder = async () => {
    if (!validateShipping() || !validatePayment()) {
      setError("Please fill in all required fields")
      return
    }

    setIsProcessing(true)
    setError("")

    try {
      // Mock order processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create order object
      const order = {
        id: `ORD-${Date.now()}`,
        items,
        total: finalTotal,
        shippingAddress: {
          firstName: form.firstName,
          lastName: form.lastName,
          address: form.address,
          city: form.city,
          state: form.state,
          zipCode: form.zipCode,
          country: form.country,
        },
        createdAt: new Date().toISOString(),
      }

      // Save order to localStorage (in real app, send to server)
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")
      localStorage.setItem("orders", JSON.stringify([order, ...existingOrders]))

      // Clear cart
      clearCart()

      // Redirect to success page
      router.push(`/checkout/success?orderId=${order.id}`)
    } catch (error) {
      setError("Failed to process order. Please try again.")
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="font-serif font-bold text-3xl text-gray-900">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Tabs value={currentStep} onValueChange={setCurrentStep}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="shipping" className="flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  Shipping
                </TabsTrigger>
                <TabsTrigger value="payment" disabled={!validateShipping()}>
                  <CreditCard className="w-4 h-4" />
                  Payment
                </TabsTrigger>
                <TabsTrigger value="review" disabled={!validateShipping() || !validatePayment()}>
                  <Shield className="w-4 h-4" />
                  Review
                </TabsTrigger>
              </TabsList>

              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <TabsContent value="shipping" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={form.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={form.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={form.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Address *</Label>
                      <Input
                        id="address"
                        value={form.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={form.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Select value={form.state} onValueChange={(value) => handleInputChange("state", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CA">California</SelectItem>
                            <SelectItem value="NY">New York</SelectItem>
                            <SelectItem value="TX">Texas</SelectItem>
                            <SelectItem value="FL">Florida</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="zipCode">ZIP Code *</Label>
                        <Input
                          id="zipCode"
                          value={form.zipCode}
                          onChange={(e) => handleInputChange("zipCode", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Country *</Label>
                        <Select value={form.country} onValueChange={(value) => handleInputChange("country", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="CA">Canada</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button
                      onClick={() => setCurrentStep("payment")}
                      disabled={!validateShipping()}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Continue to Payment
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payment" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="cardName">Name on Card *</Label>
                      <Input
                        id="cardName"
                        value={form.cardName}
                        onChange={(e) => handleInputChange("cardName", e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={form.cardNumber}
                        onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date *</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={form.expiryDate}
                          onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={form.cvv}
                          onChange={(e) => handleInputChange("cvv", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Test Mode:</strong> Use card number 4242 4242 4242 4242 with any future expiry date and
                        any 3-digit CVV.
                      </p>
                    </div>

                    <Button
                      onClick={() => setCurrentStep("review")}
                      disabled={!validatePayment()}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Review Order
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="review" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Review Your Order</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Order Items */}
                    <div>
                      <h3 className="font-semibold mb-4">Order Items</h3>
                      <div className="space-y-3">
                        {items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center">
                            <div>
                              <span className="font-medium">{item.name}</span>
                              <span className="text-gray-600 ml-2">x{item.quantity}</span>
                            </div>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div>
                      <h3 className="font-semibold mb-2">Shipping Address</h3>
                      <div className="text-gray-600">
                        <p>
                          {form.firstName} {form.lastName}
                        </p>
                        <p>{form.address}</p>
                        <p>
                          {form.city}, {form.state} {form.zipCode}
                        </p>
                        <p>{form.country}</p>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <h3 className="font-semibold mb-2">Payment Method</h3>
                      <p className="text-gray-600">**** **** **** {form.cardNumber.slice(-4)}</p>
                    </div>

                    <Button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="w-full bg-green-600 hover:bg-green-700"
                      size="lg"
                    >
                      {isProcessing ? "Processing..." : `Place Order - $${finalTotal.toFixed(2)}`}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <hr />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <hr />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
