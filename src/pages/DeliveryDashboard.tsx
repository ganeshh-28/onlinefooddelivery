import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Package, 
  Phone, 
  Navigation,
  CheckCircle,
  XCircle,
  Timer,
  Star,
  TrendingUp
} from "lucide-react";

// Sample delivery agent data
const agentStats = {
  todayEarnings: 1250,
  totalDeliveries: 8,
  avgRating: 4.8,
  totalDistance: 45
};

const availableOrders = [
  {
    id: "ORD001",
    restaurant: "Pizza Palace",
    restaurantAddress: "Sector 15, Near Mall",
    customer: "John Doe",
    customerAddress: "Sector 18, Flat 204, Tower B",
    amount: 450,
    distance: "2.5 km",
    estimatedTime: "15 mins",
    orderItems: ["Margherita Pizza", "Garlic Bread", "Coke"],
    pickupTime: "12:30 PM",
    specialInstructions: "Ring doorbell twice"
  },
  {
    id: "ORD002",
    restaurant: "Burger Hub",
    restaurantAddress: "Sector 22, Main Road",
    customer: "Jane Smith",
    customerAddress: "Sector 25, House 145",
    amount: 320,
    distance: "1.8 km",
    estimatedTime: "12 mins",
    orderItems: ["Cheese Burger", "Fries", "Milkshake"],
    pickupTime: "12:45 PM",
    specialInstructions: "Leave at door"
  },
  {
    id: "ORD003",
    restaurant: "Spice Garden",
    restaurantAddress: "Sector 12, Food Court",
    customer: "Mike Johnson",
    customerAddress: "Sector 20, Office Complex",
    amount: 680,
    distance: "3.2 km",
    estimatedTime: "18 mins",
    orderItems: ["Chicken Biryani", "Raita", "Dessert"],
    pickupTime: "1:00 PM",
    specialInstructions: "Call before delivery"
  }
];

const activeDeliveries = [
  {
    id: "ORD004",
    restaurant: "Taco Corner",
    customer: "Sarah Wilson",
    customerAddress: "Sector 16, Apartment 301",
    amount: 290,
    status: "picked-up",
    estimatedDelivery: "1:15 PM",
    distance: "1.2 km remaining"
  }
];

const completedOrders = [
  {
    id: "ORD005",
    restaurant: "Pasta Point",
    customer: "David Brown",
    amount: 380,
    deliveredAt: "11:45 AM",
    earnings: 45,
    rating: 5,
    tip: 20
  },
  {
    id: "ORD006",
    restaurant: "Sushi Express",
    customer: "Lisa Davis",
    amount: 560,
    deliveredAt: "10:30 AM",
    earnings: 55,
    rating: 4,
    tip: 0
  }
];

