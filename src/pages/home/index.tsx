import { Button } from "@/components/ui/button";
import {
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  FileCheck,
  Ban,
  ArrowUpDown,
  Search,
  Star,
} from "lucide-react";
import { Input } from "@/components/ui/input";

const StaffDashboard = () => {
  // This would come from your backend in a real application
  const pendingResources = [
    {
      id: 1,
      name: "Advanced RPG Quest System",
      description:
        "A comprehensive quest management system with branching dialogues",
      submittedAt: "2024-03-14T10:30:00Z",
      price: "$24.99",
      category: "Scripts",
      image:
        "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=400&h=300",
      store: {
        name: "RPG Masters",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=50&h=50",
        rating: 4.8,
        totalSales: 1243,
      },
    },
    {
      id: 2,
      name: "Medieval Weapon Pack",
      description:
        "High-quality 3D models of medieval weapons with PBR textures",
      submittedAt: "2024-03-14T09:15:00Z",
      price: "$34.99",
      category: "3D Models",
      image:
        "https://images.unsplash.com/photo-1590967596725-5462dfcd8b57?auto=format&fit=crop&q=80&w=400&h=300",
      store: {
        name: "Asset Forge",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=50&h=50",
        rating: 4.9,
        totalSales: 2156,
      },
    },
    {
      id: 3,
      name: "Advanced Vehicle Physics",
      description: "Realistic vehicle physics system for racing games",
      submittedAt: "2024-03-14T08:45:00Z",
      price: "$49.99",
      category: "Physics",
      image:
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=400&h=300",
      store: {
        name: "GamePhysics Pro",
        avatar:
          "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=50&h=50",
        rating: 4.7,
        totalSales: 892,
      },
    },
  ];

  const stats = {
    pending: 24,
    approved: 156,
    rejected: 12,
    todayNew: 8,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Staff Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Review and manage submitted resources
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-card to-accent/20 rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Pending Review
                  </p>
                  <p className="text-2xl font-bold">{stats.pending}</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-card to-accent/20 rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <div className="bg-green-500/10 p-3 rounded-full">
                  <FileCheck className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold">{stats.approved}</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-card to-accent/20 rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <div className="bg-red-500/10 p-3 rounded-full">
                  <Ban className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                  <p className="text-2xl font-bold">{stats.rejected}</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-card to-accent/20 rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <div className="bg-blue-500/10 p-3 rounded-full">
                  <AlertCircle className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">New Today</p>
                  <p className="text-2xl font-bold">{stats.todayNew}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search resources..." className="pl-10" />
            </div>
            <Button variant="outline">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Sort by Date
            </Button>
          </div>

          {/* Pending Resources List */}
          <div className="space-y-4">
            {pendingResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-gradient-to-br from-card to-accent/20 rounded-lg border p-6"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Resource Image */}
                  <div className="w-full md:w-48 h-36">
                    <img
                      src={resource.image}
                      alt={resource.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Resource Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold">{resource.name}</h3>
                        <p className="text-muted-foreground mt-1">
                          {resource.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">
                          {resource.price}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {resource.category}
                        </p>
                      </div>
                    </div>

                    {/* Store Info */}
                    <div className="flex items-center mt-4">
                      <img
                        src={resource.store.avatar}
                        alt={resource.store.name}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-medium">{resource.store.name}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            {resource.store.rating}
                          </div>
                          <span>•</span>
                          <span>
                            {resource.store.totalSales.toLocaleString()} sales
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Submission Time */}
                    <p className="text-sm text-muted-foreground mt-4">
                      Submitted{" "}
                      {new Date(resource.submittedAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex md:flex-col gap-2 md:w-32">
                    <Button variant="outline" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 text-green-500 hover:text-green-600"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Accept
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 text-red-500 hover:text-red-600"
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Deny
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
