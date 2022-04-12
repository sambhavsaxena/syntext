import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { MainContext } from '../../mainContext'
import { SocketContext } from '../../socketContext'
import { Box, Flex, Heading, IconButton, Text, Menu, Button, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"
import { FiList } from 'react-icons/fi'
import { BiMessageDetail } from 'react-icons/bi'
import { RiSendPlaneFill } from 'react-icons/ri'
import ScrollToBottom from 'react-scroll-to-bottom';
import { useToast } from "@chakra-ui/react"
import { UsersContext } from '../../usersContext'
import './Chat.scss'

const Chat = () => {
    const { name, room, setName, setRoom } = useContext(MainContext)
    const socket = useContext(SocketContext)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const { users } = useContext(UsersContext)
    const history = useHistory()
    const toast = useToast()
    const [typing, setTyping] = useState(false)
    const [data, setData] = useState({})

    const handleKeyDown = (ev) => {
        //Send on enter:
        if (ev.keyCode === 13) {
            if (!!message) {
                handleSendMessage()
            }
        }
    }

    const startTyping = () => {
        socket.emit('typing', { typing: true, name: name, room: room })
    }

    const stopTyping = () => {
        socket.emit('typing', { typing: false, name: name, room: room })
    }

    const handleChange = (ev) => {
        if (ev.target.value === ' ') {
            return
        }
        else {
            startTyping();
            setMessage(ev.target.value)
        }
    }

    window.onpopstate = e => logout()

    useEffect(() => {
        if (!name) return history.push('/');
    }, [history, name])

    useEffect(() => {
        socket.on("message", msg => {
            setMessages(messages => [...messages, msg]);
        })

        socket.on('display', (data) => {
            setData(data)
            if (data.typing === true)
                setTyping(true)
            else
                setTyping(false)
        })
        socket.on("notification", notif => {
            toast({
                position: "top",
                title: notif?.title,
                description: notif?.description,
                status: "success",
                duration: 5000,
                isClosable: true,
            })
        })
    }, [socket, toast])

    const handleSendMessage = () => {
        stopTyping()
        socket.emit('sendMessage', message, () => setMessage(''))
        setMessage('')
    }

    const logout = () => {
        setName(''); setRoom('');
        history.push('/')
        history.go(0)
    }

    return (
        <Flex className='room' flexDirection='column' width={{ base: "100%", sm: '575px' }} height={{ base: "100%", sm: "auto" }}>
            <Heading className='heading' as='h4' bg='white' p='1rem 1.5rem' borderRadius='10px 10px 0 0'>
                <Flex alignItems='center' justifyContent='space-between'>
                    <Menu >
                        <MenuButton as={IconButton} icon={<FiList />} isRound='true' bg='blue.300' color='white' />
                        <MenuList>
                            {
                                users && users.map(user => {
                                    return (
                                        <MenuItem minH='40px' key={user.id}>
                                            <Text fontSize='sm'>{user.name}</Text>
                                        </MenuItem>
                                    )
                                })
                            }
                        </MenuList>
                    </Menu>
                    <Flex alignItems='center' flexDirection='column' flex={{ base: "1", sm: "auto" }}>
                        <Heading fontSize='lg'> {room}</Heading>
                        <Flex alignItems='center'>
                            <Text mr='1' fontWeight='400' fontSize='md' opacity='.7' letterSpacing='0' >#{users.length}</Text>
                            <Text mr='1' fontWeight='400' fontSize='md' opacity='.7' letterSpacing='0' >@{name}</Text>
                            <Box h={2} w={2} borderRadius='100px' bg='green.300'></Box>
                        </Flex>
                    </Flex>
                    <Button color='gray.500' fontSize='sm' onClick={logout}  >Logout</Button>
                </Flex>
            </Heading>
            <ScrollToBottom className='messages' debug={false}>
                {messages.length > 0 ?
                    messages.map((msg, i) =>
                    (<Box key={i} className={`message ${msg.user === name ? "my-message" : ""}`} m=".2rem 0">
                        <Text fontSize='xs' opacity='.7' ml='5px' className='user'>{msg.user}</Text>
                        <Text fontSize='sm' className='msg' p=".4rem .8rem" bg='white' borderRadius='15px' color='white' wordBreak={'break-word'} overflow={'auto'}>{msg.text}</Text>
                    </Box>)
                    )
                    :
                    <Flex alignItems='center' justifyContent='center' mt='.5rem' bg='#EAEAEA' opacity='.2' w='100%' marginTop='50%'>
                        <BiMessageDetail fontSize='1rem' />
                        <Text ml='1' fontWeight='400'>No messages</Text>
                    </Flex>
                }
            </ScrollToBottom>
            {(typing && (data.name !== name)) ? <Text fontSize='xs' opacity='.7' ml='5px' className='user' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{name} is sexy</Text> : <Text fontSize='xs' opacity='.7' ml='5px' className='user' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>idle</Text>}
            <div className='form'>
                <input type="text" autoFocus placeholder='Enter message' value={message} onChange={handleChange} onKeyDown={handleKeyDown} style={{ paddingRight: '60px' }} maxLength={'1500'} onBlur={stopTyping} />
                <IconButton colorScheme='green' isRound='true' icon={<RiSendPlaneFill />} onClick={handleSendMessage} disabled={message === '' || message === ' ' ? true : false}>Send</IconButton>
            </div>
        </Flex>
    )
}

export default Chat
