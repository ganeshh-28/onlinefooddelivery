import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Star, 
  Clock, 
  MapPin, 
  Filter,
  Plus,
  Minus,
  ShoppingCart
} from "lucide-react";

// Sample restaurant data with menu items
const restaurants = [
  {
    id: 1,
    name: "Pizza Palace",
    cuisine: "Italian",
    rating: 4.5,
    deliveryTime: "30-40 mins",
    deliveryFee: 25,
    minOrder: 199,
    distance: "2.5 km",
    image: "/src/assets/biryani.jpg",
    offers: ["50% OFF up to ₹100"],
    menu: [
      { id: 101, name: "Margherita Pizza", price: 299, description: "Fresh tomatoes, mozzarella, basil", veg: true, category: "Pizza" },
      { id: 102, name: "Pepperoni Pizza", price: 399, description: "Pepperoni, mozzarella, tomato sauce", veg: false, category: "Pizza" },
      { id: 103, name: "Garlic Bread", price: 149, description: "Crispy bread with garlic butter", veg: true, category: "Sides" },
      { id: 104, name: "Caesar Salad", price: 199, description: "Lettuce, croutons, parmesan, caesar dressing", veg: true, category: "Salads" },
      { id: 105, name: "Chocolate Brownie", price: 129, description: "Rich chocolate brownie with ice cream", veg: true, category: "Desserts" }
    ]
  },
  {
    id: 2,
    name: "Burger Hub",
    cuisine: "Fast Food",
    rating: 4.2,
    deliveryTime: "20-30 mins",
    deliveryFee: 15,
    minOrder: 149,
    distance: "1.8 km",
    image: "/src/assets/dosa.jpg",
    offers: ["Free delivery on orders above ₹299"],
    menu: [
      { id: 201, name: "Classic Burger", price: 199, description: "Beef patty, lettuce, tomato, cheese", veg: false, category: "Burgers" },
      { id: 202, name: "Veggie Burger", price: 179, description: "Plant-based patty, lettuce, tomato", veg: true, category: "Burgers" },
      { id: 203, name: "French Fries", price: 99, description: "Crispy golden fries", veg: true, category: "Sides" },
      { id: 204, name: "Chicken Wings", price: 249, description: "Spicy buffalo wings with ranch", veg: false, category: "Appetizers" },
      { id: 205, name: "Milkshake", price: 149, description: "Vanilla milkshake with whipped cream", veg: true, category: "Beverages" }
    ]
  },
  {
    id: 3,
    name: "Spice Garden",
    cuisine: "Indian",
    rating: 4.7,
    deliveryTime: "40-50 mins",
    deliveryFee: 30,
    minOrder: 249,
    distance: "3.2 km",
    image: "/src/assets/thali.jpg",
    offers: ["20% OFF on orders above ₹500"],
    menu: [
      { id: 301, name: "Chicken Biryani", price: 349, description: "Aromatic rice with spiced chicken", veg: false, category: "Rice" },
      { id: 302, name: "Paneer Butter Masala", price: 279, description: "Creamy tomato curry with paneer", veg: true, category: "Curry" },
      { id: 303, name: "Garlic Naan", price: 59, description: "Soft bread with garlic and butter", veg: true, category: "Bread" },
      { id: 304, name: "Dal Tadka", price: 199, description: "Yellow lentils with spiced tempering", veg: true, category: "Dal" },
      { id: 305, name: "Gulab Jamun", price: 89, description: "Sweet dumplings in sugar syrup", veg: true, category: "Desserts" }
    ]
  },
  {
    id: 4,
    name: "Taco Corner",
    cuisine: "Mexican",
    rating: 4.0,
    deliveryTime: "25-35 mins",
    deliveryFee: 20,
    minOrder: 179,
    distance: "2.1 km",
    image: "/src/assets/ice-cream.jpg",
    offers: ["Buy 2 Get 1 Free on Tacos"],
    menu: [
      { id: 401, name: "Chicken Taco", price: 129, description: "Grilled chicken with salsa and veggies", veg: false, category: "Tacos" },
      { id: 402, name: "Veggie Taco", price: 109, description: "Black beans, corn, peppers, avocado", veg: true, category: "Tacos" },
      { id: 403, name: "Nachos Supreme", price: 199, description: "Tortilla chips with cheese and jalapeños", veg: true, category: "Appetizers" },
      { id: 404, name: "Quesadilla", price: 179, description: "Grilled tortilla with cheese and chicken", veg: false, category: "Wraps" },
      { id: 405, name: "Churros", price: 119, description: "Fried dough with cinnamon sugar", veg: true, category: "Desserts" }
    ]
  },
  {
    id: 5,
    name: "Sushi Express",
    cuisine: "Japanese",
    rating: 4.6,
    deliveryTime: "35-45 mins",
    deliveryFee: 40,
    minOrder: 299,
    distance: "4.1 km",
    image: "/src/assets/desserts.jpg",
    offers: ["30% OFF on first order"],
    menu: [
      { id: 501, name: "California Roll", price: 299, description: "Crab, avocado, cucumber with sesame", veg: false, category: "Rolls" },
      { id: 502, name: "Vegetable Sushi", price: 249, description: "Assorted vegetable sushi pieces", veg: true, category: "Sushi" },
      { id: 503, name: "Miso Soup", price: 99, description: "Traditional soybean soup", veg: true, category: "Soups" },
      { id: 504, name: "Chicken Teriyaki", price: 349, description: "Grilled chicken with teriyaki sauce", veg: false, category: "Mains" },
      { id: 505, name: "Mochi Ice Cream", price: 149, description: "Sweet rice cake with ice cream", veg: true, category: "Desserts" }
    ]
  }
];

