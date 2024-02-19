import { Button, Flex, Link, Text } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom";




const HomePage = () => {
  return (
    <>
      <Flex mb={'100'} justifyContent={'center'} alignItems={'center'}>
        <Text fontSize={'3xl'}>Welcome to QEFAS</Text>
      </Flex>
      <Flex gap='2' flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
        <h1>Welcome Please Click to Check In or Check Out</h1>
        <Link as={RouterLink} to={'/checkIn'}>
            <Button onClick>Check In</Button>
        </Link>
        <Link as={RouterLink} to={'/checkOut'}>
            <Button>Check Out</Button>
        </Link>
      </Flex>
    </>
  )
}

export default HomePage