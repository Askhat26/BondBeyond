import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Flex, Image, Button, useColorMode, Link } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { Link as RouterLink } from "react-router-dom";
import {BsFillChatQuoteFill} from "react-icons/bs"
const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const handleClick = () => {
    // console.log('Toggling color mode...');
    toggleColorMode();
  };
  
  // console.log('Color Mode:', colorMode);

  return (
    <Flex justifyContent={"space-between"} mt={6} mb='12'>
      {user && (
        <Link as={RouterLink} to='/'>
          <AiFillHome size={24} />
        </Link>
      )}
      <Image
        cursor={"pointer"}
        alt='logo'
        w={6}
        src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
        onClick={toggleColorMode}
      />
      {user && (
        <>
          <Link as={RouterLink} to={`/${user.username}`} >
            <RxAvatar size={24} />
          </Link>
          <Link as={RouterLink} to={`/chat`} >
            <BsFillChatQuoteFill size={24}/>
          </Link>
        </>
      )}
    </Flex>
  );
};

export default Header;
