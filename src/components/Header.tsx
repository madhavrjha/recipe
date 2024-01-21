import { Countertops } from '@mui/icons-material'
import { AppBar, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Header = () => {
	const navigate = useNavigate()

	return (
		<AppBar position='fixed' component='header'>
			<Toolbar>
				<IconButton disableRipple color='inherit' edge='start' onClick={() => navigate('/')}>
					<Countertops />
				</IconButton>
				<Typography
					variant='h6'
					component='h1'
					fontWeight='bold'
					onClick={() => navigate('/')}
					sx={{ cursor: 'pointer' }}>
					Recipe App
				</Typography>
				<Stack direction='row' spacing={2} flexGrow={1} justifyContent='end'>
					<Button color='inherit' onClick={() => navigate('/')}>
						Recipes
					</Button>
					<Button color='inherit' onClick={() => navigate('/add')}>
						Add New
					</Button>
				</Stack>
			</Toolbar>
		</AppBar>
	)
}

export default Header
