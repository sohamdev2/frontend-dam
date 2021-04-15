export default function ({ $auth, $getBrandName, error, redirect }) {
  if ($auth.user.is_backend_user)
    redirect({
      name: 'brand_name',
    })
}
