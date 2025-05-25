import { simpleParser } from "mailparser";
import { BidEmail, ImapConfig } from "./imap.types";

export const parseEmail = async (raw: any): Promise<BidEmail> => {
  const parsed = await simpleParser(raw);

  const subject = parsed.subject || "";
  const body = parsed.text || parsed.html || "";

  // Bid detection in subject and body both
  const bidKeywords = /bid|quotation|proposal|quote|tender|estimate/i;
  const isBid = bidKeywords.test(subject) || bidKeywords.test(body);

  return {
    from: parsed.from?.value?.[0]?.address || "",
    subject,
    body: parsed.text || "",
    receivedAt: new Date(),
    isBid,
  };
};

export const getImapConfig = (): any => ({
  user: process.env.IMAP_USER!,
  password: process.env.IMAP_PASSWORD!,
  host: process.env.IMAP_HOST!,
  port: parseInt(process.env.IMAP_PORT!),
  tls: process.env.IMAP_TLS === "true",
  authTimeout: 10000,
  tlsOptions: {
    rejectUnauthorized: false,
  },
});
