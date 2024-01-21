import { Stack, Typography } from '@mui/material'
import useRecipe from '../../hooks/useRecipe'
import Recipe from './Recipe'

const ListRecipe = () => {
	const { recipes } = useRecipe()

	return (
		<>
			<Stack spacing={4} mb={4}>
				{recipes.length === 0 ? <Typography variant='h5'>No Recipe Found</Typography> : null}
				{recipes.map(recipe => (
					<Recipe key={recipe.id} recipe={recipe} />
				)).reverse()}
			</Stack>
		</>
	)
}

export default ListRecipe
