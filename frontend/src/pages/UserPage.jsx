import { useEffect, useState } from 'react';
import Post from './Post.jsx';
import UserHeader from '../componenets/UserHeader.jsx'
import useShowToast from '../hooks/useShowToast.js';
import { useParams } from 'react-router-dom';
import { Flex, Spinner } from "@chakra-ui/react";
import useGetUserProfile from '../hooks/useGetUserProfile.js';
import { useRecoilState } from 'recoil';
import postsAtom from '../atoms/postAtom.js';

const UserPage = () => {
  const { user,loading}= useGetUserProfile()
  const { username } = useParams();
  const showToast = useShowToast();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [fetchingPosts, setFetchingPosts] = useState(true);


  useEffect(() => {
    const getPosts = async () => {
      setFetchingPosts(true);
      try {
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();  // Ensure that json() is awaited
        console.log(data);
        if (Array.isArray(data)) {  // Ensure the data is an array
          setPosts(data);
        } else {
          setPosts([]);  // Handle non-array response
        }
      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]);
      } finally {
        setFetchingPosts(false);
      }
    };
    getPosts();
  }, [username, showToast,setPosts]);
  

  if (!user) return null;

  return (
    <>
      <UserHeader user={user} />
      {!fetchingPosts && posts.length === 0 && <h1>User has no posts.</h1>}
      {fetchingPosts && (
        <Flex justifyContent={"center"} my={12}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {Array.isArray(posts) && posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy}  />
      ))}
    </>
  );
};

export default UserPage;
