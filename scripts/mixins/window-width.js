const WindowWidth = {
  data: () => {
    return {
      WindowWidth: window.innerWidth,
    }
  },
  mounted: function () {
    window.addEventListener('resize', () => {
      this.WindowWidth = window.innerWidth;
    });
  }
};

export  { WindowWidth };
