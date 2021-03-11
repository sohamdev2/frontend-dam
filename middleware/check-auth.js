export default function ({ $auth, $getBrandName, redirect }) {
  if (!$auth.loggedIn)
    redirect({
      name: 'brand_name-login',
      params: {
        brand_name: $getBrandName(),
      },
    })
}
