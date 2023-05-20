<template>
  <div class="about">
    <el-menu style="width: 15%;height: auto;text-align: center;min-height: 100vh"
             default-active="2"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose">
      <!--    <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>-->
      <img style="width: 70%" src="../assets/logo_wordtionary.png"/>
      <el-menu-item index="2">
        <span slot="title">词表管理</span>
      </el-menu-item>
      <!--      <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>-->
    </el-menu>
    <div style="width: 75%;margin: 5%;display: flex;flex-direction: column">
      <div style="color: #0052d9;font-weight: bold;margin-bottom: 3%">系统词表</div>
      <el-scrollbar style="height: 200px">
        <div class="scrollbar-flex-content">
          <div v-for="book in systemBook">
            <div class="book" @click="goDetail(book.id,book.name,1)">
              <div style="width: 90px;height: 100px">
                {{ book.name }}
              </div>
            </div>
          </div>
          <!--          <p v-for="item in 50" :key="item" class="book">
                      {{ item }}
                    </p>  -->
        </div>
      </el-scrollbar>
      <div style="color: #0052d9;font-weight: bold;margin-bottom: 3%">自定义词表</div>
      <el-button type="primary" style="background-color: #0052d9;margin-bottom: 3%;width: fit-content" @click="goNew">
        新建词表
      </el-button>
      <el-scrollbar style="height: 200px">
        <div class="scrollbar-flex-content">
          <div v-for="book in bookData">
            <div class="book" @click="goDetail(book.id,book.name,0)">
              <div style="width: 90px;height: 100px">
                {{ book.name }}
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import {useRoute} from "vue-router";

export default {
  data() {
    return {
      activeIndex: '1',
      bookData: [],
      systemBook: [],
      openid: ''
    }
  },
  mounted() {
    const route = useRoute()
    console.log(route.query.openid)
    this.openid = route.query.openid
    this.$getRequest('/wordlist/getuser', {openid: this.openid}).then(res => {
      console.log(res)
      this.bookData = res
    })
    this.$getRequest('/wordlist/getadmin').then(res => {
      console.log(res)
      this.systemBook = res
    })
  },
  methods: {
    goDetail(id, name, isSystem) {
      this.$router.push({
        path: '/detail', query: {
          id: id,
          name: name,
          isSystem: isSystem
        }
      })
    },
    goNew() {
      let that = this
      this.$router.push({
        path: '/new', query: {
          id: that.openid
        }
      })
    }
  }
}
</script>

<style scoped>
.about {
  display: flex;
  flex-direction: row;
}

.book {
  background-image: url(../assets/book3.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 150px;
  height: 150px;
  text-align: right;
  line-height: 50px;
  color: #eeeef0;
  font-weight: bold;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  word-break: break-word;
  flex-direction: row;
  cursor: pointer;
}

.scrollbar-flex-content {
  display: flex;
}
</style>
