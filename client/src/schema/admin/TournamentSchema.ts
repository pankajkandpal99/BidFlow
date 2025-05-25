import { z } from "zod";

export const tournamentFormSchema = z
  .object({
    id: z.string().optional(),
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().optional(),
    gameId: z.string().min(1, "Game is required"),
    gameType: z.enum(["free", "paid", "invite"]),
    entryFee: z.number().min(0).optional(),
    tournamentCode: z.string().optional(),
    startTime: z.date(),
    endTime: z.date(),
    minPlayers: z.number().int().min(1),
    maxPlayers: z.number().int().min(1),
    prizes: z
      .array(
        z.object({
          rank: z.string().min(1, "Rank is required"),
          amount: z.number().min(0, "Amount must be positive"),
        })
      )
      .optional(),
    banner: z
      .union([
        z
          .instanceof(File)
          .refine(
            (file) => file.size <= 5 * 1024 * 1024,
            "File size must be less than 5MB"
          )
          .refine(
            (file) =>
              ["image/jpeg", "image/png", "image/webp"].includes(file.type),
            "Only JPEG, PNG, and WEBP formats are supported"
          ),
        z.string().url("Must be a valid URL"),
      ])
      .optional(),
    rules: z.string().optional(),
    platform: z.enum(["mobile", "pc", "both"]).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.gameType === "paid" || data.gameType === "invite") {
      if (data.entryFee === undefined || data.entryFee < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["entryFee"],
          message: "Entry fee is required for paid/invite tournaments",
        });
      }
    }

    if (data.endTime <= data.startTime) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endTime"],
        message: "End time must be after start time",
      });
    }

    if (data.maxPlayers < data.minPlayers) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["maxPlayers"],
        message: "Max players must be >= min players",
      });
    }
  });

export type TournamentFormValues = z.infer<typeof tournamentFormSchema>;
