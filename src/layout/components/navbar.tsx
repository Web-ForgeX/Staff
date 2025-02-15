// Packages
import { useState } from "react";
import { X, Menu } from "lucide-react";

// Components
import { Button } from "@/components/ui/button";

// Sections
import SECTION_Auth_Buttons from "@/sections/auth_buttons";
import SECTION_Nav_Profile from "@/sections/nav_profile";

const user = false;
export default function Navbar() {
  // States
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Functions
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Return
  return (
    <div className="sticky top-0 z-50 w-full shadow-md bg-background border-b border-border py-2">
      <div className="py-2 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="/" className="text-2xl font-bold relative group">
            <span className="font-extrabold">Forge</span>
            <span className="font-black text-primary duration-500 group-hover:animate-pulse">
              X
            </span>
          </a>

          <div className="hidden md:block">
            {user ? <SECTION_Nav_Profile /> : <SECTION_Auth_Buttons />}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="md:hidden absolute top-full left-0 right-0 overflow-hidden">
        <div
          className={`transform transition-all duration-200 ease-in-out ${
            isMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }`}
        >
          <div className="bg-background border-b border-border shadow-lg">
            <div className="space-y-4 p-4">
              {user ? <SECTION_Nav_Profile /> : <SECTION_Auth_Buttons />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
