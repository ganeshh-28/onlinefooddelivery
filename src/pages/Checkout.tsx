import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  MapPin, 
  CreditCard, 
  Wallet, 
  ArrowLeft, 
  Clock, 
  ShoppingBag,
  Plus,
  Edit,
  Check,
  Zap
} from "lucide-react";

// Import food images
import biryaniImg from "@/assets/biryani.jpg";
import dosaImg from "@/assets/dosa.jpg";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  restaurant: string;
}

interface Address {
  id: number;
  type: string;
  address: string;
  isDefault: boolean;
}

export default function Checkout() {
  const [selectedAddress, setSelectedAddress] = useState("1");
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [showAddAddress, setShowAddAddress] = useState(false);

  const cartItems: CartItem[] = [
    {
      id: 1,
      name: "Chicken Biryani",
      price: 299,
      quantity: 2,
      image: biryaniImg,
      restaurant: "Spice Garden",
    },
    {
      id: 2,
      name: "Masala Dosa",
      price: 149,
      quantity: 1,
      image: dosaImg,
      restaurant: "South Delights",
    },
  ];

  const addresses: Address[] = [
    {
      id: 1,
      type: "Home",
      address: "123 Main Street, Apartment 4B, Downtown City, 560001",
      isDefault: true,
    },
    {
      id: 2,
      type: "Office",
      address: "456 Business Park, Tech Tower, Floor 8, Business District, 560002",
      isDefault: false,
    },
  ];

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, RuPay",
    },
    {
      id: "upi",
      name: "UPI",
      icon: Wallet,
      description: "Google Pay, PhonePe, Paytm",
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      icon: Wallet,
      description: "Pay when you receive",
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + deliveryFee + gst;

  const handlePlaceOrder = () => {
    // Here you would typically process the order
    alert("Order placed successfully! (This is just a demo)");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link 
            to="/cart" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-2xl font-bold">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span>Delivery Address</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                  <div className="space-y-3">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedAddress === address.id.toString()
                            ? "border-accent bg-accent/5"
                            : "border-border hover:border-accent/50"
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <RadioGroupItem value={address.id.toString()} className="mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <Label className="font-medium">{address.type}</Label>
                              {address.isDefault && (
                                <Badge variant="secondary" className="text-xs">Default</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{address.address}</p>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                {/* Add New Address */}
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => setShowAddAddress(!showAddAddress)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Address
                </Button>

                {showAddAddress && (
                  <Card className="mt-4 border-dashed">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <Input placeholder="Address Type (Home, Office, etc.)" />
                        <Input placeholder="Complete Address" />
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Cancel</Button>
                          <Button size="sm">Save Address</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-accent" />
                  <span>Payment Method</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedPayment === method.id
                            ? "border-accent bg-accent/5"
                            : "border-border hover:border-accent/50"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value={method.id} />
                          <method.icon className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <Label className="font-medium">{method.name}</Label>
                            <p className="text-sm text-muted-foreground">{method.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                {/* Card Details Form (shown when card is selected) */}
                {selectedPayment === "card" && (
                  <div className="mt-4 p-4 border rounded-lg bg-muted/30">
                    <div className="space-y-3">
                      <Input placeholder="Card Number" />
                      <div className="grid grid-cols-2 gap-3">
                        <Input placeholder="MM/YY" />
                        <Input placeholder="CVV" />
                      </div>
                      <Input placeholder="Cardholder Name" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Delivery Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Instructions (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  className="w-full p-3 border rounded-lg resize-none"
                  rows={3}
                  placeholder="Add delivery instructions for the driver..."
                />
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5" />
                  <span>Order Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">{item.restaurant}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">×{item.quantity}</p>
                        <p className="text-sm">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Express Delivery Option */}
                <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Express Delivery</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground line-through">₹60</span>
                      <span className="text-sm font-medium text-success">FREE</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Get your order in 15-20 minutes
                  </p>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span className={deliveryFee === 0 ? "text-success" : ""}>
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>GST (18%)</span>
                    <span>₹{gst}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

                {/* Estimated Delivery Time */}
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                  <Clock className="w-4 h-4" />
                  <span>Estimated delivery: 25-30 minutes</span>
                </div>

                {/* Place Order Button */}
                <Button 
                  variant="cta" 
                  size="lg" 
                  className="w-full"
                  onClick={handlePlaceOrder}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Place Order ₹{total}
                </Button>

                {/* Security Notice */}
                <div className="text-center text-xs text-muted-foreground">
                  🔒 Your payment information is secure and encrypted
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}