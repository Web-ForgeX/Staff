import { Card, CardContent } from "@/components/ui/card";
import { Store, Sparkles, TrendingUp } from "lucide-react";

interface FeatureCardProps {
  Icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ Icon, title, description }) => {


  return (
    <Card
      className="relative overflow-hidden p-6 transition-all duration-300 ease-in-out shadow-lg rounded-2xl hover:shadow-2xl"
    >
      <CardContent className="relative flex flex-col items-center text-center">
        <div className="relative w-16 h-16 mb-4">
          <Icon className="w-full h-full text-primary" />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default function SECTION_Features_Cards() {
  const features: FeatureCardProps[] = [
    {
      Icon: Store,
      title: "Custom Stores",
      description:
        "Create your personalized storefront to showcase your digital products.",
    },
    {
      Icon: Sparkles,
      title: "Secure Payments",
      description:
        "Safe and secure payment processing for all your transactions.",
    },
    {
      Icon: TrendingUp,
      title: "Analytics",
      description: "Track your sales and monitor your store's performance.",
    },
  ];

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-primary">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2 text-primary-foreground">Powerful Features for Your Store</h2>
        <p className="text-primary-foreground/70 text-sm max-w-2xl mx-auto">
          Everything you need to create, manage, and grow your digital marketplace.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};
