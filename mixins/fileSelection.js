export default {
  data() {
    return {
      selectedFiles: [],
      selectedFolders: [],
    }
  },
  computed: {
    selection() {
      return this.selectedFiles.reduce((obj, { id }) => {
        obj[id] = true
        return obj
      }, {})
    },
    folderSelection() {
      return this.selectedFolders.reduce((obj, { id }) => {
        obj[id] = true
        return obj
      }, {})
    },
  },
  methods: {
    selectNone() {
      this.selectedFiles = []
      this.selectedFolders = []
    },
    toggleFolderSelection(folder) {
      const index = this.selectedFolders.findIndex(({ id }) => folder.id === id)
      if (~index) this.selectedFolders.splice(index, 1)
      else this.selectedFolders.push(folder)
    },
    toggleSelection(file) {
      const index = this.selectedFiles.findIndex(({ id }) => file.id === id)
      if (~index) this.selectedFiles.splice(index, 1)
      else this.selectedFiles.push(file)
    },
  },
}
