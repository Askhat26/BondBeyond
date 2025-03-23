import  { useEffect, useState } from 'react';
import { Avatar, Flex, Text, Image, Box, Divider, Button } from '@chakra-ui/react';
import Action from '../componenets/Action';
import useGetUserProfile from '../hooks/useGetUserProfile';
import useShowToast from '../hooks/useShowToast';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDistanceToNow } from "date-fns";
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { DeleteIcon } from "@chakra-ui/icons";
import Comment from '../componenets/comment';
import postsAtom from '../atoms/postAtom';

const PostPage = () => {
  const [liked, setLiked] = useState(false);
  const { user, loading } = useGetUserProfile();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const { pid } = useParams();
  const currentUser = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const navigate = useNavigate();

  const currentPost = posts.length > 0 ? posts[0] : null;

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setPosts([data]);
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    };
    getPosts();
  }, [showToast, pid, setPosts]);

  const handleDeletePost = async (e) => {
    try {
      e.preventDefault();
      if (!window.confirm("Are you sure you want to delete this post?")) return;

      const res = await fetch(`/api/posts/${currentPost._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Post deleted", "success");
      navigate(`/${user.username}`);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  const handleDeleteReply = async (replyId) => {
    if (!user) return showToast("Error", "You must be logged in to delete a reply", "error");
    try {
      const res = await fetch(`/api/posts/${currentPost._id}/replies/${replyId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) return showToast("Error", data.error, "error");

      const updatedPosts = posts.map((p) => {
        if (p._id === currentPost._id) {
          return { ...p, replies: p.replies.filter((r) => r._id !== replyId) };
        }
        return p;
      });
      setPosts(updatedPosts);
      showToast("Success", "Reply deleted successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  if (loading || !currentPost || !user) return null;

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" my={4}>
        <Flex alignItems="center" gap={2}>
          <Avatar src={user.profilePic} size="md" name={user.username} />
          <Flex alignItems="center">
            <Text fontSize="sm" fontWeight="bold" mr={1}>
              {user.username}
            </Text>
            <Image src="/verified.png" w={4} h={4} />
          </Flex>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="sm" color="gray.light">
            {formatDistanceToNow(new Date(currentPost.createdAt))} ago
          </Text>
          {currentUser?._id === user._id && (
            <DeleteIcon
              size={20}
              onClick={handleDeletePost}
              style={{ cursor: 'pointer' }}
            />
          )}
        </Flex>
      </Flex>

      <Text my={3}>{currentPost.text}</Text>

      {currentPost.img && (
        <Box borderRadius={6} overflow="hidden" border="1px solid" borderColor="gray.light" my={3}>
          <Image src={currentPost.img} w="full" />
        </Box>
      )}
      <Flex gap={3} my={3}>
        <Action post={currentPost} />
      </Flex>
      <Divider my={4} />
      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}></Text>
          <Text color={"gray.light"}>Get replies and comments</Text>
        </Flex>
        
      </Flex>
      <Divider my={4} />
      
      {currentPost.replies.map((reply) => (
        <Comment
          key={reply._id}
          reply={reply}
          lastReply={reply._id === currentPost.replies[currentPost.replies.length - 1]._id}
          handleDeleteReply={handleDeleteReply}
        />
      ))}
    </>
  );
};

export default PostPage;