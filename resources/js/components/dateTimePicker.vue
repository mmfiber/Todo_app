<template lang="pug">
  v-container
    v-row
      v-text-field(label="Due date" v-model="datetime" required
          @click="showDatetimePicker = true")
    v-row(v-show="showDatetimePicker").justify-centerd.slide
      v-tabs(left grow)
        v-tab(href="#tab-1") 
          v-icon fa-calendar-day
        v-tab(href="#tab-2")
          v-icon fa-clock

        v-tab-item(value="tab-1")
          v-date-picker(v-model="date" landscape full-width)

        v-tab-item(value="tab-2")
          v-time-picker(v-model="time" landscape full-width)

</template>

<style scoped>
.v-picker.v-card{
  box-shadow: none;
}
.v-picker:first-child{
  border-radius: 0 !important;
}
.slide{
  transform-origin: top; 
  animation: slidein .3s ease-in;
}
@keyframes slidein {
  from {
    transform: scaleY(0);
    opacity: 0;
    }
  to {
    transform: scaleY(1);
    opacity: 1;
    }
}
</style>
<script>
export default {
  props: {
    tab1: String,
    tab2: String,
    initDatetime: {type: String , default: ""},
  },
  data() {
    return {
      date: "",
      time: "",
      showDatetimePicker: false
    }
  },
  computed: {
    datetime() {
      if ( this.initDatetime && !this.date && !this.time ) {
        return this.initDatetime
      } else {
        return !this.date && !this.time ? null : this.date + " " + this.time
      }
    }
  },
  methods: {
    initDateAndTime() {
      this.date = null
      this.time = null
      this.showDatetimePicker = false
    }
  }
}
</script>