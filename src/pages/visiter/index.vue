<template>
  <div class="page">
    <div class="wrapper">
      <div class="content">
        <el-row class="row">
          <el-col :xs="4" :sm="6" :md="6" :lg="6" :xl="6">
            <p class="label">昵称：</p>
          </el-col>
          <el-col :xs="20" :sm="18" :md="18" :lg="18" :xl="18">
            <el-input
              class="input"
              v-model="nickName"
              placeholder="请输入昵称"
            ></el-input>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :xs="4" :sm="6" :md="6" :lg="6" :xl="6">
            <p class="label">头像：</p>
          </el-col>
          <el-col :xs="20" :sm="18" :md="18" :lg="18" :xl="18">
            <label for="upLoad" class="upLoad-content">
              <img
                :src="avatar != 'null' ? avatar : imgDefault"
                alt=""
                class="avatar"
              />
            </label>
            <input @change="upLoad" id="upLoad" type="file" />
            <p class="tips">tips:请上传2M以内JPG/PNG格式的图片，比例最好1:1</p>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col
            class="bar"
            :offset="4"
            :xs="18"
            :sm="18"
            :md="18"
            :lg="18"
            :xl="18"
          >
            <el-button @click="save" type="primary">保存修改</el-button>
            <el-button @click="signOut">退出登录</el-button>
            <el-dialog
              title="提示"
              :visible="dialogVisible"
              :show-close="false"
            >
              <h3>请问您是要退出登录吗</h3>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="signOutConfirm"
                  >确 定</el-button
                >
                <el-button @click="dialogVisible = false">取 消</el-button>
              </span>
            </el-dialog>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { imgTo64, checkVisiter, webUrl } from "../../../static/js/public.js";
import imgDefault from "../../../static/img/avatar.png";

export default {
  mixins: [checkVisiter],
  data() {
    return {
      nickName: null,
      avatar: null,
      name: null,
      token: null,
      imgDefault: imgDefault,
      dialogVisible: false,
    };
  },
  created() {
    this.nickName = localStorage.getItem("nickName");
    this.avatar = localStorage.getItem("avatar");
    this.name = localStorage.getItem("user_name");
    this.token = localStorage.getItem("token");
  },
  methods: {
    upLoad: function (e) {
      //上传头像
      let that = this;
      let files = e.target.files || e.dataTransfer.files;

      if (!files.length) return;
      if (
        files[0].type.indexOf("png") > -1 ||
        files[0].type.indexOf("jpg") > -1 ||
        files[0].type.indexOf("jpeg") > -1
      ) {
        if (files[0].size < 2000000) {
          if (typeof FileReader === "undefined") {
            alert("您的浏览器不支持图片上传，请升级您的浏览器");
          }
          let reader = new FileReader();
          reader.readAsDataURL(files[0]);
          reader.onload = function (e) {
            let image = new Image();
            image.src = e.target.result; //原始base64
            image.setAttribute("crossOrigin", "anonymous"); //允许图片跨域请求、必须后台也允许
            image.onload = () => {
              let base64 = imgTo64(image); //使用cavas压缩
              that.avatar = base64;
            };
          };
        } else {
          alert("请上传2M以内的图片");
        }
      } else {
        alert("请上传JPG/PNG格式的图片");
      }
    },
    save: function () {
      //保存
      let that = this;
      that.$axios
        .post(webUrl + "admin/updateUser", {
          name: that.name,
          token: that.token,
          nickName: that.nickName,
          avatar: that.avatar,
        })
        .then((response) => {
          alert(response.data.msg);
          if (response.data.status == 1) {
            localStorage.setItem("nickName", response.data.nickName);
            localStorage.setItem("avatar", response.data.avatar);
          }
        })
        .catch((reject) => {
          console.log(reject);
        });
    },
    signOut: function () {
      this.dialogVisible = true;
    },
    signOutConfirm: function () {
      //退出
      let that = this;
      that.$axios
        .post(webUrl + "admin/signOut", {
          name: that.name,
          token: that.token,
        })
        .then((response) => {
          if (response.data.status == 1) {
            that.$message({
              message: "登出成功",
              type: "success",
            });
            this.$store.commit("changeIsSignIn", 0);
            this.$store.commit("changeIndex", "1");
            localStorage.clear();
            this.$router.replace({ name: "home" });
          }
        })
        .catch((reject) => {
          console.log(reject);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#upLoad {
  display: none;
}
.content {
  width: 90%;
  margin: 0 auto;
  padding: 50px 0;
  .row {
    padding: 10px 0;
    .label {
      text-align: center;
      line-height: 40px;
    }
    .input {
      // margin-left: 30px;
      width: 80%;
    }
    .upLoad-content {
      display: inline-block;
      width: 80%;
    }
    .avatar {
      width: 100px;
      height: 100px;
      display: block;
      margin: 0 auto;
      background: #eee;
      border-radius: 50%;
      cursor: pointer;
    }
    .tips {
      font-size: 12px;
      color: #999;
      margin-top: 30px;
    }
    .bar {
      text-align: center;
      padding: 50px 0 0 0;
      display: flex;
      justify-content: space-between;
    }
  }
}
@media (min-width: 768px) {
  //pc
  .content {
    width: 40%;
    margin: 0 auto;
    padding: 50px 0;
    .row {
      padding: 10px 0;
      .label {
        text-align: center;
        line-height: 40px;
      }
      // .input {
      // margin-left: 30px;
      // }
      .upLoad-content {
        display: inline-block;
        width: 80%;
      }
      .avatar {
        width: 100px;
        height: 100px;
        display: block;
        margin: 0 auto;
        background: #eee;
        border-radius: 50%;
        cursor: pointer;
      }
      .tips {
        font-size: 12px;
        color: #999;
        margin-top: 30px;
      }
      .bar {
        text-align: center;
        padding: 50px 0 0 0;
      }
    }
  }
}
</style>
