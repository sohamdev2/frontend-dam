export default function ({ $auth, $getBrandName, redirect }) {
  const brandName = $auth.loggedIn && $getBrandName()

  if (brandName) redirect(`/${brandName}`)
}
