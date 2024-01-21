import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Divider,
	Grid,
	IconButton,
	Rating,
	Snackbar,
	Stack,
	Typography,
} from '@mui/material'
import { LocalStorageRecipeType } from '../../schemas/recipe'
import { useNavigate } from 'react-router-dom'
import useRecipe from '../../hooks/useRecipe'
import { useState } from 'react'
import { Close } from '@mui/icons-material'

const Recipe = ({ recipe }: { recipe: LocalStorageRecipeType }) => {
	const [open, setOpen] = useState(false)
	const [rating, setRating] = useState<number | null>(recipe.rating)

	const navigate = useNavigate()
	const { deleteRecipe, updateRating } = useRecipe()

	return (
		<>
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={() => setOpen(false)}
				message='Recipe Deleted'
				anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
				action={
					<IconButton color='inherit' onClick={() => setOpen(false)}>
						<Close />
					</IconButton>
				}
			/>
			<Card sx={{ width: '400px' }} elevation={4}>
				<CardMedia sx={{ height: '140px' }} image={recipe.image} title={recipe.title} />
				<CardContent>
					<Typography gutterBottom variant='h5' component='div'>
						{recipe.title}
					</Typography>
					<Typography variant='body2' color='text.secondary' mb={2}>
						{recipe.detail}
					</Typography>
					<Stack direction='row' justifyContent={'space-between'}>
						<Stack>
							<Rating
								name='recipe-rating'
								value={rating}
								precision={0.5}
								onChange={(_event, newValue) => {
									setRating(newValue)
									updateRating(recipe.id, newValue)
								}}
							/>
						</Stack>
						<Stack direction='row' spacing={2} textAlign={'center'}>
							<Stack>
								<Typography variant='subtitle2'>{recipe.cookDuration + recipe.prepDuration} Hour</Typography>
								<Typography variant='body2' color='text.secondary'>
									Total
								</Typography>
							</Stack>
							<Stack>
								<Typography variant='subtitle2'>{recipe.prepDuration} Hour</Typography>
								<Typography variant='body2' color='text.secondary'>
									Prep
								</Typography>
							</Stack>
							<Stack>
								<Typography variant='subtitle2'>{recipe.cookDuration} Hour</Typography>
								<Typography variant='body2' color='text.secondary'>
									Cook
								</Typography>
							</Stack>
						</Stack>
					</Stack>
					<Typography variant='h6'>Ingredients</Typography>
					<Divider />
					{recipe.ingredients.map(ingredient => (
						<Grid container mt={1} key={ingredient.name}>
							<Grid item sm={6} xs={12}>
								<Typography variant='body2'>{ingredient.name}</Typography>
							</Grid>
							<Grid item sm={6} xs={12}>
								<Typography variant='subtitle2'>
									{ingredient.quantity} {ingredient.unit}
								</Typography>
							</Grid>
						</Grid>
					))}
				</CardContent>
				<CardActions>
					<Button size='small' variant='contained' onClick={() => navigate(`/update/${recipe.id}`)}>
						Update
					</Button>
					<Button
						size='small'
						color='error'
						variant='outlined'
						onClick={() => {
							deleteRecipe(recipe.id)
							setOpen(true)
						}}>
						Delete
					</Button>
				</CardActions>
			</Card>
		</>
	)
}

export default Recipe
