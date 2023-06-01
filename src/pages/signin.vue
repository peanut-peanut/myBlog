<template>
  <div class="page">
    <div class="cont" v-loading="loading" element-loading-text="登录中">
      <div class="form sign-in">
        <h2>欢迎回来</h2>
        <label>
          <span>账号</span>
          <input  v-model="name" prefix-icon="el-icon-s-custom" />
        </label>
        <label>
          <span>密码</span>
          <input v-model="password" type="password" prefix-icon="el-icon-key" />
        </label>
        <button type="button" @click="signIn" class="submit">登录</button>
      </div>
      <div class="sub-cont">
        <div class="img">
          <div class="img__text m--up">
            <h2>新来的？</h2>
            <p>请点击注册并发现跟多朋友吧</p>
          </div>
          <div class="img__text m--in">
            <h2>登录?</h2>
            <p>如果您已经有帐户，请点击登录！</p>
          </div>
          <div class="img__btn" @click="handleSwitch">
            <span class="m--up">注册</span>
            <span class="m--in">登录</span>
          </div>
        </div>
        <div class="form sign-up">
          <h2>欢迎注册</h2>
          <label>
            <span>账号</span>
            <input v-model="name" />
          </label>
          <label>
            <span>昵称</span>
            <input v-model="nickName" />
          </label>
          <label>
            <span>密码</span>
            <input v-model="password" type="password" />
          </label>
          <button type="button" @click="signUp" class="submit">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { webUrl } from "../../static/js/public.js";

export default {
  created() {},
  data() {
    return {
      name: "",
      password: "",
      nickName: "",
      loading: false,
    };
  },
  mounted() {},
  methods: {
    // 重置表单
    reset: function () {
      this.name = "";
      this.password = "";
      this.nickName = "";
    },
    // 切换登录注册页面
    handleSwitch: function () {
      this.reset();
      document.querySelector(".cont").classList.toggle("s--signup");
    },
    //注册
    signUp: function () {
      let that = this;
      if (that.name.length > 20) {
        that.$message({
          type: "warning",
          message: "登录账号太长!",
        });
        return;
      }
      if (that.nickName.length > 12) {
        that.$message({
          type: "warning",
          message: "昵称太长!",
        });
        return;
      }
      if (
        that.name.length == 0 ||
        that.nickName.length == 0 ||
        that.password.length == 0
      ) {
        that.$message({
          type: "warning",
          message: "有未填写项!",
        });
        return;
      }
      that.$axios
        .post(webUrl + "admin/signUp", {
          name: that.name,
          password: that.password,
          nickName: that.nickName,
        })
        .then((response) => {
          if (response.data.status === 1) {
            that.$message({
              type: "success",
              message: response.data.msg,
            });
            that.handleSwitch();
          } else {
            that.$message.error(response.data.msg);
          }
        })
        .catch((reject) => {
          console.log(reject);
        });
    },
    //登录
    signIn: function () {
      let that = this;
      this.$axios
        .post(webUrl + "admin/signIn", {
          name: this.name,
          password: this.password,
        })
        .then((response) => {
          if (response.data.status == 1) {
            this.loading = true;
            let type = response.data.type;

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user_name", response.data.user_name);
            localStorage.setItem("nickName", response.data.nickName);
            localStorage.setItem("avatar", response.data.avatar);
            if (type == 1) {
              this.$store.commit("changeIsSignIn", 1); //admin
            } else if (type == 2) {
              this.$store.commit("changeIsSignIn", 2); //游客
              this.$store.commit("changeIndex", "7");
            }
            setTimeout(() => {
              this.loading = true;
              setTimeout(() => {
                if (type == 1) {
                  this.$router.push({ name: "ArticleList" }); //admin
                } else if (type == 2) {
                  // this.$router.push({ name: "visiter" }); //游客
                  this.$router.push('/'); //游客定向到主页
                }
              }, 500);
            }, 1000);
          } else {
            that.$message({
              type: "error",
              message: response.data.msg,
            });
          }
        })
        .catch((reject) => {
          console.log(reject);
        });
    },
  },
  // beforeCreate: function () {
  //   document.getElementsByTagName("body")[0].className = "admin";
  // },
  // beforeDestroy: function () {
  //   document.body.removeAttribute("class", "admin");
  // },
};
</script>

