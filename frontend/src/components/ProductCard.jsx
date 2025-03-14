import React from 'react'
import {Box, Img, Text, Button, VStack, Input} from '@chakra-ui/react'
import {Heading, HStack, IconButton} from '@chakra-ui/react'
import {EditIcon, DeleteIcon} from '@chakra-ui/icons'
import {useColorModeValue} from '@chakra-ui/react'
import useProductStore from "../store/product.js";
import { useToast } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react"


const ProductCard = ({product}) => {
    const toast = useToast()
    const {deleteProduct, updateProduct} = useProductStore();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [updatedProduct, setUpdatedProduct] = React.useState(product)

    const handleDelete = async(id)=>{
        const {success, message} = await deleteProduct(id);
        if(!success){
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true
            });
        }else{
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true
            });
        }
    }
    
    const handleUpdate = async (id, updatedProduct) => {
        const {success, message} = await updateProduct(id, updatedProduct);
        onClose();
        if(!success){
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true
            });
        }else{

            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true
            });
        }
    }
    const textColor = useColorModeValue('gray.800', 'gray.200')
    const bg = useColorModeValue('white', 'gray.800')
    console.log(`Product: ${product.image}`)
    console.log(`Updated Product : ${updatedProduct}`)

    return (
        <Box 
            shadow='lg'
            rounded='lg'
            overflow={'hidden'}
            transition={'all 0.3s'}
            _hover={{ transform: 'translateY(-4px)', shadow: 'xl' }}
            bg={bg}
            >
            <Img src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>
                    {product.name}
                </Heading>
                <Text fontWeight={'bold'} fontSize={'xl'} color={textColor} mb={4}>
                    ${product.price}
                </Text>
                <HStack spacing={2}>
                    <IconButton icon={<EditIcon/>} onClick={onOpen} colorScheme='blue' />
                    <IconButton icon={<DeleteIcon />} colorScheme='red' onClick={()=>handleDelete(product._id)}/>
                </HStack>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder="Product Name"
                                name="name"
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}
                            />
                            <Input
                                placeholder="Product Price"
                                name="price"
                                type="number"
                                value={updatedProduct.price}
                                onChange={(e) => setUpdatedProduct({...updatedProduct, price: parseFloat(e.target.value)})}

                            />
                            <Input
                                placeholder="Product Image"
                                name="image"
                                value={updatedProduct.image}
                                onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                                colorScheme='blue'
                                mr={3}
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleUpdate(product._id, updatedProduct)
                                }}
                        >
                            Update
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>

    )
}

export default ProductCard