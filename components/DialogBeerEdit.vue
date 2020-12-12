<template>
  <el-dialog
    title="Форма редактирования пива"
    :visible.sync="visible"
    :before-close="_close"
  >
    <el-form
      ref="form"
      hide-required-asterisk
      :model="form"
      :rules="rules"
    >
      <el-form-item
        prop="name"
        label="Название"
      >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item
        prop="description"
        label="Описание"
      >
        <el-input
          v-model="form.description"
          type="textarea"
          autosize
        />
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="disabledSave"
          type="success"
          @click="_handleSave"
        >
          Save
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import isEqual from 'lodash.isequal'

export default {
  name: 'DialogBeerEdit',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    beer: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    rules: {
      name: {
        trigger: 'change',
        validator: (rule, value, cb) => (value.trim().length > 0
          ? cb()
          : cb(new Error('Название не может быть пустой строкой'))
        )
      }
    },
    defaultForm: {
      name: '',
      description: ''
    },
    form: {
      name: '',
      description: ''
    }
  }),
  computed: {
    disabledSave () {
      return isEqual(this.defaultForm, this.form)
    }
  },
  watch: {
    beer () {
      const { name, description } = this.beer
      this.defaultForm = { name, description }
      this.form = { name, description }
    }
  },
  methods: {
    _close () {
      this.$emit('update:visible', false)
    },

    _handleSave () {
      this.$refs.form.validate()
        .then(() => {
          this.$emit('edit-beer', { ...this.form, id: this.beer.id })
          this._close()
        }).catch(() => {
          this.$message({
            message: 'Заполните форму',
            type: 'warning'
          })
        })
    }
  }
}
</script>
