<template>
  <li>
    <component
      :is="props.is"
      v-bind="props"
      :class="{
        active: folder.id == selection,
        disabled: !multiple && _disabled,
        'has-child': hasSubFolder,
      }"
      v-on="listeners"
    >
      {{ folder.folder_name || folder.category_name }}
    </component>
    <!-- <template v-if="hasSubFolder">
      <i
        v-if="hasSubFolder"
        class="menu-expand"
        @click="expanded = !expanded"
      ></i>
      <transition-group class="sub-menu" name="slide-up" tag="ul">
        <div v-if="loading" key="loader" class="text-center">
          <SpinLoading />
        </div>
        <FolderItem
          v-for="(subFolder, i) in sortedFolders"
          :key="subFolder.id"
          :style="{ transitionDelay: `${(i % 12) * 50}ms` }"
          :folder="subFolder"
        />
      </transition-group>
    </template> -->
  </li>
</template>

<script>
export default {
  name: 'FolderItem',
  props: {
    folder: { type: Object, required: true },
    selectionMode: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    selection: { type: [String, Number], default: null },
    routeFolder: { type: [String, Number], default: null },
    disabled: { type: Boolean, default: null },
    multipleSelection: { type: Array, default: () => [] },
  },
  computed: {
    _disabled() {
      return !this.multiple && this.disabled
    },
    hasSubFolder() {
      return this.folder.sub_category_count
    },
    checked() {
      return !!this.multipleSelection.find((el) => el === this.folder.id)
    },
    workspaceId() {
      return this.$getWorkspaceId()
    },
    props() {
      const props = {
        is: this.selectionMode || this.multiple ? 'a' : 'nuxt-link',
      }

      if (!this.selectionMode && !this.multiple)
        props.to = {
          name: 'brand_name-folders',
          params: { brand_name: this.$getBrandName() },
          hash: `#${this.folder.id}`,
        }

      return props
    },
    listeners() {
      const listeners = { ...this.$listeners }

      if (this.selectionMode)
        listeners.click = function (ev) {
          if (this.hasSubFolder) this.$emit('click', ev)
          if (this.disabled) return

          this.$emit(
            'update:selection',
            this.hasSubFolder
              ? this.folder.id
              : this.folder.id === this.selection
              ? null
              : this.folder.id // toggle selection
          )
          this.$emit('click', ev)
        }.bind(this)
      else if (this.multiple) {
        listeners.click = function (ev) {
          if (!this.hasSubFolder) this.$refs.checkbox.click()

          this.$emit('click', ev)
        }.bind(this)
      }

      return listeners
    },
  },
}
</script>
