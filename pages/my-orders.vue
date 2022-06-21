<template>
  <div class="body-content user-profile">
    <div class="tabs-view h-100">
      <ul class="nav" role="tablist">
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/profile">User Profile</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link active" to="/my-orders"
            >My Orders</nuxt-link
          >
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/address-book"
            >Address Book</nuxt-link
          >
        </li>
      </ul>
      <div id="my-order" class="tab-pane active">
        <div class="workspace-settings h-100">
          <div class="common-box bg-gray h-100 pl0 pr0">
            <div class="table-list-view table-list-scrolling">
              <ul class="thead">
                <li>
                  <div class="sorting flex20">
                    <span>Order #</span>
                  </div>
                  <div class="sorting flex20">
                    <span>Total Items</span>
                  </div>
                  <div class="sorting flex20">
                    <span>Total Amount</span>
                  </div>
                  <div class="sorting flex25">
                    <span>Order Placed Date</span>
                  </div>
                  <div class="sorting flex15">
                    <span>Status</span>
                  </div>
                </li>
              </ul>
              <div class="customscrollbar no_footer">
                <ul class="tbody">
                  <li>
                    <div class="tb-column flex20">
                      <div class="top-column">
                        <a
                          href="orders-detail.html"
                          class="table-a text-underline"
                          >120</a
                        >
                      </div>
                    </div>
                    <div class="tb-column flex20">
                      <div class="top-column">
                        <label>2</label>
                      </div>
                    </div>
                    <div class="tb-column flex20">
                      <div class="top-column">
                        <label>$300.00</label>
                      </div>
                    </div>
                    <div class="tb-column flex25">
                      <div class="top-column">
                        <label>Jun 01, 2022</label>
                      </div>
                    </div>
                    <div class="tb-column flex15">
                      <div class="top-column">
                        <div
                          class="order-status"
                          style="background-color: #818d9a; color: #ffffff"
                        >
                          <span>Submitted</span>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="tb-column flex20">
                      <div class="top-column">
                        <a
                          href="orders-detail.html"
                          class="table-a text-underline"
                          >121</a
                        >
                      </div>
                    </div>
                    <div class="tb-column flex20">
                      <div class="top-column">
                        <label>10</label>
                      </div>
                    </div>
                    <div class="tb-column flex20">
                      <div class="top-column">
                        <label>$1500.00</label>
                      </div>
                    </div>
                    <div class="tb-column flex25">
                      <div class="top-column">
                        <label>May 15, 2022</label>
                      </div>
                    </div>
                    <div class="tb-column flex15">
                      <div class="top-column">
                        <div
                          class="order-status"
                          style="background-color: #ffb762; color: #ffffff"
                        >
                          <span>Partially Shipped</span>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="tb-column flex20">
                      <div class="top-column">
                        <a
                          href="orders-detail.html"
                          class="table-a text-underline"
                          >122</a
                        >
                      </div>
                    </div>
                    <div class="tb-column flex20">
                      <div class="top-column">
                        <label>50</label>
                      </div>
                    </div>
                    <div class="tb-column flex20">
                      <div class="top-column">
                        <label>$4500.00</label>
                      </div>
                    </div>
                    <div class="tb-column flex25">
                      <div class="top-column">
                        <label>June 25, 2022</label>
                      </div>
                    </div>
                    <div class="tb-column flex15">
                      <div class="top-column">
                        <div
                          class="order-status"
                          style="background-color: #12cb36; color: #ffffff"
                        >
                          <span>Shipped</span>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="tb-column flex20">
                      <div class="top-column">
                        <a
                          href="orders-detail.html"
                          class="table-a text-underline"
                          >123</a
                        >
                      </div>
                    </div>
                    <div class="tb-column flex20">
                      <div class="top-column">
                        <label>8</label>
                      </div>
                    </div>
                    <div class="tb-column flex20">
                      <div class="top-column">
                        <label>$400.00</label>
                      </div>
                    </div>
                    <div class="tb-column flex25">
                      <div class="top-column">
                        <label>Jun 01, 2022</label>
                      </div>
                    </div>
                    <div class="tb-column flex15">
                      <div class="top-column">
                        <div
                          class="order-status"
                          style="background-color: #ff7601; color: #ffffff"
                        >
                          <span>Not Shipped</span>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="tb-column flex20">
                      <div class="top-column">
                        <a
                          href="orders-detail.html"
                          class="table-a text-underline"
                          >124</a
                        >
                      </div>
                    </div>
                    <div class="tb-column flex20">
                      <div class="top-column">
                        <label>2</label>
                      </div>
                    </div>
                    <div class="tb-column flex20">
                      <div class="top-column">
                        <label>$300.00</label>
                      </div>
                    </div>
                    <div class="tb-column flex25">
                      <div class="top-column">
                        <label>Jun 01, 2022</label>
                      </div>
                    </div>
                    <div class="tb-column flex15">
                      <div class="top-column">
                        <div
                          class="order-status"
                          style="background-color: #f43458; color: #ffffff"
                        >
                          <span>Cancelled</span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { required, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  layout: 'app-min-no-search',
  middleware: ['check-auth', 'can-access'],
  data() {
    return {}
  },
  computed: {
    user() {
      return this.$auth.user
    },
  },
  mounted() {},
  methods: {},
  head() {
    return {
      title: this.$brandName() || 'Digital Asset Manager',
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
