const BUCKETS =
  "https://nijvzcdijjnlnkjbulkf.supabase.co/storage/v1/object/public";

export default {
  API: "https://api.forgex.net",
  BUCKETS,
  USER_AVATARS_BUCKET: `${BUCKETS}/profile-pictures`,
  STORE_AVATAR_BUCKET: `${BUCKETS}/stores/pictures`,
  STORE_BANNER_BUCKET: `${BUCKETS}/stores/banners`,
  RESOURCES_BUCKET: `${BUCKETS}/sign/resources`,
  CDN: "https://assets.forgex.net",
};
