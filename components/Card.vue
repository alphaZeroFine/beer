<template>
  <el-card class="card">
    <div class="card__number">
      {{ beer.id }}
    </div>
    <div class="card__image-wrapper">
      <img
        :src="beer.img"
        :alt="beer.name"
        class="card__image"
      >
    </div>
    <div class="card__title">
      {{ beer.name }}
    </div>
    <div class="card__description">
      {{ beer.description }}
    </div>
    <div class="card__brewers">
      <div class="card__brewers-title">
        Brewers
      </div>
      {{ beer.brewersTips }}
    </div>
    <div class="card__buttons">
      <el-button
        type="primary"
        @click="_handleEdit"
      >
        Edit
      </el-button>
      <el-button
        type="danger"
        @click="_handleDelete"
      >
        Delete
      </el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'Card',
  props: {
    beer: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    _handleEdit () {
      this.$emit('click-edit-button', this.beer)
    },

    _handleDelete () {
      this.$emit('click-delete-button', this.beer.id)
    }
  }
}

</script>

<style lang='sass'>
.card
  word-break: break-word
  &__number
    font-size: 20px
    font-weight: bold
    margin-bottom: 10px
  &__image-wrapper
    display: flex
    justify-content: center
    margin-bottom: 20px
  &__image
    height: 200px
    object-fit: contain
    width: 200px
  &__title
    font-size: 24px
    font-weight: bold
    margin-bottom: 10px
  &__description
    font-size: 18px
    margin-bottom: 10px
  &__brewers
    background-color: #8cdc8c
    border-radius: 4px
    padding: 8px 10px
    margin-bottom: 10px
    &-title
      font-size: 18px
      font-weight: bold
      margin-bottom: 5px
  &__buttons
    display: flex
    justify-content: space-between
</style>
