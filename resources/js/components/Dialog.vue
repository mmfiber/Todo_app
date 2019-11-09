<template lang="pug">
  v-dialog(:value="dialog" @click:outside="cancel" max-width="600")
    v-card
      v-card-title {{ title }}
      v-card-text
        slot
      v-card-actions
        v-col(col=12 xs=6)
          v-btn.grey.lighten-4(text large @click="cancel") Cancel
        v-col(col=12 xs=6)
          v-btn(text large @click="submit" :class="btnColorClass") {{ btnText }}
</template>

<style scoped>
  .v-card__actions{
    padding: 0;
  }
  .v-card__actions .col{
    padding: 0;
  }
  .v-card__actions .col .v-btn{
    border-radius: 0;
    width: 100%
  }
</style>

<script>
export default {
  props: {
    value: Boolean,
    title: String,
    btnText: String,
    btnColorClass: String,
  },
  computed:{
    dialog() {
      return this.value
    }
  },
  methods: {
    submit() {
      this.$emit('submit')
    },
    cancel() {
      this.$emit('cancel')
    },
  }
}
</script>