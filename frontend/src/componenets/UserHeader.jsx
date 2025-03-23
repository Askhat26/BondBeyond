import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Flex,
  Text,
  VStack,
  Link,
  MenuButton,
  Menu,
  Portal,
  MenuList,
  MenuItem,
  useToast,
  useColorMode,
  Button
} from '@chakra-ui/react';
import { BsInstagram } from 'react-icons/bs';
import { CgMoreO } from 'react-icons/cg';
import { Link as RouterLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom.js';
import useShowToast from '../hooks/useShowToast.js';

const UserHeader = ({ user }) => {
  const { colorMode } = useColorMode();
  const currentUser = useRecoilValue(userAtom);
  const [following, setFollowing] = useState(currentUser && user.followers.includes(currentUser?._id));
  const showToast = useShowToast();
  const [updating, setUpdating] = useState(false);
  const toast = useToast();

  const handleFollowUnfollow = async () => {
    if (!currentUser) {
      showToast("Error", "Please login to follow", "error");
      return;
    }
    if (updating) return;

    setUpdating(true);
    try {
      const res = await fetch(`/api/users/follow/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      if (following) {
        showToast("Success", `Unfollowed ${user.name}`, "success");
        user.followers = user.followers.filter(follower => follower !== currentUser?._id); // simulate removing from followers
      } else {
        showToast("Success", `Followed ${user.name}`, "success");
        user.followers.push(currentUser?._id); // simulate adding to followers
      }
      setFollowing(!following);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setUpdating(false);
    }
  };

  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      toast({
        title: "Success.",
        status: "success",
        description: "Profile link copied.",
        duration: 3000,
        isClosable: true,
      });
    });
  };

  return (
    <VStack gap={4} alignItems="start">
      <Flex justifyContent="space-between" w="full">
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            {user.name}
          </Text>
          <Flex gap={2} alignItems="center">
            <Text fontSize="sm">{user.username}</Text>
            <Text fontSize="10px" bg={colorMode === 'light' ? '#DBA979' : 'white'} color="gray.light" p={1} borderRadius="full">
              MEAGAPROJECT
            </Text>
          </Flex>
        </Box>
        <Box>
          {user.profilePic ? (
            <Avatar name={user.name} src={user.profilePic} size={{ base: "md", md: "lg" }} />
          ) : (
            <Avatar name={user.name} src='https://bit.ly/broken-link' size={{ base: "md", md: "lg" }} />
          )}
        </Box>
      </Flex>
      <Text>{user.bio}</Text>
      {currentUser?._id === user._id ? (
        <Link as={RouterLink} to='/update'>
          <Button size="sm">Update Profile</Button>
        </Link>
      ) : (
        <Button size="sm" onClick={handleFollowUnfollow} isLoading={updating}>
          {following ? "Unfollow" : "Follow"}
        </Button>
      )}
      <Flex w="full" justifyContent="space-between" alignItems="center">
        <Flex gap={2} alignItems="center">
          <Text color="gray.light">{user.followers.length} followers</Text>
          <Box w="1" h="2" bg="gray.light" borderRadius="full"></Box>
          <Link color="gray.light" href="https://www.instagram.com">
            Instagram.com
          </Link>
        </Flex>
        <Flex>
          <Box className='icon-container'>
            <BsInstagram size={24} cursor="pointer" />
          </Box>
          <Box className='icon-container'>
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor="pointer" />
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem bg={"gray.dark"} onClick={copyURL}>Copy link</MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w="full">
        <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pd="3" cursor={"pointer"}>
          <Text fontWeight={"bold"}>THREADS</Text>
        </Flex>
        <Flex flex={1} borderBottom={"1px solid gray"} justifyContent={"center"} color={"gray.light"} pd="3" cursor={"pointer"}>
          <Text fontWeight={"bold"}>REPLIES</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
