<template>
  <div class="body-content-right customscrollbar">
    <div class="sign-screen-dtable">
      <div class="sign-screen-dtable-cell">
        <div class="thank-for-order">
          <h2>Thank You!</h2>
          <p>
            Your Order is successfully placed. Your order ref. Id is
            <nuxt-link
              :to="{
                name: 'my-orders-id-order-detail',
                params: {
                  id: $route.query.id,
                },
                query: {
                  orderId: $route.query.order_id,
                },
              }"
              >#{{ $route.query.id }}</nuxt-link
            >. <br />Also, Order details have been sent over your email.
          </p>
          <div class="mt2 d-flex align-items-center justify-content-center">
            <nuxt-link to="/brand_name" class="btn">Back to Home</nuxt-link>
            <strong class="ml-4">OR</strong>
            <p class="mb0 ml-4">
              <nuxt-link to="/my-orders">Go to My Orders Page</nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'app-sidebar',
  middleware: ['check-url', 'check-auth'],
  components: {
    // ContentLoader,
  },
  head() {
    return {
      title:
        'Order Successfully Placed | ' + this.$brandName() ||
        'Digital Asset Manager',
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          hid: 'favicon',
          href: this.$auth.user.branding.brand_favicon || '/favicon.png',
        },
      ],
    }
  },
}
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
