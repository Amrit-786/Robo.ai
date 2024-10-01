import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

    

  const toast = useToast();
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');

  const handleSubmit = async(e) => {
    e.preventDefault();
    const requestData = isLogin ? {email,password} : {name,email,password};

    try{
        if(isLogin){
            const response = await axios.post('https://robo-ai-6.onrender.com/api/auth/login', requestData);
            console.log(response)
            localStorage.setItem('token', response.data.token);
           

        toast({
            title: 'Logged In' ,
            description: isLogin ? "You've successfully logged in." : "You've successfully registered.",
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          navigate('/home');
    }
    else{
        const response = await axios.post('https://robo-ai-6.onrender.com/api/auth/register', requestData);
        console.log('registration successfull:', response.data);

        toast({
            title:'Registered',
            description:'You have successfully registered',
            status:'success',
            duration:3000,
            isClosable:true,
        });
        setIsLogin(true);
    }
    
   
    
    setEmail('');
    setPassword('');
    setName('');
  }
  catch(error){
    console.error('Authentication Error:', error);
    toast({
        title:'Error',
        description:error.response? error.response.data.message:"An error occured",
        status:'error',
        duration:3000,
        isClosable:true,
    });
  }

}

  return (
    <Box bg={bgColor} minH="100vh" py={10}  
    // bgGradient="linear-gradient(to right, #0acffe 0%, #495aff 100%)"
    bgGradient="linear(to-t, #4481eb, #04befe)"
    display="flex"
     flexDirection={['column', 'column', 'row']}  // Stacks on mobile, row on larger screens
     alignItems="center"
     justifyContent="center"
     height="100vh"
     maxWidth="100vw"
     overflowX="auto"
     overflowY="auto"
     padding={['10px', '20px']}
    >
      <Container maxW="container.sm"
       
      >
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="xl" textAlign="center">
            {isLogin ? 'Login' : 'Register'}
          </Heading>
          

          <Box bg={cardBgColor} p={8} borderRadius="lg" boxShadow="md"
          bgColor="rgba(255, 255, 255, 0.3)"
          
          >
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                {!isLogin && (
                  <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormControl>
                )}
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <Button type="submit" colorScheme="blue" width="full">
                  {isLogin ? 'Login' : 'Register'}
                </Button>
              </VStack>
            </form>
          </Box>

          <Text textAlign="center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <Button
              variant="link"
              colorScheme="blue"
              onClick={() => setIsLogin(!isLogin) }
              color='#01005a'
              ml={2}
            >
              {isLogin ? 'Register' : 'Login'}
            </Button>
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Auth;