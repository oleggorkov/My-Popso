const context = function () {
  let context = this;

  if (this.hasOwnProperty('store')){
    context = this.store;
  }

  if (this.hasOwnProperty('$store')){
    context = this.$store;
  }

  return context;
};

export { context };
