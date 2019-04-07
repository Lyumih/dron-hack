var app = new Vue({
  el: "#app",
  data: {
    isWantGetBox: true,
    isCreatedPhotos: false,
    progressCreatePhoto: 0,
  },
  methods: {
    wantGetBox: function() {
      this.isWantGetBox = false;
      this.isCreatedPhotos = true;
    },
    startCreatePhoto: function() {
      while (this.progressCreatePhoto < 100) {
        this.progressCreatePhoto++;
        console.log(this.progressCreatePhoto);
      }
    }

  }
})