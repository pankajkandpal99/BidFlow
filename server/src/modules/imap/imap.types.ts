export type ImapConfig = {
  user: string;
  password: string;
  host: string;
  port: number;
  tls: boolean;
  authTimeout: number;
};

export type BidEmail = {
  from: string;
  subject: string;
  body: string;
  receivedAt: Date;
  isBid: boolean;
};
