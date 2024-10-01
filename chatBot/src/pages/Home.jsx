import { Box,Button,Heading,Image,Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"
import Robo2 from '../assets/robo3.png'


const Home=()=>{
    const navigate = useNavigate();

    const  handleGetStarted=()=>{
        navigate('/auth');
    };

    return(
        <Box
        display="flex"
        flexDirection={['column', 'column', 'row']}  // Stacks on mobile, row on larger screens
        alignItems="center"
        justifyContent="center"
        height="100vh"
        maxWidth="100vw"
        bgGradient="linear-gradient(to top, #30cfd0 0%, #330867 100%)"
        overflowX="auto"
        overflowY="auto"
        padding={['10px', '20px']}  
      >
        {/* Image Section */}
        <Image
          src={Robo2}
          alt="Robo"
          height={['60vh', '70vh', '80vh']}  // Smaller height on mobile, larger on desktop
          marginBottom={['20px', '20px', '0']}  
          marginRight={['0', '0', '50px']}  
        />
  
        {/* Text and Button Section */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems={['center', 'center', 'flex-start']}  
          textAlign={['center', 'center', 'left']}  
        >
          <Heading
            fontSize={['2xl', '3xl', '4xl']}  
            marginBottom="10px"
          >
            Your Chat Companion
          </Heading>
  
          <Text
            fontSize={['md', 'lg']}  // Smaller font for mobile
            marginBottom="20px"
            color="gray.200"
          >
            Transforming Conversations, Simplifying Interactions
          </Text>
  
          <Button
            onClick={handleGetStarted}
            size="lg"
            borderRadius="5px"
            bg="ButtonFace"
            cursor="pointer"
            _hover={{ bg: 'gray.200' }}  
            paddingX={['20px', '40px']}  // Larger button on larger screens
          >
            Get Started
          </Button>
        </Box>
      </Box>
    )
}

export default Home;