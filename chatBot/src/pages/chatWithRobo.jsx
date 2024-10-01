import React, { useState } from 'react';
import {
  Box,
  Container,
  Input,
  Button,
  VStack,
  Text,
  HStack,
  Spinner,
  useColorModeValue,
  keyframes,

} from '@chakra-ui/react';
import Navbar1 from '../components/Navbar1';

const ChatWithRobo = () => {
  const [messages, setMessages] = useState([]);  // Chat history
  const [input, setInput] = useState('');        // User's input
  const [isLoading, setIsLoading] = useState(false);  // Loading state for API response
  const [history,setHistory] = useState([]);

  const handleSendMessage = async () => {
    if (!input) return;  // Avoid empty submissions

    const newMessage = { sender: 'user', text: input };
    setMessages([...messages, newMessage]);  // Add user's message to chat
    setInput('');  // Clear input field

    setIsLoading(true);  // Show loading state

    try {
      const response = await fetch('https://robo-ai-6.onrender.com/api/chat',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            userMessage : input,//send the current user message
            history: history,//send the chat history to continue the conversation
        }),
        
      });
      const data = await response.json();
      const aiResponse = { sender: 'robo', text: data.response };  // capturing ai response
      setMessages(prevMessages => [...prevMessages, aiResponse]);  // Add AI's response to chat

    //update the history to maintain the conversation flow
    setHistory((prevHistory)=>[
        ...prevHistory,
        {role:'user', parts:[{text:input}]},
        {role:'model', parts:[{text:data.response}]},
    ]);
    } 
    catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages)=> [...prevMessages,{sender:'robo', text:'error connecting to the server.'}]);
    } 
    finally {
      setIsLoading(false);  // Hide loading state
    }
  };

  const handleKeyPress = (e)=>{
    if(e.key === "Enter" && input.trim()!== ""){
        handleSendMessage();
    }
  };


  return (
    <>
    <Navbar1/>
    <Box
      bgGradient="linear-gradient(-225deg, #77FFD2 0%, #6297DB 48%, #1EECFF 100%)"  
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      maxH="100vh"
      overflowY="auto"
      
      >
    <Container maxW="container.md" py={4}>
      <VStack spacing={4} align="stretch">
        {/* Chat Display Area */}
        <Box 
        bg={useColorModeValue('gray.100', 'gray.700')} 
        p={5} 
        borderRadius="lg"
        //h="500px"
        h={{ base: '60vh', md: '70vh' }}  
        overflowY="scroll" 
        boxShadow='lg'
        border="1px solid"
        borderColor={useColorModeValue('gray.200', 'gray.600')}
        >
          {messages.length === 0 ? (
            <Text textAlign="center" color="gray.500"  >
              Start a conversation with Robo
            </Text>
          ) : (
            messages.map((msg, index) => (
              <HStack
               key={index}
               justify={msg.sender === 'user' ? 'flex-end' : 'flex-start'}
               spacing="5px"
               mb={2}
               >
                <Box
                  bg={msg.sender === 'user' ? 'blue.400' : 'purple.400'}
                  color="white"
                  px={8}
                  py={2}
                  borderRadius="lg"
                  maxW="80%"
                  boxShadow="md" 
                 wordBreak="break-word" 
                 textAlign={msg.sender === 'user' ? 'right' : 'left'}
                >
                  <Text>{msg.text}</Text>
                </Box>
              </HStack>
            ))
          )}
          {isLoading && <Spinner size="md" color="blue.500" mt={4} />}
        </Box>

        {/* Input and Send Button */}
        <HStack spacing={2}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            flex={1}
            bg={useColorModeValue('white', 'gray.700')}
            borderColor={useColorModeValue('gray.300', 'gray.600')}
            _focus={{ borderColor: 'blue.400' }} // Change focus border color
            onKeyPress = {handleKeyPress} //detect enter key press
          />
          <Button 
          colorScheme="blue"
           onClick={handleSendMessage}
           >
            Send
          </Button>
        </HStack>
      </VStack>
    </Container>
    </Box>
    </>
  );
};

export default ChatWithRobo;
