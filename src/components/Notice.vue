<template>
  <div class="notice" style="center">
    <header>
      <div id="header">
        <h1>协同工作平台</h1>
      </div>
    </header>
    <el-menu
        id="nav"
        defalt-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
      <el-menu-item index="1" @click="toList">
        <i class="el-icon-menu"></i>
        <span slot="title">项目管理</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">留言板</span>
      </el-menu-item>
      <el-menu-item index="3" id="zhuxiao" @click="zhuxiao">
        <i class="el-icon-switch-button"></i>
      </el-menu-item>
    </el-menu>
    <div id='title2'>
      <h3 id='txtTitle2'>留言管理</h3>
    </div>
    <div id='table'>
      <el-table id='noticeTable' :data="noticeList" style="width: 90%">
        <el-table-column prop="pid" label="提示编号" width="250"></el-table-column>
        <el-table-column prop="time" label="发布时间" width="250"></el-table-column>
        <el-table-column prop="title" label="项目名称" width="250"></el-table-column>
        <el-table-column prop="poster" label="发布人" width="250"></el-table-column>
        <el-table-column prop="content" label="提示内容" width="400"></el-table-column>
      </el-table>
    </div>
    <el-dialog title="新增提示" :visible.sync="dialogEditMessageVisible">
      <el-form :model="noticeData" label-width="100px">
        <el-form-item label="发布时间" prop="time">
          <el-date-picker v-model="noticeData.time" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
                          format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="项目名称" prop="title">
          <el-input v-model="noticeData.title"></el-input>
        </el-form-item>
        <el-form-item label="提示内容" prop="content">
          <el-input v-model="noticeData.content"></el-input>
        </el-form-item>
        <el-form-item label="发布人" prop="poster">
          <el-input v-model="noticeData.poster"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditMessageVisible = false">取 消</el-button>
        <el-button type="primary" plain="true" @click="saveMsg">确 定</el-button>
      </div>
    </el-dialog>
    <el-button id='insert' @click="dialogEditMessageVisible = true">发布提示</el-button>

  </div>
</template>

<script>
export default {
  name: 'notice',
  data() {
    return {
      noticeData: {
        pid: '',
        time: '',
        title: '',
        poster: '',
        content: '',
      },
      noticeList: [],
      list: [],
      dialogEditMessageVisible: false,
    }
  },
  methods: {
    saveMsg() {
      this.noticeData.pid = this.noticeList.length + 1;
      var comment = {
        pid: this.noticeData.pid,
        time: this.noticeData.time,
        title: this.noticeData.title,
        poster: this.noticeData.poster,
        content: this.noticeData.content
      };//获取新添加的数据，保存在comment中
      var list = JSON.parse(localStorage.getItem("msgList") || "[]"); //从localStorage中获取之前发布过的数据
      list.unshift(comment); //重新保存最新的数据（之前的+添加的）
      localStorage.setItem("msgList", JSON.stringify(list)); //再次调用JOSN.stringify转为数组字符串，然后调用localStorage.setItem()
      this.noticeList.push(this.noticeData);
      this.noticeData = {
        pid: '',
        time: '',
        title: '',
        poster: '',
        content: ''
      };
      this.dialogEditMessageVisible = false
    },
    toList() {
      this.$router.push({
        name: 'eventlist'
      })
    },
    zhuxiao() {
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>

<style>
#header {
  background-color: #5e606c;
  color: white;
  text-align: center;
  padding: 5px;
}

#nav {
  line-height: 30px;
  height: 700px;
  width: 120px;
  float: left;
  padding: 5px;
}

#title2 {
  background-color: #c1d5ee;
  margin-left: 135px;
  margin-top: 5px;
  text-align: center;
  padding: 5px;
  border-radius: 4px
}
</style>
