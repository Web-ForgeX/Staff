import { useState, useEffect } from "react";
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
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import SendRequest from "@/API/request";
import URLS from "@/Config/URLS";
interface PendingResource {
  id: string;
  approved: boolean;
  name: string;
  description: string;
  price: number;
  created_at: string;
  image_urls: string[];
  owner: string;
}

const StaffDashboard = () => {
  const [pendingResources, setPendingResources] = useState<PendingResource[]>(
    [],
  );
  const [stats, setStats] = useState({
    approved: 0,
    pending: 0,
    rejected: 0,
    todayNew: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for deny dialog
  const [denyDialogOpen, setDenyDialogOpen] = useState(false);
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(
    null,
  );
  const [denyReason, setDenyReason] = useState("");

  const fetchData = async () => {
    try {
      // Fetch pending resources
      const pendingResourcesResponse = await SendRequest({
        route: "/resource/admin/pending",
      });

      // Fetch stats
      const statsResponse = await SendRequest({
        route: "/resource/admin/stats",
      });

      if (pendingResourcesResponse.error) {
        throw new Error(pendingResourcesResponse.error);
      }

      if (statsResponse.error) {
        throw new Error(statsResponse.error);
      }

      // Calculate today's new resources (simple approximation)
      const todayResources = pendingResourcesResponse.data.filter(
        (resource: PendingResource) => {
          const resourceDate = new Date(resource.created_at);
          const today = new Date();
          return resourceDate.toDateString() === today.toDateString();
        },
      );

      // Update to use the data from the nested data property
      setPendingResources(pendingResourcesResponse.data || []);
      setStats({
        approved: statsResponse.data?.approved_count || 0,
        pending: pendingResourcesResponse.data?.length || 0,
        // Placeholder values - replace with actual backend data if available
        rejected: 0,
        todayNew: todayResources.length,
      });
      setLoading(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDownload = async (resourceId: string) => {
    try {
      const response = await SendRequest({
        method: "GET",
        route: `/resource/id/${resourceId}/download`,
      });

      if (response.error || !response.data?.url) {
        throw new Error(response.error || "Download URL not found");
      }

      window.open(response.data.url, "_blank");
    } catch (err) {
      console.error("Download failed:", err);
      setError(err instanceof Error ? err.message : "Download failed");
    }
  };

  const handleApprove = async (resourceId: string) => {
    const data = new FormData();
    data.append("id", resourceId);
    data.append("approved", "true");
    try {
      const response = await SendRequest({
        method: "PATCH",
        route: "/resource/admin/approval",
        body: data,
      });

      if (response.error) {
        throw new Error(response.error);
      }

      // Refresh data after approval
      await fetchData();
    } catch (err) {
      console.error("Approval failed:", err);
      setError(err instanceof Error ? err.message : "Approval failed");
    }
  };

  const handleDeny = async () => {
    if (!selectedResourceId) return;
    const data = new FormData();
    data.append("id", selectedResourceId);
    data.append("approved", "true");
    data.append("denyReason", denyReason || "No reason provided");

    try {
      const response = await SendRequest({
        method: "PATCH",
        route: "/resource/admin/approval",
        body: data,
      });

      if (response.error) {
        throw new Error(response.error);
      }

      // Close dialog and reset state
      setDenyDialogOpen(false);
      setSelectedResourceId(null);
      setDenyReason("");

      // Refresh data after denial
      await fetchData();
    } catch (err) {
      console.error("Denial failed:", err);
      setError(err instanceof Error ? err.message : "Denial failed");
    }
  };

  const openDenyDialog = (resourceId: string) => {
    setSelectedResourceId(resourceId);
    setDenyDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <>
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

            {/* Rest of the previous implementation remains the same */}

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
                  {/* Previous resource card implementation */}
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Resource Image */}
                    <div className="w-full md:w-48 h-36">
                      <img
                        src={`${URLS.RESOURCES_IMGS_BUCKET}/${resource.image_urls[0]}`} // Use first image
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
                            {resource.description || "No description provided"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">
                            ${resource.price.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* Submission Time */}
                      <p className="text-sm text-muted-foreground mt-4">
                        Submitted{" "}
                        {new Date(resource.created_at).toLocaleString()}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex md:flex-col gap-2 md:w-32">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleDownload(resource.id)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 text-green-500 hover:text-green-600"
                        onClick={() => handleApprove(resource.id)}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Accept
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 text-red-500 hover:text-red-600"
                        onClick={() => openDenyDialog(resource.id)}
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

      {/* Deny Reason Dialog */}
      <Dialog open={denyDialogOpen} onOpenChange={setDenyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deny Resource</DialogTitle>
            <DialogDescription>
              Please provide a reason for denying this resource
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Enter reason for denial (optional)"
            value={denyReason}
            onChange={(e) => setDenyReason(e.target.value)}
          />
          <DialogFooter>
            <Button variant="destructive" onClick={handleDeny}>
              Confirm Denial
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StaffDashboard;
