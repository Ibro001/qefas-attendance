import { Button, Flex, FormControl, FormLabel, Input, Link, Select, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { TfiControlSkipBackward } from "react-icons/tfi";
import {Link as RouterLink } from 'react-router-dom';
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { FiLogOut } from "react-icons/fi";
import useLogout from "../hooks/useLogout";
import moment from 'moment';
import useShowToast from "../hooks/useShowToast";



const CheckOut = () => {
  const user = useRecoilValue(userAtom)
  const showToast = useShowToast();
  const logout = useLogout();
  const [users, setUsers] = useState([]);

  const [ time, setTime ] = useState(new Date ());
  const [ date, setDate ] = useState(new Date ());
  
  const [inputs, setInputs] = useState ({
    name: '',
		date: moment(date).format('DD/MM/YYYY'),
		time: moment(time).format('hh:mm A'),
	});


  useEffect(() => {
        const fetchUsers = async () => {
            try {
            const res = await fetch(`${window.location.origin}/api/users/profile`);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${window.location.origin}/api/attendance/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();

			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			} else {
				showToast('Successful', data.message, 'success')
			}
    } catch (error) {
      showToast("Error", error, "error");
    }
  };

  return (
        <>
      <Flex  mt={'3'} justifyContent={'space-between'}>
        <Link as={RouterLink} to={'/'}>
          <TfiControlSkipBackward size={'20'} />
        </Link>
        {user && (
          <Flex>
            <Button size={'xs'} onClick={logout}>
              <FiLogOut size={20}/>
            </Button>
          </Flex>
        )}
      </Flex>
      <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'} mt={'100'}>
          <form onSubmit={handleSubmit}>
            <Select placeholder='Select Name' size='md' mb='5'  onChange={(e) => setInputs({ ...inputs, name: e.target.value })}>
                {users.map((user)  => (
                  <option key={user.id}>
                    {user.name}
                  </option>
                ))}
            </Select>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Date</FormLabel>
                <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="date"
                  onChange={(e) => setDate({ ...inputs, date: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Time</FormLabel>
                <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="time"
                  onChange={(e) => setTime({ ...inputs, time: e.target.value })}
                />
              </FormControl>              
              <Button type="submit" colorScheme="teal">
                Submit
              </Button>
            </VStack>
          </form>
      </Flex>
    </>
  )
}

export default CheckOut