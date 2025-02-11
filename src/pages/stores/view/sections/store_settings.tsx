import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDeleteModal } from "@/hooks/delete_confirm";
import { Trash2 } from "lucide-react";
export default function STORE_VIEW_Store_Settings() {
  const { openDeleteModal } = useDeleteModal();
  return (
    <div className="space-y-8 sm:space-y-12 w-full mx-0">
      <form className="space-y-4 sm:space-y-6">
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-sm font-medium">Store Name</label>
          <Input value="Sample Store" />
        </div>
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-sm font-medium">Bio</label>
          <Textarea value="This is a short description of the store." />
        </div>
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-sm font-medium">Profile Picture</label>
          <Input type="file" />
        </div>
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-sm font-medium">Banner Image</label>
          <Input type="file" />
        </div>

        {/* Payouts Section */}
        <div className="border-t border-border pt-6">
          <h3 className="text-lg font-semibold mb-4">Payouts</h3>
          <div className="space-y-1.5 sm:space-y-2 flex items-center">
            <label className="text-sm font-medium">
              Tebex Wallet Reference
            </label>
          </div>
          <Input type="text" placeholder="Enter your Tebex Wallet Reference" />
        </div>

        <Button className="w-full sm:w-auto">Save Changes</Button>
      </form>

      {/* Danger Zone */}
      <div className="border-t border-border pt-6">
        <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-6">
          <h3 className="text-lg font-semibold text-destructive mb-4">
            Danger Zone
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Once you delete your store, there is no going back. Please be
            certain.
          </p>
          <Button
            variant="destructive"
            onClick={() =>
              openDeleteModal(
                `Delete Sample Store`,
                "Are you sure you want to delete this store? This action cannot be undone.",
                "Sample Store",
                () => {
                  console.log("User deleted!");
                },
              )
            }
            className="flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete Store
          </Button>
        </div>
      </div>
    </div>
  );
}
