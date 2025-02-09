// Sections
import HOME_Hero from "./sections/hero";
import SECTION_Resource_Card_Grid from "@/sections/resource_card_grid";
import SECTION_Features_Cards from "@/sections/features_cards";

// Sample resources data
const sampleResources = [
  {
    title: "Getting Started Guide",
    description: "Learn the basics of our platform",
    author: "Development Team",
    version: "1.0",
    link: "/guides/getting-started",
    image: {
      src: "https://placehold.co/600x400",
      alt: "Getting Started Guide",
    },
  },
  {
    title: "API Documentation",
    description: "Complete API reference and examples",
    author: "API Team",
    version: "2.1",
    link: "/docs/api",
    image: {
      src: "https://placehold.co/600x400",
      alt: "API Documentation",
    },
  },
  {
    title: "Component Library",
    description: "UI components and design system",
    author: "Design Team",
    version: "3.2",
    link: "/components",
    image: {
      src: "https://placehold.co/600x400",
      alt: "Component Library",
    },
  },
  {
    title: "Best Practices",
    description: "Tips and recommendations for optimal usage",
    author: "Architecture Team",
    version: "1.5",
    link: "/guides/best-practices",
    image: {
      src: "https://placehold.co/600x400",
      alt: "Best Practices Guide",
    },
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HOME_Hero />
      <section className="py-12 pb-24 bg-gray-50">
        <SECTION_Resource_Card_Grid
          resources={sampleResources}
          per_row={4}
          title="Trending Resources"
          showViewAll={true}
        />
      </section>
      <SECTION_Features_Cards />
    </main>
  );
}
