import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app/app.module";
import { ValidationPipe } from "@nestjs/common";

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("/api/v1");

  // Global pipes and filters
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  // Enable CORS
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  const PORT = process.env.PORT || 3000;

  await app.listen(PORT);
  console.log(`🚀 Server running on ${PORT}`);
  console.log(`📧 IMAP Email Processing Service Active`);
};

bootstrap();

// import { NestFactory } from "@nestjs/core";
// import { AppModule } from "./modules/app/app.module";
// import { ValidationPipe } from "@nestjs/common";
// import { ImapService } from "./modules/imap/imap.service"; // नया इम्पोर्ट
// import { INestApplication } from "@nestjs/common/interfaces";

// async function testImap(app: INestApplication) {
//   console.log("🔧 IMAP Config:", {
//     user: process.env.IMAP_USER,
//     host: process.env.IMAP_HOST,
//     port: process.env.IMAP_PORT,
//     tls: process.env.IMAP_TLS,
//     folder: process.env.BID_EMAIL_FOLDER,
//   });

//   const imapService = app.get(ImapService);
//   try {
//     const bids = await imapService.fetchAndProcessEmails();
//     console.log("📩 Test Results:", bids);
//   } catch (error) {
//     console.error("❌ IMAP Test Failed:", error);
//   }
// }

// const bootstrap = async () => {
//   const app = await NestFactory.create(AppModule);

//   app.setGlobalPrefix("/api/v1");

//   // Global pipes and filters
//   app.useGlobalPipes(
//     new ValidationPipe({
//       transform: true,
//       whitelist: true,
//       forbidNonWhitelisted: true,
//     })
//   );

//   // Enable CORS
//   app.enableCors({
//     origin: process.env.ALLOWED_ORIGINS?.split(",") || "*",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
//   });

//   const PORT = process.env.PORT || 3000;

//   await app.listen(PORT);
//   console.log(`🚀 Server running on ${PORT}`);

//   // Development-only IMAP test
//   if (process.env.NODE_ENV === "development") {
//     await testImap(app);
//   }
// };

// bootstrap();
