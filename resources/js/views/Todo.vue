<template lang="pug">
  BaseLayout(tab1="Todo" tab2="Done")

    template(v-slot:tab1)
      v-row.justify-center
        v-col(col=12 xs=12 md=8)
          v-btn.mt-3.mr-3.grey.lighten-4(@click.stop="dialog = true" rounded) 
            v-icon(x-small) fa-plus
            span.ml-3 Create
          template(v-for="t in todo")
            TodoCard.mt-3(:data="t" withCardColor=true btn_text="Done"
                @changeState="changeState" @edit="editToDo" @delete="del")

      Dialog(v-model="dialog" title="Create ToDo"
          btnText="Create" btnColorClass="primary" @cancel="cancel" @submit="create")
        v-text-field(label="Title" v-model="newTodo.title" required)
        v-text-field(label="Content" v-model="newTodo.content" required)
        dateTimePicker(ref="datetime")

    template(v-slot:tab2)
      v-row.justify-center
        v-col(col=12 xs=12 md=8)
          template(v-for="d in done")
            TodoCard.mt-3(:data="d" btn_text="ToDo"
                @changeState="changeState" @edit="editToDo" @delete="del")

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
import _ from 'lodash'
import BaseLayout from"../components/BaseLayout.vue"
import dateTimePicker from"../components/dateTimePicker.vue"
import TodoCard from"../components/TodoCard.vue"
import Dialog from"../components/Dialog.vue"

export default {
  components: {
    BaseLayout,
    dateTimePicker,
    TodoCard,
    Dialog,
  },
  data() {
    return {
      user: this.$store.state.auth.user,
      dialog: false,
      newTodo: {
        title: "",
        content: "",
        deadline: null
      }
    }
  },
  computed: {
    todo() {
      return this.$store.state.auth.tasks.todo
    },
    done() {
      return this.$store.state.auth.tasks.done
    },
  },
  methods: {
    async editToDo(todo_data) {
      await this.$store.dispatch('auth/edit', _.assign(
          this.user, {todo: todo_data}
        ))
    },
    async changeState(todo_id) {
      await this.$store.dispatch('auth/changeState', _.assign(
          this.user, {todo_id: todo_id}
        ))
    },
    async del(todo_id) {
      await this.$store.dispatch('auth/delete', _.assign(
          this.user, {todo_id: todo_id}
        ))
    },
    async create() {
      this.newTodo.deadline = this.$refs.datetime.datetime
      await this.$store.dispatch('auth/createTodo', _.assign(
          this.user, {todo: this.newTodo}
        ))
      this.dialog = false
      this.initNewTodo()
    },
    cancel() {
      this.dialog = false
      this.initNewTodo()
    },
    initNewTodo() {
      this.newTodo.title = ""
      this.newTodo.content = ""
      this.$refs.datetime.initDateAndTime()
    }
  }
}
</script>