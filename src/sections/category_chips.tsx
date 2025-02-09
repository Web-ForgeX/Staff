// Packages
import { useSearchParams } from "react-router-dom";

// Configs
import Resources from "@/Config/Resources";

// Components
import { Button } from "@/components/ui/button";
export default function SECTION_Category_Chips(){
    const [searchParams] = useSearchParams();

    const activeCategory = searchParams.get("category") || "";


    const handleCategoryClick = (tag: string) => {
        const params = new URLSearchParams(searchParams);
    
        if (activeCategory === tag) {
          params.delete("category");
        } else {
          params.set("category", tag);
        }
    
        const queryString = params.toString();
        window.location.href = `/browse?${queryString}`;
      };

    return (
        <div className="mt-4 flex flex-wrap gap-2">
      {Resources.CATEGORIES.map((tag) => (
        <Button
          key={tag}
          onClick={() => handleCategoryClick(tag)}
          variant="outline"
          size="sm"
          className={`text-muted-foreground ${activeCategory === tag ? "bg-secondary" : "bg-white"}`}
        >
          <span className="text-primary mr-1">#</span>
          {tag}
        </Button>
      ))}
    </div>
    )
}