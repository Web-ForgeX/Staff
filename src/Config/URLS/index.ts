const BUCKETS = "https://supabase.forgex.net/storage/v1/object/public";

export default {
  API: "https://api.forgex.net",
  BUCKETS,
  USER_AVATARS_BUCKET: `${BUCKETS}/profile-pictures`,
  USER_BANNER_BUCKET: `${BUCKETS}/banner`,
  RESOURCES_BUCKET: `${BUCKETS}/sign/resources`,
  RESOURCES_IMGS_BUCKET: `${BUCKETS}/resource-images`,
  CDN: "https://assets.forgex.net",
};
