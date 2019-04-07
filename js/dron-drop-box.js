var app = new Vue({
  el: "#app",
  data: {
    message: 'Дрон находится в радиусе места доставки',
    labelButton: 'Забрать товар',

    isShowTime: true,
    isShowButton: false,
    isShowProgressBar: false,
    isShowMap: false,
    isShowClientMarker: false,
    isShowDronMarker: false,
    isShowButtonSendXY: false,
    isShowAlert: false,
    isShowAlertSuccess: false,

    isSendData: false,

    time: 8,
    progressCreatePhoto: 0,

    xClient: '??',
    yClient: '??',
    xDron: 0,
    yDron: 0
  },
  created: function() {
    this.message = 'Ожидаемое время прибытия дрона: '

    let timer = setInterval(() => {
      this.time--
      if (this.time <= 0) {
        clearInterval(timer)
        this.message = 'Дрон находится в радиусе места доставки'
        this.isShowTime = false
        this.isShowButton = true
      }
    }, 1000)

  },
  methods: {
    wantGetBox: function() {
      this.isShowButton = false
      this.message = "Пожалуйста, подождите... Делается снимок местности."
      this.isShowProgressBar = true

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
      this.message = 'На созданном снимке отметьте ваше местоположение. Красным кругом будет подсвечено место посадки дрона'
      this.isShowMap = true

      this.labelButton = "Отправить координаты"
      this.isShowButtonSendXY = true
    },

    moveMe: function(event) {
      this.isShowAlert = false
      if (this.isSendData) return
      this.isShowClientMarker = true
      this.isShowDronMarker = true
      console.log(event)

      var x = event.offsetX == undefined ? event.layerX : event.offsetX;
      var y = event.offsetY == undefined ? event.layerY : event.offsetY;

      let el_image_map = document.getElementById('map-image')

      let width = el_image_map.offsetWidth
      let height = el_image_map.offsetHeight

      this.xClient = Math.round(x * 100 / width);
      this.yClient = Math.round(y * 100 / height);

      let diapazon = Math.floor(Math.random() * 15 + 15)
      if (this.xClient > 50) {
        this.xDron = this.xClient - diapazon
      } else {
        this.xDron = this.xClient + diapazon
      }
      diapazon = Math.floor(Math.random() * 15 + 15)
      if (this.yClient > 50) {
        this.yDron = this.yClient - diapazon
      } else {
        this.yDron = this.yClient + diapazon
      }
    },

    sendCoordinat: function() {
      if (this.yDron === 0) {
        this.isShowAlert = true
        return;
      }
      this.isSendData = true
      this.isShowButton = false
      this.progressCreatePhoto = 0
      this.isShowProgressBar = true
      this.message = "Дрон доставит груз в указаной области в течении: "
      this.time = 10
      this.isShowTime = true

      let timer = setInterval(() => {
        this.isShowButtonSendXY = false
        this.progressCreatePhoto++
        if (this.progressCreatePhoto >= 100) {
          clearInterval(timer)
        }
      }, 100)

      let timer2 = setInterval(() => {
        this.time--
        if (this.time <= 0) {
          clearInterval(timer2)
          this.isShowProgressBar = false
          this.isShowTime = false
          this.finishOrder()
        }
      }, 1000)

    },

    finishOrder: function() {
      // this.isShowMap = false
      this.labelButton = 'Заказать новый товар'
      this.message = 'Спасибо, что воспользовались нашим сервисом!'
      this.isShowAlertSuccess = true

    }

  }
})