import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { MainContext } from '../../mainContext'
import { SocketContext } from '../../socketContext'
import { Box, Flex, Heading, IconButton, Text, Menu, Button, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"
import { FiList } from 'react-icons/fi'
import { BiMessageDetail } from 'react-icons/bi'
import { RiSendPlaneFill } from 'react-icons/ri'
import ScrollToBottom from 'react-scroll-to-bottom';
import Linkify from 'react-linkify';
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
    const handleKeyDown = (ev) => {
        if (ev.keyCode === 13) {
            if (!!message) {
                handleSendMessage()
            }
        }
    }
    const handleChange = (ev) => {
        if (ev.target.value === ' ') {
            return
        }
        else {
            setMessage(ev.target.value)
        }
    }
    const componentDecorator = (href, text, key) => (
        <a href={href} key={key} target="_blank" rel="noreferrer">
            {text}
        </a>
    );
    window.onpopstate = e => logout()
    useEffect(() => {
        if (!name) return history.push('/');

        socket.on("message", msg => {
            setMessages(messages => [...messages, msg]);
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
    }, [socket, toast, history, name])
    const handleSendMessage = () => {
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
            <Heading className='heading' as='h4' bg='black' p='1rem 1.5rem' borderRadius='10px 10px 0 0'>
                <Flex alignItems='center' justifyContent='space-between'>
                    <Menu bg='black' >
                        <MenuButton as={IconButton} colorScheme='black' bg='black' icon={<FiList />} isRound='true' color='grey' />
                        <MenuList bg='black'>
                            {
                                users && users.map(user => {
                                    return (
                                        <MenuItem bg='black' color='#408EEA' minH='40px' key={user.id}>
                                            <Text fontSize='sm'>{user.name}</Text>
                                        </MenuItem>
                                    )
                                })
                            }
                        </MenuList>
                    </Menu>
                    <Flex alignItems='center' flexDirection='column' flex={{ base: "1", sm: "auto" }}>
                        {users.length > 1 ? <Heading fontSize='xl' color='green.400'>{room}</Heading> : <Heading fontSize='xl' color='red'>{room}</Heading>}
                        <Flex alignItems='center'>
                            {
                                users.length > 1 ? <Text mr='1' fontWeight='400' fontSize='xs' opacity='1' letterSpacing='0' color='green.400'>  @{name} - (connected) - #{users.length} </Text> :
                                    <Text mr='1' fontWeight='400' fontSize='xs' opacity='1' letterSpacing='0' color='red'> @{name} - (disconnected) - #{users.length} </Text>
                            }
                        </Flex>
                    </Flex>
                    <Button style={{ border: '0.5px solid grey' }} bg='black' fontSize='sm' onClick={logout} color='#253bff'>Leave</Button>
                </Flex>
            </Heading >
            <ScrollToBottom className='messages' debug={false}>
                {messages.length > 0 ?
                    messages.map((msg, i) =>
                    (<Box key={i} className={`message ${msg.user === name ? "my-message" : ""}`} m=".2rem 0">
                        <Text fontSize='xs' opacity='.7' ml='5px' className='user'>{msg.user}</Text>
                        <Text fontSize='sm' className='msg' p=".4rem .8rem" bg='white' borderRadius='15px' color='white' wordBreak={'break-word'} overflow={'auto'}>
                            <Linkify componentDecorator={componentDecorator}>{msg.text}</Linkify>
                        </Text>
                    </Box>)
                    )
                    :
                    <Flex alignItems='center' justifyContent='center' mt='.5rem' opacity='.2' w='100%' marginTop='50%'>
                        <BiMessageDetail color='white' fontSize='1rem' />
                        <Text color='white' ml='1' fontWeight='400'>No messages</Text>
                    </Flex>
                }
            </ScrollToBottom >
            <div className='form' style={{ backgroundColor: 'black' }} >
                <hr />
                <input type="text" autoFocus placeholder='Enter message' value={message} onChange={handleChange} onKeyDown={handleKeyDown} style={{ paddingRight: '64px' }} maxLength={'1500'} />
                <IconButton colorScheme='blue' isRound='true' icon={<RiSendPlaneFill />} onClick={handleSendMessage} disabled={message === '' || message === ' ' ? true : false}>Send</IconButton>
            </div>
        </Flex >
    )
}

export default Chat
