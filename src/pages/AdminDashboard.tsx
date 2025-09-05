import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Store, 
  Truck, 
  Star,
  Clock,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Ban,
  CheckCircle
} from "lucide-react";

// Sample data
const stats = [
  { title: "Total Orders", value: "1,245", change: "+12%", icon: ShoppingCart, color: "text-blue-600" },
  { title: "Total Revenue", value: "₹2,45,890", change: "+8%", icon: DollarSign, color: "text-green-600" },
  { title: "Active Restaurants", value: "156", change: "+5%", icon: Store, color: "text-purple-600" },
  { title: "Delivery Agents", value: "89", change: "+3%", icon: Truck, color: "text-orange-600" },
];

const recentOrders = [
  { id: "ORD001", customer: "John Doe", restaurant: "Pizza Palace", amount: 450, status: "delivered", time: "2 mins ago" },
  { id: "ORD002", customer: "Jane Smith", restaurant: "Burger Hub", amount: 320, status: "preparing", time: "5 mins ago" },
  { id: "ORD003", customer: "Mike Johnson", restaurant: "Spice Garden", amount: 680, status: "on-way", time: "8 mins ago" },
  { id: "ORD004", customer: "Sarah Wilson", restaurant: "Taco Corner", amount: 290, status: "pending", time: "12 mins ago" },
];

const restaurants = [
  { id: 1, name: "Pizza Palace", owner: "Mario Rossi", rating: 4.5, orders: 245, revenue: "₹45,890", status: "active" },
  { id: 2, name: "Burger Hub", owner: "Alex Johnson", rating: 4.2, orders: 189, revenue: "₹32,150", status: "active" },
  { id: 3, name: "Spice Garden", owner: "Priya Sharma", rating: 4.7, orders: 298, revenue: "₹52,340", status: "active" },
  { id: 4, name: "Taco Corner", owner: "Carlos Rodriguez", rating: 4.0, orders: 156, revenue: "₹28,760", status: "inactive" },
];

const deliveryAgents = [
  { id: 1, name: "Raj Kumar", phone: "+91 9876543210", orders: 45, rating: 4.8, status: "online", location: "Sector 15" },
  { id: 2, name: "Amit Singh", phone: "+91 9876543211", orders: 38, rating: 4.6, status: "busy", location: "Sector 22" },
  { id: 3, name: "Rohit Verma", phone: "+91 9876543212", orders: 52, rating: 4.9, status: "online", location: "Sector 18" },
  { id: 4, name: "Vikash Yadav", phone: "+91 9876543213", orders: 29, rating: 4.3, status: "offline", location: "Sector 12" },
];

const getStatusBadge = (status: string) => {
  const statusConfig = {
    delivered: { variant: "default" as const, color: "bg-green-100 text-green-800" },
    preparing: { variant: "secondary" as const, color: "bg-yellow-100 text-yellow-800" },
    "on-way": { variant: "default" as const, color: "bg-blue-100 text-blue-800" },
    pending: { variant: "destructive" as const, color: "bg-red-100 text-red-800" },
    active: { variant: "default" as const, color: "bg-green-100 text-green-800" },
    inactive: { variant: "secondary" as const, color: "bg-gray-100 text-gray-800" },
    online: { variant: "default" as const, color: "bg-green-100 text-green-800" },
    busy: { variant: "secondary" as const, color: "bg-yellow-100 text-yellow-800" },
    offline: { variant: "destructive" as const, color: "bg-red-100 text-red-800" },
  };
  
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  return <Badge className={config.color}>{status}</Badge>;
};

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-food text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-white/90">Monitor and manage your food delivery platform</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg bg-muted mr-4`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-bold">{stat.value}</h3>
                      <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full lg:w-[600px] grid-cols-4">
            <TabsTrigger value="orders">Recent Orders</TabsTrigger>
            <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
            <TabsTrigger value="delivery">Delivery Agents</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Recent Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Orders</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Search orders..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{order.restaurant}</p>
                          <p className="text-sm text-muted-foreground">₹{order.amount}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(order.status)}
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">{order.time}</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Restaurants Tab */}
          <TabsContent value="restaurants">
            <Card>
              <CardHeader>
                <CardTitle>Restaurant Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {restaurants.map((restaurant) => (
                    <div key={restaurant.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-food rounded-lg flex items-center justify-center">
                          <Store className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium">{restaurant.name}</h3>
                          <p className="text-sm text-muted-foreground">Owner: {restaurant.owner}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm font-medium flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {restaurant.rating}
                          </p>
                          <p className="text-xs text-muted-foreground">Rating</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">{restaurant.orders}</p>
                          <p className="text-xs text-muted-foreground">Orders</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">{restaurant.revenue}</p>
                          <p className="text-xs text-muted-foreground">Revenue</p>
                        </div>
                        {getStatusBadge(restaurant.status)}
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            {restaurant.status === "active" ? (
                              <Ban className="w-4 h-4" />
                            ) : (
                              <CheckCircle className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Delivery Agents Tab */}
          <TabsContent value="delivery">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Agent Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deliveryAgents.map((agent) => (
                    <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-food rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium">{agent.name}</h3>
                          <p className="text-sm text-muted-foreground">{agent.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm font-medium">{agent.orders}</p>
                          <p className="text-xs text-muted-foreground">Deliveries</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {agent.rating}
                          </p>
                          <p className="text-xs text-muted-foreground">Rating</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">{agent.location}</p>
                          <p className="text-xs text-muted-foreground">Location</p>
                        </div>
                        {getStatusBadge(agent.status)}
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Revenue Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Today</span>
                      <span className="font-medium">₹12,450</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>This Week</span>
                      <span className="font-medium">₹89,340</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>This Month</span>
                      <span className="font-medium">₹3,45,670</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Avg Delivery Time</span>
                      <span className="font-medium">28 mins</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Order Success Rate</span>
                      <span className="font-medium">94.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Customer Satisfaction</span>
                      <span className="font-medium">4.6/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}