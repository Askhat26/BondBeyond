
import User from "../../models/userModel.js";
const checkIfFollowing = async (currentUserId, targetUserId) => {
  const currentUser = await User.findById(currentUserId);
  return currentUser.following.includes(targetUserId);
};
export default {checkIfFollowing};