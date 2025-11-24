export const PATH = {
  ROOT: "/",
  AUTH: {
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
    FORGET_PASSWORD: "/forget-password",
    RESET_PASSWORD: "/reset-password",
  },
  FEED: {
    ROOT: "/feed",
    DETAIL_ROUTE: "/feed/:feedId",
    DETAIL_LINK: (feedId: string) => `/feed/${feedId}`,
  },
  PROFILE: {
    ROOT: "/profile",
    DETAIL_ROUTE: "/profile/:userId",
    DETAIL_LINK: (userId: string) => `/profile/${userId}`,
  },
};
