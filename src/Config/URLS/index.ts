const BUCKETS = "https://nijvzcdijjnlnkjbulkf.supabase.co/storage/v1/object/public";

export default {
  API: "http://localhost:4005",
  BUCKETS,
  USER_AVATARS_BUCKET: `${BUCKETS}/profile-pictures`,
  USER_BANNER_BUCKET: `${BUCKETS}/banner`,
  RESOURCES_BUCKET: `${BUCKETS}/sign/resources`,
  CDN: "https://assets.forgex.net",
};
