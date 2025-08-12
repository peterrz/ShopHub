"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Package, Truck, ArrowRight } from "lucide-react"

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    if (orderId) {
      // Get order from localStorage (in real app, fetch from server)
      const orders = JSON.parse(localStorage.getItem("orders") || "[]")
      const foundOrder = orders.find((o: any) => o.id === orderId)
      setOrder(foundOrder)
    }
  }, [orderId])

  if (!order) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif font-bold text-3xl text-gray-900 mb-4">Order not found</h1>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="font-serif font-bold text-3xl text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-lg text-gray-600">Thank you for your purchase. Your order has been successfully placed.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Details */}
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Order Number:</span>
                <span>{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Order Date:</span>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Total Amount:</span>
                <span className="font-bold">${order.total.toFixed(2)}</span>
              </div>

              <hr />

              <div>
                <h3 className="font-medium mb-3">Items Ordered:</h3>
                <div className="space-y-2">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Info */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Shipping Address:</h3>
                <div className="text-gray-600">
                  <p>
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                  </p>
                  <p>{order.shippingAddress.address}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>

              <hr />

              <div>
                <h3 className="font-medium mb-3">Estimated Delivery:</h3>
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span>3-5 business days</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Package className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-medium mb-2">Order Processing</h3>
                <p className="text-sm text-gray-600">We'll prepare your items for shipment within 1-2 business days.</p>
              </div>
              <div className="text-center">
                <Truck className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-medium mb-2">Shipping Updates</h3>
                <p className="text-sm text-gray-600">
                  You'll receive tracking information via email once your order ships.
                </p>
              </div>
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-medium mb-2">Delivery</h3>
                <p className="text-sm text-gray-600">Your order will arrive within 3-5 business days.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/account/orders">
              View Order History
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/c/featured">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
