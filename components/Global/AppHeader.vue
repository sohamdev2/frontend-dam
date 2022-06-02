<template>
  <header class="header-sec row no-gutters app-header">
    <div class="main-logo col">
      <nuxt-link :to="`/${$getBrandName()}`">
        <img v-if="userLogo" :src="userLogo" alt="Logo" />
        <h2 v-else>{{ $brandName() }}</h2>
      </nuxt-link>
    </div>
    <div class="main-menu col-7">
      <component :is="`style`" v-html="css"></component>
      <ul class="header-nav">
        <li
          v-for="link in headerLinks"
          :key="link.name"
          :class="{ active: $route.hash == link.tagName ? true : false }"
        >
          <a
            :id="link.name"
            href="javascript:void(0)"
            @click="changeCategory(link.to)"
            ><span>{{ link.name }}</span>
            <p class="mb0" v-html="link.imageUrl"></p
          ></a>
        </li>
      </ul>
    </div>
    <div class="col d-flex align-items-center justify-content-end">
      <div class="dropdown mycollection">
        <button
          type="button"
          class="dropdown-toggle collection-button"
          data-toggle="dropdown"
        >
          <svg
            id="Layer_1"
            class="collection-icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 14 14"
            xml:space="preserve"
          >
            <desc>Created with Sketch.</desc>
            <g id="Phased-Approach">
              <g id="icon_boards">
                <rect
                  id="Rectangle-path"
                  class="fill-color"
                  width="11"
                  height="11"
                ></rect>
                <polygon
                  id="Shape"
                  class="fill-color"
                  points="14,14 3,14 3,11.9 12,11.9 12,3 14,3"
                ></polygon>
              </g>
            </g>
          </svg>
          <span>Collection</span>
          <svg
            id="Layer_1"
            class="arrow-down-icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xml:space="preserve"
          >
            <g id="Group_4477" transform="translate(-871 -467)">
              <rect
                id="Rectangle_3015"
                x="871"
                y="467"
                class="fill-hide"
                width="18"
                height="18"
              ></rect>
              <g
                id="Icon_feather-chevron-down-3"
                transform="translate(506.256 149.451)"
              >
                <path
                  id="Path_3435"
                  class="fill-color"
                  d="M373.7,330.8c-0.2,0-0.4-0.1-0.5-0.2l-7-7c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1,0l6.5,6.5l6.5-6.5c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1l-7,7C374.1,330.7,373.9,330.8,373.7,330.8z"
                ></path>
              </g>
            </g>
          </svg>
        </button>
        <div
          v-if="collectionList.length === 0"
          ref="collectionDropdown"
          class="dropdown-menu"
        >
          <span>Recent Collection</span>
          <p>No collection available.</p>
        </div>
        <div v-else ref="collectionDropdown" class="dropdown-menu">
          <span>Recent Collection</span>
          <ul class="collection-folder">
            <li v-for="collection in collectionList" :key="collection.id">
              <nuxt-link
                class="dropdown-item"
                :to="{
                  name: 'brand_name-collection-id',
                  params: {
                    brand_name: $getBrandName(),
                    id: collection.id,
                  },
                }"
              >
                <span class="collection-title">{{ collection.name }}</span>
                <span class="label">{{ collection.assets_count }}</span>
              </nuxt-link>
            </li>
          </ul>
          <div class="rectangle"></div>
          <ul class="collection">
            <li>
              <nuxt-link
                :to="{
                  name: 'brand_name-collection',
                  params: { brand_name: $getBrandName() },
                }"
                class="dropdown-item"
              >
                View all Collection
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <DamAnnouncementNotification v-if="!user.is_backend_user" />
      <div class="dropdown user-dropdown">
        <a
          id="profileDropdown"
          class="dropdown-toggle"
          href="javascript:void(0);"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span>{{ user.name || user.email }}</span>
          <svg
            id="Layer_1"
            class="arrow-down-icon user-dropdown-icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xml:space="preserve"
          >
            <g id="Group_4477" transform="translate(-871 -467)">
              <rect
                id="Rectangle_3015"
                x="871"
                y="467"
                class="fill-hide"
                width="18"
                height="18"
              ></rect>
              <g
                id="Icon_feather-chevron-down-3"
                transform="translate(506.256 149.451)"
              >
                <path
                  id="Path_3435"
                  class="fill-color"
                  d="M373.7,330.8c-0.2,0-0.4-0.1-0.5-0.2l-7-7c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1,0l6.5,6.5l6.5-6.5c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1l-7,7C374.1,330.7,373.9,330.8,373.7,330.8z"
                ></path>
              </g>
            </g>
          </svg>
          <div
            v-if="user.profile_image"
            :title="user.name"
            class="profile-bg"
            :style="{
              backgroundImage: `url(${user.profile_image})`,
            }"
          ></div>
          <div v-else class="profile-char" :title="user.name">
            {{ (user.name || user.email || '').slice(0, 2) }}
          </div>
        </a>
        <div ref="userDropdown" class="dropdown-menu">
          <ul class="workspace-menu customscrollbar">
            <li
              v-for="instance in accessibleIntances"
              :key="instance.instance_id"
            >
              <a
                class="dropdown-item"
                href="javascript:void(0);"
                @click="changeInstance(instance)"
                ><svg
                  id="Layer_1"
                  class="workspace-icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 17.5 13.9"
                  xml:space="preserve"
                >
                  <g id="Group_5023" transform="translate(-67.509 -979.322)">
                    <g id="Rectangle_933">
                      <path
                        id="Path_3572"
                        class="fill-color"
                        d="M85,993.3H67.5v-11.2H85V993.3z M69,991.8h14.5v-8.2H69V991.8z"
                      />
                    </g>
                    <g id="Line_131">
                      <path
                        id="Path_3573"
                        class="fill-color"
                        d="M80.4,993.3c-0.4,0-0.8-0.3-0.8-0.8v-9.7c0-0.4,0.3-0.8,0.8-0.8s0.8,0.3,0.8,0.8v9.7C81.2,992.9,80.8,993.3,80.4,993.3z"
                      />
                    </g>
                    <g id="Line_132">
                      <path
                        id="Path_3574"
                        class="fill-color"
                        d="M72.1,993.3c-0.4,0-0.8-0.3-0.8-0.8v-9.7c0-0.4,0.3-0.8,0.8-0.8s0.8,0.3,0.8,0.8v9.7C72.8,992.9,72.5,993.3,72.1,993.3z"
                      />
                    </g>
                    <g id="Rectangle_934">
                      <path
                        id="Path_3575"
                        class="fill-color"
                        d="M80,983.6h-7.5v-4.3H80V983.6z M74,982.1h4.5v-1.3H74L74,982.1z"
                      />
                    </g>
                  </g></svg
                ><span>{{ instance.brand_name }}</span>
                <svg
                  v-if="
                    parseInt(auth.instance_id) ===
                    parseInt(instance.instance_id)
                  "
                  id="Layer_1"
                  class="check-workspace"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 18 18"
                  xml:space="preserve"
                >
                  <g id="check-box" transform="translate(421.452 87.185)">
                    <circle
                      id="Ellipse_98"
                      class="fill-color"
                      cx="-412.5"
                      cy="-78.2"
                      r="9"
                    />
                    <path
                      id="Path_2644"
                      class="st1"
                      d="M-408.6-80.7l-5.1,5.1l-2.6-2.6"
                    />
                  </g>
                </svg>
              </a>
            </li>
          </ul>
          <ul class="user-menu">
            <li>
              <nuxt-link
                v-if="!user.is_backend_user"
                class="dropdown-item"
                to="/profile"
              >
                <svg
                  id="Layer_1"
                  class="user-icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 17.7 18"
                  xml:space="preserve"
                >
                  <g id="Group_4410" transform="translate(-954.8 -658.583)">
                    <g id="Path_3236">
                      <path
                        id="Path_3516"
                        class="fill-color"
                        d="M971.8,676.6L971.8,676.6c-0.4,0-0.8-0.3-0.8-0.8v-1.3c0-1.8-1.5-3.3-3.3-3.3h-8.1c-1.8,0-3.3,1.5-3.3,3.3v1.3c0,0.4-0.3,0.8-0.8,0.8l0,0c-0.4,0-0.8-0.3-0.8-0.8v-1.3c0-2.7,2.2-4.8,4.8-4.8c0,0,0,0,0,0h8.1c2.7,0,4.8,2.2,4.8,4.8c0,0,0,0,0,0v1.3C972.5,676.2,972.2,676.6,971.8,676.6z"
                      ></path>
                    </g>
                    <g id="Path_3237">
                      <path
                        id="Path_3517"
                        class="fill-color"
                        d="M963.7,668.2c-2.7,0-4.8-2.2-4.8-4.8c0-2.7,2.2-4.8,4.8-4.8c2.7,0,4.8,2.2,4.8,4.8C968.5,666.1,966.3,668.2,963.7,668.2z M963.7,660.1c-1.8,0-3.3,1.5-3.3,3.3c0,1.8,1.5,3.3,3.3,3.3c1.8,0,3.3-1.5,3.3-3.3l0,0C967,661.6,965.5,660.1,963.7,660.1C963.7,660.1,963.7,660.1,963.7,660.1L963.7,660.1z"
                      ></path>
                    </g>
                  </g></svg
                >User Profile
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                v-if="!user.is_backend_user"
                class="dropdown-item"
                :to="{
                  name: 'brand_name-shared-urls',
                  params: { brand_name: this.$getBrandName() },
                }"
              >
                <svg
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
                >Shared URLs
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                v-if="!user.is_backend_user"
                class="dropdown-item"
                :to="{
                  name: 'brand_name-support',
                  params: { brand_name: this.$getBrandName() },
                }"
              >
                <svg
                  id="Layer_1"
                  class="support-icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 18 18"
                  xml:space="preserve"
                >
                  <path
                    id="Path_3579"
                    class="fill-color"
                    d="M9,18c-5,0-9-4-9-9c0-5,4-9,9-9s9,4,9,9c0,2.4-0.9,4.7-2.6,6.4C13.7,17.1,11.4,18,9,18zM4.2,14.8c2.8,2.3,6.8,2.3,9.5,0l-2.1-2.1c-1.6,1.2-3.8,1.2-5.4,0L4.2,14.8z M3.2,4.2C0.9,7,0.9,11,3.2,13.8l2.1-2.1c-1.2-1.6-1.2-3.8,0-5.4L3.2,4.2z M14.8,13.8c2.3-2.8,2.3-6.8,0-9.5l-2.1,2.1c1.2,1.6,1.2,3.8,0,5.4L14.8,13.8z M9,5.9C7.3,5.9,5.9,7.3,5.9,9c0,1.7,1.4,3.1,3.1,3.1c1.7,0,3.1-1.4,3.1-3.1C12.1,7.3,10.7,5.9,9,5.9z M9,4.4c1,0,1.9,0.3,2.7,0.9l2.1-2.1C11,0.9,7,0.9,4.2,3.2l2.1,2.1C7.1,4.7,8,4.4,9,4.4z"
                  ></path></svg
                >Support
              </nuxt-link>
            </li>
            <li>
              <a class="dropdown-item" @click="$logout">
                <svg
                  id="Layer_1"
                  class="logout-icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 18 18"
                  xml:space="preserve"
                >
                  <g
                    id="Group_4491"
                    transform="translate(815.334 -375.358) rotate(90)"
                  >
                    <path
                      id="Path_3552"
                      class="fill-color"
                      d="M378,815.3c-1.4,0-2.6-1.2-2.6-2.6v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8v3.7c0,0.6,0.5,1,1,1h12.8c0.6,0,1-0.5,1-1v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.7,0.3,0.8,0.8v3.7c0,1.4-1.2,2.6-2.6,2.6H378z"
                    ></path>
                    <g id="Group_4435">
                      <path
                        id="Path_3553"
                        class="fill-color"
                        d="M379.2,802.5c-0.3,0.3-0.3,0.8,0,1.1c0.3,0.3,0.8,0.3,1.1,0l4-4l4,4c0.3,0.3,0.8,0.3,1.1,0c0.3-0.3,0.3-0.8,0-1.1l0,0l-5.1-5.1L379.2,802.5z"
                      ></path>
                      <path
                        id="Path_3554"
                        class="fill-color"
                        d="M384.4,797.7c-0.4,0-0.8,0.4-0.8,0.8v11c0,0.4,0.4,0.8,0.8,0.8c0.4,0,0.8-0.4,0.8-0.8v-11C385.1,798,384.8,797.7,384.4,797.7z"
                      ></path>
                    </g>
                  </g></svg
                >Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      headerLinks: [
        {
          name: 'Images',
          to: {
            name: 'brand_name-folders',
            params: { brand_name: this.$getBrandName() },
            hash: '#image',
          },
          imageUrl:
            '<svg class="images-icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 21.6 18" xml:space="preserve"><path id="Path_3187" class="fill-color" d="M20.5,3.6l-4-0.2l-0.2-2.5c-0.1-0.5-0.6-0.9-1.1-0.9h0L0.9,1.1c-0.5,0-1,0.5-0.9,1c0,0,0,0,0,0v0l1,11c0.1,0.5,0.6,0.9,1.1,0.9L2.8,14l-0.1,2.1c0,0.6,0.5,1.1,1.1,1.1c0,0,0,0,0,0h0L19.7,18c0.6,0.1,1.1-0.4,1.2-1v0l0.7-12.3C21.6,4.1,21.1,3.6,20.5,3.6C20.5,3.6,20.5,3.6,20.5,3.6z M3.4,3.8l-0.3,6.3l-0.8,1.2L1.4,3v0c0-0.2,0.2-0.4,0.5-0.4l12.6-1c0.2,0,0.5,0.1,0.5,0.4c0,0,0,0,0,0s0,0,0,0l0.1,1.4L4.6,2.8C4,2.8,3.5,3.2,3.4,3.8L3.4,3.8z M19.5,14.9l-4.1-4.7l-1.8,1.6l-3.3-3.8l-5.9,6.1l0.5-9.3v0c0.1-0.3,0.3-0.4,0.6-0.4l14,0.7c0.3,0,0.5,0.2,0.5,0.5c0,0,0,0,0,0L19.5,14.9z"></path></svg>',
          tagName: '#image',
        },
        {
          name: 'Documents',
          to: {
            name: 'brand_name-folders',
            params: { brand_name: this.$getBrandName() },
            hash: '#application',
          },
          imageUrl:
            '<svg class="document-icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16.2 18" xml:space="preserve"><g id="Group_5340" transform="translate(-207.348 -290.319)"><path id="Path_3450" class="fill-color" d="M211.9,308.3c-0.9,0-1.6-0.7-1.6-1.6v-12c0-0.9,0.7-1.5,1.6-1.6h5.9c0.6,0.1,1.3,0.3,1.7,0.8c1.3,0.9,2.4,2,3.3,3.2c0.4,0.5,0.7,1,0.8,1.7v7.9c0,0.9-0.7,1.5-1.6,1.6L211.9,308.3z M211.9,294.6c-0.1,0-0.1,0-0.1,0.1v12c0,0.1,0.1,0.1,0.1,0.1H222c0.1,0,0.1,0,0.1-0.1V299l-3.8,0c-0.4,0-0.7-0.3-0.7-0.7v-3.7L211.9,294.6z M219,297.6l2.1,0c-0.3-0.4-0.6-0.8-1-1.1c-0.4-0.3-0.7-0.7-1.1-1l0,0L219,297.6z"></path><path id="Path_3451" class="fill-color" d="M208.6,306.1c-0.7-0.1-1.3-0.8-1.3-1.5v-12.7c0-0.9,0.7-1.6,1.6-1.6h6.5c0.6,0.1,1.2,0.3,1.7,0.8c0.2,0.1,0.3,0.2,0.5,0.4l0.4,0.3l-9.2,0c-0.1,0-0.1,0-0.1,0.1v14.2L208.6,306.1z"></path></g></svg>',
          tagName: '#application',
        },
        {
          name: 'Audios',
          to: {
            name: 'brand_name-folders',
            params: { brand_name: this.$getBrandName() },
            hash: '#audio',
          },
          imageUrl:
            '<svg class="audio-icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 18 18" xml:space="preserve"><g id="Group_4370" transform="translate(-162.467 -290.319)"><g id="Group_4365"><path id="Path_3445" class="fill-color" d="M163.2,302.6c-0.4,0-0.7-0.3-0.7-0.8v-5c0-0.4,0.3-0.7,0.7-0.7s0.7,0.3,0.7,0.7c0,0,0,0,0,0v5C163.9,302.2,163.6,302.6,163.2,302.6z"></path></g><g id="Group_4366"><path id="Path_3446" class="fill-color" d="M167.3,306.1c-0.4,0-0.7-0.3-0.7-0.8v-12c0-0.4,0.3-0.7,0.7-0.7s0.7,0.3,0.7,0.7c0,0,0,0,0,0v12C168.1,305.7,167.7,306.1,167.3,306.1z"></path></g><g id="Group_4367"><path id="Path_3447" class="fill-color" d="M171.5,308.3c-0.4,0-0.7-0.3-0.7-0.7V291c0-0.4,0.4-0.7,0.8-0.7c0.4,0,0.7,0.3,0.7,0.7v16.6C172.2,308,171.9,308.3,171.5,308.3z"></path></g><g id="Group_4368"><path id="Path_3448" class="fill-color" d="M175.6,304.6c-0.4,0-0.7-0.3-0.7-0.8v-9c0-0.4,0.3-0.7,0.7-0.7s0.7,0.3,0.7,0.7c0,0,0,0,0,0v9C176.3,304.2,176,304.6,175.6,304.6z"></path></g><g id="Group_4369"><path id="Path_3449" class="fill-color" d="M179.7,301.6c-0.4,0-0.7-0.3-0.7-0.8v-3c0-0.4,0.3-0.7,0.7-0.7s0.7,0.3,0.7,0.7c0,0,0,0,0,0v3C180.5,301.2,180.1,301.6,179.7,301.6z"></path></g></g></svg>',
          tagName: '#audio',
        },
        {
          name: 'Videos',
          to: {
            name: 'brand_name-folders',
            params: { brand_name: this.$getBrandName() },
            hash: '#video',
          },
          imageUrl:
            '<svg class="video-icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 15.7 18" xml:space="preserve"><path id="Icon_awesome-play" class="fill-color" d="M1.7,1.5c0,0,0.1,0,0.1,0l12.4,7.3c0.1,0.1,0.1,0.2,0.1,0.3c0,0,0,0-0.1,0.1L1.8,16.5c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1-0.1c0,0-0.1-0.1-0.1-0.1V1.7c0,0,0-0.1,0-0.1C1.5,1.5,1.6,1.5,1.7,1.5 M1.7,0C0.7,0,0,0.8,0,1.7c0,0,0,0,0,0v14.6C0,17.2,0.7,18,1.7,18c0,0,0,0,0,0h0c0.3,0,0.6-0.1,0.9-0.2l12.4-7.3c0.8-0.5,1.1-1.5,0.6-2.3c-0.1-0.2-0.3-0.4-0.6-0.6L2.5,0.2C2.3,0.1,2,0,1.7,0L1.7,0z"></path></svg>',
          tagName: '#video',
        },
      ],
      auth: this.$_auth(),
      userLogo: null,
      collectionList: [],
      userModel: { ...this.$auth.user },
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
    accessibleIntances() {
      return this.$auth.user.accessibleInstances
    },
    css() {
      return `:root {
  --primary: ${this.$auth.user.branding.primary_color} !important;
  --secondary: ${this.$auth.user.branding.secondary_color} !important;
  --header-default: ${this.hex2rgba(
    this.$auth.user.branding.secondary_color,
    0.6
  )};
  --announcement-hover: ${this.hex2rgba(
    this.$auth.user.branding.primary_color,
    0.1
  )};
  --announcement: ${this.hex2rgba(
    this.$auth.user.branding.secondary_color,
    0.3
  )};
}`
    },
  },
  watch: {
    '$route.params'() {
      this.auth = this.$_auth()
    },
  },
  created() {
    this.loadCollection()
  },
  updated() {
    this.$nextTick(() => {
      window.$(this.$el).find('.dropdown-toggle').dropdown()
    })
  },
  mounted() {
    this.$nextTick(() => {
      window.$(this.$el).find('.dropdown-toggle').dropdown()
    })
    const workspace = this.$auth.user.accessibleInstances.find(
      ({ workspace_id }) =>
        parseInt(workspace_id) === parseInt(this.$getWorkspaceId())
    )
    this.userLogo = workspace.logo
  },
  methods: {
    hex2rgba(hex, code) {
      let c
      if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('')
        if (c.length === 3) {
          c = [c[0], c[0], c[1], c[1], c[2], c[2]]
        }
        c = '0x' + c.join('')
        return (
          'rgba(' +
          [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') +
          ',' +
          code +
          ')'
        )
      }
    },
    changeCategory(toData) {
      this.$emit('resetList')
      this.$router.push(toData)
    },
    async loadCollection() {
      const workspace = this.$getWorkspaceId()
      if (!workspace) {
        this.$logout()
      } else {
        await this.$axios
          .$get(`/digital/collection/get-all?url_workspace_id=${workspace}`)
          .then(({ data }) => {
            this.collectionList = data.splice(0, 4)
          })
      }
    },
    async changeInstance(instance) {
      this.auth = this.$_auth()

      const workspace = this.$auth.user.accessibleInstances.find(
        ({ workspace_id }) =>
          parseInt(workspace_id) === parseInt(instance.workspace_id)
      )
      // redirect then to the appropriate dashboard
      if (this.auth.is_domain === workspace.is_domain) {
        if (workspace.is_domain === 1) {
          await this.$logout()
          window.location.replace(
            'http://' + `${workspace.url}/${workspace.workspace_id}`
          )
        } else {
          const formData = new FormData()
          formData.append('id', this.user.id)
          formData.append('instance_id', instance.instance_id)
          formData.append('name', this.userModel.name)
          formData.append('phone', this.userModel.phone)

          await this.$axios
            .$post('digital/instance/update-user', formData)
            .then(async () => {
              this.$auth.fetchUser()
              await this.$setCurrentWorkspace(instance.workspace_id)
              this.userLogo = workspace.logo

              this.$router.replace(`/${instance.url}`)
            })
        }
      } else if (this.auth.is_domain !== workspace.is_domain) {
        if (workspace.is_domain === 1) {
          await this.$logout()
          window.location.replace(
            'http://' + `${workspace.url}/${workspace.workspace_id}`
          )
        } else {
          await this.$logout()
          window.location.replace(
            this.$config.baseUrl + '/' + `${workspace.url}`
          )
        }
      }
      // if (workspace.is_domain === 1) {
      //   window.location.replace(
      //     'https://' + `${workspace.url}/${workspace.workspace_id}`
      //   )
      // } else {
      //   this.$setCurrentWorkspace(instance.workspace_id)
      //   this.userLogo = workspace.logo

      //   this.$router.replace(`/${this.auth.url}`)
      // }
    },
  },
}
</script>

<style>
a.noClick {
  pointer-events: none;
  opacity: 0.6;
}
</style>
