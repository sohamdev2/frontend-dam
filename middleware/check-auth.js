export default function ({ $auth, $getBrandName, error, redirect }) {
  if (!$auth.loggedIn)
    redirect({
      name: 'brand_name-login',
      params: {
        brand_name: $getBrandName(),
      },
    })
}
