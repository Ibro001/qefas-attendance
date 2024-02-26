import { Button, Flex, IconButton, Link, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { TfiControlSkipBackward } from "react-icons/tfi";
import {Link as RouterLink } from 'react-router-dom';
import { AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";

const Admin = () => {
    
    const showToast = useShowToast();
    const [admins, setAdmins] = useState([]);
    

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
            const res = await fetch(`${window.location.origin}/api/admin/profile`);
            const data = await res.json();
            setAdmins(data);
            if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
            } catch (error) {
                showToast("Error", error.message, "error");
            }
        }

        fetchAdmin();
    },[]);

    const deleteAdmin = async (adminId) => {
        try {
			const res = await fetch(`/api/admin/${adminId}`, {
				method: "DELETE",  
			});
			const data = await res.json();
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
            setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin._id !== adminId));
			showToast("Success", "Admin deleted Successfully!", "success");
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
                <Link as={RouterLink} to={'/create'}>
                    <Button mt={'3'}>Create Admin Account</Button>
                </Link>
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
                            {admins.map((admin) => (
                              <Tr key={admin._id}>
                                <Td>{admin.name}</Td>
                                <Td>{admin.email}</Td>
                                <Td>{admin.username}</Td>
                                <Td>
                                    <IconButton
                                      aria-label="Delete user"
                                      icon={<AiOutlineDelete />}
                                      onClick={() => deleteAdmin(admin._id)}
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

export default Admin