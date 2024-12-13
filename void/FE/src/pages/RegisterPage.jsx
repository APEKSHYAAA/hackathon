import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, FormErrorMessage, Select, useToast } from '@chakra-ui/react';

function RegisterPage({ onSubmit, error }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    userType: 'investor', // Default user type
  });

  const [isError, setIsError] = useState(false);
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.fullName && formData.email && formData.password && formData.userType) {
      onSubmit(formData);
    } else {
      setIsError(true);
      toast({
        title: 'Error',
        description: 'Please fill in all fields.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={12} p={8} bg="grey.100" borderRadius="lg" boxShadow="lg">
      <form onSubmit={handleSubmit}>
        <FormControl isInvalid={isError} mb={4}>
          <FormLabel htmlFor="fullName" color="black">Full Name</FormLabel>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            _placeholder={{ color: 'gray.400' }} // Lighter color for placeholder
            bg="white" // Input background color
            color="black" // Text color
          />
        </FormControl>

        <FormControl isInvalid={isError} mb={4}>
          <FormLabel htmlFor="email" color="black">Email</FormLabel>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            _placeholder={{ color: 'gray.400' }} // Lighter color for placeholder
            bg="white" // Input background color
            color="black" // Text color
          />
        </FormControl>

        <FormControl isInvalid={isError} mb={4}>
          <FormLabel htmlFor="password" color="black">Password</FormLabel>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            _placeholder={{ color: 'gray.400' }} // Lighter color for placeholder
            bg="white" // Input background color
            color="black" // Text color
          />
        </FormControl>

        <FormControl isInvalid={isError} mb={6}>
          <FormLabel htmlFor="userType" color="black">User Type</FormLabel>
          <Select
            id="userType"
            name="userType"
            value={formData.userType}
            onChange={handleInputChange}
            placeholder="Select your role"
            bg="white" // Input background color
            color="black" // Text color
          >
            <option value="Investor">Investor</option>
            <option value="Business owner">Business</option>
          </Select>
        </FormControl>

        {error && <Box color="red.500" mb={4}>{error}</Box>}

        <Button colorScheme="blue" width="full" type="submit">
          Register
        </Button>
      </form>
    </Box>
  );
}

export default RegisterPage;
