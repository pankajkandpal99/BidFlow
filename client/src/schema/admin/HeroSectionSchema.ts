import { z } from "zod";

// const fileSchema = z
//   .instanceof(File)
//   .refine(
//     (file) => {
//       if (!file) return false;
//       return file.size <= 10 * 1024 * 1024; // 10MB
//     },
//     { message: "File size must be less than 10MB" }
//   )
//   .refine(
//     (file) => {
//       if (!file) return false;
//       return ["image/jpeg", "image/png", "image/webp"].includes(file.type);
//     },
//     { message: "Only JPEG, PNG, and WebP images are allowed" }
//   );

export const heroSectionSchema = z.object({
  mainHeading: z.string().min(5, "Main heading must be at least 5 characters"),
  subHeading: z.string().min(10, "Sub heading must be at least 10 characters"),
  buttonText: z.string().min(2, "Button text is required"),
  backgroundImages: z
    .array(z.union([z.string(), z.instanceof(File)]))
    .min(1, "At least one background image is required"),
  scrollingTexts: z
    .array(z.string().min(10, "Scrolling text must be at least 10 characters"))
    .min(1, "At least one scrolling text is required"),
  transitionDuration: z
    .number()
    .min(1000, "Minimum 1000ms")
    .max(10000, "Maximum 10000ms"),
  active: z.boolean(),
});

export type HeroSectionFormValues = z.infer<typeof heroSectionSchema>;

// import { z } from "zod";

// const fileSchema = z
//   .instanceof(File)
//   .refine(
//     (file) => {
//       if (!file) return false;
//       return file.size <= 10 * 1024 * 1024; // 10MB
//     },
//     { message: "File size must be less than 10MB" }
//   )
//   .refine(
//     (file) => {
//       if (!file) return false;
//       return ["image/jpeg", "image/png", "image/webp"].includes(file.type);
//     },
//     { message: "Only JPEG, PNG, and WebP images are allowed" }
//   );

// export const heroSectionSchema = z.object({
//   mainHeading: z.string().min(5, "Main heading must be at least 5 characters"),
//   subHeading: z.string().min(10, "Sub heading must be at least 10 characters"),
//   buttonText: z.string().min(2, "Button text is required"),
//   backgroundImages: z
//     .array(z.union([z.string().url("Must be a valid image URL"), fileSchema]))
//     .min(1, "At least one background image is required")
//     .refine(
//       (images) =>
//         images.every((img) => img instanceof File || typeof img === "string"),
//       { message: "Each image must be either a URL or a file" }
//     ),
//   scrollingTexts: z
//     .array(z.string().min(10, "Scrolling text must be at least 10 characters"))
//     .min(1, "At least one scrolling text is required"),
//   transitionDuration: z
//     .number()
//     .min(1000, "Minimum 1000ms")
//     .max(10000, "Maximum 10000ms"),
//   active: z.boolean(),
// });

// export type HeroSectionFormValues = z.infer<typeof heroSectionSchema>;
