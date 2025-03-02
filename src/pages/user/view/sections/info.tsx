import { Package } from "lucide-react";
import URLS from "@/Config/URLS";
import VerifiedBadge from "@/components/ui/verified";
import { User } from "@/API/Types";

export default function USER_VIEW_User_Info({
  user,
  resource_count,
}: {
  user: User | null;
  resource_count: number;
}) {
  if (!user) {
    return (
      <>
        {/* Skeleton Banner */}
        <div className="relative h-32 sm:h-48 md:h-56 lg:h-64 w-full">
          <div className="w-full h-full bg-muted animate-pulse" />
        </div>

        {/* Skeleton Profile Info */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 md:-mt-20 relative z-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 md:gap-8">
            {/* Avatar Skeleton */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-muted animate-pulse" />
            </div>

            <div className="text-center sm:text-left flex-grow space-y-2 sm:space-y-3 w-full">
              {/* Name Skeleton */}
              <div className="h-8 w-48 mx-auto sm:mx-0 bg-muted animate-pulse rounded" />

              {/* Bio Skeleton */}
              <div className="space-y-2 max-w-2xl">
                <div className="h-4 w-full bg-muted animate-pulse rounded" />
                <div className="h-4 w-full bg-muted animate-pulse rounded" />
                <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
              </div>

              {/* Stats Skeleton */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4">
                <div className="h-8 w-24 bg-muted animate-pulse rounded" />
                <div className="h-8 w-24 bg-muted animate-pulse rounded" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Banner Container */}
      <div className="relative h-32 sm:h-48 md:h-56 lg:h-64 w-full">
        <img
          src={`${URLS.USER_BANNER_BUCKET}/${user.banner || "default.jpg"}`}
          alt="Store Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Info Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 md:-mt-20 relative z-10">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 md:gap-8">
          <div className="flex-shrink-0">
            <img
              src={`${URLS.USER_AVATARS_BUCKET}/${user.picture}`}
              alt={user.username}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border-4 border-border"
            />
          </div>
          <div className="text-center sm:text-left flex-grow space-y-2">
            <div className="flex flex-col gap-2">
              <div className="inline-flex justify-center sm:justify-start">
                <span className="sm:bg-background/95 sm:border-2 sm:border-border sm:backdrop-blur-sm sm:rounded-xl sm:px-4 sm:py-1.5 text-xl sm:text-2xl md:text-3xl font-bold text-primary">
                  {user.username}
                </span>
              </div>
              <div className="inline-flex justify-center sm:justify-start">
                <span className="sm:bg-background/95 sm:border-2 sm:border-border sm:backdrop-blur-sm sm:rounded-xl sm:px-4 sm:py-2 text-sm sm:text-base text-muted-foreground">
                  {user.bio || "Nothing here yet...."}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4 pt-2">
              <div className="flex items-center gap-1.5 sm:gap-2 bg-background/95 backdrop-blur-sm rounded-full px-4 py-2">
                <Package className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <span className="font-semibold text-sm sm:text-base">
                  {resource_count}
                </span>
                <span className="text-sm sm:text-base text-muted-foreground">
                  Resources
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                {user.verified && <VerifiedBadge />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
