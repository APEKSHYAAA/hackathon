import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Heading, HStack, IconButton, Image, Text, useColorModeValue, useToast, Button, VStack, Input } from '@chakra-ui/react';
import { useProductStore } from '../store/product';
import { useDisclosure } from '@chakra-ui/react'; // Add this import for modal control
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.700");
  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    if (!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
    onClose();
  }

  return (
    <Box
      shadow='lg'
      rounded='lg'
      overflow='hidden'
      transition='all 0.3s'
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
      bg={bg}
    >
      <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
      <Box p={4}>
        <Heading as='h3' size='md' mb={2}>
          {product.name}
        </Heading>
        <Text fontSize='l' color={textColor} mb={4}>
          Fund Needed: Nrs. {product.fund_needed} 
        </Text>
        <Text fontSize='l' color={textColor} mb={4}>
          Fund Raised: Nrs. {product.fund_raise}
        </Text>
        <Text color={textColor} mb={4}>
          Description: {product.description}
        </Text>
        <Text color={textColor} mb={4}>
          Perks: {product.perks.join(', ')}
        </Text>
        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} colorScheme='blue' onClick={onOpen} />
          <IconButton
            icon={<DeleteIcon />}
            colorScheme='red'
            onClick={() => handleDeleteProduct(product._id)}
          />
        </HStack>
      </Box>

      {/* Modal for Edit */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder='Product Name'
                name='name'
                value={updatedProduct.name}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
              />
              <Input
                placeholder='Fund Needed'
                name='fund_needed'
                type='number'
                value={updatedProduct.fund_needed}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, fund_needed: e.target.value })}
              />
              <Input
                placeholder='Fund Raised'
                name='fund_raise'
                type='number'
                value={updatedProduct.fund_raise}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, fund_raise: e.target.value })}
              />
              <Input
                placeholder='Image URL'
                name='image'
                value={updatedProduct.image}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
              />
              <Input
                placeholder='Description'
                name='description'
                value={updatedProduct.description}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
              />
              <Input
                placeholder='Perks (comma separated)'
                name='perks'
                value={updatedProduct.perks.join(', ')}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, perks: e.target.value.split(', ') })}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' onClick={() => handleUpdateProduct(product._id, updatedProduct)}>Update</Button>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
