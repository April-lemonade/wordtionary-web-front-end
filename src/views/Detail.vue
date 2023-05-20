<template>
  <div class="container">
    <el-menu style="width: 15%;height: auto;text-align: center;min-height: 100vh"
             default-active="2"
             class="el-menu-vertical-demo">
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
      <el-menu-item index="2" @click="this.$router.go(-1)">
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
    <div style="display: flex;flex-direction: column;width: 85%">
      <div v-if="disable"
           style="display: flex;flex-direction: row;margin: 5%;width: 20%;justify-content: space-between">
        <div>{{ bookName }}</div>
        <el-button v-if="isSystem==='0'" type="primary" icon="Edit" circle @click="disable=false"/>
        <el-button v-if="isSystem==='0'" type="danger" round @click="dialogVisible=true">删除</el-button>
      </div>
      <div v-if="!disable"
           style="display: flex;flex-direction: row;margin: 5%;width: 20%;justify-content: space-between">
        <el-input style="margin-right: 3%" v-model="bookName" :placeholder="bookName"></el-input>
        <el-button type="primary" round @click="changlistname">保存</el-button>
        <el-button type="info" round @click="disable=true">取消</el-button>
      </div>
      <div
          style="display: flex;flex-direction: row;width: 90%;margin-left: 5%;flex-wrap:wrap;">
        <div style="width: 100%;text-align: center">
          <el-empty v-if="finalId===0" description="这个词表是空的噢"/>
        </div>
        <div
            v-if="finalId!==0"
            style="width: fit-content;height:fit-content;display: inline-block;background-color: #618dff;border-style: solid;border-radius: 5px;color: white;margin-right: 3%"
            v-for="i in words"
            class="infinite-list-item">&nbsp;{{ i.word }}&nbsp;
        </div>
      </div>
      <div style="width: 100%;text-align: center">
        <el-button v-if="words.length%50===0&&finalId!==0" type="primary"
                   style="width: fit-content;margin-bottom: 5%;margin-top: 5%" plain
                   @click="load">加载更多
        </el-button>
        <el-divider v-if="words.length%50!==0&&finalId!==0" content-position="center">没有更多啦</el-divider>
      </div>
      <el-dialog
          title="提示"
          v-model="dialogVisible"
          width="40%">
        <span>确定要删除此单词表吗？</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="danger" @click="deleteList">确定</el-button>
          </span>
        </template>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import {useRoute} from "vue-router";

export default {
  name: "Detail",
  data() {
    return {
      isSystem: 0,
      bookId: -1,
      words: [],
      finalId: 0,
      bookName: '',
      loading: false,
      disable: true,
      dialogVisible: false
    }
  },
  mounted() {
    let that = this
    const route = useRoute()
    this.bookId = route.query.id
    this.bookName = route.query.name
    this.isSystem = route.query.isSystem
    this.$getRequest("/word/showwords", {bookId: this.bookId, wordId: 0}).then(res => {
      that.words = res
      if (res.length !== 0)
        that.finalId = res[res.length - 1].id
      console.log("res" + that.finalId)
    })
  },
  methods: {
    load() {
      let that = this
      let arr = this.words
      this.$getRequest("/word/showwords", {bookId: this.bookId, wordId: this.finalId}).then(res => {
        arr = arr.concat(res)
        that.words = arr
        that.finalId = res[res.length - 1].id
        console.log("res" + that.finalId)
      })
    },
    deleteList() {
      let that = this
      this.$getRequest("/wordlist/deletelist", {bookid: this.bookId}).then(res => {
        that.$router.go(-1)
      })
    },
    changlistname() {
      console.log(this.bookName)
      this.$getRequest("/wordlist/changelistname", {name: this.bookName, bookid: this.bookId}).then(res => {
        this.$router.go(-1)
      })
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: row;
}
</style>
