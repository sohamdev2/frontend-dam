<template>
  <input
    class="form-control"
    name="daterange"
    :value="value"
    :placeholder="placeholder"
    type="text"
    :style="{ color: textColor }"
    readonly
  />
</template>

<script>
export default {
  name: 'DateRangePicker',
  props: {
    startDate: { type: [String, Date], default: null },
    endDate: { type: [String, Date], default: null },
    format: { type: String, default: 'YYYY-MM-DD' },
    noConditionalFormating: { type: Boolean, default: false },
    drops: { type: String, default: null },
    opens: { type: String, default: 'right' },
    placeholder: { type: String, default: 'No Date selected' },
    parent: { type: String, default: '.daterange-loop' },
    noColor: { type: Boolean, default: false },
  },
  computed: {
    textColor() {
      if (!this.startDate || !this.endDate || this.noColor) return ''

      switch (this.value) {
        case 'Today':
        case 'Tomorrow':
          return '#08b505 ' // #00bf9c
        case 'Yesterday':
          return '#ed4758'
      }

      const data = this.getDateObject()
      if (data) {
        const { normEndDate } = data
        if (new Date(normEndDate).getTime() < Date.now()) return '#ed4758'
      }

      return '#555' // #555 #6f7782
    },
    value() {
      if (!this.startDate || !this.endDate) return ''

      const data = this.getDateObject()
      if (!data) return ''

      const { normEndDate, normStartDate, mStartDate, mEndDate } = data

      if (this.noConditionalFormating) {
        return `${this.$moment(mStartDate).format(
          this.format
        )} - ${this.$moment(mEndDate).format(this.format)}`
      }

      if (normEndDate === normStartDate)
        return `${mStartDate.calendar(new Date(), {
          sameDay: '[Today]',
          nextDay: '[Tomorrow]',
          nextWeek: 'dddd',
          lastDay: '[Yesterday]',
          lastWeek: this.format,
          sameElse: this.format,
        })}`

      if (
        mStartDate.format('YYYY') === mEndDate.format('YYYY') &&
        mStartDate.format('YYYY') === this.$moment().format('YYYY')
      ) {
        if (mStartDate.format('MM') === mEndDate.format('MM')) {
          return `${this.$moment(mStartDate).format('D')} - ${this.$moment(
            mEndDate
          ).format('D MMM')}`
        } else {
          return `${this.$moment(mStartDate).format('D MMM')} - ${this.$moment(
            mEndDate
          ).format('D MMM')}`
        }
      }

      return `${this.$moment(mStartDate).format('D MMM YYYY')} - ${this.$moment(
        mEndDate
      ).format('D MMM YYYY')}`
    },
  },
  watch: {
    startDate(val) {
      this.setDate('startDate')
    },
    endDate(val) {
      this.setDate('endDate')
    },
  },
  mounted() {
    this.$nextTick(() => this.init())
  },
  updated() {
    this.$nextTick(() => this.init())
  },
  methods: {
    getValueText() {
      return this.value
    },
    getDateObject() {
      if (!this.startDate || !this.endDate) return null

      let normStartDate = this.startDate
      let normEndDate = this.endDate

      if (typeof normStartDate === 'string')
        normStartDate = this.$moment(normStartDate).local().format('YYYY-MM-DD')
      if (typeof normEndDate === 'string')
        normEndDate = this.$moment(normEndDate).local().format('YYYY-MM-DD')

      if (
        new Date(normStartDate) === 'Invalid Date' ||
        new Date(normEndDate) === 'Invalid Date'
      )
        return null

      const mStartDate = this.$moment(normStartDate)
      const mEndDate = this.$moment(normEndDate)

      return {
        normEndDate,
        normStartDate,
        mStartDate,
        mEndDate,
      }
    },
    init() {
      const dateRangePicker = window.$(this.$el)

      dateRangePicker
        .daterangepicker({
          opens: this.opens,
          drops: this.drops || 'down',
          parentEl: this.parent,
          autoUpdateInput: false,
          startDate: new Date(),
          endDate: new Date(),
          autoApply: true,
          locale: {
            cancelLabel: 'Clear',
            // format: 'YYYY-MM-DD'
            format: 'YYYY-MM-DD',
          },
        })
        .on('apply.daterangepicker', (ev, picker) => {
          this.$emit('update:startDate', picker.startDate.format('YYYY-MM-DD'))
          this.$emit('update:endDate', picker.endDate.format('YYYY-MM-DD'))
          this.$emit('dateRangeUpdateDate', picker)
        })
        .on('show.daterangepicker', (ev, picker) => {
          if (!this.drops)
            if (
              picker.element.offset().top -
                window.$(window).scrollTop() +
                picker.container.outerHeight() >
              window.$(window).height()
            )
              picker.drops = 'up'
            else picker.drops = 'down'

          window.$(this.$el).addClass('show')
          picker.move()
        })
        .on('cancel.daterangepicker', (ev, picker) => {
          this.$emit('update:startDate', null)
          this.$emit('update:endDate', null)
          this.$emit('dateRangeUpdateDate', picker)
        })
        .on('hide.daterangepicker', (ev, picker) =>
          window.$(this.$el).removeClass('show')
        )

      this.$nextTick(() => {
        this.setDate('startDate')
        this.setDate('endDate')
      })
    },
    setDate(date) {
      if (!this.startDate || !this.endDate) return

      if (
        new Date(this.startDate) === 'Invalid Date' ||
        new Date(this.endDate) === 'Invalid Date'
      )
        return

      switch (date) {
        case 'startDate':
          window
            .$(this.$el)
            .data('daterangepicker')
            .setStartDate(
              this.$moment(this.startDate).local().format('YYYY-MM-DD')
            )
          break
        case 'endDate':
          window
            .$(this.$el)
            .data('daterangepicker')
            .setEndDate(this.$moment(this.endDate).local().format('YYYY-MM-DD'))
          break
        default:
          break
      }
    },
  },
}
</script>
