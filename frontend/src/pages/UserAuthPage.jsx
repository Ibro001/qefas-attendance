import { useRecoilValue } from "recoil";
import LoginCard from "../components/UserLoginCard";
import SignupCard from "../components/AdminSignupCard";
import authScreenAtom from "../atoms/authAtom";

const AuthPage = () => {
	const authScreenState = useRecoilValue(authScreenAtom);

	return <>{authScreenState === "login" ? <LoginCard /> : <SignupCard />}</>;
};

export default AuthPage;
