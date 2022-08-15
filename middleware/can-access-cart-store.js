export default function ({ redirect, $auth }) {
  if (!$auth.user?.subscription_features?.asset_order_management?.enable)
    redirect({
      name: 'brand_name',
    })
}
