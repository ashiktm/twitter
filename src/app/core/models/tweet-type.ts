export type Data = {
  _id: string;
  content: string;
  createdby: { username: string; id: string };
  __v: number;
  comments: Comment[];
  likes: [];
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
  _id?: string;
  commentable: string;
  onModel: 'Tweet' | 'Comment';
  likes?: [];
  user?: { username: string; id: string };
  comments?: Comment;
};
export type Like = {
  likable: string;
  onModel: 'Tweet' | 'Comment';
  user?: { username: string; id: string };
};
export enum onModel {
  Tweet = 'Tweet',
  Comment = 'Comment',
}
