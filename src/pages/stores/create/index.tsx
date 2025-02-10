import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Image } from "lucide-react";

export default function StoreCreate() {
  return (
    <div className="max-w-4xl mx-auto pb-20 pt-20">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">
        Create Your Store
      </h1>

      <div className="bg-gradient-to-br from-card to-accent/20 rounded-lg border-2 border-border p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6 text-center sm:text-left">
          Store Information
        </h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Store Name *
            </label>
            <Input type="text" placeholder="Store Name" />
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Store Bio
            </label>
            <Textarea placeholder="Store Bio" />
            <p className="text-sm text-muted-foreground mt-1">
              0/500 characters
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-card to-accent/20 rounded-lg border border-border p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6 text-center sm:text-left">
          Store Images
        </h2>

        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <label className="text-sm font-medium text-muted-foreground mb-2">
              Store Logo (Optional)
            </label>
            <Input
              type="file"
              className="hidden"
              id="logo-upload"
              accept="image/*"
            />
            <label
              htmlFor="logo-upload"
              className="cursor-pointer flex flex-col items-center border rounded-lg p-3 bg-background hover:bg-accent/10 border-border"
            >
              <Image className="w-6 h-6" />
              <span className="text-xs text-muted-foreground mt-2">
                Upload Logo
              </span>
            </label>
          </div>

          <div className="flex flex-col items-center w-full">
            <label className="text-sm font-medium text-muted-foreground mb-2">
              Store Banner (Optional)
            </label>
            <Input
              type="file"
              className="hidden"
              id="banner-upload"
              accept="image/*"
            />
            <label
              htmlFor="banner-upload"
              className="cursor-pointer flex flex-col items-center border rounded-lg p-3 bg-background hover:bg-accent/10 w-full border-border"
            >
              <Image className="w-6 h-6" />
              <span className="text-xs text-muted-foreground mt-2">
                Upload Banner
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button>Create Store</Button>
      </div>
    </div>
  );
}
