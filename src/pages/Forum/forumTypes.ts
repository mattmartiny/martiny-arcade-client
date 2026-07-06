export type ForumCategory = {
  name: string;
  slug: string;
  description: string;
  threadCount: number;
  lastActivityAt: string | null;
};

export type ForumThreadListItem = {
  forumThreadId: string;
  title: string;
  bodyPreview: string;
  authorUsername: string;
  createdAt: string;
  lastActivityAt: string;
  replyCount: number;
};

export type ForumThreadReply = {
  forumReplyId: string;
  body: string;
  authorUsername: string;
  createdAt: string;
};

export type ForumThreadDetail = {
  forumThreadId: string;
  categoryName: string;
  categorySlug: string;
  title: string;
  body: string;
  authorUsername: string;
  createdAt: string;
  lastActivityAt: string;
  replyCount: number;
  replies: ForumThreadReply[];
};

export type ForumCategoryFeed = {
  category: ForumCategory;
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  threads: ForumThreadListItem[];
};
