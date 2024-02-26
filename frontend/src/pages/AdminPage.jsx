import { Button, Flex, Link, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import adminAtom from "../atoms/adminAtom";
import { FiLogOut } from "react-icons/fi";
import useShowToast from "../hooks/useShowToast";
import useLogout from "../hooks/useLogout";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const AdminPage = () => {
		const admin = useRecoilValue(adminAtom);
		const showToast = useShowToast();
		const logout = useLogout();
		const [checkin, setCheckin] = useState([]); 
		const [checkout, setCheckout] = useState([]); 

		useEffect(() => {
        const fetchCheckInData = async () => {
            try {
            const res = await fetch(`${window.location.origin}/api/attendance/checkins`);
            const data = await res.json();
            setCheckin(data);
            if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
            } catch (error) {
                showToast("Error", error.message, "error");
            }
        }

        fetchCheckInData();
    },[]);    

	useEffect(() => {
        const fetchCheckOutData = async () => {
            try {
            const res = await fetch(`${window.location.origin}/api/attendance/checkouts`);
            const data = await res.json();
            setCheckout(data);
            if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
            } catch (error) {
                showToast("Error", error.message, "error");
            }
        }

        fetchCheckOutData();
    },[]);


    return (
	<>
			<Flex  mb='5' justifyContent={'space-between'} >
				<Flex gap={'5'} mt={'3'}>
					<Link as={RouterLink} to={'/user'}>
						<Button>User Account</Button>
					</Link>
					<Link as={RouterLink} to={'/superadmin'}>
						<Button>Admin Account</Button>
					</Link>
				</Flex>
				{admin && (
					<Flex mt={'5'}>
						<Button size={'xs'} onClick={logout}>
							<FiLogOut size={20}/>
						</Button>
					</Flex>
				)}
			</Flex>
			
			<Flex gap='10'  flexDirection={'row'}>

			<TableContainer overflowY={'hidden'} overflowX={'hidden'} >
				<Table size='sm'>
					<Thead>
						<Tr>
							<Th>Date</Th>
							<Th>Name</Th>
							<Th>Check-In</Th>
						</Tr>
					</Thead>
					<Tbody>
						{checkin.map((item) => (
							<Tr key={item.id}>
								<Td>{item.date}</Td>
								<Td>{item.name}</Td>
								<Td>{item.time}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
			<TableContainer overflowY={'hidden'} overflowX={'hidden'} >
				<Table size='sm'>
					<Thead>
						<Tr>
							<Th>Name</Th>
							<Th>Check-Out</Th>
						</Tr>
					</Thead>
					<Tbody>
						{checkout.map((data) => (
							<Tr key={data.id}>
								<Td>{data.name}</Td>
								<Td>{data.time}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</Flex>
	</>
    )
}

export default AdminPage