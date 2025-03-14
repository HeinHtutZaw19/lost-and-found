import React from 'react'
import {Box, Button, Container} from '@chakra-ui/react'
import {Flex, Text, HStack} from '@chakra-ui/react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { Icon } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { IoMoon } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { useColorMode, useColorModeValue} from '@chakra-ui/react';

const Navbar = () => {
    const {colorMode, toggleColorMode} = useColorMode();
  return (
    <Container maxW={'1140px'} px={4} bg={useColorModeValue('gray.100', 'gray.900')}>
        <Flex
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDir={{
                base: "column",
                sm: "row",
            }}
        >
            <Text
                bgGradient='linear(to-l, #7928CA, #FF0080)'
                bgClip='text'
                fontSize={{base: '2xl', md: '4xl'}}
                fontWeight='extrabold'
            >
                <Link to={'/'}>Product Store</Link>
            </Text>
            <HStack>
                <Link to={'/create'}>
                    <Button>
                        <Icon as={IoIosAddCircleOutline} w={6} h={6} />
                    </Button>
                </Link>
                <Button onClick={toggleColorMode}>
                    {colorMode === 'light' ? <IoMoon/> : <LuSun/>}
                </Button>
            </HStack>
        </Flex>
    </Container>
  )
}

export default Navbar