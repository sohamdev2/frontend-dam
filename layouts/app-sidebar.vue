<template>
  <ShowWhenReady>
    <AppHeader />
    <div class="body-content two-part">
      <div
        v-if="$route.name === 'brand_name'"
        class="success-msg product-alert"
      >
        <div
          v-for="alert in alertList"
          :key="alert.id"
          class="alert alert-dismissible"
          :class="getAlertType(alert.status_id)"
        >
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            @click="dismissAlert(alert.order_id, alert.status_id)"
          >
            <span>dismiss</span>
          </button>
          <svg
            id="Layer_1"
            class="alert-icon mr-2"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xml:space="preserve"
          >
            <g>
              <path
                class="fill-color"
                d="M0,7.3l6.5,3.7L8.2,9L1.3,5.3L0,7.3z"
              ></path>
              <path
                class="fill-color"
                d="M9.8,8.9l1.7,2.1L18,7.3l-1.4-2.2L9.8,8.9z"
              ></path>
              <path
                class="fill-color"
                d="M2.3,4.7L9,8.2l6.7-3.7L9,1.4L2.3,4.7z"
              ></path>
              <path
                class="fill-color"
                d="M1.7,13l6.8,3.6v-6.3L7,12.1c-0.2,0.2-0.4,0.3-0.7,0.1L1.7,9.5V13z"
              ></path>
              <path
                class="fill-color"
                d="M9.5,10.3v6.3l6.8-3.7V9.5l-4.7,2.7c-0.2,0.1-0.5,0.1-0.7-0.1L9.5,10.3z"
              ></path>
            </g>
          </svg>
          <template v-if="alert.status_id === '2'">
            Order #<strong>{{ alert.order_id }}</strong> status is changed to
            <strong>{{ alert.status }}</strong
            >. Your Shipping Method is
            <strong>{{ alert.shipping_method || '-' }}</strong> and Tracking
            Number is #<strong>{{ alert.shipping_tracking_id }}</strong
            >.
            <a
              class="link"
              @click="
                navigateOrderDetail(alert.id, alert.order_id, alert.status_id)
              "
              >Please check</a
            >
            for more details.
          </template>
          <template v-if="alert.status_id === '3'">
            Order #<strong>{{ alert.order_id }}</strong> is Delivered
            successfully.<a
              class="link"
              @click="
                navigateOrderDetail(alert.id, alert.order_id, alert.status_id)
              "
            >
              Please check</a
            >
            for more details.
          </template>
          <template v-if="alert.status_id === '4'">
            Order #<strong>{{ alert.order_id }}</strong> is Cancelled by the
            Admin {{ alert.admin_name }}.<a
              class="link"
              @click="
                navigateOrderDetail(alert.id, alert.order_id, alert.status_id)
              "
              >Please check</a
            >
            for more details.
          </template>
        </div>
      </div>
      <div
        v-if="folderList.length"
        class="body-content-left"
        :class="{ open: leftMenuOpen }"
      >
        <a
          href="javascript:void(0);"
          class="menu-show"
          @click="$store.dispatch('appData/setLeftMenuOpen', !leftMenuOpen)"
        >
          <svg
            id="Layer_1"
            class="right-arrow-icon white"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xml:space="preserve"
          >
            <g id="Group_4476" transform="translate(-921 -421)">
              <rect
                id="Rectangle_3014"
                x="921"
                y="421"
                class="fill-hide"
                width="18"
                height="18"
              ></rect>
              <g
                id="Icon_feather-chevron-down"
                transform="translate(925.75 422.25)"
              >
                <path
                  id="Path_3433"
                  class="fill-color"
                  d="M0.8,15.5c0.2,0,0.4-0.1,0.5-0.2l7-7c0.3-0.3,0.3-0.8,0-1.1c0,0,0,0,0,0l-7-7C1-0.1,0.5-0.1,0.2,0.2c-0.3,0.3-0.3,0.8,0,1l6.5,6.5l-6.5,6.5c-0.3,0.3-0.3,0.8,0,1.1C0.4,15.4,0.6,15.5,0.8,15.5z"
                ></path>
              </g>
            </g>
          </svg>
        </a>
        <div v-show="!!leftMenuOpen" class="frontend-left-menu">
          <h4>Folders</h4>

          <div class="category-list customscrollbar">
            <FolderList></FolderList>
          </div>

          <ul class="quick-links">
            <li v-if="showRecentUploads">
              <svg
                id="Layer_1"
                class="recent-icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 18 18"
                xml:space="preserve"
              >
                <g id="Group_4346" transform="translate(-115.321 -147.331)">
                  <path
                    id="Path_3396"
                    class="fill-color"
                    d="M124.3,165.3c-5,0-9-4-9-9s4-9,9-9s9,4,9,9C133.3,161.3,129.3,165.3,124.3,165.3z M124.3,148.9c-4.1,0-7.4,3.3-7.4,7.4s3.3,7.4,7.4,7.4c4.1,0,7.4-3.3,7.4-7.4C131.7,152.2,128.4,148.9,124.3,148.9z"
                  ></path>
                  <path
                    id="Path_3397"
                    class="fill-color"
                    d="M123.6,156.7l-0.1-4.7c0-0.4,0.4-0.8,0.8-0.8c0,0,0,0,0,0l0,0c0.4,0,0.8,0.4,0.8,0.8v4.1l2.7,2.6c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l0,0c-0.3,0.3-0.8,0.3-1.1,0L123.6,156.7z"
                  ></path>
                </g>
              </svg>
              <span
                :style="
                  dashboardData &&
                  (dashboardData.recent_uploads.images.length ||
                    dashboardData.recent_uploads.documents.length ||
                    dashboardData.recent_uploads.videos.length ||
                    dashboardData.recent_uploads.audios.length)
                    ? 'pointer-events: auto'
                    : 'pointer-events: none'
                "
                @click.capture.stop="scrollToRecent"
                >Recent Uploaded</span
              >
            </li>
            <li v-if="showTrending">
              <svg
                id="Layer_1"
                class="trend-up-icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                style="enable-background: new 0 0 512 512"
                xml:space="preserve"
              >
                <g>
                  <g>
                    <path
                      class="fill-color"
                      d="M505.8,112.9c8.3,8.3,8.3,21.8,0,30.2L303.1,345.8c-8.3,8.3-21.8,8.3-30.2,0l-91.6-91.6L36.4,399.1c-8.3,8.3-21.8,8.3-30.2,0s-8.3-21.8,0-30.2l160-160c8.3-8.3,21.8-8.3,30.2,0l91.6,91.6l187.6-187.6C483.9,104.6,497.4,104.6,505.8,112.9L505.8,112.9z"
                    />
                    <path
                      class="fill-color"
                      d="M341.3,128c0-11.8,9.6-21.3,21.3-21.3h128c11.8,0,21.3,9.6,21.3,21.3v128c0,11.8-9.6,21.3-21.3,21.3c-11.8,0-21.3-9.6-21.3-21.3V149.3H362.7C350.9,149.3,341.3,139.8,341.3,128z"
                    />
                  </g>
                </g>
              </svg>
              <span
                :style="
                  dashboardData &&
                  dashboardData.trending_data &&
                  dashboardData.trending_data.length
                    ? 'pointer-events: auto'
                    : 'pointer-events: none'
                "
                @click.capture.stop="scrollToTrending"
                >Trending</span
              >
            </li>
            <li v-if="allCollectionList.length">
              <nuxt-link
                :to="{
                  name: 'brand_name-collection',
                  params: { brand_name: $getBrandName() },
                }"
              >
                <svg
                  id="Layer_1"
                  class="collection-icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 16.2 18"
                  xml:space="preserve"
                >
                  <g id="Group_5340" transform="translate(-207.348 -290.319)">
                    <path
                      id="Path_3450"
                      class="fill-color"
                      d="M211.9,308.3c-0.9,0-1.6-0.7-1.6-1.6v-12c0-0.9,0.7-1.5,1.6-1.6h5.9c0.6,0.1,1.3,0.3,1.7,0.8c1.3,0.9,2.4,2,3.3,3.2c0.4,0.5,0.7,1,0.8,1.7v7.9c0,0.9-0.7,1.5-1.6,1.6L211.9,308.3z M211.9,294.6c-0.1,0-0.1,0-0.1,0.1v12c0,0.1,0.1,0.1,0.1,0.1H222c0.1,0,0.1,0,0.1-0.1V299l-3.8,0c-0.4,0-0.7-0.3-0.7-0.7v-3.7L211.9,294.6z M219,297.6l2.1,0c-0.3-0.4-0.6-0.8-1-1.1c-0.4-0.3-0.7-0.7-1.1-1l0,0L219,297.6z"
                    ></path>
                    <path
                      id="Path_3451"
                      class="fill-color"
                      d="M208.6,306.1c-0.7-0.1-1.3-0.8-1.3-1.5v-12.7c0-0.9,0.7-1.6,1.6-1.6h6.5c0.6,0.1,1.2,0.3,1.7,0.8c0.2,0.1,0.3,0.2,0.5,0.4l0.4,0.3l-9.2,0c-0.1,0-0.1,0-0.1,0.1v14.2L208.6,306.1z"
                    ></path>
                  </g></svg
                ><span>All Collections</span></nuxt-link
              >
            </li>
            <li>
              <nuxt-link
                v-if="!user.is_backend_user"
                :to="{
                  name: 'brand_name-shared-urls',
                  params: { brand_name: this.$getBrandName() },
                }"
                ><svg
                  id="Layer_1"
                  class="share-icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 18 18"
                  xml:space="preserve"
                >
                  <g id="Group_4473" transform="translate(-871 -230)">
                    <rect
                      id="Rectangle_3012"
                      x="871"
                      y="230"
                      class="fill-hide"
                      width="18"
                      height="18"
                    ></rect>
                    <path
                      id="Icon_open-share"
                      class="fill-color"
                      d="M883.9,234.4l3.2,3.1l-3.2,3.4v-2.3h-3.8c-2.1,0-4.3,0.5-6.1,1.6c1.4-2,3.9-3.2,8.4-3.2h1.5L883.9,234.4 M883.1,231.8c-0.4,0-0.7,0.3-0.7,0.7c0,0,0,0,0,0v3c-8.8,0-11.2,4.3-11.4,10.6c0,0.1,0,0.1,0.1,0.1c0.1,0,0.1,0,0.1-0.1c1.4-4,4.6-6,8.9-6h2.3v2.9c0,0.4,0.3,0.7,0.7,0.7c0,0,0,0,0,0c0.2,0,0.4-0.1,0.5-0.2l5.2-5.5c0.3-0.3,0.2-0.7,0-1c0,0,0,0,0,0l-5.2-4.9C883.4,231.9,883.3,231.8,883.1,231.8L883.1,231.8z"
                    ></path>
                  </g></svg
                ><span>Shared URLs</span></nuxt-link
              >
            </li>
          </ul>
          <nuxt-link
            v-if="orderManagementAllowed"
            :to="{
              name: 'brand_name-store',
            }"
            class="btn btn-icon btn-store"
          >
            <svg
              id="Layer_1"
              class="store-icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 18 18"
              xml:space="preserve"
            >
              <g id="Store_1">
                <g id="store-shop" transform="translate(-3 -5.6)">
                  <path
                    id="Path_40283"
                    class="fill-color"
                    d="M20.1,8.5l-1.5-1.9C18.3,6.2,17.9,6,17.4,6H6.9C6.5,6,6,6.2,5.7,6.5L4,8.4c-0.6,0.7-1,1.7-1,2.6v2.5c0,0.3,0.3,0.6,0.6,0.6h0.9v6.9c0,1,0.8,1.9,1.9,1.9h11.4c1,0,1.9-0.8,1.9-1.9v-6.9h0.6c0.3,0,0.6-0.3,0.6-0.6v-2.6C21,10.1,20.7,9.2,20.1,8.5z M14.3,9.4c0.2,0.4,0.4,0.8,0.4,1.3v2.3H9.6v-2.3c0-0.4,0.1-0.9,0.4-1.3l1.3-2.1h1.8L14.3,9.4z M4.3,11.1c0-0.7,0.2-1.3,0.7-1.8l1.7-1.9c0.1-0.1,0.1-0.1,0.2-0.1h2.9L8.9,8.7C8.6,9.3,8.4,10,8.4,10.7V13H4.3V11.1z M9.9,21.8v-2.8c0-0.7,0.6-1.3,1.3-1.3h1.9c0.7,0,1.3,0.6,1.3,1.3l0,0v2.8L9.9,21.8z M18.5,21.2c0,0.3-0.3,0.6-0.6,0.6h-2.2v-2.8c0-1.4-1.1-2.5-2.5-2.5h-1.9c-1.4,0-2.5,1.1-2.5,2.5l0,0v2.8H6.5c-0.3,0-0.6-0.3-0.6-0.6v-6.9h12.6L18.5,21.2zM19.7,12.9h-3.8v-2.3c0-0.7-0.2-1.3-0.5-1.9l-0.9-1.5h2.8c0.1,0,0.2,0,0.2,0.1l1.5,1.9c0.4,0.5,0.6,1.1,0.6,1.7L19.7,12.9z"
                  ></path>
                </g>
              </g>
            </svg>
            Store
          </nuxt-link>
        </div>
      </div>
      <div class="body-content-right customscrollbar">
        <nuxt></nuxt>
      </div>
    </div>
  </ShowWhenReady>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    folderList() {
      return this.$store.state.appData.folders
    },
    showTrending() {
      return this.$auth.user.settings?.is_trading
    },
    showRecentUploads() {
      return this.$auth.user.settings?.is_recent_upload
    },
    dashboardData() {
      return this.$store.state.appData.dashboardData
    },
    leftMenuOpen() {
      return this.$store.state?.appData?.leftMenuOpen
    },
    allCollectionList() {
      return this.$store.state.appData.allCollectionList
    },
    user() {
      return this.$auth.user
    },
    alertList() {
      return this.$store.state.product.orderAlerts
    },
    getAlertType() {
      return (statusId) => {
        let alertClass = ''
        const id = parseInt(statusId)
        switch (id) {
          case 2:
            alertClass = 'alert-info'
            break
          case 3:
            alertClass = 'alert-success'
            break
          case 4:
            alertClass = 'alert-danger'
            break

          default:
            alertClass = ''
            break
        }
        return alertClass
      }
    },
  },
  mounted() {
    // console.log('sidebar mounted')
    // this.$store.dispatch('appData/fetchDashboardData')
    if (this.$route.query?.tab === 'recent' && this.showRecentUploads)
      this.scrollToRecent()
  },
  methods: {
    navigateOrderDetail(id, orderId, statusId) {
      this.$router.push({
        name: 'brand_name-my-orders-id-order-detail',
        params: {
          id: orderId,
        },
        query: {
          orderId: id,
        },
      })
      this.dismissAlert(orderId, statusId)
    },
    async dismissAlert(orderId, statusId) {
      try {
        await this.$axios.$post('digital/alert/dismiss', {
          workspace_id: this.$getWorkspaceId(),
          order_id: orderId,
          status: statusId,
        })
        const alertItems = this.alertList.filter(
          (alert) => alert.order_id !== orderId
        )
        this.$store.commit('product/SET_ORDER_ALERT', alertItems)
      } catch (error) {
        this.$toast.error(this.$getErrorMessage(error))
      }
    },
    scrollToRecent() {
      const scrollingState = true
      const scrollTo = 'recent'
      this.$store.dispatch('appData/changeScrolling', {
        scrollingState,
        scrollTo,
      })
      this.$nextTick(() => {
        this.$router.push({
          name: 'brand_name',
          params: { brand_name: this.$getBrandName() },
        })
        this.$axios
          .$post('digital/dashboard/recent-upload-url', {
            workspace_id: this.$getWorkspaceId(),
          })
          .catch(() => {})
      })
      if (this.$route.query?.tab === 'recent') {
        document
          .querySelector("h4[data-target='recent-uploaded']")
          .scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
    scrollToTrending() {
      const scrollingState = true
      const scrollTo = 'trending'

      this.$store.dispatch('appData/changeScrolling', {
        scrollingState,
        scrollTo,
      })
      this.$router.push({
        name: 'brand_name',
        params: { brand_name: this.$getBrandName() },
      })
    },
  },
}
</script>
