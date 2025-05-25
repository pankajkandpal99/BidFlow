import { Injectable } from "@nestjs/common";
import * as imap from "imap-simple";

@Injectable()
export class ImapListenerService {
  private readonly config = (() => {
    const { IMAP_USER, IMAP_PASSWORD, IMAP_HOST, IMAP_PORT, IMAP_TLS } =
      process.env;
    if (!IMAP_USER || !IMAP_PASSWORD || !IMAP_HOST || !IMAP_PORT) {
      throw new Error("Missing required IMAP environment variables.");
    }

    return {
      imap: {
        user: IMAP_USER,
        password: IMAP_PASSWORD,
        host: IMAP_HOST,
        port: parseInt(IMAP_PORT, 10),
        tls: IMAP_TLS === "true",
        authTimeout: 10000,
        tlsOptions: {
          rejectUnauthorized: false,
        },
      },
    };
  })();

  async connect() {
    return await imap.connect(this.config);
  }
}
