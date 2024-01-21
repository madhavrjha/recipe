import { z } from 'zod'

// Recipe
export const RecipeSchema = z.object({
	title: z.string().min(3).max(20),
	detail: z.string().min(20).max(200),
	prepDuration: z.number().gt(0),
	cookDuration: z.number().gt(0),
	ingredients: z
		.object({
			name: z.string().min(3).max(30),
			unit: z.enum(['Kilogram', 'gram', 'Tea Spoon']),
			quantity: z.number().gt(0),
		})
		.array()
		.nonempty(),
})
export type RecipeType = z.infer<typeof RecipeSchema>

// Image File
export const ImageFileSchema = z.object({
	image: z
		.custom<File>((v: unknown) => v instanceof File, { message: 'Image is required' })
		.refine((v: File) => v.type.startsWith('image/'), { message: 'Only Image files are allowed' })
		.refine((v: File) => v.size < 2 * 1024 * 1024, { message: 'Max File Size is 2MB' }),
})
export type ImageFileType = z.infer<typeof ImageFileSchema>

// Add Form Recipe
export const AddFormRecipeSchema = RecipeSchema.and(ImageFileSchema)
export type AddFormRecipeType = z.infer<typeof AddFormRecipeSchema>

// Image as Data URL
export const ImageAsDataURLSchema = z.object({
	image: z.string(),
})
export type ImageAsDataURLType = z.infer<typeof ImageAsDataURLSchema>

// Id
export const IdSchema = z.object({
	id: z.string().uuid(),
})
export type IdType = z.infer<typeof IdSchema>

// Rating
export const RatingSchema = z.object({
	rating: z.number().gte(0).lte(5),
})
export type RatingType = z.infer<typeof RatingSchema>

// Local Storage Recipe
export const LocalStorageRecipeSchema = RecipeSchema.and(ImageAsDataURLSchema).and(IdSchema).and(RatingSchema)
export type LocalStorageRecipeType = z.infer<typeof LocalStorageRecipeSchema>

// Update Form Recipe
export const UpdateFormRecipeSchema = RecipeSchema.and(z.union([ImageAsDataURLSchema, ImageFileSchema]))
export type UpdateFormRecipeType = z.infer<typeof UpdateFormRecipeSchema>
