export type Data = {
  _id: string;
  content: string;
  createdby: { username: string; id: string };
  __v: number;
  comments: string[];
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
