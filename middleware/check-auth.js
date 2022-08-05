export default function ({ $auth, $getBrandName, error, redirect, store }) {
  if (!$auth.loggedIn)
    return redirect({
      name: 'brand_name-login',
      params: {
        brand_name: $getBrandName(),
      },
    })
  store.commit('appData/subscriptionFeatures', $auth.user.subscription_features)
}
