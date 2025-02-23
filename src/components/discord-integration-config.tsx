import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Users, Check, Shield, Settings } from "lucide-react";
import { Button } from "./ui/button";

interface DiscordServer {
  id: string;
  name: string;
  icon: string;
  memberCount: number;
  roles: DiscordRole[];
}

interface DiscordRole {
  id: string;
  name: string;
  color: string;
}

const discordServers: DiscordServer[] = [
  {
    id: "1",
    name: "Gaming Community",
    icon: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=50&h=50",
    memberCount: 1234,
    roles: [
      { id: "00", name: "Premium Member", color: "#FFD700" },
      { id: "01", name: "VIP", color: "#FF0000" },
      { id: "02", name: "Supporter", color: "#00FF00" },
    ],
  },
  {
    id: "2",
    name: "Developer Hub",
    icon: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&q=80&w=50&h=50",
    memberCount: 567,
    roles: [
      { id: "03", name: "Resource Creator", color: "#0000FF" },
      { id: "04", name: "Premium Dev", color: "#800080" },
    ],
  },
];

interface DiscordIntegrationProps {
  discordEnabled: boolean;
  setDiscordEnabled: (enabled: boolean) => void;
  selectedRole: string;
  setSelectedRole: (role: string) => void;
  selectedServer: string;
  setSelectedServer: (server: string) => void;
}

function DiscordIntegrationConfig({
  discordEnabled,
  setDiscordEnabled,
  selectedRole,
  setSelectedRole,
  selectedServer,
  setSelectedServer,
}: DiscordIntegrationProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            className="h-5 w-5 fill-primary"
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Discord</title>
            <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
          </svg>
          <span className="font-medium">Discord Integration</span>
        </div>
        <Button
          variant={discordEnabled ? "default" : "outline"}
          onClick={() => setDiscordEnabled(!discordEnabled)}
        >
          {discordEnabled ? "Enabled" : "Disabled"}
        </Button>
      </div>

      {discordEnabled && (
        <div className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {discordServers.map((server) => (
              <button
                key={server.id}
                onClick={() => {
                  setSelectedServer(server.id);
                  setSelectedRole("");
                }}
                className={`flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-all ${
                  selectedServer === server.id ? "ring-2 ring-primary" : ""
                }`}
              >
                <img
                  src={server.icon}
                  alt={server.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1 text-left">
                  <h3 className="font-medium">{server.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {server.memberCount.toLocaleString()} members
                  </div>
                </div>
                {selectedServer === server.id && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </button>
            ))}
          </div>

          {selectedServer && (
            <div className="space-y-4 bg-card border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Role Assignment</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-muted-foreground" />
                  <span>When user purchases, assign role:</span>
                </div>

                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role to assign">
                      {selectedRole ? (
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: discordServers
                                .find((s) => s.id === selectedServer)
                                ?.roles.find((r) => r.id === selectedRole)
                                ?.color,
                            }}
                          />
                          <span>
                            {
                              discordServers
                                .find((s) => s.id === selectedServer)
                                ?.roles.find((r) => r.id === selectedRole)?.name
                            }
                          </span>
                        </div>
                      ) : (
                        "Select a role"
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {discordServers
                      .find((s) => s.id === selectedServer)
                      ?.roles.map((role) => (
                        <SelectItem
                          key={role.id}
                          value={role.id}
                          className="flex items-center gap-2"
                        >
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: role.color }}
                          />
                          {role.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DiscordIntegrationConfig;
