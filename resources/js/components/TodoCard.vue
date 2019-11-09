<template lang="pug">
  v-card.card(:color="cardColor" :class="{whiteText: isWhiteText}")
    v-card-title {{ data.title }}
    v-card-text
      .content {{ data.content }}
      .deadline {{ data.deadline }}
    v-card-actions(v-show="btn_text")
      v-btn(text @click="dialog=true") delete
      v-btn(text @click="submit") {{ btn_text }}

    v-dialog(v-model="dialog" max-width="600")
      v-card
        v-card-title Are you sure to delete this?
        v-card-text
          .title {{ data.title }}
          .content {{ data.content }}
          .deadline {{ data.deadline }}
        v-card-actions
          v-col(col=12 xs=6)
            v-btn.grey.lighten-4(text large @click="cancel") Cancel
          v-col(col=12 xs=6)
            v-btn.error(text large @click="del") delete
</template>

<style scoped>
  .whiteText *{
    color: white !important;
  }
  .v-dialog .v-card__actions{
    padding: 0;
  }
  .v-dialog .v-card__actions .col{
    padding: 0;
  }
  .v-dialog .v-card__actions .col .v-btn{
    border-radius: 0;
    width: 100%
  }
</style>

<script>
export default {
  props: {
    data: Object,
    btn_text: {type: String, default:""},
    withCardColor: {type: Boolean, default: false},
  },
  data() {
    return {
      colors: {
        passed: "#E53935",
        dayBefore: "#FFD600",
        threeDaysBefore: "#B3E5FC",
        others: "#F5F5F5"
      },
      cardColor: "#F5F5F5",
      isWhiteText: false,
      dialog: false,
    }
  },
  mounted() {
    this.cardColor = this.getCardColor()
  },
  updated() {
    this.cardColor = this.getCardColor()
  },
  methods: {
    async submit() {
      await this.$emit('submit', this.data.id)
      this.getCardColor()
    },
    async del() {
      await this.$emit('delete', this.data.id)
      this.dialog = false
      this.getCardColor()
    },
    cancel() {
      this.dialog = false
    },
    getCardColor() {
      if (!this.withCardColor) return this.colors.others

      const now = new Date()
      const deadline = new Date(_.replace(this.data.deadline, ' ', 'T'))
      const leftDays = this.msToTime(deadline - now)

      if (leftDays < 0) {
        this.isWhiteText = true
        return this.colors.passed
      } else if (leftDays < 1) {
        this.isWhiteText = true
        return this.colors.dayBefore
      } else if (leftDays < 3) {
        this.isWhiteText = true
        return this.colors.threeDaysBefore
      } else {
        this.isWhiteText = false
        return this.colors.others
      }
    },
    msToTime(ms, mode="day") {
      const sec = Math.abs(ms) / 1000
      const min = sec / 60
      const hour = min / 60
      const day = hour / 24
      let ret = 0

      if (mode==="day") {
        ret = Math.floor(day)
      }

      return ms > 0 ? ret : ret * (-1)
    }
  }
}
</script>