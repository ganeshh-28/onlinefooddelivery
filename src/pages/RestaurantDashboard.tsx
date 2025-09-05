import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  Edit, 
  Trash2, 
  DollarSign, 
  ShoppingBag, 
  Star, 
  TrendingUp,
  Eye,
  Package,
  Clock,
  Users
} from "lucide-react";

// Sample restaurant data
const restaurantStats = {
  todayOrders: 45,
  todayRevenue: 12450,
  avgRating: 4.6,
  totalMenuItems: 25
};

const sampleMenuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 299,
    description: "Fresh tomatoes, mozzarella, basil",
    available: true,
    veg: true,
    preparationTime: 15,
    image: "/src/assets/biryani.jpg"
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    category: "Pizza",
    price: 399,
    description: "Pepperoni, mozzarella, tomato sauce",
    available: true,
    veg: false,
    preparationTime: 18,
    image: "/src/assets/biryani.jpg"
  },
  {
    id: 3,
    name: "Garlic Bread",
    category: "Sides",
    price: 149,
    description: "Crispy bread with garlic butter",
    available: false,
    veg: true,
    preparationTime: 10,
    image: "/src/assets/biryani.jpg"
  },
  {
    id: 4,
    name: "Caesar Salad",
    category: "Salads",
    price: 199,
    description: "Lettuce, croutons, parmesan, caesar dressing",
    available: true,
    veg: true,
    preparationTime: 8,
    image: "/src/assets/biryani.jpg"
  },
  {
    id: 5,
    name: "Chocolate Brownie",
    category: "Desserts",
    price: 129,
    description: "Rich chocolate brownie with ice cream",
    available: true,
    veg: true,
    preparationTime: 5,
    image: "/src/assets/biryani.jpg"
  }
];

const recentOrders = [
  { id: "ORD001", customer: "John Doe", items: "Margherita Pizza x2, Garlic Bread", amount: 747, status: "preparing", time: "5 mins ago" },
  { id: "ORD002", customer: "Jane Smith", items: "Pepperoni Pizza, Caesar Salad", amount: 598, status: "ready", time: "12 mins ago" },
  { id: "ORD003", customer: "Mike Johnson", items: "Chocolate Brownie x3", amount: 387, status: "delivered", time: "25 mins ago" },
];

const categories = ["Pizza", "Sides", "Salads", "Desserts", "Beverages", "Appetizers"];

