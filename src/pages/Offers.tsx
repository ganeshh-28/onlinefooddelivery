import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Percent, Clock, Tag, Gift, Star, Zap } from "lucide-react";

const offers = [
  {
    id: 1,
    title: "50% OFF on First Order",
    description: "Get 50% discount on your first order. Maximum discount ₹100. Valid for new users only.",
    code: "FIRST50",
    discount: "50% OFF",
    minOrder: 199,
    maxDiscount: 100,
    validTill: "31 Dec 2024",
    type: "first-time",
    color: "bg-gradient-to-r from-green-500 to-emerald-600"
  },
  {
    id: 2,
    title: "Free Delivery Weekend",
    description: "Free delivery on all orders above ₹299 during weekends. No delivery charges applied.",
    code: "WEEKEND",
    discount: "Free Delivery",
    minOrder: 299,
    maxDiscount: 50,
    validTill: "Every Weekend",
    type: "delivery",
    color: "bg-gradient-to-r from-blue-500 to-cyan-600"
  },
  {
    id: 3,
    title: "Biryani Bonanza",
    description: "Buy 2 Biryanis and get 1 FREE! Valid on all biryani varieties. Limited time offer.",
    code: "BIRYANI3",
    discount: "Buy 2 Get 1",
    minOrder: 500,
    maxDiscount: 299,
    validTill: "15 Dec 2024",
    type: "category",
    color: "bg-gradient-to-r from-orange-500 to-red-600"
  },
  {
    id: 4,
    title: "Student Special",
    description: "20% off for students with valid ID. Applicable on orders above ₹150.",
    code: "STUDENT20",
    discount: "20% OFF",
    minOrder: 150,
    maxDiscount: 75,
    validTill: "31 Jan 2025",
    type: "special",
    color: "bg-gradient-to-r from-purple-500 to-pink-600"
  },
  {
    id: 5,
    title: "Happy Hours",
    description: "30% discount between 2 PM to 5 PM on all orders. Beat the hunger pangs!",
    code: "HAPPY30",
    discount: "30% OFF",
    minOrder: 199,
    maxDiscount: 150,
    validTill: "Daily 2-5 PM",
    type: "time-based",
    color: "bg-gradient-to-r from-yellow-500 to-orange-500"
  },
  {
    id: 6,
    title: "Loyalty Reward",
    description: "Complete 5 orders this month and get ₹200 cashback in your wallet.",
    code: "LOYAL200",
    discount: "₹200 Cashback",
    minOrder: 0,
    maxDiscount: 200,
    validTill: "Monthly Reset",
    type: "loyalty",
    color: "bg-gradient-to-r from-indigo-500 to-purple-600"
  }
];

const getOfferIcon = (type: string) => {
  switch (type) {
    case "first-time": return <Star className="w-5 h-5" />;
    case "delivery": return <Zap className="w-5 h-5" />;
    case "category": return <Gift className="w-5 h-5" />;
    case "special": return <Tag className="w-5 h-5" />;
    case "time-based": return <Clock className="w-5 h-5" />;
    case "loyalty": return <Percent className="w-5 h-5" />;
    default: return <Gift className="w-5 h-5" />;
  }
};

export default function Offers() {
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    // You could add a toast notification here
    alert(`Code ${code} copied to clipboard!`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-food text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Percent className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Special Offers</h1>
          </div>
          <p className="text-white/90 text-lg">Save more with our exclusive deals and discounts</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Offer */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">🔥 Featured Offer</h2>
          <Card className="overflow-hidden shadow-large border-2 border-accent/20">
            <div className="bg-gradient-to-r from-accent to-accent-hover text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Mega Monday Deal</h3>
                  <p className="text-white/90 mb-4">Get 60% OFF on orders above ₹499. Today only!</p>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="bg-white text-accent">
                      Code: MEGA60
                    </Badge>
                    <span className="text-sm">Valid till midnight</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">60%</div>
                  <div className="text-lg">OFF</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* All Offers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map((offer) => (
            <Card key={offer.id} className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <CardHeader className="pb-3">
                <div className={`${offer.color} text-white p-4 -m-6 mb-4 flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    {getOfferIcon(offer.type)}
                    <div>
                      <CardTitle className="text-white text-lg">{offer.title}</CardTitle>
                      <div className="text-white/90 text-sm font-medium">{offer.discount}</div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {offer.type.replace('-', ' ')}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">{offer.description}</p>
                
                <div className="space-y-2 text-sm">
                  {offer.minOrder > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Minimum Order:</span>
                      <span className="font-medium">₹{offer.minOrder}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Max Discount:</span>
                    <span className="font-medium">₹{offer.maxDiscount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Valid Till:</span>
                    <span className="font-medium">{offer.validTill}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex-1 bg-muted rounded-lg p-3 border-2 border-dashed border-border">
                    <div className="text-xs text-muted-foreground mb-1">Promo Code</div>
                    <div className="font-mono font-bold text-lg">{offer.code}</div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => copyCode(offer.code)}
                    className="px-6"
                  >
                    Copy
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Terms Section */}
        <div className="mt-12 bg-muted/50 rounded-lg p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Tag className="w-4 h-4" />
            Terms & Conditions
          </h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• Offers are valid for limited time periods as mentioned</li>
            <li>• Discount codes cannot be combined with other offers</li>
            <li>• Maximum discount amount is applicable per order</li>
            <li>• Offers are subject to availability and may be discontinued without notice</li>
            <li>• Some offers may be applicable only for specific user categories</li>
            <li>• Cash on delivery charges may apply separately</li>
          </ul>
        </div>
      </div>
    </div>
  );
}