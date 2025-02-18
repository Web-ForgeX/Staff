import { Package, Users } from "lucide-react";
import URLS from "@/Config/URLS";

import { Store } from "@/API/stores/types";

export default function STORE_VIEW_Store_Info({
  store,
}: {
  store: Store | null;
}) {
  if (!store) {
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

  const { members } = store;

  return (
    <>
      {/* Responsive Banner */}
      <div className="relative h-32 sm:h-48 md:h-56 lg:h-64 w-full">
        <img
          src={`${URLS.STORE_BANNER_BUCKET}/${store.banner}`}
          alt="Store Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Profile Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 md:-mt-20 relative z-10">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 md:gap-8">
          <div className="flex-shrink-0">
            <img
              src={`${URLS.STORE_AVATAR_BUCKET}/${store.picture}`}
              alt={store.name}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border-4 border-background"
            />
          </div>
          <div className="text-center sm:text-left flex-grow space-y-2 sm:space-y-3">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
              {store.name}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
              {store.bio}
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Package className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <span className="font-semibold text-sm sm:text-base">
                  {store.resources.length}
                </span>
                <span className="text-sm sm:text-base text-muted-foreground">
                  Resources
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <span className="font-semibold text-sm sm:text-base">
                  {members.length}
                </span>
                <span className="text-sm sm:text-base text-muted-foreground">
                  Members
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
