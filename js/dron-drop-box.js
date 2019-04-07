var app = new Vue({
  el: "#app",
  data: {
    code: '1234',
    isSend: true,
    isCheck: false,
    isSuccess: false
  },
  methods: {
    sendCode: function() {
      this.isSend = false;
      this.isCheck = true;
    },
    checkCode: function() {
      this.isCheck = false;
      this.isSuccess = true;
    }
  }
})