export default function Restaurants() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<{[key: number]: number}>({});
  const [filterCuisine, setFilterCuisine] = useState("All");

  const cuisines = ["All", "Italian", "Fast Food", "Indian", "Mexican", "Japanese"];

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine = filterCuisine === "All" || restaurant.cuisine === filterCuisine;
    return matchesSearch && matchesCuisine;
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

  const getCartTotal = () => {
    const selectedMenu = restaurants.find(r => r.id === selectedRestaurant)?.menu || [];
    return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
      const item = selectedMenu.find(item => item.id === parseInt(itemId));
      return total + (item?.price || 0) * quantity;
    }, 0);
  };

  if (selectedRestaurant) {
    const restaurant = restaurants.find(r => r.id === selectedRestaurant)!;
    const menuByCategory = restaurant.menu.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {} as {[key: string]: typeof restaurant.menu});

    return (
      <div className="min-h-screen bg-background">
        {/* Restaurant Header */}
        <div className="bg-gradient-food text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedRestaurant(null)}
              className="text-white hover:bg-white/20 mb-4"
            >
              ← Back to Restaurants
            </Button>
            <div className="flex items-start gap-6">
              <img 
                src={restaurant.image} 
                alt={restaurant.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
                <p className="text-white/90 mb-2">{restaurant.cuisine} • {restaurant.distance}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{restaurant.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  <span>₹{restaurant.deliveryFee} delivery fee</span>
                </div>
                {restaurant.offers.length > 0 && (
                  <div className="mt-2">
                    {restaurant.offers.map((offer, index) => (
                      <Badge key={index} variant="secondary" className="bg-green-100 text-green-800 mr-2">
                        {offer}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Menu Categories */}
          <Tabs defaultValue={Object.keys(menuByCategory)[0]} className="space-y-6">
            <TabsList>
              {Object.keys(menuByCategory).map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category} ({menuByCategory[category].length})
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(menuByCategory).map(([category, items]) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {items.map((item) => (
                    <Card key={item.id} className="hover:shadow-medium transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{item.name}</h3>
                              {item.veg && (
                                <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                  Veg
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                            <p className="font-bold text-lg">₹{item.price}</p>
                          </div>
                          
                          <div className="ml-4">
                            {cartItems[item.id] ? (
                              <div className="flex items-center gap-2 bg-muted rounded-lg p-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, cartItems[item.id] - 1)}
                                  className="h-6 w-6 p-0"
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="font-medium w-8 text-center">{cartItems[item.id]}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, cartItems[item.id] + 1)}
                                  className="h-6 w-6 p-0"
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                            ) : (
                              <Button
                                variant="cta"
                                size="sm"
                                onClick={() => addToCart(item.id)}
                              >
                                <Plus className="w-4 h-4 mr-1" />
                                Add
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Cart Summary - Fixed at bottom */}
          {Object.keys(cartItems).length > 0 && (
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <ShoppingCart className="w-5 h-5" />
                  <div>
                    <p className="font-medium">
                      {Object.values(cartItems).reduce((a, b) => a + b, 0)} items
                    </p>
                    <p className="text-sm text-muted-foreground">₹{getCartTotal()}</p>
                  </div>
                </div>
                <Button variant="cta" size="lg">
                  View Cart & Checkout
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-food text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Restaurants Near You</h1>
          <p className="text-white/90 text-lg">Discover amazing food from local restaurants</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search restaurants or cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {cuisines.map((cuisine) => (
              <Button
                key={cuisine}
                variant={filterCuisine === cuisine ? "default" : "outline"}
                onClick={() => setFilterCuisine(cuisine)}
                className="whitespace-nowrap"
              >
                {cuisine}
              </Button>
            ))}
          </div>
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <Card 
              key={restaurant.id} 
              className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => setSelectedRestaurant(restaurant.id)}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <div className="bg-black/50 text-white px-2 py-1 rounded flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{restaurant.rating}</span>
                    </div>
                  </div>
                  {restaurant.offers.length > 0 && (
                    <div className="absolute bottom-3 left-3">
                      <Badge variant="destructive" className="text-xs">
                        {restaurant.offers[0]}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                    <div className="text-right text-sm">
                      <p className="font-medium">₹{restaurant.deliveryFee} delivery</p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm">{restaurant.cuisine} • {restaurant.distance}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {restaurant.deliveryTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {restaurant.distance}
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground">
                      Min order: ₹{restaurant.minOrder}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No restaurants found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}