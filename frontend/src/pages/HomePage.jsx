import { Flex, Box, Spinner } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";
import { useEffect, useState } from "react";
import Post from "./Post";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postAtom";


const HomePage = () => {
  const showToast = useShowToast();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      setPosts([]); // Ensure posts is initially an array
      try {
        const res = await fetch("/api/posts/feed");
        const data = await res.json();

        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          showToast("Error", "Unexpected response format", "error");
        }
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    getFeedPosts();
  }, [showToast, setPosts]);

  return (
    <Flex gap="10" alignItems={"flex-start"}>
      <Box flex={70}>
        {!loading && posts.length === 0 && <h1>Follow some users to see the feed</h1>}
        {loading && (
          <Flex justify="center">
            <Spinner size="xl" />
          </Flex>
        )}
        {!loading && Array.isArray(posts) && posts.map((post) => (
          <Post key={post._id} post={post} postedBy={post.postedBy} />
        ))}
      </Box>
      <Box flex={30} display={{base:"none" ,md:"block"}}
      >
      
      </Box>
    </Flex>
  );
};

export default HomePage;
