import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import AddRecipe from './pages/recipe/AddRecipe'
import ListRecipe from './pages/recipe/ListRecipe'
import Header from './components/Header'
import UpdateRecipe from './pages/recipe/UpdateRecipe'

const App = () => {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<ListRecipe />} />
					<Route path='add' element={<AddRecipe />} />
					<Route path='update/:id' element={<UpdateRecipe />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
