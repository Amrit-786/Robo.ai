import { Heading, Box, Text, VStack, Container } from '@chakra-ui/react';
import React from 'react';
import Navbar1 from '../components/Navbar1';

const About = () => {
  return (
    <>
      <Navbar1 />
      <Box
        bgGradient="linear(to-t, #4481eb, #04befe)" 
        h="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        overflowY="auto"
        padding={4}
      >
        <Container maxW={{ base: '90%', sm: '80%', md: '70%', lg: 'container.lg' }}>
          <VStack spacing={8} textAlign="center">
            <Heading 
              color="white" 
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl', lg: '5xl' }} 
              mb={4}
            >
              About Us
            </Heading>
            <Text
              color="black"
              fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
              lineHeight="1.8"
              px={6}
              bgColor="rgba(255, 255, 255, 0.1)" // Slightly opaque white background for better readability
              borderRadius="md"
              p={4}
              whiteSpace="pre-line" // Maintain line breaks
              //fontStyle="Quincy CF Light"
            >
              Welcome to our platform! Our chatbot is designed to provide an engaging and interactive experience. With both voice and text capabilities, it ensures that communication is seamless and accessible. Whether you prefer typing out your thoughts or speaking them aloud, our chatbot is equipped to handle your requests efficiently.
              {"\n\n"}
              The voice feature allows users to engage in natural conversations, making it easier to express complex ideas without the constraints of text. This accessibility is crucial for users who may find typing challenging or prefer verbal communication. Meanwhile, the chat feature offers a robust text interface, allowing users to share links, and other text-based information seamlessly.
              {"\n\n"}
              Our commitment is to make digital communication easier and more inclusive for everyone. We believe that the power of technology should be accessible to all, and we strive to break down barriers with our user-friendly chatbot.
            </Text>
          </VStack>
        </Container>
      </Box>
    </>
  );
};

export default About;
