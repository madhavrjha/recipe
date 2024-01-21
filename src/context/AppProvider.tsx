import { createContext, useState } from 'react'
import { LocalStorageRecipeType } from '../schemas/recipe'
import useLocalStorage from '../hooks/useLocalStorage'

type InitalState = {
	recipes: LocalStorageRecipeType[]
	setRecipes: React.Dispatch<React.SetStateAction<LocalStorageRecipeType[]>>
}

export const AppContext = createContext({} as InitalState)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const { getItem } = useLocalStorage('recipe')

	const [recipes, setRecipes] = useState<LocalStorageRecipeType[]>(() => {
		const localRecipes = getItem()
		return localRecipes || []
	})

	return <AppContext.Provider value={{ recipes, setRecipes }}>{children}</AppContext.Provider>
}
