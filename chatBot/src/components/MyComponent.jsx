import { Box, Button,Image, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import chat from '../assets/chat.jpg'
import voice from '../assets/voice.jpg'
import Navbar1 from './Navbar1';


const MyComponent = () => {

  return (
    <>
    <Navbar1/>
    <Box
    display="flex"
    flexDirection={['column', 'column', 'row']} // Responsive for mobile (column) and desktop (row)
    alignItems="center"
    justifyContent="center"
    height="100vh"
    bgGradient="linear-gradient(to top, #4481eb 0%, #04befe 100%)"  
    padding={10}
    gap={['10px', '10px', '20px']} 
    >
      
      {/* Box for Chat With Robo */}
      <Box
        cursor="pointer"
        onClick={() => window.location.href = '/chat'}
        position="relative"
        //textAlign="center"
        p={5}
        width={['100%', '100%', '45%']} // Responsive width
       // boxShadow="lg"
        borderRadius="15px"
        _hover={{ transform: 'scale(1.05)', transition: '0.3s' }} 
      >
      
      <Image 
      src={chat} 
      alt='chat'
      height={['250px', '300px', '400px']} 
      marginBottom='10px'
      borderRadius='6px'
     // padding='10px'
      objectFit='cover'
      width='100%' 
       />
         <Button
          colorScheme="purple"
          size="lg"
          cursor="pointer"
          borderRadius="5px"
          position="absolute"
          bottom="31px"
          left="50%"
          transform="translateX(-50%)"
        //  p={1}
        >
          Chat With Robo
        </Button>
      </Box>

      <Spacer />
   
      {/* Box for Talk with Robo */}
      <Box cursor="pointer"
       onClick={() => window.location.href = '/talk'}
        position="relative"
        p={5}
        width={['100%', '100%','45%']}
        borderRadius="15px"
        _hover={{transform:'scale(1.05)', transition:'0.3s'}}
       
         >
      <Image 
      src={voice}
      alt='voice'
      height={['250px','300px','400px']}
      width='100%'
     // objectFit='cover'
      //marginBottom='8px'
      borderRadius='10px'
       />
        <Button 
        colorScheme="purple" 
        size="lg" 
        cursor="pointer" 
        borderRadius="5px" 
        position="absolute" 
        bottom="30px" 
        left="50%" 
        transform="translateX(-50%)"
        >
          Talk with Robo
        </Button>
      </Box>

    </Box>
    </>
  );
};

export default MyComponent;
