import React from 'react'
import { Container, Heading, VStack, Box, Input, Button } from '@chakra-ui/react'
import { useColorModeValue, useToast } from '@chakra-ui/react'
import useProductStore from '../store/product.js';

const CreatePage = () => {
  const [newProduct, setNewProduct] = React.useState({
    name: '',
    price: '',
    image: ''
  })
  const toast = useToast()
  const {createProduct} = useProductStore();
  const handleAddProduct = async()=>{
    const {success, message} = await createProduct(newProduct);
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
    setNewProduct({
        name: '',
        price: '',
        image: ''
    });
  }
  return (
    <Container maxW="container.sm">
    <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
            Create a new product
        </Heading>
        <Box
            w={'full'}
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'2xl'}
            rounded={'lg'}
            p={6}
            textAlign={'center'}>
            <VStack spacing={4}>
                <Input
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                />
                <Input
                    placeholder="Product Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                />
                <Input
                    placeholder="Product Image"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                />
                <Button
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault()
                        handleAddProduct();
                    }}
                >
                    Create Product
                </Button>
            </VStack>

        </Box>
    </VStack>
   
  </Container>
  
);
};

export default CreatePage;