<template>
  <div :class="['notification', showList ? 'show' : '']">
    <a
      v-tooltip="{
        html: false,
        content: 'Announcements',
      }"
      href="javascript:void(0);"
      class="bell-icon-link"
      @click="enableBellClick && openList()"
    >
      <svg
        class="announcement-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        focusable="false"
        role="img"
      >
        <path
          class="fill-color"
          fill-rule="nonzero"
          d="M6 13.472c0 .811-.626 1.475-1.417 1.525L4.488 15h-.976a1.52 1.52 0 01-1.509-1.432L2 13.472V9h-.734C.63 9 .112 8.393.016 7.794l-.014-.12L0 7.598V4.402C0 3.732.56 3 1.266 3h6.205L11.043.275a1.22 1.22 0 011.286-.161c.413.192.671.594.671 1.031v1.962c1.155.386 2 1.766 2 3.393 0 1.627-.845 3.007-2 3.393v.962c0 .437-.258.84-.67 1.031a1.22 1.22 0 01-1.287-.161L7.53 9H6v4.472zm-2.995 0c0 .224.233.41.448.44l.06.003h.975c.222 0 .491-.227.52-.443V9H3.004v4.472zM11.645.968a.374.374 0 00-.215.083L7.918 3.87c-.081.068-.187.136-.297.136h-6.21c-.176 0-.411.238-.411.444v3.11c0 .206.235.439.41.439h6.211a.45.45 0 01.297.086l3.512 2.858c.037.03.129.101.215.118a.331.331 0 00.202-.038c.093-.044.153-.181.153-.299v-9.44c0-.118-.06-.235-.153-.278a.702.702 0 00-.202-.039zm1.356 3.198v4.668c.684-.36 1.176-1.263 1.176-2.334 0-1.07-.492-1.975-1.176-2.334z"
        ></path>
      </svg>
      <span v-if="displayBatchCount.show" class="count">
        {{ displayBatchCount.count_ }}
      </span>
    </a>
    <div v-click-outside="onClickOutsideOfList" class="notification-body">
      <div
        v-infinite-scroll="infinityHandler"
        class="notification-wrapper"
        infinite-scroll-distance="1"
      >
        <div class="notification-header-fixed">
          <div class="daygroup">
            <span></span>
          </div>

          <h4>
            {{ `Announcements (${unreadAnnouncements})` }}
          </h4>
          <div class="readall">
            <a
              v-if="showMarkAllAsReadAnnouncement"
              href="javascript:void(0);"
              @click="readAllAnnouncements"
              >Mark all as read</a
            >
          </div>
        </div>
        <ul class="nav nav-tabs nav-justified">
          <li class="nav-item">
            <a
              href="#announcement"
              :class="{ active: activeTab === 2 }"
              data-toggle="tab"
              @click="changeTab(2)"
              >Announcements ({{ unreadAnnouncements }})</a
            >
          </li>
        </ul>
        <div class="tab-content">
          <div
            id="announcement"
            :class="['tab-pane', activeTab === 2 ? 'active' : '']"
          >
            <template v-if="initialLoading_">
              <div style="text-align: center; padding: 20px">
                <i>Loading.....</i>
              </div>
            </template>
            <template v-else>
              <section class="announcement">
                <div class="section-header">
                  <label
                    v-if="!initialLoading_ && announcements.length"
                    class="label-switch small no-text"
                    >Only show unread
                    <input
                      v-model="showOnlyUnreadAnnouncements"
                      :true-value="true"
                      :false-value="false"
                      type="checkbox"
                      class="switch"
                    />
                    <span class="lable"></span>
                  </label>
                  <a
                    v-if="showMarkAllAsReadAnnouncement"
                    href="javascript:void(0);"
                    class="mark-all-read"
                    @click="readAllAnnouncements"
                    >Mark all as read</a
                  >
                </div>
                <div
                  v-for="anno in announcementComputed"
                  :key="anno.id"
                  :class="['notification-item', !anno.read_at ? 'unread' : '']"
                >
                  <a
                    href="javascript:void(0);"
                    data-toggle="modal"
                    data-target="#announcement-detail"
                    class="item-link"
                    @click="announcementClicked(anno)"
                  ></a>
                  <div class="item-wrapper">
                    <div
                      v-if="anno.announcements_detail.publisher.profile_image"
                      class="profile-bg fl-as-imgtxt"
                      :title="anno.announcements_detail.publisher.name"
                      :style="{
                        backgroundImage: `url(${anno.announcements_detail.publisher.display_profile_image})`,
                      }"
                    ></div>
                    <div
                      v-else
                      :class="[
                        'profile-char fl-as-imgtxt',
                        anno.announcements_detail.publisher.name[0].toLowerCase(),
                      ]"
                      :title="anno.announcements_detail.publisher.name"
                    >
                      {{
                        anno.announcements_detail.publisher.name[0].toUpperCase()
                      }}
                    </div>
                    <div class="item-content">
                      <h5>
                        {{ anno.announcements_detail.title
                        }}<span>{{ anno.created_date }}</span>
                      </h5>
                      <a
                        href="javascript:void(0);"
                        data-toggle="modal"
                        data-target="#announcement-detail"
                        @click="announcementClicked(anno)"
                      >
                        {{ htmlToText(anno.announcements_detail.description) }}
                      </a>
                      <div class="path-link">
                        <span>{{ anno.brand_name }}</span>
                        <span>{{
                          anno.announcements_detail.publisher.name
                        }}</span>
                      </div>
                    </div>
                    <button
                      v-tooltip.left="{
                        html: false,
                        trigger: 'hover',
                        hideOnTargetClick: false,
                        content: anno.read_at
                          ? `Mark as unread`
                          : `Mark as read`,
                      }"
                      class="notification-read-unread"
                      aria-pressed="false"
                      @click="readUnreadAnnouncement(anno.id)"
                    >
                      <div class="indicator"></div>
                    </button>
                  </div>
                </div>
              </section>
              <div
                v-if="loadMoreLoading_"
                style="text-align: center; padding: 10px"
              >
                <i>Loading....</i>
              </div>
              <div v-if="!announcementComputed.length" class="no-notification">
                <img src="~/assets/img/no-notification.svg" alt="" />
                <p>You have no announcements available.</p>
              </div>
              <div
                v-if="
                  showLast30DaysMsg_ &&
                  !loadMoreLoading_ &&
                  announcementComputed.length
                "
                class="no-more-load"
              >
                <img src="~/assets/img/30-days-notification.svg" alt="" />
                <p>That's all your announcements till now.</p>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <!--  Announcement Detail Modal  -->
    <div
      v-if="showAnnouncementModel"
      id="announcement-detail"
      class="modal fade"
    >
      <div
        class="modal-dialog large modal-dialog-scrollable modal-dialog-centered"
      >
        <div class="modal-content text-left">
          <div class="modal-header">
            <h5 class="modal-title">Announcement</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">
                <svg
                  id="Layer_1"
                  class="close-icon h-red"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 18 18"
                  xml:space="preserve"
                >
                  <g id="Group_4358" transform="translate(-69.745 -317.549)">
                    <path
                      id="Path_3424"
                      class="fill-color"
                      d="M70.5,335.5c-0.4,0-0.8-0.4-0.8-0.8c0-0.2,0.1-0.4,0.2-0.6l16.4-16.4c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-16.4,16.4C70.9,335.5,70.7,335.5,70.5,335.5z"
                    ></path>
                    <path
                      id="Path_3425"
                      class="fill-color"
                      d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"
                    ></path>
                  </g>
                </svg>
              </span>
            </button>
          </div>
          <div class="modal-body announcement-body">
            <h4>{{ clickedAnnouncementDetail.announcements_detail.title }}</h4>
            <div class="anno-date">
              Announced By :
              <strong>{{
                clickedAnnouncementDetail.announcements_detail.publisher.name
              }}</strong>
            </div>
            <div class="anno-date mb-3">
              Announced Date :
              <strong>{{
                $moment()
                  .local(
                    clickedAnnouncementDetail.announcements_detail.publish_date
                  )
                  .format('MMM DD, YYYY')
              }}</strong>
            </div>

            <div
              v-html="
                clickedAnnouncementDetail.announcements_detail.description
              "
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { isEmpty } from 'lodash'
import vClickOutside from 'v-click-outside'
export default {
  name: 'DamAnnouncementNotification',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      activeTab: 2, // 1 = notification  2 = announcement
      showList: false,
      enableClickOutside: false,
      enableBellClick: true,
      badgesCount: this.$auth.user.dam_badges_count,
      /* Announcement data vars */
      initialLoading_: false,
      loadMoreLoading_: false,
      page_: 1,
      lastPage_: 1,
      announcements: [],
      unreadAnnouncements: 0,
      showLast30DaysMsg_: false,
      showOnlyUnreadAnnouncements: false,
      clickedAnnouncementDetail: {},
    }
  },
  computed: {
    displayBatchCount() {
      return {
        show: this.badgesCount >= 1,
        count_: this.badgesCount > 9 ? `9+` : `${this.badgesCount}`,
      }
    },
    /* Announcements Computed Properties */
    announcementComputed() {
      if (this.showOnlyUnreadAnnouncements) {
        return this.announcements.filter(({ read_at }) => read_at === null)
      } else {
        return this.announcements
      }
    },
    showMarkAllAsReadAnnouncement() {
      const data = this.announcements.filter(({ read_at }) => read_at === null)
      return !!(data.length && this.activeTab === 2)
    },
    showAnnouncementModel() {
      return !isEmpty(this.clickedAnnouncementDetail)
    },
  },
  mounted() {
    this.$echo
      .private(`user.${this.$auth.user.id}.DAMFrontendAnnouncementNotification`)
      .listen('.DAMFrontendAnnouncement', (e) => {
        const {
          data: { dam_badges_count },
        } = e
        this.badgesCount = dam_badges_count
        // this.closeList()
      })
    this.loadJQ()
    this.getBadgesCount()
  },
  beforeDestroy() {
    this.$echo.leave(
      `user.${this.$auth.user.id}.DAMFrontendAnnouncementNotification`
    )
  },

  methods: {
    async getBadgesCount() {
      try {
        const { data } = await this.$axios.$get(
          `digital/announcement/user-badges-count`
        )
        this.badgesCount = data.dam_badges_count
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    loadJQ() {
      window.$('.notification-body .notification-wrapper').scroll(function () {
        const scroll = window.$(this).scrollTop()
        if (scroll >= 60) {
          window.$(this).addClass('notifixed')
        } else {
          window.$(this).removeClass('notifixed')
        }
      })
    },
    infinityHandler() {
      if (this.activeTab === 2) {
        // announcements
        this.announcements.length &&
          this.page_ <= this.lastPage_ &&
          this.loadMoreAnnouncements()
      }
    },
    changeTab(id) {
      this.activeTab = id
      if (this.activeTab === 2 && !this.announcements.length) {
        this.initialLoadAnnouncements()
      }
    },
    openList() {
      this.showList = true
      this.enableBellClick = false
      setTimeout(() => {
        this.enableClickOutside = true
      }, 500)
      this.page_ = 1
      this.announcements = []
      this.initialLoadAnnouncements()
    },
    closeList() {
      if (this.enableClickOutside) {
        this.enableClickOutside = false
        this.enableBellClick = true
        this.showList = false
        setTimeout(() => {
          this.activeTab = 2
          /* Announcement reset vars */
          this.initialLoading_ = false
          this.announcements = []
          this.showLast30DaysMsg_ = false
          this.page_ = 1
          this.lastPage_ = 1
          this.showOnlyUnreadAnnouncements = false
        }, 200)
      }
    },
    onClickOutsideOfList() {
      this.closeList()
    },

    /* Announcements methods */
    async initialLoadAnnouncements() {
      try {
        this.initialLoading_ = true
        this.badgesCount = 0
        const { data } = await this.$axios.$get(
          `digital/announcement/notification-list?page=${this.page_}`
        )
        this.lastPage_ = data.last_page
        this.announcements.push(...data.data)
        this.unreadAnnouncements = data.total_unread_announcement
        this.initialLoading_ = false
        if (this.page_ < this.lastPage_) {
          this.page_ += 1
        } else {
          this.showLast30DaysMsg_ = true
        }
      } catch (e) {
        this.initialLoading_ = true
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    async loadMoreAnnouncements() {
      if (this.showLast30DaysMsg_) {
        return true
      }
      try {
        this.loadMoreLoading_ = true
        const { data } = await this.$axios.$get(
          `digital/announcement/notification-list?page=${this.page_}`
        )
        this.lastPage_ = data.last_page_
        this.loadMoreLoading_ = false
        this.initialLoading_ = false
        if (data.data.length) {
          this.showLast30DaysMsg_ = true
          this.announcements.push(...data.data)
          this.page_ += 1
        } else {
          this.showLast30DaysMsg_ = true
        }
      } catch (e) {
        this.loadMoreLoading_ = false
        this.initialLoading_ = false
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    async readAnnouncement(aId) {
      const findIndex = this.announcements.findIndex(
        ({ id }) => parseInt(id) === parseInt(aId)
      )
      if (findIndex !== -1) {
        const read_at = this.announcements[findIndex].read_at
        if (read_at === null) {
          this.announcements[findIndex].read_at = 'read'
          const currentCount = this.unreadAnnouncements
          this.unreadAnnouncements = currentCount - 1

          try {
            const { data } = await this.$axios.$post(
              `digital/announcement/read`,
              {
                notification_id: aId,
              }
            )
            // this.unreadNotifications = data.total_unread_notification
            console.log(data)
          } catch (e) {
            this.$toast.error(this.$getErrorMessage(e))
          }
        }
      }
    },
    async readUnreadAnnouncement(aId) {
      const findIndex = this.announcements.findIndex(
        ({ id }) => parseInt(id) === parseInt(aId)
      )
      if (findIndex !== -1) {
        const read_at = this.announcements[findIndex].read_at ? null : 'read'
        this.announcements[findIndex].read_at = read_at
        const currentCount = this.unreadAnnouncements
        this.unreadAnnouncements = this.announcements[findIndex].read_at
          ? currentCount - 1
          : currentCount + 1
      }
      try {
        const { data } = await this.$axios.$post(
          `digital/announcement/read-unread`,
          {
            notification_id: aId,
          }
        )
        // this.unreadNotifications = data.total_unread_notification
        console.log(data)
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    async readAllAnnouncements() {
      this.announcements = this.announcements.map((data) => {
        return { ...data, read_at: 'read' }
      })
      this.unreadAnnouncements = 0
      try {
        await this.$axios.$get(`digital/announcement/mark-all-read`)
        // this.unreadNotifications = data.total_unread_notification
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    announcementClicked(anno) {
      this.clickedAnnouncementDetail = anno
      this.readAnnouncement(anno.id)
      // this.closeList()
    },
    htmlToText(string) {
      return string.replace(/<[^>]+>/g, '')
    },
  },
}
</script>

<style scoped></style>
