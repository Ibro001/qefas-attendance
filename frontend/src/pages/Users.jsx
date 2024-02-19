import { Button, Flex, IconButton, Link, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { TfiControlSkipBackward } from "react-icons/tfi";
import {Link as RouterLink } from 'react-router-dom';
import useShowToast from "../hooks/useShowToast";
import { useEffect, useState } from "react";



const Users = () => {

    const showToast = useShowToast();
    const [users, setUsers] = useState([]);
    

    useEffect(() => {
        const fetchUsers = async () => {
            try {
            const res = await fetch('/api/users/profile');
            const data = await res.json();
            setUsers(data);
            if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
            } catch (error) {
                showToast("Error", error.message, "error");
            }
        }

        fetchUsers();
    },[]);

    const deleteUser = async (userId) => {
        try {
			const res = await fetch(`/api/users/${userId}`, {
				method: "DELETE",  
			});
			const data = await res.json();
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
			showToast("Success", "User deleted", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		}
    }

  return (
    <>
        <Flex gap='10' flexDirection={'column'}>
            <Flex justifyContent={'space-between'}>
                <Link as={RouterLink} to={'/admin'}>
                    <Button mt={'3'}><TfiControlSkipBackward size={'20'} /></Button>
                </Link>
                <Text mt={'5'}>List of all Staff</Text>
            </Flex>
            <Flex justifyContent={'center'} alignItems={'center'}>
                <TableContainer overflowY={'hidden'} whiteSpace={'nowrap'} overflowX={'hidden'}>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Email</Th>
                                <Th>Username</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {users.map((user) => (
                              <Tr key={user._id}>
                                <Td>{user.name}</Td>
                                <Td>{user.email}</Td>
                                <Td>{user.username}</Td>
                                <Td>
                                    <IconButton
                                      aria-label="Delete user"
                                      icon={<AiOutlineDelete />}
                                      onClick={() => deleteUser(user._id)}
                                    />
                                </Td>
                              </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Flex>
        </Flex>
    </>
  )
}

export default Users
                                                             