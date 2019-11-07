<template lang="pug">
  v-container
    v-row.justify-center
      v-col(cols=12 sm=8)
        v-tabs(left grow)
          v-tab(href="#tab-1") {{ tab1 }}
          v-tab(href="#tab-2") {{ tab2 }}

          v-tab-item(value="tab-1")
            slot(name="tab1")
          v-tab-item(value="tab-2")
            slot(name="tab2")
</template>

<script>
export default {
  props: {
    tab1: String,
    tab2: String
  }
}
</script>