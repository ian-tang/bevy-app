import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import UserProfile from "../../components/UserProfile";

import api from "../../lib/apiClient";

export default function Profile() {
  const router = useRouter();
  const { userId } = router.query;

  // const [userId, setUserId] = useState(router.query.userId);
  const [user, setUser] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      console.log(userId);
      setUser(await api.getUser(userId));
      setIsLoaded(true);
    })();
  });

  if (isLoaded) {
    return <UserProfile user={user} />;
  } else {
    return <></>;
  }
}

// export async function getServerSideProps(context) {
//   const userId = context.params.userId;

//   const user = await api.getUser(userId);

//   return {
//     props: {
//       user,
//     },
//   };
// }
