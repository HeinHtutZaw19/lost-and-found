import React from 'react'
import {Container, VStack, Text, Box, SimpleGrid} from '@chakra-ui/react'
import {Link} from 'react-router-dom'
import useProductStore from '../store/product'
import { useEffect } from 'react'
import ProductCard from '../components/ProductCard'

const HomePage = () => {
  const {fetchProducts, products} = useProductStore()
  useEffect(() => {
    fetchProducts()
  }
  , [fetchProducts])
  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
            bgGradient='linear(to-l, #7928CA, #FF0080)'
            bgClip='text'
            fontSize={{base: 'xl', md: '2xl'}}
            fontWeight='extrabold'
        >
          Current Products
        </Text>

        <SimpleGrid columns={{base: 1, md: 2, lg: 3}} spacing={8} w={"full"}>
          {
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          }
        </SimpleGrid>
        {
          products.length === 0 &&  
          <Text fontSize='xl' textAlign={'center'} fontWeight='bold' color='gray.500'>
            No products available
            <Link to='/create'>
              <Text fontSize='sm' as='span' color='blue.500' fontWeight='bold' _hover={{ textDecoration: "underline" }} px={2}>
                  Create a new product
              </Text>
            </Link>

          </Text>
        }
      </VStack>
    </Container>
  )
}

export default HomePage