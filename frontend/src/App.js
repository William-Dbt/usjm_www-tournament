import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import NoPage from "./pages/NoPage";
import Profile from "./pages/Profile";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={ <Auth signup={false} /> } />
				<Route path="/login" element={ <Auth signup={false} /> } />
				<Route path="/signup" element={ <Auth signup={true} /> } />
				<Route path="/profile" element={ <Profile /> } />
				<Route path="*" element={ <NoPage /> } />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
