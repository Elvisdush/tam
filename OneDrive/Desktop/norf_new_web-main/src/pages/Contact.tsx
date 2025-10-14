import Navigation from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/5">
        <div className="max-w-7xl mx-auto px-6 py-16 w-full">
          <div className="text-center space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-foreground leading-tight">
              Let's Create Something Amazing Together
            </h1>
            <p className="text-lg md:text-xl font-montserrat text-muted-foreground max-w-3xl mx-auto">
              Ready to bring your vision to life? Get in touch and let's discuss your next project. We're here to help you tell your story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-montserrat">
                Start Your Project
              </Button>
              <Button variant="outline" className="px-8 py-4 text-lg font-montserrat border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-playfair font-semibold text-card-foreground mb-2">Email Us</h3>
              <p className="font-montserrat text-muted-foreground">hello@norfcre8ions.com</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-playfair font-semibold text-card-foreground mb-2">Call Us</h3>
              <p className="font-montserrat text-muted-foreground">+250 123 456 789</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-playfair font-semibold text-card-foreground mb-2">Visit Us</h3>
              <p className="font-montserrat text-muted-foreground">Musanze, Rwanda</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <Clock className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-playfair font-semibold text-card-foreground mb-2">Business Hours</h3>
              <p className="font-montserrat text-muted-foreground">Mon - Fri: 9AM - 6PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
              Send Us a Message
            </h2>
            <p className="text-lg font-montserrat text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? We'd love to hear about it. Fill out the form below and we'll get back to you soon.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card p-8 rounded-lg shadow-lg space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-lg font-playfair text-card-foreground">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="font-montserrat"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-lg font-playfair text-card-foreground">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="font-montserrat"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-lg font-playfair text-card-foreground">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Tell us about your project..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="font-montserrat min-h-[120px] resize-none"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 text-lg font-montserrat"
            >
              Send Message
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
