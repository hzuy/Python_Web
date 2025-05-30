new Vue({
  el: "#app",
  delimiters: ["${", "}"],
  data: {
    form: {
      username: "",
      email: "",
      password: "",
    },
    message: "",
    messageType: "",
  },
  methods: {
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
    handleRegister() {
      // Validate
      if (!this.form.username || !this.form.email || !this.form.password) {
        this.message = "Vui lòng nhập đầy đủ thông tin";
        this.messageType = "alert-error";
        return;
      }
      if (!this.validateEmail(this.form.email)) {
        this.message = "Email không hợp lệ";
        this.messageType = "alert-error";
        return;
      }
      axios
        .post("/register", this.form)
        .then((response) => {
          if (response.data.success) {
            this.message = response.data.message || "Đăng ký thành công!";
            this.messageType = "alert-success";
            setTimeout(() => {
              window.location.href = response.data.redirect;
            }, 1500);
          } else {
            this.message = response.data.message || "Đăng ký thất bại!";
            this.messageType = "alert-error";
          }
        })
        .catch((error) => {
          const serverMsg = error.response?.data?.message;
          this.message = serverMsg || "Có lỗi xảy ra. Vui lòng thử lại.";
          this.messageType = "alert-error";
          console.error("Registration error:", error.response || error);
        });
    },
  },
});
