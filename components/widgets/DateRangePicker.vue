<template>
  <input
    type="text"
    :placeholder="placeholder"
    :style="dateStyle"
    :class="classObj"
    data-lpignore="true"
  />
</template>

<script>
import flatpickr from 'flatpickr'
import moment from 'moment-timezone'
export default {
  name: 'DateRangePicker',
  props: {
    placeholder: {
      type: [String],
      default: 'Please select date',
    },
    displayFormat: {
      type: [String],
      default: 'MMM D, YYYY',
    },
    startDate: {
      type: [String, Date],
      default: null,
    },
    endDate: {
      type: [String, Date],
      default: null,
    },
    colorDate: {
      type: Boolean,
      default: false,
    },
    human: {
      type: Boolean,
      default: false,
    },
    customEvent: {
      type: Boolean,
      default: false,
    },
    disableDate: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default() {
        return []
      },
    },
    classObj: { type: [String, Object], default: null },
    disableMaxDate: { type: [Boolean], default: false },
  },
  data() {
    return {
      fp: null,
      defaultDateColor: '#393939',
      previousDateColor: 'red',
      sameOrNextDateColor: 'green',
      style: {},
      formattedDate: null,
      config: {
        wrap: false, // set wrap to true only when using 'input-group'
        altFormat: 'M	j, Y',
        altInput: false,
        dateFormat: 'Y-m-d',
        monthSelectorType: 'static',
        shorthandCurrentMonth: true,
        locale: {
          firstDayOfWeek: 1, // start week on Monday
        },
        formatDate: (date, format, locale) =>
          this.dateFormat(date, format, locale),
        onChange: (selectedDates, dateStr, instance) =>
          this.onChange(selectedDates, dateStr, instance),
      },
    }
  },
  computed: {
    dateStyle() {
      const date = this.formattedDate
      if (this.colorDate) {
        if (this.$moment(date).isBefore(this.$moment(), 'day'))
          return { color: this.previousDateColor }

        if (this.$moment(date).isSameOrAfter(this.$moment(), 'day'))
          return { color: this.sameOrNextDateColor }
      }

      return this.style
    },
  },
  watch: {
    startDate(newVal, OldVal) {
      this.fp.setDate([newVal, this.endDate])
    },
    endDate(newVal, OldVal) {
      this.formattedDate = newVal
      this.fp.setDate([this.startDate, newVal])
    },
    disableDate(newVal, oldVal) {
      if (newVal.length) this.fp.set('disable', newVal)
    },
  },
  mounted() {
    this.formattedDate = this.endDate
    this.fp = flatpickr(this.$el, this.config)
    this.fp.set('mode', 'range')
    this.fp.setDate([this.startDate, this.endDate])

    if (!this.disableMaxDate) {
      this.fp.set('maxDate', new Date())
    }

    if (this.disableDate.length) this.fp.set('disable', this.disableDate)
  },
  destroyed() {
    this.fp.destroy()
  },
  methods: {
    getValueText() {
      return this.$el.value
    },
    dateFormat(date, format, locale) {
      if (this.human) {
        return moment(date).calendar(null, {
          sameDay: '[Today]',
          nextDay: '[Tomorrow]',
          nextWeek: `${this.displayFormat}`,
          lastDay: '[Yesterday]',
          lastWeek: `${this.displayFormat}`,
          sameElse: `${this.displayFormat}`,
        })
      } else {
        return moment(date).format(`${this.displayFormat}`)
      }
    },
    onChange(selectedDates, dateStr, instance) {
      if (selectedDates[0] !== undefined && selectedDates[1] !== undefined) {
        const startDate = this.$moment(new Date(selectedDates[0]))
          .local()
          .format('YYYY-MM-DD')
        const endDate = this.$moment(new Date(selectedDates[1]))
          .local()
          .format('YYYY-MM-DD')
        this.formattedDate = endDate
        this.$emit('update:startDate', startDate)
        this.$emit('update:endDate', endDate)

        if (this.customEvent) this.$emit('dateChanged', { startDate, endDate })
      }
    },
  },
}
</script>

<style scoped></style>