export default function DeliveryDashboard() {
  const [isOnline, setIsOnline] = useState(true);

  const acceptOrder = (orderId: string) => {
    alert(`Order ${orderId} accepted! Navigate to restaurant for pickup.`);
  };

  const rejectOrder = (orderId: string) => {
    alert(`Order ${orderId} rejected.`);
  };

  const completeDelivery = (orderId: string) => {
    alert(`Order ${orderId} marked as delivered!`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Status */}
      <div className="bg-gradient-food text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Delivery Dashboard</h1>
              <p className="text-white/90">Manage your deliveries and earnings</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-white/80">Status</p>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className="font-medium">{isOnline ? 'Online' : 'Offline'}</span>
                </div>
              </div>
              <Button
                onClick={() => setIsOnline(!isOnline)}
                variant={isOnline ? "destructive" : "secondary"}
                className="bg-white/20 hover:bg-white/30 border-white/30"
              >
                {isOnline ? 'Go Offline' : 'Go Online'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-green-100 mr-4">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Today's Earnings</p>
                  <h3 className="text-2xl font-bold">₹{agentStats.todayEarnings}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-blue-100 mr-4">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Deliveries</p>
                  <h3 className="text-2xl font-bold">{agentStats.totalDeliveries}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-yellow-100 mr-4">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rating</p>
                  <h3 className="text-2xl font-bold">{agentStats.avgRating}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-purple-100 mr-4">
                  <Navigation className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Distance</p>
                  <h3 className="text-2xl font-bold">{agentStats.totalDistance} km</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="available" className="space-y-6">
          <TabsList className="grid w-full lg:w-[600px] grid-cols-3">
            <TabsTrigger value="available">Available Orders ({availableOrders.length})</TabsTrigger>
            <TabsTrigger value="active">Active Deliveries ({activeDeliveries.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed Orders</TabsTrigger>
          </TabsList>

          {/* Available Orders Tab */}
          <TabsContent value="available">
            <div className="space-y-4">
              {!isOnline && (
                <Card className="border-orange-200 bg-orange-50">
                  <CardContent className="p-4">
                    <p className="text-orange-800 font-medium">You're currently offline. Go online to receive order requests.</p>
                  </CardContent>
                </Card>
              )}
              
              {availableOrders.map((order) => (
                <Card key={order.id} className={`${!isOnline ? 'opacity-50' : 'hover:shadow-medium'} transition-all`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Package className="w-5 h-5" />
                        {order.id}
                      </CardTitle>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-bold text-lg">₹{order.amount}</p>
                          <p className="text-sm text-muted-foreground">Order Value</p>
                        </div>
                        <Badge variant="secondary">Pickup: {order.pickupTime}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Restaurant Details */}
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">{order.restaurant}</h4>
                        <p className="text-sm text-muted-foreground">{order.restaurantAddress}</p>
                      </div>
                    </div>

                    {/* Customer Details */}
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium">{order.customer}</h4>
                        <p className="text-sm text-muted-foreground">{order.customerAddress}</p>
                        {order.specialInstructions && (
                          <p className="text-xs text-orange-600 mt-1">📝 {order.specialInstructions}</p>
                        )}
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h5 className="font-medium mb-2">Order Items:</h5>
                      <ul className="text-sm text-muted-foreground">
                        {order.orderItems.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Distance and Time */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Navigation className="w-4 h-4 text-muted-foreground" />
                          <span>{order.distance}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{order.estimatedTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <Button 
                        variant="cta" 
                        className="flex-1"
                        disabled={!isOnline}
                        onClick={() => acceptOrder(order.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Accept Order
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        disabled={!isOnline}
                        onClick={() => rejectOrder(order.id)}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Decline
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {availableOrders.length === 0 && isOnline && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">No orders available</h3>
                    <p className="text-muted-foreground">New orders will appear here when available</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Active Deliveries Tab */}
          <TabsContent value="active">
            <div className="space-y-4">
              {activeDeliveries.map((delivery) => (
                <Card key={delivery.id} className="border-blue-200 bg-blue-50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-blue-800">
                        <Timer className="w-5 h-5" />
                        {delivery.id} - In Progress
                      </CardTitle>
                      <Badge className="bg-blue-600">
                        ETA: {delivery.estimatedDelivery}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{delivery.customer}</h4>
                        <p className="text-sm text-muted-foreground">{delivery.customerAddress}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₹{delivery.amount}</p>
                        <p className="text-sm text-blue-600">{delivery.distance}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Customer
                      </Button>
                      <Button variant="cta" className="flex-1" onClick={() => completeDelivery(delivery.id)}>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark Delivered
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {activeDeliveries.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Timer className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">No active deliveries</h3>
                    <p className="text-muted-foreground">Accepted orders will appear here</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Completed Orders Tab */}
          <TabsContent value="completed">
            <div className="space-y-4">
              {completedOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{order.id}</h4>
                        <p className="text-sm text-muted-foreground">{order.restaurant} → {order.customer}</p>
                        <p className="text-xs text-muted-foreground">Delivered at {order.deliveredAt}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">+₹{order.earnings}</p>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{order.rating}</span>
                        </div>
                        {order.tip > 0 && (
                          <p className="text-xs text-green-600">Tip: +₹{order.tip}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}