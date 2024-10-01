import {
    Button,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    useDisclosure,
    useBreakpointValue,
  } from '@chakra-ui/react';
  import { useNavigate } from 'react-router-dom';
  import { useRef } from 'react';
  
  const LogoutButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.removeItem('token');
      onClose(); // Close the dialog
      navigate('/'); 
       alert("You’ve logged out. Take care and have a great day!"); 
    };
  
    // Responsive button size based on screen size
    const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });
  
    return (
      <>
        <Button onClick={onOpen} colorScheme="blue" size={buttonSize}>
          Logout
        </Button>
  
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} size={{ base: 'sm', md: 'md' }}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold">
                Logout Confirmation
              </AlertDialogHeader>
  
              <AlertDialogBody fontSize={{ base: 'sm', md: 'md' }}>
                Are you sure you want to log out? You will be redirected to the landing page.
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose} size={{ base: 'sm', md: 'md' }}>
                  Cancel
                </Button>
                <Button colorScheme="blue" onClick={handleLogout} ml={3} size={{ base: 'sm', md: 'md' }}>
                  Logout
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    );
  };
  
  export default LogoutButton;
  