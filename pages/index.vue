<template>
  <div class="container">
    <div class="beer-list">
      <div
        v-for="(beer, idx) in beers"
        :key="idx"
      >
        <Card
          :beer="beer"
          @click-edit-button="_onClickEditButton"
          @click-delete-button="_onClickDeleteButton"
        />
      </div>
    </div>
    <el-button
      v-if="isShowButtonVisible"
      type="primary"
      @click="_handleShowNext"
    >
      {{ showButtonText }}
    </el-button>
    <dialog-beer-edit
      :visible.sync="dialogEditVisible"
      :beer="editableBeer"
      @edit-beer="_handleEditBeer"
    />
  </div>
</template>

<script>
import Card from '@/components/Card'
import DialogBeerEdit from '@/components/DialogBeerEdit'

export default {
  components: {
    Card,
    DialogBeerEdit
  },
  async fetch ({ store }) {
    await store.dispatch('beer/fetchBeers')
  },
  data: () => ({
    editableBeer: null,
    dialogEditVisible: false
  }),
  computed: {
    beers () {
      return this.$store.getters['beer/beers']
    },

    beersIsLoading () {
      return this.$store.getters['beer/beersIsLoading']
    },

    isBeerEnd () {
      return this.$store.getters['beer/isBeerEnd']
    },

    isShowButtonVisible () {
      if (!this.beers.length && this.beersIsLoading) {
        return false
      }

      return !this.isBeerEnd
    },

    showButtonText () {
      return this.beersIsLoading ? 'Loading' : 'Show Next'
    }
  },
  methods: {
    _onClickEditButton (beer) {
      this.editableBeer = { ...beer }
      this.dialogEditVisible = true
    },

    _onClickDeleteButton (id) {
      this.$store.commit('beer/deleteBeer', id)
    },

    _handleEditBeer (data) {
      this.$store.commit('beer/editBeer', data)
    },

    _handleShowNext () {
      if (!this.beersIsLoading) {
        this.$store.commit('beer/setNextPage')
        this.$store.dispatch('beer/fetchBeers')
      }
    }
  }
}
</script>

<style lang='sass'>
.container
  align-items: center
  display: flex
  flex-direction: column
  margin: 0 auto
  padding: 50px
.beer-list
  display: grid
  grid-template-columns: repeat(5, 330px)
  grid-gap: 20px
  margin-bottom: 40px
</style>
