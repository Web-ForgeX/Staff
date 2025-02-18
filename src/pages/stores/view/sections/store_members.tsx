import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus, Trash2 } from "lucide-react";
import VerifiedBadge from "@/components/ui/verified";
import SendRequest from "@/API/request";
import URLS from "@/Config/URLS";

interface Member {
  id: number;
  username: string;
  picture?: string;
  verified: boolean;
}

interface StoreMembersProps {
  memberIds: string[];
  isOwner: boolean;
  storeOwnerId?: string;
}

const MemberSkeleton = () => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-card rounded-lg p-3 sm:p-4 border border-border animate-pulse">
    <div className="flex items-center gap-3 w-full sm:w-auto">
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200" />
      <div className="space-y-2">
        <div className="h-4 w-24 bg-gray-200 rounded" />
      </div>
    </div>
    <div className="flex gap-2 w-full sm:w-auto">
      <div className="h-8 w-24 bg-gray-200 rounded" />
      <div className="h-8 w-8 bg-gray-200 rounded" />
    </div>
  </div>
);

export default function STORE_VIEW_Store_Members({
  memberIds = [],
  isOwner = false,
  storeOwnerId = "1",
}: StoreMembersProps) {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newMemberUsername, setNewMemberUsername] = useState<string>("");

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      setError(null);
      try {
        const idsString = memberIds.join(",");
        const response = await SendRequest({
          method: "GET",
          route: `/user/batch?id=${idsString}`,
        });

        if (response.error) {
          setError(response.error);
          return;
        }

        if (response.data) {
          setMembers(response.data);
        }
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred",
        );
        console.error("Failed to fetch members:", error);
      } finally {
        setLoading(false);
      }
    };

    if (memberIds.length > 0) {
      fetchMembers();
    } else {
      setLoading(false);
      setMembers([]);
    }
  }, [memberIds]);

  const handleAddMember = () => {
    if (!newMemberUsername.trim()) return;

    const newMember: Member = {
      id: Date.now(), // Temporary ID until API integration
      username: newMemberUsername,
      picture: undefined,
      verified: false,
    };

    setMembers((prevMembers) => [...prevMembers, newMember]);
    setNewMemberUsername("");
  };

  const handleRemoveMember = (id: number) => {
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member.id !== id),
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMemberUsername(e.target.value);
  };

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-lg">
        Error loading members: {error}
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {isOwner && (
        <div className="flex flex-col sm:flex-row gap-2 mb-4 sm:mb-6">
          <Input
            placeholder="Enter username to add"
            value={newMemberUsername}
            onChange={handleInputChange}
            className="sm:max-w-sm"
          />
          <Button
            onClick={handleAddMember}
            className="w-full sm:w-auto"
            disabled={!newMemberUsername.trim()}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>
      )}

      {loading ? (
        <>
          <MemberSkeleton />
          <MemberSkeleton />
          <MemberSkeleton />
        </>
      ) : (
        members.map((member) => (
          <div
            key={member.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-card rounded-lg p-3 sm:p-4 border border-border"
          >
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <img
                src={`${URLS.USER_AVATARS_BUCKET}/${member.picture}`}
                alt={`${member.username}'s avatar`}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
              />
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-sm sm:text-base flex items-center gap-1 align-middle">
                  {member.username}
                  {member.verified && <VerifiedBadge className="w-3" />}
                </span>
                {String(member.id) === storeOwnerId && (
                  <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-md">
                    Owner
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-none"
              >
                View Profile
              </Button>
              {isOwner && String(member.id) !== storeOwnerId && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveMember(member.id)}
                  className="flex-1 sm:flex-none"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
