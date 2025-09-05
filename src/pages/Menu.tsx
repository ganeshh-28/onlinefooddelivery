import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter, Star, Clock, MapPin } from "lucide-react";

// Sample menu data
const categories = [
  "All", "Biryani", "Dosa", "Thali", "Ice Cream", "Desserts", "Beverages", "Snacks"
];

const menuItems = [
  {
    id: 1,
    name: "Chicken Biryani",
    category: "Biryani",
    price: 299,
    image: "/src/assets/biryani.jpg",
    description: "Aromatic basmati rice with tender chicken pieces",
    rating: 4.5,
    prepTime: "30-40 min",
    veg: false,
    spicyLevel: 2
  },
  {
    id: 2,
    name: "Masala Dosa",
    category: "Dosa",
    price: 149,
    image: "/src/assets/dosa.jpg",
    description: "Crispy dosa with spiced potato filling",
    rating: 4.3,
    prepTime: "20-25 min",
    veg: true,
    spicyLevel: 1
  },
  {
    id: 3,
    name: "South Indian Thali",
    category: "Thali",
    price: 199,
    image: "/src/assets/thali.jpg",
    description: "Complete meal with rice, dal, vegetables, and more",
    rating: 4.7,
    prepTime: "25-30 min",
    veg: true,
    spicyLevel: 1
  },
  {
    id: 4,
    name: "Vanilla Ice Cream",
    category: "Ice Cream",
    price: 89,
    image: "/src/assets/ice-cream.jpg",
    description: "Creamy vanilla ice cream with chocolate chips",
    rating: 4.2,
    prepTime: "5-10 min",
    veg: true,
    spicyLevel: 0
  },
  {
    id: 5,
    name: "Chocolate Cake",
    category: "Desserts",
    price: 159,
    image: "/src/assets/desserts.jpg",
    description: "Rich chocolate cake with cream frosting",
    rating: 4.6,
    prepTime: "15-20 min",
    veg: true,
    spicyLevel: 0
  }
];

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<{[key: number]: number}>({});

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (itemId: number) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      const newItems = { ...cartItems };
      delete newItems[itemId];
      setCartItems(newItems);
    } else {
      setCartItems(prev => ({
        ...prev,
        [itemId]: quantity
      }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-food text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">Our Menu</h1>
          <p className="text-white/90">Discover delicious food from our kitchen</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search for dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {item.veg && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Veg
                      </Badge>
                    )}
                    {item.spicyLevel > 1 && (
                      <Badge variant="destructive">Spicy</Badge>
                    )}
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="bg-black/50 text-white px-2 py-1 rounded flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{item.rating}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <span className="text-lg font-bold text-accent">₹{item.price}</span>
                </div>
                
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>
                
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.prepTime}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
                
                {cartItems[item.id] ? (
                  <div className="flex items-center justify-between bg-muted rounded-lg p-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, cartItems[item.id] - 1)}
                      className="h-8 w-8 p-0"
                    >
                      -
                    </Button>
                    <span className="font-medium">{cartItems[item.id]}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, cartItems[item.id] + 1)}
                      className="h-8 w-8 p-0"
                    >
                      +
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="cta"
                    className="w-full"
                    onClick={() => addToCart(item.id)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No items found</p>
              <p className="text-sm">Try adjusting your search or category filter</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}