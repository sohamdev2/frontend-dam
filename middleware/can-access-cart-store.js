export default function ({ redirect, $auth }) {
  if (!$auth.user?.subscription_features?.order_management?.enable)
    redirect({
      name: 'brand_name',
    })
}
