export const state = () => ({
  beers: [],
  beersIsLoading: false,
  page: 1,
  isBeerEnd: false
})

export const getters = {
  beers: state => state.beers.map(beer => ({
    id: beer.id,
    name: beer.name,
    img: beer.image_url,
    description: beer.description,
    brewersTips: beer.brewers_tips
  })),
  beersIsLoading: state => state.beersIsLoading,
  isBeerEnd: state => state.isBeerEnd
}

export const mutations = {
  setBeers (state, data) {
    state.beers = [...state.beers, ...data]
  },

  setBeersIsLoading (state, value) {
    state.beersIsLoading = value
  },

  setNextPage (state) {
    state.page += 1
  },

  setIsBeerEnd (state, value) {
    state.isBeerEnd = value
  },

  editBeer (state, beer) {
    const index = state.beers.findIndex(({ id }) => beer.id === id)

    this._vm.$set(state.beers, index, { ...state.beers[index], ...beer })
  },

  deleteBeer (state, id) {
    state.beers = state.beers.filter(beer => beer.id !== id)
  }
}

export const actions = {
  async fetchBeers ({ state: { page }, commit }) {
    commit('setBeersIsLoading', true)

    const beers = await this.$axios.$get('https://api.punkapi.com/v2/beers', {
      params: {
        limit: 25,
        page
      }
    })

    commit('setBeersIsLoading', false)

    if (!beers.length) {
      commit('setIsBeerEnd', true)
      return
    }

    commit('setBeers', beers)
  }
}
