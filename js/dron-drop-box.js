var app = new Vue({
  el: "#app",
  data: {
    message: 'Дрон прилетел в место доставки',
    labelButton: 'Забрать товар',

    isShowTime: true,
    isShowButton: false,
    isShowProgressBar: false,
    isShowMap: false,
    isShowClientMarker: false,

    time: 1,
    progressCreatePhoto: 95,

    xClient: '?',
    yClient: '?',
  },
  created: function() {
    this.message = 'Ожидаемое время прибытия дрона: '

    let timer = setInterval(() => {
      this.time--
      if (this.time <= 0) {
        clearInterval(timer)
        this.message = 'Дрон прилетел в место доставки'
        this.isShowTime = false
        this.isShowButton = true
      }
    }, 1000)

  },
  methods: {
    wantGetBox: function() {
      this.isShowButton = false
      this.message = "Пожалуйста, подождите. Делается снимок местности."
      this.isShowProgressBar = true

      console.log(this.progressCreatePhoto)

      let timer = setInterval(() => {
        this.progressCreatePhoto++
        if (this.progressCreatePhoto >= 100) {
          clearInterval(timer)
          this.doneCreatePhoto()
        }
      }, 50)

    },
    doneCreatePhoto: function() {
      this.isShowProgressBar = false
      this.message = 'На созданном снимке отметьте ваше местоположение.'
      this.isShowMap = true

      this.labelButton = "Отправить координаты"
      this.isShowButton = true
    },

    moveMe: function(event) {
      this.isShowClientMarker = true;
      console.log(event)

      var x = event.offsetX == undefined ? event.layerX : event.offsetX;
      var y = event.offsetY == undefined ? event.layerY : event.offsetY;

      let el_image_map = document.getElementById('map-image')

      let width = el_image_map.offsetWidth
      let height = el_image_map.offsetHeight

      this.xClient = Math.round(x * 100 / width);
      this.yClient = Math.round(y * 100 / height);
    },

    finishOrder: function() {
      this.isShowMap = false
      this.labelButton = 'Заказать новый товар'
      this.message = 'Товар был успешно доставлен! Спасибо, что воспользовались нашим сервисом'
    }

  }
})