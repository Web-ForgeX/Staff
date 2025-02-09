// Sections
import SECTION_SearchBar from "@/sections/searchbar";
import SECTION_Category_Chips from "@/sections/category_chips";

// Configs
import URLS from "@/Config/URLS";

export default function HOME_Hero(){
return (
    <>
    <div className="relative z-10">
        <div className="relative">
          <div className={`max-w-full mx-auto px-4 py-12 bg-[url(${URLS.CDN}/SVG/green_banner.svg)] bg-cover bg-no-repeat`}>
            <div className="text-center">
              <h2 className="text-3xl tracking-tight font-extrabold sm:text-4xl md:text-5xl text-white">
                Create Your Digital Marketplace
              </h2>
              <p className="mt-2 max-w-md mx-auto text-sm text-accent sm:text-base md:mt-3 md:text-lg md:max-w-2xl">
                Sell your digital products with ease. Perfect for Minecraft
                plugins, FiveM mods, Roblox assets, and more.
              </p>
              <div className="mt-4 max-w-xl mx-auto">
                <SECTION_SearchBar />
                <SECTION_Category_Chips/>
                
              </div>
            </div>
          </div>
        </div>
        </div>
    </>
)
}