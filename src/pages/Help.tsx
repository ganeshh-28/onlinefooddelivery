import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Search, Phone, Mail, MessageCircle, Clock, HelpCircle, ShoppingCart, Truck, CreditCard, User } from "lucide-react";

const faqData = [
  {
    category: "Orders",
    icon: <ShoppingCart className="w-4 h-4" />,
    questions: [
      {
        question: "How do I place an order?",
        answer: "Simply browse our menu, add items to your cart, provide delivery details, and proceed to payment. You'll receive order confirmation via SMS and email."
      },
      {
        question: "Can I modify my order after placing it?",
        answer: "Orders can be modified within 5 minutes of placing. After that, please contact our support team immediately."
      },
      {
        question: "What if an item is out of stock?",
        answer: "If an item becomes unavailable after ordering, we'll contact you immediately with alternatives or issue a refund for that item."
      }
    ]
  },
  {
    category: "Delivery",
    icon: <Truck className="w-4 h-4" />,
    questions: [
      {
        question: "What are your delivery hours?",
        answer: "We deliver from 10:00 AM to 11:00 PM, 7 days a week. Extended hours during weekends and festivals."
      },
      {
        question: "How long does delivery take?",
        answer: "Standard delivery takes 30-45 minutes. During peak hours or bad weather, it might take up to 60 minutes."
      },
      {
        question: "Do you deliver to my area?",
        answer: "We deliver within a 10km radius of our partner restaurants. Enter your address to check availability."
      }
    ]
  },
  {
    category: "Payment",
    icon: <CreditCard className="w-4 h-4" />,
    questions: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit/debit cards, UPI, net banking, digital wallets, and cash on delivery."
      },
      {
        question: "Is it safe to pay online?",
        answer: "Yes, we use industry-standard SSL encryption and secure payment gateways to protect your financial information."
      },
      {
        question: "When will I be charged?",
        answer: "For online payments, you're charged immediately. For COD, payment is collected upon delivery."
      }
    ]
  },
  {
    category: "Account",
    icon: <User className="w-4 h-4" />,
    questions: [
      {
        question: "How do I create an account?",
        answer: "Click 'Sign Up', provide your details, verify your phone number and email. You can also sign up using Google or Facebook."
      },
      {
        question: "I forgot my password. What should I do?",
        answer: "Click 'Forgot Password' on the login page, enter your email, and follow the reset instructions sent to your email."
      },
      {
        question: "How do I update my profile information?",
        answer: "Go to 'Profile' section in your account, click 'Edit Profile', update your information, and save changes."
      }
    ]
  }
];

export default function Help() {
  const [searchQuery, setSearchQuery] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", contactForm);
    alert("Thank you for your message! We'll get back to you within 24 hours.");
    setContactForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-food text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Help & Support</h1>
          </div>
          <p className="text-white/90 text-lg">We're here to help you with any questions or issues</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover:shadow-medium transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-muted-foreground text-sm mb-3">Available 24/7</p>
              <p className="font-medium text-lg">+91 1800-123-456</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-medium transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-muted-foreground text-sm mb-3">Reply within 2 hours</p>
              <p className="font-medium">support@foodexpress.com</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-medium transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-muted-foreground text-sm mb-3">Instant support</p>
              <Button variant="outline" size="sm">Start Chat</Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          </div>

          {/* Search FAQ */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* FAQ Categories */}
          <div className="space-y-6">
            {filteredFAQs.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {category.icon}
                    {category.category}
                    <Badge variant="secondary">{category.questions.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, index) => (
                      <AccordionItem key={index} value={`${categoryIndex}-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFAQs.length === 0 && searchQuery && (
            <div className="text-center py-8">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No results found</h3>
              <p className="text-muted-foreground">Try different keywords or contact us directly</p>
            </div>
          )}
        </div>

        {/* Contact Form */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-accent" />
              Still Need Help?
            </CardTitle>
            <p className="text-muted-foreground">Send us a message and we'll get back to you within 24 hours</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={contactForm.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={contactForm.message}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <Button type="submit" variant="cta" size="lg">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Operating Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-accent" />
              Operating Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Customer Support</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-medium">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday - Sunday:</span>
                    <span className="font-medium">24/7</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3">Food Delivery</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-medium">10:00 AM - 11:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday - Sunday:</span>
                    <span className="font-medium">9:00 AM - 12:00 AM</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}