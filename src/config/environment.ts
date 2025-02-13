export const environment = {
  auth: {
    app_key: process.env.NEXT_PUBLIC_APP_KEY ?? "",
  },
  domain: {
    api_auth: process.env.NEXT_PUBLIC_API_AUTH ?? "",
  },
  aplication: {
    http: {
      timeout: +(process.env.NEXT_PUBLIC_TIMEOUT ?? 10000),
    },
    storage: {
      cookies: {
        expireInSeconds: +(
          process.env.NEXT_PUBLIC_TIMEOUT_EXPIRE_IN_SECONDS ?? 1000
        ),
      },
    },
  },
};

export const AUTH = {
  login_route: "/login",
};
