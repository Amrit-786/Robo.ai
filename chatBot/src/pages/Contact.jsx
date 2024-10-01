import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Heading,
  VStack,
  HStack,
  useToast,
} from '@chakra-ui/react';
import Navbar1 from '../components/Navbar1';

const Contact = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [location, setLocation] = useState('');
  const [visitedDate, setVisitDate] = useState('');
  const [age, setAge] = useState('');
  const [comments, setComments] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
  
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Collect form data
    const feedbackData = {
      userName,
      email,
      subject,
      location,
      visitedDate,
      age,
      comments,
    };

    // Save data to local storage (optional)
    localStorage.setItem('feedbackData', JSON.stringify(feedbackData));

    // Show thank you message
    setShowThankYou(true);
    toast({
      title: "Thank you for reaching out!",
      description: "We have received your message.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    // Reset form fields
    setUserName('');
    setEmail('');
    setSubject('');
    setLocation('');
    setVisitDate('');
    setAge('');
    setComments('');
  };

  return (
    
     <>
     <Navbar1/>
    <Box
      p={6} 
      bgGradient="linear(to-t, #4481eb, #04befe)"  
       display="flex"
       justifyContent="center"
       alignItems="center"
       minH="100vh"
       overflowY="auto"
    >
      {!showThankYou && (
        <Box
           p={6}
           bgColor="rgba(255, 255, 255, 0.1)"
           borderRadius="md"
          color='black'
        >
          <Heading as="h2" size="lg" mb={6} textAlign="center">
            Contact Us 
          </Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl id="subject" isRequired>
                <FormLabel>Subject</FormLabel>
                <Input
                  type="text"
                  placeholder="Type subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </FormControl>

              

              <FormControl id="age" isRequired>
                <FormLabel>Age</FormLabel>
                <Input
                  type="number"
                  min="10"
                  max="100"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </FormControl>

              <FormControl id="comments">
                <FormLabel>Any comments, questions or suggestions?</FormLabel>
                <Textarea
                  rows="6"
                  placeholder="Enter your comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </FormControl>

              <Button type="submit" colorScheme="teal" width="full">
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      )}

      {showThankYou && (
        <Box textAlign="center" mt={6}>
          <Heading as="h3" size="md">
            Thank you for reaching to us!
          </Heading>
          <p>We appreciate your input.</p>
        </Box>
      )}
    </Box>
    </> 
   
  );
};

export default Contact;
