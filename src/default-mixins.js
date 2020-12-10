export const defaultMixins = {
  beforeCreate () {

  },
  created () {
    if (undefined === this['$t']) {
      this.$t = (...params) => params[0] || '';
    }
  }
}
