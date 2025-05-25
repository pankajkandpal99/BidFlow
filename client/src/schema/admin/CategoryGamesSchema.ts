import { z } from "zod";

export const CategoryGamesSchema = z.object({
  sectionTitle: z.string().min(3, "Title must be at least 3 characters"),
  sectionDescription: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  categories: z
    .array(z.string().min(2, "Category name must be at least 2 characters"))
    .min(1, "At least one category is required"),
  games: z
    .array(
      z.object({
        id: z.number(),
        title: z.string().min(2),
        category: z.string().min(2),
        image: z.string().url("Invalid image URL"),
        players: z.string(),
        prize: z.number().min(0),
        hot: z.boolean(),
        tags: z.array(z.string()),
      })
    )
    .min(1, "At least one game is required"),
  viewAllButtonText: z
    .string()
    .min(2, "Button text must be at least 2 characters"),
  active: z.boolean(),
});

export type CategoryGamesFormValues = z.infer<typeof CategoryGamesSchema>;
