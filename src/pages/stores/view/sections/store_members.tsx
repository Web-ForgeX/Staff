import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus, Trash2 } from "lucide-react";
import VerifiedBadge from "@/components/ui/verified";

export default function STORE_VIEW_Store_Members() {
  // Placeholder store and user details
  const store = { owner: "1" }; // Owner ID as string
  const isOwner = true; // Change this to false to test non-owner view

  // Placeholder members list
  const [members, setMembers] = useState([
    { id: 1, username: "Alice", picture: "avatar1.png", verified: true },
    { id: 2, username: "Bob", picture: "avatar2.png", verified: false },
    { id: 3, username: "Charlie", picture: "avatar3.png", verified: true },
  ]);

  const [newMemberUsername, setNewMemberUsername] = useState("");

  // Handle adding a new member
  const handleAddMember = () => {
    if (!newMemberUsername.trim()) return;
    const newMember = {
      id: members.length + 1,
      username: newMemberUsername,
      picture: "default-avatar.png",
      verified: false, // New members start unverified
    };
    setMembers([...members, newMember]);
    setNewMemberUsername(""); // Reset input
  };

  // Handle removing a member
  const handleRemoveMember = (id: number) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {isOwner && (
        <div className="flex flex-col sm:flex-row gap-2 mb-4 sm:mb-6">
          <Input
            placeholder="Enter username to add"
            value={newMemberUsername}
            onChange={(e) => setNewMemberUsername(e.target.value)}
            className="sm:max-w-sm"
          />
          <Button onClick={handleAddMember} className="w-full sm:w-auto">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>
      )}

      {members.map((member) => (
        <div
          key={member.id}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-card rounded-lg p-3 sm:p-4 border border-border"
        >
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <img
              src={`https://placehold.co/400x400`} // Placeholder avatar
              alt={member.username}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
            />
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-sm sm:text-base flex items-center gap-1 align-middle">
                {member.username}
                {member.verified && <VerifiedBadge className="w-3" />}
              </span>
              {String(member.id) === store.owner && (
                <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-md">
                  Owner
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
              View Profile
            </Button>
            {isOwner && String(member.id) !== store.owner && (
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
      ))}
    </div>
  );
}
