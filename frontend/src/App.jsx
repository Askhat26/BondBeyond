import { Box } from "@chakra-ui/react"
import { Container } from "@chakra-ui/react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import UserPage from "./pages/UserPage"
import PostPage from "./pages/PostPage"
import Header from "./componenets/Header"
import HomePage from "./pages/HomePage"
import AuthPage from "./pages/AuthPage";
import { useRecoilValue } from "recoil"
import userAtom from "./atoms/userAtom"
import LogoutButton from "./pages/LogoutButton"
import UpdateProfilePage from "./pages/UpdateProfilePage"
import CreatePost from "./componenets/CreatePost"
import ChatPage from "./pages/ChatPage"

function App() {
  const user = useRecoilValue(userAtom)
  const { pathname } = useLocation();
  return (
    <Box position={"relative"} w="full">
      <Container maxW={pathname === "/" ? { base: "620px", md: "900px" } : "620px"}>
        <Box display="flex">

          <Box flex="1" ml="4">
            <Header />
            <Routes>
              <Route path="/" element={user ? <HomePage /> : <Navigate to="/auth"></Navigate>} />
              <Route path="/auth//*" element={!user ? <AuthPage /> : <Navigate to="/"></Navigate>} />
              <Route path="/update" element={user ? <UpdateProfilePage /> : <Navigate to='/auth' />}></Route>
              <Route path="/:username" element={user ?
                (
                  <>
                    <UserPage />
                    <CreatePost />
                  </>
                ) : (
                  <UserPage />
                )} />
              <Route path="/:username/post/:pid" element={<PostPage />} />
              <Route path='/chat' element={user ? <ChatPage /> : <Navigate to={"/auth"} />} />
            </Routes>
          </Box>
        </Box>
        {user && <LogoutButton />}

      </Container>
    </Box>
  );
}

export default App;


