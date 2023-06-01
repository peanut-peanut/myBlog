<template>
  <div class="page">
    <div class="wrapper">
      <el-row>
        <el-col :xs="24" :sm="4" :md="18" :lg="18" :xl="18">
          <div class="main">
            <list_home :items="items"></list_home>
          </div>
        </el-col>
        <el-col :xs="0" :sm="4" :md="6" :lg="6" :xl="6">
          <div class="aside">
            <div class="card">
              <p class="title">ABOUT ME</p>
              <img class="pic" src="../../static/img/qingzhou.jpeg" alt="" />
              <div class="row">
                <p>轻舟已过万重山</p>
                <div class="icons">
                  <a href="https://github.com/peanut-peanut" target="_blank"
                    ><i class="iconfont icon-github"></i
                  ></a>
                  <el-tooltip effect="light" placement="bottom">
                    <template #content>
                      <img
                        style="width: 15rem"
                        src="../../static/img/qq.png"
                        alt="我的QQ"
                      />
                    </template>
										<i class="iconfont icon-QQ"></i>
                  </el-tooltip>
                  <el-tooltip effect="light" placement="bottom">
                    <template #content>
                      <img
                        style="width: 15rem"
                        src="../../static/img/wx.png"
                        alt="我的微信"
                      />
                    </template>
										<i class="iconfont icon-weixin1"></i>
                  </el-tooltip>
                </div>
              </div>
            </div>

          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'//导入axios
import List_home from "../components/list_home.vue"
import '../../static/css/font/iconfont'
export default {
  data () {
    return {
      items: []
    }
  },
  components: {
    List_home,
  },
  created () {
    axios.post('/api/articleList')
      .then((res) => {
        this.items = res.data.reverse();
      })
  }
}
</script>

<style lang="scss" scoped>
.main {
  background: #f8f8fd;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 0 30px rgba(10, 10, 0, 0.1) inset;
  margin: 0 10px;
  padding: 10px;
}
.aside {
  background: #f8f8fd;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 0 30px rgba(10, 10, 0, 0.1) inset;
  .card {
    border-top: 1px solid #eee;
    .title {
      padding: 10px;
      font-weight: 600;
      color: #808080;
      margin-bottom: 10px;
    }
    .pic {
      width: 100%;
    }
    .row {
      padding: 5px 10px;
      & > p {
        color: #5d5a5a;
      }

      .icons {
        padding: 10px 0;
        .iconfont {
          transition: all 0.3s;
          margin: 5px;
          color: #000;
          font-size: 25px;
          background-color: rgba(200, 200, 200, 0.3);
          padding: 8px;
          border-radius: 50%;
          &:hover {
            color: #fff;
            background-color: rgba(0, 133, 166, 0.8);
            border-radius: 5px;
          }
        }
      }

      & > .link {
        color: #bfbfbf;
        display: inline-block;
        padding: 5px;
        transition: all 0.3s;
        &:hover {
          color: #0085a1;
        }
      }
    }
  }
}

@media (min-width: 768px) {
  //pc
  .main {
    margin: 0 20px;
    padding: 20px;
  }
}
</style>
