import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { MainContext } from '../../mainContext'
import { SocketContext } from '../../socketContext'
import { Flex, Heading, IconButton, Input } from "@chakra-ui/react"
import { RiArrowRightLine } from "react-icons/ri"
import { useToast } from "@chakra-ui/react"
import { UsersContext } from '../../usersContext'
import Footer from '../Footer'

const Login = () => {
    const socket = useContext(SocketContext)
    const { name, setName, room, setRoom } = useContext(MainContext)
    const history = useHistory()
    const toast = useToast()
    const { setUsers } = useContext(UsersContext)

    //Checks to see if there's a user already present

    useEffect(() => {
        socket.on("users", users => {
            setUsers(users)
        })
    })

    const handleKeyDown = (ev) => {
        //Send on enter:
        if (ev.keyCode === 13) {
            if ((!!name || !!room) || (name || !!room) || (!!name || room)) handleClick()
        }
    }

    //Emits the login event and if successful redirects to chat
    const handleClick = () => {
        socket.emit('login', { name, room }, error => {
            if (error) {
                return toast({
                    position: "top",
                    title: "Error",
                    description: error,
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                })
            }
            history.push('/chat')
            return toast({
                position: "top",
                title: "Hey there",
                description: `Welcome to ${room}`,
                status: "success",
                duration: 3200,
                isClosable: true,
            })
        })
    }

    return (
        <Flex className='login' flexDirection='column' mb='8'>
            <Heading as="h1" size="4xl" textAlign='center' mb='8' fontFamily='DM Sans' fontWeight='600' letterSpacing='-2px'>Chaitanya.io</Heading>
            <Footer />
            <Flex className="form" gap='1rem' flexDirection={{ base: "column", md: "row" }} style={{ marginTop: '50px' }}>
                <Input onKeyDown={handleKeyDown} variant='filled' mr={{ base: "0", md: "4" }} mb={{ base: "4", md: "0" }} type="text" placeholder='User Name' autoFocus maxLength={'25'} value={name} onChange={e => setName(e.target.value.toLowerCase().trim().split(/ +/).join(' '))} />
                <Input onKeyDown={handleKeyDown} variant='filled' mr={{ base: "0", md: "4" }} mb={{ base: "4", md: "0" }} type="text" placeholder='Room Name' value={room} maxLength={'25'} onChange={e => setRoom(e.target.value.toLowerCase().trim().split(/ +/).join(' '))} />
                <IconButton colorScheme='blue' isRound='true' icon={<RiArrowRightLine />} onClick={handleClick}></IconButton>
            </Flex>
        </Flex>
    )
}

export default Login