export default function RestaurantDashboard() {
  const [menuItems, setMenuItems] = useState(sampleMenuItems);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    veg: true,
    preparationTime: "",
    image: ""
  });

  const handleAddItem = () => {
    if (!newItem.name || !newItem.category || !newItem.price) return;
    
    const item = {
      id: Math.max(...menuItems.map(i => i.id)) + 1,
      ...newItem,
      price: parseFloat(newItem.price),
      preparationTime: parseInt(newItem.preparationTime) || 15,
      available: true,
      image: "/src/assets/biryani.jpg"
    };
    
    setMenuItems([...menuItems, item]);
    setNewItem({ name: "", category: "", price: "", description: "", veg: true, preparationTime: "", image: "" });
    setIsAddItemOpen(false);
  };

  const handleEditItem = (item: any) => {
    setEditingItem(item);
    setNewItem({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      description: item.description,
      veg: item.veg,
      preparationTime: item.preparationTime.toString(),
      image: item.image
    });
  };

  const handleUpdateItem = () => {
    if (!editingItem) return;
    
    setMenuItems(menuItems.map(item => 
      item.id === editingItem.id 
        ? {
            ...item,
            ...newItem,
            price: parseFloat(newItem.price),
            preparationTime: parseInt(newItem.preparationTime) || 15
          }
        : item
    ));
    setEditingItem(null);
    setNewItem({ name: "", category: "", price: "", description: "", veg: true, preparationTime: "", image: "" });
  };

  const handleDeleteItem = (id: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setMenuItems(menuItems.filter(item => item.id !== id));
    }
  };

  const toggleAvailability = (id: number) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      preparing: { variant: "secondary" as const, color: "bg-yellow-100 text-yellow-800" },
      ready: { variant: "default" as const, color: "bg-green-100 text-green-800" },
      delivered: { variant: "outline" as const, color: "bg-gray-100 text-gray-800" },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.preparing;
    return <Badge className={config.color}>{status}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-food text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">Restaurant Dashboard</h1>
          <p className="text-white/90">Manage your menu, orders, and restaurant settings</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-blue-100 mr-4">
                  <ShoppingBag className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Today's Orders</p>
                  <h3 className="text-2xl font-bold">{restaurantStats.todayOrders}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-green-100 mr-4">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Today's Revenue</p>
                  <h3 className="text-2xl font-bold">₹{restaurantStats.todayRevenue.toLocaleString()}</h3>
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
                  <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                  <h3 className="text-2xl font-bold">{restaurantStats.avgRating}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-purple-100 mr-4">
                  <Package className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Menu Items</p>
                  <h3 className="text-2xl font-bold">{menuItems.length}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="menu" className="space-y-6">
          <TabsList className="grid w-full lg:w-[600px] grid-cols-3">
            <TabsTrigger value="menu">Menu Management</TabsTrigger>
            <TabsTrigger value="orders">Recent Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Menu Management Tab */}
          <TabsContent value="menu">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Menu Items</CardTitle>
                  <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
                    <DialogTrigger asChild>
                      <Button variant="cta">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Item
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Item Name</Label>
                            <Input
                              id="name"
                              value={newItem.name}
                              onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                              placeholder="Enter item name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select value={newItem.category} onValueChange={(value) => setNewItem({...newItem, category: value})}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category} value={category}>{category}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="price">Price (₹)</Label>
                            <Input
                              id="price"
                              type="number"
                              value={newItem.price}
                              onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                              placeholder="Enter price"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="prepTime">Preparation Time (mins)</Label>
                            <Input
                              id="prepTime"
                              type="number"
                              value={newItem.preparationTime}
                              onChange={(e) => setNewItem({...newItem, preparationTime: e.target.value})}
                              placeholder="Enter time in minutes"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newItem.description}
                            onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                            placeholder="Enter item description"
                            rows={3}
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch
                            id="veg"
                            checked={newItem.veg}
                            onCheckedChange={(checked) => setNewItem({...newItem, veg: checked})}
                          />
                          <Label htmlFor="veg">Vegetarian</Label>
                        </div>

                        <div className="flex gap-2 pt-4">
                          <Button 
                            onClick={editingItem ? handleUpdateItem : handleAddItem}
                            variant="cta"
                            className="flex-1"
                          >
                            {editingItem ? 'Update Item' : 'Add Item'}
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              setIsAddItemOpen(false);
                              setEditingItem(null);
                              setNewItem({ name: "", category: "", price: "", description: "", veg: true, preparationTime: "", image: "" });
                            }}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {menuItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                      <div className="flex items-center gap-4">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{item.name}</h3>
                            {item.veg && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                Veg
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {item.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{item.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>₹{item.price}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {item.preparationTime} mins
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={item.available}
                            onCheckedChange={() => toggleAvailability(item.id)}
                          />
                          <span className="text-sm text-muted-foreground">
                            {item.available ? 'Available' : 'Unavailable'}
                          </span>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              handleEditItem(item);
                              setIsAddItemOpen(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recent Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-food rounded-lg flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium">{order.id}</h3>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                          <p className="text-xs text-muted-foreground">{order.items}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium">₹{order.amount}</p>
                          <p className="text-xs text-muted-foreground">{order.time}</p>
                        </div>
                        {getStatusBadge(order.status)}
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

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Sales Overview
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
                    <Package className="w-5 h-5" />
                    Popular Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Margherita Pizza</span>
                      <span className="font-medium">45 orders</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Pepperoni Pizza</span>
                      <span className="font-medium">38 orders</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Caesar Salad</span>
                      <span className="font-medium">29 orders</span>
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