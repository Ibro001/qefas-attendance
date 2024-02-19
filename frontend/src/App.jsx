import { Box, Container } from "@chakra-ui/react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/UserAuthPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import adminAtom from "./atoms/adminAtom";
import CheckIn from "./pages/CheckIn";
import CheckOut from "./pages/CheckOut";
import AdminPage from "./pages/AdminPage";
import AdminLoginCard from "./components/AdminLoginCard";
import Users from "./pages/Users";
import Admin from "./pages/Admin";
import CreateAdmin from "./pages/CreateAdmin";



function App() {
	const user = useRecoilValue(userAtom);
	const admin = useRecoilValue(adminAtom);
	const { pathname } = useLocation();
	return (
		<Box position={"relative"} w='full'>
			<Container maxW={pathname === "/" ? { base: "620px", md: "900px" } : "620px"}>
				<Routes>
					<Route path='/' element={user ? <HomePage /> : <Navigate to='/auth' />} />
					<Route path='/auth' element={!user ? <AuthPage /> : <Navigate to='/' />} />
					<Route path='/checkin' element={user ? <CheckIn /> : <Navigate to='/auth' />} />
					<Route path='/checkout' element={user ? <CheckOut /> : <Navigate to='/auth' />} />
					<Route path='/user' element={ <Users /> } /> 
					<Route path='/superadmin' element={ <Admin /> } />
					<Route path='/create' element={ <CreateAdmin /> } />

					<Route
						path= "/admin"
						element={
							admin ? (
								<>
									<AdminPage />
								</>
							) : (
								<AdminLoginCard />
							)
						}
					/>

					<Route
						path='/auth'
						element={
							user ? (
								<>
									<HomePage />
								</>
							) : (
								<AuthPage />
							)
						}
					/>
				</Routes>
			</Container>
		</Box>
	);
}

export default App;
