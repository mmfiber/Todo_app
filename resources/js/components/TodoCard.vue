<template lang="pug">
  v-card.card(:color="cardColor" :class="{whiteText: isWhiteText}")
    v-card-title {{ data.title }}
    v-card-text
      .content {{ data.content }}
      .deadline {{ data.deadline }}
    v-card-actions(v-show="btn_text")
      v-btn(text @click="submit") {{ btn_text }}

    .btn_container.pa-3
      v-btn(text icon  @click="editDialog=true")
        v-icon(x-small) fa-edit
      v-btn(text icon  @click="delDialog=true")
        v-icon(x-small) fa-trash-alt

    Dialog(v-model="editDialog" title="Are you sure delete this?"
        btnText="delete" btnColorClass="error" @cancel="cancel" @submit="del")
      .title {{ data.title }}
      .content {{ data.content }}
      .deadline {{ data.deadline }}

    Dialog(v-model="delDialog" title="Are you sure delete this?"
        btnText="delete" btnColorClass="error" @cancel="cancel" @submit="del")
      .title {{ data.title }}
      .content {{ data.content }}
      .deadline {{ data.deadline }}
</template>

<style scoped>
  .card{
    position: relative;
  }
  .btn_container{
    position: absolute;
    top: 0;
    right: 0;
  }
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
import Dialog from"../components/Dialog.vue"

export default {
  components: {
    Dialog,
  },
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
      delDialog: false,
      editDialog: false,
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
      this.delDialog = false
      this.getCardColor()
    },
    async del() {
      await this.$emit('edit', this.data.id)
      this.editDialog = false
      this.getCardColor()
    },
    cancel() {
      this.delDialog = false
      this.editDialog = false
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