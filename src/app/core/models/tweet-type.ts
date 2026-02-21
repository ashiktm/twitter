export type CommentItem = {
  _id: string;
  content: string;
  user: { _id: string; username: string; profilePicture?: string };
  onModel: 'Tweet' | 'Comment';
  comments: CommentItem[];
  likes: any[];
  commentable: string;
  __v: number;
};

export type Data = {
  _id: string;
  content: string;
  createdby: { username: string; id: string; profilePicture?: string };
  __v: number;
  comments: CommentItem[];
  likes: any[];
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
export type CreateTweet = {
  content: string;
};

export type Comment = {
  content: string;
  commentable: string;
  onModel: 'Tweet' | 'Comment';
};
enum onModel {
  Tweet = 'Tweet',
  Comment = 'Comment',
}

export type ToggleLikePayload = {
  likable: string;
  onModel: 'Tweet' | 'Comment';
};
