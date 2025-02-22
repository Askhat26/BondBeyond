<<<<<<< HEAD
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
// import SuggestedUsers from "../components/SuggestedUsers";

const HomePage = () => {
	const [posts, setPosts] = useRecoilState(postsAtom);
	const [loading, setLoading] = useState(true);
	const showToast = useShowToast();
	useEffect(() => {
	 	const getFeedPosts = async () => {
	 		setLoading(true);
			// this is set as empty array bcz when going from userpage to homepage, the post loaded will first show post of user only
			// then after few sec later show posts of followd users
	 		setPosts([]);
	 		try {
				const res = await fetch("/api/posts/feed");
	 			const data = await res.json();
	 			if (data.error) {
	 				showToast("Error", data.error, "error");
	 				return;
	 			}
	// 			console.log(data);
	// why not send it as array
	 			setPosts(data);
	 		} catch (error) {
	 			showToast("Error", error.message, "error");
	 		} finally {
	 			setLoading(false);
	 		}
	 	};
	 	getFeedPosts();
	 }, [showToast, setPosts]);

	return (
		<Flex gap='10' alignItems={"flex-start"}>
			<Box flex={70}>
				{!loading && posts.length === 0 && <h1>Follow some users to see the feed</h1>}

				{loading && (
					<Flex justify='center'>
						<Spinner size='xl' />
					</Flex>
				)}

				{posts.map((post) => (
					<Post key={post._id} post={post} postedBy={post.postedBy} />
				))}
			</Box>
			<Box
				flex={30}
				display={{
					base: "none",
					md: "block",
				}}
			>
				{/* <SuggestedUsers /> */}
			</Box>
		</Flex>
	);
};

export default HomePage;
=======
import { Flex, Box, Spinner } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";
import { useEffect, useState } from "react";
import Post from "./Post";
const HomePage = () => {
  const showToast = useShowToast();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/posts/feed");
        const data = await res.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    getFeedPosts();
  }, [showToast]);

  return (
    <Flex gap='10' alignItems={"flex-start"}>
      <Box flex={70}>
        {!loading && posts.length === 0 && <h1>Follow some users to see the feed</h1>}
        {loading && (
          <Flex justify='center'>
            <Spinner size='xl' />
          </Flex>
        )}
        {!loading && posts.map((post) => (
          <Post key={post._id} post={post} postedBy={post.postedBy} />
        ))}
      </Box>
    </Flex>
  );
};

export default HomePage;
>>>>>>> origin/main
