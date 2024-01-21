import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import { AppProvider } from './context/AppProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route
					path='/*'
					element={
						<>
							<CssBaseline />
							<AppProvider>
								<App />
							</AppProvider>
						</>
					}
				/>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
)
