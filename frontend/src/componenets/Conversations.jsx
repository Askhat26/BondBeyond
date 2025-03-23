import { Avatar, AvatarBadge, Flex, Image, Stack, WrapItem, useColorModeValue, Text, useColorMode, Box } from '@chakra-ui/react'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom.js'
import { BsCheck2All, BsFillImageFill } from 'react-icons/bs';
import { selectedConversationAtom } from '../atoms/messagesAtom.js';

const Conversations = ({ conversation, isOnline }) => {
  if (!conversation || !conversation.participants || conversation.participants.length === 0) {
    return null; // or return a placeholder or loading spinner
  }

  const user = conversation.participants[0];
  if (!user) {
    return null; // ensure user is defined
  }

  const currentUser = useRecoilValue(userAtom);
  const lastMessage = conversation.lastMessage || {};
  const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom);
  const { colorMode } = useColorMode();

  // console.log("selectedConverstion", selectedConversation);
  return (
    <Flex
      gap={4}
      alignItems={"center"}
      p={"1"}
      _hover={{
        cursor: "pointer",
        bg: useColorModeValue("gray.600", "gray.dark"),
        color: "white",
      }}
      onClick={() =>
        setSelectedConversation({
          _id: conversation._id,
          userId: user._id,
          userProfilePic: user.profilePic,
          username: user.username,
          mock: conversation.mock,
        })
      }
      bg={
        selectedConversation?._id === conversation._id ? (colorMode === "light" ? "gray.400" : "gray.dark") : ""
      }
      borderRadius={"md"}
    >
      <WrapItem>
        <Avatar
          size={{
            base: "xs",
            sm: "sm",
            md: "md",
          }}
          src={user.profilePic}
        >
          {isOnline ? <AvatarBadge boxSize='1em' bg='green.500' /> : ""}
        </Avatar>
      </WrapItem>

      <Stack direction={"column"} fontSize={"sm"}>
        <Flex>
          <Text fontWeight='700' display={"flex"} alignItems={"center"}>
            {user.username} <Image src='/verified.png' w={4} h={4} ml={1} />
          </Text>
        </Flex>
        <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
          {currentUser && currentUser._id === lastMessage.sender ? (
            <Box color={lastMessage.seen ? "blue.400" : ""}>
              <BsCheck2All size={16} />
            </Box>
          ) : (
            ""
          )}
          {lastMessage.text?.length > 18
            ? lastMessage.text.substring(0, 18) + "..."
            : lastMessage.text || <BsFillImageFill size={16} />}
        </Text>
      </Stack>
    </Flex>
  );
};

export default Conversations;