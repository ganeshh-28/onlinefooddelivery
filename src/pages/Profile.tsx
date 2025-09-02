import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  MapPin, 
  ShoppingBag, 
  Heart, 
  HelpCircle, 
  LogOut, 
  Edit, 
  ArrowLeft,
  Star,
  Clock,
  Package
} from "lucide-react";

// Import food images
import biryaniImg from "@/assets/biryani.jpg";
import dosaImg from "@/assets/dosa.jpg";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("orders");

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    avatar: "",
  };

  const addresses = [
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

  const orders = [
    {
      id: "ORD001",
      date: "2024-01-15",
      restaurant: "Spice Garden",
      items: ["Chicken Biryani", "Raita"],
      total: 349,
      status: "Delivered",
      rating: 4.5,
      image: biryaniImg,
    },
    {
      id: "ORD002",
      date: "2024-01-12",
      restaurant: "South Delights",
      items: ["Masala Dosa", "Filter Coffee"],
      total: 199,
      status: "Delivered",
      rating: 5,
      image: dosaImg,
    },
  ];

  const faqItems = [
    {
      question: "How do I track my order?",
      answer: "You can track your order in real-time from the 'Orders' section in your profile.",
    },
    {
      question: "What is your refund policy?",
      answer: "We offer full refunds if your order is cancelled before preparation begins.",
    },
    {
      question: "How can I change my delivery address?",
      answer: "You can add or modify addresses in the 'Addresses' section of your profile.",
    },
    {
      question: "Do you have vegetarian options?",
      answer: "Yes! We have a wide variety of vegetarian dishes clearly marked on our menu.",
    },
  ];

  const menuItems = [
    { 
      icon: ShoppingBag, 
      label: "Orders", 
      key: "orders", 
      badge: orders.length 
    },
    { 
      icon: MapPin, 
      label: "Addresses", 
      key: "addresses", 
      badge: addresses.length 
    },
    { 
      icon: Heart, 
      label: "Favorites", 
      key: "favorites" 
    },
    { 
      icon: HelpCircle, 
      label: "Help & Support", 
      key: "help" 
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-success text-white";
      case "Preparing":
        return "bg-warning text-white";
      case "On the way":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const renderOrders = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Order History</h3>
        <Badge variant="secondary">{orders.length} orders</Badge>
      </div>
      {orders.map((order) => (
        <Card key={order.id} className="hover:shadow-medium transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start space-x-4">
              <img
                src={order.image}
                alt="Order"
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-bold">{order.restaurant}</h4>
                    <p className="text-sm text-muted-foreground">
                      Order #{order.id} • {order.date}
                    </p>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {order.items.join(", ")}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold">₹{order.total}</span>
                  {order.status === "Delivered" && (
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{order.rating}</span>
                    </div>
                  )}
                </div>
                <div className="mt-3 flex space-x-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Reorder
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderAddresses = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Saved Addresses</h3>
        <Button variant="outline" size="sm">
          <MapPin className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>
      {addresses.map((address) => (
        <Card key={address.id} className="hover:shadow-medium transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-bold">{address.type}</h4>
                  {address.isDefault && (
                    <Badge variant="secondary">Default</Badge>
                  )}
                </div>
                <p className="text-muted-foreground">{address.address}</p>
              </div>
              <Button variant="ghost" size="icon">
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderFavorites = () => (
    <div className="text-center py-16">
      <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-xl font-bold mb-2">No favorites yet</h3>
      <p className="text-muted-foreground mb-6">
        Start adding dishes to your favorites to see them here
      </p>
      <Link to="/">
        <Button variant="outline">Explore Menu</Button>
      </Link>
    </div>
  );

  const renderHelp = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">{item.question}</h4>
                <p className="text-sm text-muted-foreground">{item.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Need More Help?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <HelpCircle className="w-4 h-4 mr-2" />
            Contact Support
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Package className="w-4 h-4 mr-2" />
            Report an Issue
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
        return renderOrders();
      case "addresses":
        return renderAddresses();
      case "favorites":
        return renderFavorites();
      case "help":
        return renderHelp();
      default:
        return renderOrders();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-2xl font-bold">My Profile</h1>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                {/* User Info */}
                <div className="text-center mb-6">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-lg bg-gradient-food text-white">
                      {user.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                  <p className="text-sm text-muted-foreground">{user.phone}</p>
                  <Button variant="outline" size="sm" className="mt-3">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                <Separator className="mb-6" />

                {/* Menu Items */}
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setActiveTab(item.key)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                        activeTab === item.key
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </button>
                  ))}
                </nav>

                <Separator className="my-6" />

                {/* Logout */}
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                {renderContent()}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}