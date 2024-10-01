import 'regenerator-runtime/runtime';
import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FaMicrophone, FaMicrophoneSlash, FaVolumeMute, FaVolumeUp , FaUser, FaRobot, } from 'react-icons/fa';
import {ChakraProvider,Box,Button,Text,VStack,HStack,Spinner,Heading,Divider,useBreakpointValue,Flex} from '@chakra-ui/react';
import axios from 'axios';
import Navbar1 from '../components/Navbar1';

const samplePrompts = [
  'What is react?.',
  'What is Node.js?',
  'How to make resume better?',
  'Give me a motivational quote.',
  'How do I learn JavaScript?',
  'What are the benefits of meditation?',
  'Tell me an interesting fact.',

];

const ChatBox = () => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [thinking, setThinking] = useState(false);
  const [aiText, setAiText] = useState('');
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]); 
  const [isMuted, setIsMuted] = useState(false); 

  
  


  const callGeminiAI = async (message) => {
    setThinking(true);
    setError('');
    try {
      const response = await axios.post('https://robo-ai-6.onrender.com/api/voice',{
        message,
      });
      const responseText = response.data.response;
      setThinking(false);
      
      const newHistory = {user:message, bot:responseText};
      setHistory((prevHistory)=> [...prevHistory,newHistory]);


      // Start speaking the AI's response unless muted
     if (!isMuted) {
       const utterance = new SpeechSynthesisUtterance(responseText);
       window.speechSynthesis.speak(utterance);
     }
     setAiText(responseText);
    } 
    catch (err) {
      setThinking(false);
      setError('Error occurred while calling Gemini AI');
      console.error(err);
    }
  };

  const startListening = () => {
    resetTranscript(); // Clear transcript before starting
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  // Handling prompt card click
  const handlePromptClick = (prompt) => {
    callGeminiAI(prompt);
  };

  const handleMuteToggle = () => {
    setIsMuted((prevState) => {
      
      if (!prevState) {
        window.speechSynthesis.cancel();
      } else {

        if (aiText) {
          const utterance = new SpeechSynthesisUtterance(aiText);
          window.speechSynthesis.speak(utterance);
        }
      }
      return !prevState;
    });
  };
  
  const flexDirection = useBreakpointValue({ base: 'column', md: 'row' });
  const cardFlex = useBreakpointValue({ base: 'none', md: '1' });
  const chatBoxFlex = useBreakpointValue({ base: 'none', md: '3' });

  useEffect(() => {
    let timeoutId;
    if (!listening && transcript) {
     
      timeoutId = setTimeout(() => {
        callGeminiAI(transcript).then((response) => {
          if (response) {
            
            if (!isMuted) {
              const speechSynthesis = window.speechSynthesis;
              const utterance = new SpeechSynthesisUtterance(response);
              speechSynthesis.speak(utterance);
            }
            setAiText(response);
            resetTranscript(); 
          }
        });
      }, 2000);
    }

    return () => clearTimeout(timeoutId);
  }, [transcript, listening, isMuted]);

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser doesn't support speech recognition.</p>;
  }

  return (
    <>
    <Navbar1/>
    <Box
      bgGradient="linear-gradient(-225deg, #77FFD2 0%, #6297DB 48%, #1EECFF 100%)"  // Light background gradient
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      maxH="100vh"
      overflowY="auto"
      >
    
      <Flex 
        direction={flexDirection}
        height="100vh"
        p={4}
        gap={4}
        width={'100vw'}
      >
        {/* Prompt Cards */}
        <Box
          flex={cardFlex}
          p={4}
          minW="30%"
          display="flex"
          flexDirection="column"
          gap={4}
         //bgGradient="linear-gradient(-225deg, #77FFD2 0%, #6297DB 48%, #1EECFF 100%)"  

        >
          <Heading as="h2" size="lg" mb={6} textAlign="center">
            Select a Custom Prompt
          </Heading>
          {samplePrompts.map((prompt, index) => (
            <Box
              key={index}
              p={6}
              bg="gray.100"
              borderRadius="md"
              boxShadow="md"
              textAlign="center"
              _hover={{ bg: 'gray.200', cursor: 'pointer' }}
              onClick={() => handlePromptClick(prompt)}
            >
              <Text as="h4" size="md">
                {prompt}
              </Text>
            </Box>
          ))}
        </Box>
        
        {/* Chat Box */}
        <Box
          flex={chatBoxFlex}
          position="relative"
          p={6}
         
          bg="gray.50"
          minW="70%"
        >
<VStack spacing={4} height="78%" overflowY="auto" bg="gray.100" borderRadius="md" p={4} width="100%">
  <Heading as="h3" size="md" textAlign="center">
    Conversation History
  </Heading>
  {history.map((entry, index) => (
    <React.Fragment key={index}>
      {/* User Message */}
      <Box
        alignSelf="flex-end"
        p={4}
        bg="blue.100"
        borderRadius="md"
        boxShadow="sm"
        maxWidth="60%"
        display="flex"
        alignItems="center"
      >
        {/* Person Icon */}
        <FaUser style={{ marginRight: '8px' }} />
        <Text><strong>You:</strong> {entry.user}</Text>
         </Box>
         
      
      {/* Bot Message */}
      <Box
        alignSelf="flex-start"
        p={4}
        bg="green.100"
        borderRadius="md"
        boxShadow="sm"
        maxWidth="60%"
        mt={2}
        position="relative"
        display="flex"
        alignItems="center"
      >
        {/* Bot Icon */}
        <FaRobot style={{ marginRight: '8px' }} />
        <Text><strong>Bot:</strong>{entry.bot}</Text>

        {/* Mute/Unmute Icon Button */}
        <Button
          onClick={() => {
            if (!isMuted) {
              window.speechSynthesis.cancel();
            } else {
              const utterance = new SpeechSynthesisUtterance(entry.bot);
              window.speechSynthesis.speak(utterance);
            }
            setIsMuted(!isMuted);
          }}
        //  minH={'100px'}
        //  minW={'100px'}
          // size="sm"
          variant="ghost"
        >
          {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
        </Button>
      </Box>
    </React.Fragment>
  ))}
</VStack>
          <Divider my={4} />

          <VStack spacing={4}>

            {transcript && (
              <Box p={4} bg="gray.200" borderRadius="md" width="100%">
                <Text><strong>Your question:</strong> {transcript}</Text>
              </Box>
            )}

            {aiText && (
              <Box p={4} bg="gray.200" borderRadius="md" width="100%">
                <Text><strong>AI Response:</strong> {aiText}</Text>
              </Box>
            )}


<HStack 
  spacing={4}
  wrap="wrap" 
  width="50%" 
  justifyContent={{ base: "center", md: "flex-start" }}
  direction={{ base: "column", md: "row" }} 
>
  <Button 
    onClick={startListening} 
    leftIcon={<FaMicrophone />} 
    width={{ base: "100%", md: "auto" }} 
    bgColor="blue.500" color="white"
  >
    Start Listening
  </Button>
  <Button 
    onClick={stopListening} 
    leftIcon={<FaMicrophoneSlash />} 
    width={{ base: "100%", md: "auto" }} 
    bgColor="green.500" color="white"
  >
    Generate
  </Button>
  <Button 
    onClick={handleMuteToggle} 
    leftIcon={isMuted ? <FaVolumeMute /> : <FaVolumeUp />} 
    width={{ base: "100%", md: "auto" }} 
    bgColor={isMuted ? "red.500" : "yellow.500"} color="white"
  >
    {isMuted ? 'Unmute' : 'Mute'}
  </Button>
</HStack>


              {listening ? (
                <Text textAlign={'center'}  color="green.500">
                  Go ahead, I'm listening...
                </Text>
              ) : (
                <Text  textAlign={'center'} color="blue.500">
                  Click the button and ask a question.
                </Text>
              )}

              {thinking && (
                <HStack>
                  <Spinner size="md" color="blue.500" />
                  <Text fontSize="lg">Thinking...</Text>
                </HStack>
              )}

              {error && (
                <Text fontSize="lg" color="red.500">
                  {error}
                </Text>
              )}

          </VStack>
        </Box>
      </Flex>
      </Box>
      </>
   
  );
};

export default ChatBox;

