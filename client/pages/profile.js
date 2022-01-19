import UserProfile from "../components/UserProfile";

import api from "../lib/apiClient";

export default function Profile({ user, follows, followers }) {
  return <UserProfile user={user} follows={follows} followers={followers} />;
}

// export async function getServerSideProps(context) {
//   const userId = context.params.userId;

//   const user = await api.getUser(userId);
//   const follows = await api.getFollows(userId);
//   const followers = await api.getFollowers(userId);

//   return {
//     props: {
//       user,
//       follows,
//       followers,
//     },
//   };
// }
