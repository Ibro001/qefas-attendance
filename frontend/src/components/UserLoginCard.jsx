import { Flex, Box, FormControl, FormLabel, Input, InputGroup, InputRightElement, Stack, Button, Heading, Text, useColorModeValue, Link, Image, useColorMode} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import { MdOutlineSettings } from "react-icons/md";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atoms/userAtom";
import { Link as RouterLink} from "react-router-dom";

export default function LoginCard() {
	const user = useRecoilValue(userAtom);
	const setAuthScreen = useSetRecoilState(authScreenAtom);
	const { colorMode, toggleColorMode } = useColorMode();
	const [showPassword, setShowPassword] = useState(false);
	const setUser = useSetRecoilState(userAtom);
	const [loading, setLoading] = useState(false);

	const [inputs, setInputs] = useState({
		username: "",
		password: "",
	});
	const showToast = useShowToast();
	const handleLogin = async () => {
		setLoading(true);
		try {
			const res = await fetch(`${window.location.origin}/api/users/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputs),
			});
			const data = await res.json();
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
			localStorage.setItem("user-threads", JSON.stringify(data));
			setUser(data);
		} catch (error) {
			showToast("Error", error, "error");
		} finally {
			setLoading(false);
		}
	};
	return (
		<>
			<Flex gap={'100'} justifyContent={'center'} alignItems={'center'} mt={'2'}>
				{!user && (
					<Link as={RouterLink} to={"/auth"} onClick={() => setAuthScreen("login")}>
						Login
					</Link>
				)}
				<Image
					cursor={"pointer"}
					alt='logo'
					w={6}
					src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
					onClick={toggleColorMode}
				/>
				{!user && (
					<Link as={RouterLink} to={"/auth"} onClick={() => setAuthScreen("signup")}>
						Sign up
					</Link>
				)}
			</Flex> 
			<Flex align={"center"} justify={"center"}>
				<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
					<Stack align={"center"}>
						<Heading fontSize={"4xl"} textAlign={"center"}>
							Login
						</Heading>
					</Stack>
					<Box
						rounded={"lg"}
						bg={useColorModeValue("white", "gray.dark")}
						boxShadow={"lg"}
						p={8}
						w={{
							base: "full",
							sm: "400px",
						}}
					>
						<Stack spacing={4}>
							<FormControl isRequired>
								<FormLabel>Username</FormLabel>
								<Input
									type='text'
									value={inputs.username}
									onChange={(e) => setInputs((inputs) => ({ ...inputs, username: e.target.value }))}
								/>
							</FormControl>
							<FormControl isRequired>
								<FormLabel>Password</FormLabel>
								<InputGroup>
									<Input
										type={showPassword ? "text" : "password"}
										value={inputs.password}
										onChange={(e) => setInputs((inputs) => ({ ...inputs, password: e.target.value }))}
									/>
									<InputRightElement h={"full"}>
										<Button
											variant={"ghost"}
											onClick={() => setShowPassword((showPassword) => !showPassword)}
										>
											{showPassword ? <ViewIcon /> : <ViewOffIcon />}
										</Button>
									</InputRightElement>
								</InputGroup>
							</FormControl>
							<Stack spacing={10} pt={2}>
								<Button
									loadingText='Logging in'
									size='lg'
									bg={useColorModeValue("gray.600", "gray.700")}
									color={"white"}
									_hover={{
										bg: useColorModeValue("gray.700", "gray.800"),
									}}
									onClick={handleLogin}
									isLoading={loading}
								>
									Login
								</Button>
							</Stack>
							<Stack pt={6}>
								<Text align={"center"}>
									Don&apos;t have an account?{" "}
									<Link color={"blue.400"} onClick={() => setAuthScreen("signup")}>
										Sign up
									</Link>
								</Text>
							</Stack>
						</Stack>
					</Box>
				</Stack>
			</Flex>
			<Flex position={'absolute'} bottom={'10'} right={'40'}>
					<Link color={"blue.400"} as={RouterLink} to={'/admin'}>
						<Button>
							<MdOutlineSettings size={30} />
						</Button>
						<Text>Admin Portal</Text>
					</Link>
			</Flex>
		</>
	);
}
