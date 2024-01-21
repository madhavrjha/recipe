import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

const Layout = () => {
	return (
		<Box
			sx={{
				background: '#eee',
				minHeight: '100vh',
				pt: '100px',
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'start',
			}}>
			<Outlet />
		</Box>
	)
}

export default Layout
