import { z } from "zod";

export const gameFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  thumbnail: z.union([
    z
      .instanceof(File, { message: "Thumbnail image is required" })
      .refine(
        (file) => file.size <= 5 * 1024 * 1024,
        "File size must be less than 5MB"
      )
      .refine(
        (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
        "Only JPEG, PNG, and WEBP formats are supported"
      ),
    z.string().url("Must be a valid URL"),
  ]),
  category: z.string().min(1, "Category is required"),
  gameUrl: z.string().url("Must be a valid game URL"),
  isFeatured: z.boolean().default(false),
  isNew: z.boolean().default(true),
  minPlayers: z.number().int().min(1).default(1),
  maxPlayers: z.number().int().min(1).default(100),
});

export type GameFormValues = z.infer<typeof gameFormSchema>;

export interface Game extends Omit<GameFormValues, "thumbnail"> {
  id: string;
  thumbnail: File | string; // This will be the URL where the image is stored
  createdAt: Date;
  updatedAt: Date;
  players: number;
}
