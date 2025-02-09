// Components
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react"

// Components
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
export default function SECTION_SearchBar(){

    const [searchQuery, setSearchQuery] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  const handleSearch = () => {
    const category = searchParams.get("category");
    const params = new URLSearchParams();

    if (category) {
      params.append("category", category);
    }

    if (searchQuery) {
      params.append("q", searchQuery);
    }

    navigate(`/browse?${params.toString()}`);
  };


    return (
        <div className="flex gap-2">
      <Input
        type="search"
        placeholder="Search for resources..."
        className="flex-1"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button variant="secondary" onClick={handleSearch}>
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </div>
    )
}