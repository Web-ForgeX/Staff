import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDeleteModal } from "@/hooks/delete_confirm";
import {
  Trash2,
  Store,
  ImagePlus,
  Wallet,
  Save,
  ImageIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { useState, useEffect } from "react";
import { Store as StoreType } from "@/API/stores/types";
import SendRequest from "@/API/request";

const chartConfig = {
  percentage: { label: "Percentage" },
  user1: { label: "John Doe", color: "chart-1" },
  user2: { label: "Jane Smith", color: "chart-2" },
  user3: { label: "Mike Johnson", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

// ImageUploadBox Component
const ImageUploadBox = ({
  label,
  subtitle,
  size,
}: {
  label: string;
  subtitle: string;
  size: string;
}) => (
  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors">
    <div className="flex flex-col items-center gap-2">
      <div className="p-3 rounded-full bg-primary/10">
        <ImageIcon className="w-6 h-6 text-primary" />
      </div>
      <div className="space-y-1">
        <h3 className="font-medium text-base">{label}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <div className="mt-2 text-sm text-muted-foreground">
        Recommended size: {size}
      </div>
    </div>
  </div>
);

// Types
interface Member {
  id: number;
  username: string;
  picture?: string;
  verified: boolean;
  percentage: number;
}

// Store Settings Component
export default function StoreViewStoreSettings({
  store,
}: {
  store: StoreType;
}) {
  const { openDeleteModal } = useDeleteModal();
  const [members, setMembers] = useState<Member[]>([]);
  const [totalPercentage, setTotalPercentage] = useState(100);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!store.members.length) {
        setMembers([]);
        return;
      }

      try {
        const idsString = store.members.join(",");
        const response = await SendRequest({
          method: "GET",
          route: `/user/batch?id=${idsString}`,
        });

        if (response.error) {
          throw new Error(response.error);
        }

        if (response.data) {
          const membersWithPercentage = response.data.map((member: Member) => ({
            ...member,
            percentage: 100 / response.data.length,
          }));
          setMembers(membersWithPercentage);
        }
      } catch (error) {
        console.error("Failed to fetch members:", error);
      }
    };

    fetchMembers();
  }, [store.members]);

  const handlePercentageChange = (id: number, value: string) => {
    const newValue =
      value === "" ? 0 : Math.min(100, Math.max(0, parseInt(value) || 0));
    setMembers(
      members.map((user) =>
        user.id === id ? { ...user, percentage: newValue } : user,
      ),
    );
  };

  useEffect(() => {
    const total = members.reduce((sum, user) => sum + user.percentage, 0);
    setTotalPercentage(total);
    setHasError(total !== 100);
  }, [members]);

  const generateShades = (count: number) => {
    const shades = [];
    const step = 15 / count;
    for (let i = 0; i < count; i++) {
      const lightness = Math.max(35 - step * i, 15);
      shades.push(`hsl(158, 50%, ${lightness}%)`);
    }
    return shades;
  };

  const shades = generateShades(members.length);
  const chartData = members.map((user, index) => ({
    name: user.username,
    percentage: user.percentage,
    fill: shades[index],
  }));

  if (!store) return;

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 space-y-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary">Store Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="w-5 h-5 text-primary" />
              Basic Information
            </CardTitle>
            <CardDescription>Manage your store's basic details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Store Name</label>
                <Input value={store.name} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                <Textarea value={store.bio} className="h-24" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="default" size="sm">
              Update Details
            </Button>
          </CardFooter>
        </Card>

        {/* Media Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImagePlus className="w-5 h-5 text-primary" />
              Store Media
            </CardTitle>
            <CardDescription>
              Upload your store's branding assets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Profile Picture</label>
                  <p className="text-sm text-muted-foreground mb-3">
                    This will be shown across the platform
                  </p>
                  <div className="relative group cursor-pointer">
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      accept="image/*"
                    />
                    <ImageUploadBox
                      label="Upload Profile Picture"
                      subtitle="Drag and drop or click to upload"
                      size="1000x1000px"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Store Banner</label>
                  <p className="text-sm text-muted-foreground mb-3">
                    This will appear at the top of your store page
                  </p>
                  <div className="relative group cursor-pointer">
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      accept="image/*"
                    />
                    <ImageUploadBox
                      label="Upload Banner Image"
                      subtitle="Drag and drop or click to upload"
                      size="2000x1000px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-muted-foreground">
                Supported formats: JPEG, PNG, GIF
              </p>
              <Button variant="default" size="sm">
                Update Media
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Revenue Distribution Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-primary" />
              Team Members
            </CardTitle>
            <CardDescription>
              Manage team members and their Tebex wallets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {members.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-4 p-3 border rounded-lg hover:border-primary transition-colors"
                >
                  <div className="flex-grow">
                    <div className="font-medium text-primary">
                      {user.username}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      PLACEHOLDER
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={user.percentage}
                      onChange={(e) =>
                        handlePercentageChange(user.id, e.target.value)
                      }
                      className="w-20"
                      min="0"
                      max="100"
                    />
                    <span className="text-sm">%</span>
                  </div>
                </div>
              ))}

              {hasError && (
                <p className="text-sm font-medium text-destructive mt-4">
                  Total percentage must equal 100% (currently {totalPercentage}
                  %)
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Distribution Chart */}
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Revenue Distribution</CardTitle>
            <CardDescription>Current Share Split</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={chartData}
                  dataKey="percentage"
                  nameKey="name"
                  label
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Total Distribution: {totalPercentage}%
            </div>
            <div className="leading-none text-muted-foreground">
              Split between{" "}
              <span className="text-primary">{members.length}</span> team
              members
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-start">
        <Button
          variant="default"
          size="lg"
          disabled={hasError}
          className="gap-2"
        >
          <Save className="w-4 h-4" />
          Save All Changes
        </Button>
      </div>

      {/* Danger Zone */}
      <Card className="border-destructive bg-destructive/10">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription className="text-destructive">
            Permanent actions that cannot be undone
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-destructive">
              Once you delete your store, there is no going back. Please be
              certain.
            </p>
            <Button
              variant="destructive"
              onClick={() =>
                openDeleteModal(
                  `Delete ${store.name}`,
                  "Are you sure you want to delete this store? This action cannot be undone.",
                  store.name,
                  () => {
                    console.log("User deleted!");
                  },
                )
              }
              className="flex items-center gap-2 w-full"
            >
              <Trash2 className="w-4 h-4" />
              Delete Store
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