<style scoped lang='scss'>
// @import url("https://fonts.googleapis.com/css?family=Open+Sans");
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.page {
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("../../static/img/bg_admin.jpg");
  background-size: cover;
}

input,
button {
  border: none;
  outline: none;
  background: none;
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
}

.tip {
  font-size: 20px;
  margin: 40px auto 50px;
  text-align: center;
}

.cont {
  overflow: hidden;
  position: relative;
  width: 900px;
  height: 600px;
  // margin-top:  10px;
  background: #f1eeee;
  opacity: 0.85;
}

.form {
  position: relative;
  width: 640px;
  height: 100%;
  transition: transform 0.8s ease-in-out;
  padding: 50px 30px 0;
}

.sub-cont {
  overflow: hidden;
  position: absolute;
  left: 640px;
  top: 0;
  width: 900px;
  height: 100%;
  padding-left: 260px;
  background: #fff;
  transition: transform 0.8s ease-in-out;
}
.cont.s--signup .sub-cont {
  transform: translate3d(-640px, 0, 0);
}

button {
  display: block;
  margin: 0 auto;
  width: 260px;
  height: 36px;
  border-radius: 30px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

.img {
  overflow: hidden;
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 260px;
  height: 100%;
  padding-top: 360px;
}
.img:before {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  width: 900px;
  height: 100%;
  // background-image: url("https://images.unsplash.com/photo-1604941138781-78fbefc0d888?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1817&q=80");
  // background-size: cover;
  transition: transform 0.8s ease-in-out;
}
.img:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}
.cont.s--signup .img:before {
  transform: translate3d(640px, 0, 0);
}
.img__text {
  z-index: 2;
  position: absolute;
  left: 0;
  top: 50px;
  width: 100%;
  padding: 0 20px;
  text-align: center;
  color: #fff;
  transition: transform 0.8s ease-in-out;
}
.img__text h2 {
  margin-bottom: 10px;
  font-weight: normal;
}
.img__text p {
  font-size: 14px;
  line-height: 1.5;
}
.cont.s--signup .img__text.m--up {
  transform: translateX(520px);
}
.img__text.m--in {
  transform: translateX(-520px);
}
.cont.s--signup .img__text.m--in {
  transform: translateX(0);
}
.img__btn {
  overflow: hidden;
  z-index: 2;
  position: relative;
  width: 100px;
  height: 36px;
  margin: 0 auto;
  background: transparent;
  color: #fff;
  text-transform: uppercase;
  font-size: 15px;
  cursor: pointer;
}
.img__btn:after {
  content: "";
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #fff;
  border-radius: 30px;
}
.img__btn span {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  transition: transform 1.2s;
}
.img__btn span.m--in {
  transform: translateY(-72px);
}
.cont.s--signup .img__btn span.m--in {
  transform: translateY(0);
}
.cont.s--signup .img__btn span.m--up {
  transform: translateY(72px);
}

h2 {
  width: 100%;
  font-size: 26px;
  text-align: center;
}

label {
  display: block;
  width: 260px;
  margin: 25px auto 0;
  text-align: center;
}
label span {
  font-size: 12px;
  color: #cfcfcf;
  text-transform: uppercase;
}

input {
  display: block;
  width: 100%;
  margin-top: 5px;
  padding-bottom: 5px;
  font-size: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  text-align: center;
}

.forgot-pass {
  margin-top: 15px;
  text-align: center;
  font-size: 12px;
  color: #cfcfcf;
}

.submit {
  margin-top: 80px;
  margin-bottom: 20px;
  background: #d4af7a;
  text-transform: uppercase;
}

.fb-btn {
  border: 2px solid #d3dae9;
  color: #8fa1c7;
}
.fb-btn span {
  font-weight: bold;
  color: #455a81;
}

.sign-in {
  transition-timing-function: ease-out;
}
.cont.s--signup .sign-in {
  transition-timing-function: ease-in-out;
  transition-duration: 1.2s;
  transform: translate3d(640px, 0, 0);
}

.sign-up {
  transform: translate3d(-900px, 0, 0);
}
.cont.s--signup .sign-up {
  transform: translate3d(0, 0, 0);
}
</style>
