export type Data = {
  _id: string;
  content: string;
  createdby: { username: string; id: string };
  __v: number;
  comments: Comment[];
  likes: string[];
};

export type Tweet = {
  success: boolean;
  message: string;
  data: Data[];
  err: {};
};
export type NewTweet = {
  success: boolean;
  message: string;
  data: Data;
  err: {};
};
export type NewComment = {
  success: boolean;
  message: string;
  data: Comment;
  err: {};
};
export type CreateTweet = {
  content: string;
};

export type Comment = {
  content: string;
  commentable: string;
  onModel: 'Tweet' | 'Comment';
  user?: { username: string; id: string };
};
export type Like = {
  likable: string;
  onModel: 'Tweet' | 'Comment';
  user?: { username: string; id: string };
};
enum onModel {
  Tweet = 'Tweet',
  Comment = 'Comment',
}
