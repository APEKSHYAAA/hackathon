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
    <Box maxW="md" mx="auto" mt={12} p={8} bg="gray.800" borderRadius="lg" boxShadow="lg">
      <form onSubmit={handleSubmit}>
        <FormControl isInvalid={isError} mb={4}>
          <FormLabel htmlFor="fullName" color="white">Full Name</FormLabel>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            _placeholder={{ color: 'gray.400' }} // Lighter color for placeholder
            bg="gray.700" // Input background color
            color="white" // Text color
          />
        </FormControl>

        <FormControl isInvalid={isError} mb={4}>
          <FormLabel htmlFor="email" color="white">Email</FormLabel>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            _placeholder={{ color: 'gray.400' }} // Lighter color for placeholder
            bg="gray.700" // Input background color
            color="white" // Text color
          />
        </FormControl>

        <FormControl isInvalid={isError} mb={4}>
          <FormLabel htmlFor="password" color="white">Password</FormLabel>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            _placeholder={{ color: 'gray.400' }} // Lighter color for placeholder
            bg="gray.700" // Input background color
            color="white" // Text color
          />
        </FormControl>

        <FormControl isInvalid={isError} mb={6}>
          <FormLabel htmlFor="userType" color="white">User Type</FormLabel>
          <Select
            id="userType"
            name="userType"
            value={formData.userType}
            onChange={handleInputChange}
            placeholder="Select your role"
            bg="gray.700" // Input background color
            color="white" // Text color
          >
            <option value="investor">Investor</option>
            <option value="business">Business</option>
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
