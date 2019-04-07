var app = new Vue({
  el: "#app",
  data: {
    message: 'Дрон прилетел в место доставки',
    labelButton: 'Забрать товар',
    isShowButton: true,
    progressCreatePhoto: 70,
    isShowProgressBar: false,

  },
  methods: {
    wantGetBox: function() {
      this.isShowButton = false
      this.message = "Пожалуйста, подождите. Делается снимок местности."
      this.isShowProgressBar = true

      console.log(this.progressCreatePhoto)

      let timer = setInterval(() => {
        this.progressCreatePhoto++
        if (this.progressCreatePhoto === 100) {
          clearInterval(timer)
          this.doneCreatePhoto()
        }
      }, 50)

    },
    doneCreatePhoto: function() {
      this.isShowProgressBar = false
      this.message = 'На созданном снимке отметьте ваше местоположение.'

    }

  }
})