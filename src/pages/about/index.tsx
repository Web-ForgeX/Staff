import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Shield, Sparkles, Globe } from "lucide-react";

export default function About_Page() {
  const teamMembers = [
    {
      name: "Char",
      role: "CEO & Founder",
      image:
        "https://cdn.discordapp.com/avatars/829112572816130058/823630e777efe85c7fe71402f00ab0c1.png",
    },
    {
      name: "Pikz",
      role: "CEO & Founder",
      image:
        "https://cdn.discordapp.com/avatars/836999850045472799/d8507c23fbdda5c05d88aaba01d4675e.png",
    },
    {
      name: "Giannis Bekos",
      role: "CEO & Founder",
      image:
        "https://cdn.discordapp.com/avatars/826563457691156481/5ceb10052ffeb632f67f6c9be916777b.png",
    },
    {
      name: "Riccc",
      role: "API Developer",
      image:
        "https://cdn.discordapp.com/avatars/1057373214596157502/fdaf20c42481bb92c3ff5eb5892667c9.png",
    },
    {
      name: "HyperCodec",
      role: "Bot Developer",
      image:
        "https://cdn.discordapp.com/avatars/529732805597593600/b124b34ff111388fe38a360a49ba79f0.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">About ForgeX</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empowering creators to build and sell digital assets in the gaming
            community
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-6">
              At ForgeX, we're building the future of digital asset
              distribution. Our platform connects talented creators with gamers
              and developers worldwide, fostering a vibrant ecosystem of
              high-quality gaming content.
            </p>
            <Button asChild>
              <Link to="/auth/signup">Join Our Community</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-card to-accent/20 p-6 rounded-lg border">
              <Users className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-bold mb-1">Community First</h3>
              <p className="text-sm text-muted-foreground">
                Supporting creators and their audiences
              </p>
            </div>
            <div className="bg-gradient-to-br from-card to-accent/20 p-6 rounded-lg border">
              <Shield className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-bold mb-1">Secure Platform</h3>
              <p className="text-sm text-muted-foreground">
                Safe transactions and content delivery
              </p>
            </div>
            <div className="bg-gradient-to-br from-card to-accent/20 p-6 rounded-lg border">
              <Sparkles className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-bold mb-1">Quality Content</h3>
              <p className="text-sm text-muted-foreground">
                Curated marketplace of top assets
              </p>
            </div>
            <div className="bg-gradient-to-br from-card to-accent/20 p-6 rounded-lg border">
              <Globe className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-bold mb-1">Global Reach</h3>
              <p className="text-sm text-muted-foreground">
                Connecting creators worldwide
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-gradient-to-br from-card to-accent/20 rounded-lg border p-4 text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-primary"
                />
                <h3 className="font-bold text-base mb-1">{member.name}</h3>
                <p className="text-primary text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground mb-6">
            Have questions? We'd love to hear from you.
          </p>
          <Button asChild>
            <Link to="/discord">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
