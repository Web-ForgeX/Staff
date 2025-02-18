import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

interface Resource {
  title: string;
  description?: string;
  author?: string;
  version?: string;
  link?: string;
  image: {
    src: string;
    alt: string;
  };
}

interface ResourceCardGridProps {
  resources: Resource[] | null | undefined;
  per_row?: 2 | 3 | 4 | 6;
  title?: string;
  showViewAll?: boolean;
  viewAllLink?: string;
}

const getGridCols = (per_row: number) => {
  switch (per_row) {
    case 2:
      return "grid-cols-1 lg:grid-cols-2";
    case 3:
      return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    case 4:
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
    default:
      return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  }
};

const LoadingCard = () => (
  <Card className="flex flex-col overflow-hidden">
    <div className="relative w-full aspect-[3/1] overflow-hidden">
      <div className="w-full h-full bg-muted animate-pulse" />
    </div>
    <div className="flex flex-col flex-grow">
      <CardHeader className="p-4 pb-2">
        <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
        <div className="space-y-2 mt-2">
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
        </div>
      </CardHeader>
      <CardFooter className="p-4 pt-2 mt-auto">
        <div className="h-4 w-24 bg-muted animate-pulse rounded" />
      </CardFooter>
    </div>
  </Card>
);

export default function SECTION_Resource_Card_Grid({
  resources,
  per_row = 3,
  title = "Resources",
  showViewAll = true,
  viewAllLink = "/browse",
}: ResourceCardGridProps) {
  return (
    <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        {showViewAll && (
          <Button variant="ghost" asChild>
            <a href={viewAllLink}>View All</a>
          </Button>
        )}
      </div>

      {!resources ? (
        // Loading State
        <div className={`grid ${getGridCols(per_row)} gap-6`}>
          {[...Array(6)].map((_, index) => (
            <LoadingCard key={`loading-${index}`} />
          ))}
        </div>
      ) : resources.length === 0 ? (
        // Empty State
        <Card className="w-full p-6 text-center">
          <CardHeader>
            <CardTitle className="text-xl text-muted-foreground">
              No Resources
            </CardTitle>
            <CardDescription>No resources have been added yet.</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        // Resource Grid
        <div className={`grid ${getGridCols(per_row)} gap-6`}>
          {resources.map((resource, index) => (
            <Card
              key={index}
              className="flex flex-col overflow-hidden group hover:shadow-lg transition-shadow duration-200"
            >
              <div className="relative w-full aspect-[3/1] overflow-hidden">
                <img
                  src={resource.image.src}
                  alt={resource.image.alt}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg font-semibold">
                    {resource.title}
                  </CardTitle>
                  {resource.description && (
                    <CardDescription className="text-sm line-clamp-2 mt-1">
                      {resource.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardFooter className="p-4 pt-2 mt-auto">
                  <div className="flex items-center text-sm text-muted-foreground">
                    {resource.author && (
                      <span className="text-primary">{resource.author}</span>
                    )}
                  </div>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
