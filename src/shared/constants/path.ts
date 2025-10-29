export const PATH = {
  ROOT: "/",
  AUTH: {
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
    FORGET_PASSWORD: "/forget-password",
    RESET_PASSWORD: "/reset-password",
  },
  POST: {
    ROOT: "/post",
    DETAIL_ROUTE: "/post/:postId",
    DETAIL_LINK: (postId: string) => `/post/${postId}`,
  },
  PROFILE: {
    ROOT: "/profile",
    DETAIL_ROUTE: "/profile/:userId",
    DETAIL_LINK: (userId: string) => `/profile/${userId}`,
  },
};
