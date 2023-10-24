export type Data = {
  _id: string;
  content: string;
  user: { username: string; id: string };
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
