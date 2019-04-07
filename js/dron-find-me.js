var app = new Vue({
  el: "#app",
  data: {
    code: '1234',
    isSend: true,
    isCheck: false,
    isSuccess: false,
    progressBar: 0,
    isFullData: false
  },
  methods: {
    sendCode: function() {
      this.isSend = false;
      this.isCheck = true;
    },
    checkCode: function() {
      this.isCheck = false;
      this.isSuccess = true;
      this.progressBar += 40;
      this.fullData()

    },
    addPhoto: function() {
      if (this.progressBar == 0 || this.progressBar == 40)
        this.progressBar += 60;
      else {
        console.log('some error');
      }
      this.fullData()
    },
    fullData: function() {
      if (this.progressBar > 95)
        this.isFullData = true
    }
  }
})