import { useContext } from 'react'
import { AppContext } from '../context/AppProvider'
import { AddFormRecipeType, LocalStorageRecipeType, UpdateFormRecipeType } from '../schemas/recipe'
import { v4 as uuidv4 } from 'uuid'
import useLocalStorage from './useLocalStorage'
import { getBase64 } from '../helper'

const useRecipe = () => {
	const { recipes, setRecipes } = useContext(AppContext)

	const { setItem } = useLocalStorage('recipe')

	const addRecipe = (formData: AddFormRecipeType) => {
		getBase64(formData.image, result => {
			setRecipes((prev: LocalStorageRecipeType[]) => {
				const newRecipes = [...prev, { ...formData, id: uuidv4(), image: result as string, rating: 0 }]
				setItem(newRecipes)
				return newRecipes
			})
		})
	}

	const deleteRecipe = (id: string) => {
		setRecipes(prev => {
			const newRecipes = [...prev.filter(recipe => recipe.id !== id)]
			setItem(newRecipes)
			return newRecipes
		})
	}

	const getRecipeById = (id: string): LocalStorageRecipeType | undefined => {
		return recipes.find(recipe => recipe.id === id)
	}

	const updateRecipe = (id: string, formData: UpdateFormRecipeType) => {
		if (typeof formData.image === 'string') {
			setRecipes((prev: LocalStorageRecipeType[]) => {
				const currentRecipes = prev.find(r => r.id === id)
				const otherRecipes = prev.filter(r => r.id !== id)
				if (!currentRecipes) return prev
				const updatedRecipes = [
					...otherRecipes,
					{
						id,
						...formData,
						image: formData.image as string,
						rating: currentRecipes.rating,
					},
				]
				setItem(updatedRecipes)
				return updatedRecipes
			})
		} else if (formData.image instanceof File) {
			getBase64(formData.image, result => {
				setRecipes((prev: LocalStorageRecipeType[]) => {
					const currentRecipes = prev.find(r => r.id === id)
					const otherRecipes = prev.filter(r => r.id !== id)
					if (!currentRecipes) return prev
					const updatedRecipes = [
						...otherRecipes,
						{
							id,
							...formData,
							image: result as string,
							rating: currentRecipes.rating,
						},
					]
					setItem(updatedRecipes)
					return updatedRecipes
				})
			})
		} else {
			console.error('something went wrong')
		}
	}

	const updateRating = (id: string, newRating: number | null) => {
		setRecipes((prev: LocalStorageRecipeType[]) => {
			const currentRecipe = prev.find(r => r.id === id)
			const otherRecipes = prev.filter(r => r.id !== id)
			if (!currentRecipe) return prev
			const updatedRecipes = [
				...otherRecipes,
				{
					...currentRecipe,
					id,
					rating: newRating || 0,
				},
			]
			setItem(updatedRecipes)
			return updatedRecipes
		})
	}

	return { recipes, addRecipe, deleteRecipe, getRecipeById, updateRecipe, updateRating }
}

export default useRecipe
