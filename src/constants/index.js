const PATHS = {
  project: {
    home: "/",
    detail: "/project/:id",
  },
  magazine: {
    home: "/magazine",
    detail: "/magazine/:id",
  },
};

const ORDER_BY = [
  { label: "탐색", value: "random" },
  { label: "최신순", value: "published_at" },
  { label: "조회순", value: "view_count" },
  { label: "좋아요순", value: "like_count" },
];

const QUERY_LIMIT = 12;

export { PATHS, ORDER_BY, QUERY_LIMIT };
