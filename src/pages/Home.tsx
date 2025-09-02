import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Star, Clock, Zap } from "lucide-react";

// Import food images
import biryaniImg from "@/assets/biryani.jpg";
import dosaImg from "@/assets/dosa.jpg";
import thaliImg from "@/assets/thali.jpg";
import iceCreamImg from "@/assets/ice-cream.jpg";
import dessertsImg from "@/assets/desserts.jpg";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const foodCategories = [
    { id: 1, name: "Biryani", image: biryaniImg, items: "50+ dishes" },
    { id: 2, name: "Dosa", image: dosaImg, items: "25+ varieties" },
    { id: 3, name: "Thali", image: thaliImg, items: "15+ combos" },
    { id: 4, name: "Ice Cream", image: iceCreamImg, items: "30+ flavors" },
    { id: 5, name: "Desserts", image: dessertsImg, items: "40+ sweets" },
  ];

  const featuredRestaurants = [
    {
      id: 1,
      name: "Spice Garden",
      cuisine: "Indian",
      rating: 4.5,
      deliveryTime: "25-30 min",
      image: biryaniImg,
      offer: "20% OFF",
    },
    {
      id: 2,
      name: "South Delights",
      cuisine: "South Indian",
      rating: 4.8,
      deliveryTime: "20-25 min",
      image: dosaImg,
      offer: "Free Delivery",
    },
    {
      id: 3,
      name: "Sweet Dreams",
      cuisine: "Desserts",
      rating: 4.6,
      deliveryTime: "15-20 min",
      image: dessertsImg,
      offer: "Buy 1 Get 1",
    },
  ];

  const quickActions = [
    { icon: "🍕", label: "Pizza", color: "bg-red-500" },
    { icon: "🍔", label: "Burgers", color: "bg-yellow-500" },
    { icon: "🍜", label: "Noodles", color: "bg-orange-500" },
    { icon: "🥗", label: "Salads", color: "bg-green-500" },
    { icon: "🍰", label: "Cakes", color: "bg-pink-500" },
    { icon: "☕", label: "Coffee", color: "bg-amber-600" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % foodCategories.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + foodCategories.length) % foodCategories.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-primary py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in">
            Hungry? We've got you covered!
          </h1>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto animate-fade-in">
            Order from your favorite restaurants and get it delivered fresh and fast
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="cta" size="lg" className="animate-fade-in">
              <Zap className="w-5 h-5 mr-2" />
              Order Now
            </Button>
            <Button variant="hero" size="lg" className="animate-fade-in">
              View Menu
            </Button>
          </div>
        </div>
        <div className="absolute top-20 right-10 animate-float hidden lg:block">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
            <span className="text-4xl">🍕</span>
          </div>
        </div>
        <div className="absolute bottom-20 left-10 animate-float hidden lg:block" style={{ animationDelay: "1s" }}>
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
            <span className="text-3xl">🍔</span>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 px-4 bg-card">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">What's on your mind?</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {quickActions.map((action, index) => (
              <Card 
                key={index} 
                className="hover:shadow-medium transition-all duration-300 hover:scale-105 cursor-pointer group"
              >
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 mx-auto mb-2 rounded-full ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <span className="text-2xl">{action.icon}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{action.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Food Categories Slider */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Popular Categories</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={prevSlide}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextSlide}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="relative overflow-hidden" ref={sliderRef}>
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {foodCategories.map((category) => (
                <div key={category.id} className="w-full flex-shrink-0">
                  <Card className="mx-2 overflow-hidden hover:shadow-large transition-all duration-300 group cursor-pointer">
                    <div className="relative h-64">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-2xl font-bold">{category.name}</h3>
                        <p className="text-white/80">{category.items}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Restaurants</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRestaurants.map((restaurant) => (
              <Card key={restaurant.id} className="overflow-hidden hover:shadow-large transition-all duration-300 group cursor-pointer">
                <div className="relative">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                    {restaurant.offer}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold text-foreground mb-2">{restaurant.name}</h3>
                  <p className="text-muted-foreground mb-3">{restaurant.cuisine}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{restaurant.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{restaurant.deliveryTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-food text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Download our app for faster ordering!
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Get exclusive deals and track your orders in real-time
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">
              Download App
            </Button>
            <Link to="/signup">
              <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}