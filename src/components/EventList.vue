<template>
  <div class="info" style="center">
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
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">项目管理</span>
      </el-menu-item>
      <el-menu-item index="2" @click="toNotice">
        <i class="el-icon-menu"></i>
        <span slot="title">留言板</span>
      </el-menu-item>
      <el-menu-item index="3" id="zhuxiao" @click="zhuxiao">
        <i class="el-icon-switch-button"></i>
      </el-menu-item>
    </el-menu>

    <div id='title2'>
      <h3 id='txtTitle2'>项目管理</h3>
    </div>
    <div id="title3">
      <p id='txtTitle3' style="width: 500px,float=left;">我管理的项目</p>
    </div>
    <div id='table'>
      <el-table id='tablePrj' :data="prjData" hegiht="250" border style="width: 90%">
        <el-table-column prop="pid" label="项目编号" width="80"></el-table-column>
        <el-table-column prop="title" label="项目名称" width="150"></el-table-column>
        <el-table-column prop="opendate" label="开始日期" width="150"></el-table-column>
        <el-table-column prop="closedate" label="结束日期" width="150"></el-table-column>
        <el-table-column prop="content" label="项目内容" width="385"></el-table-column>
        <el-table-column prop="people" label="项目成员" width="385"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click.native.prevent="handleManage(scope.row.pid)" type="text" size="small">项目管理</el-button>
            <el-button @click.native.prevent="handleEdit(scope.$index,scope.row)" type="text" size="small">编辑
            </el-button>
            <el-button @click="deletePrj(scope.$index)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-button id='insertPrj' @click="dialogAddVisible = true">添加</el-button>

    <el-dialog title="新增项目" :visible.sync="dialogAddVisible">
      <el-form :model="newPrj" ref="formdong" label-width="100px" :rules="formrules">
        <el-form-item label="开始日期" prop="opendate">
          <el-date-picker v-model="newPrj.opendate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
                          format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期" prop="closedate">
          <el-date-picker v-model="newPrj.closedate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
                          format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="newPrj.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="newPrj.content"></el-input>
        </el-form-item>
        <el-form-item label="指派成员" prop="people">
          <el-input v-model="newPrj.people"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" plain="true" @click="savePrj">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑项目" :visible.sync="dialogEditVisible">
      <el-divider></el-divider>
      <el-form :model="editPrj" ref="formdong" label-width="100px" :rules="formrules">
        <el-form-item label="开始日期" prop="opendate">
          <el-date-picker v-model="newPrj.opendate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
                          format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期" prop="closedate">
          <el-date-picker v-model="newPrj.closedate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
                          format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="editPrj.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="editPrj.content"></el-input>
        </el-form-item>
        <el-form-item label="指派成员" prop="people">
          <el-input v-model="editPrj.people"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" plain="true" @click="changePrj">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="项目任务管理" :visible.sync="dialogFormVisible">
      <el-table :data="taskData" border style="width: 100%">
        <el-table-column prop="mission_name" label="任务名称" width="80"></el-table-column>
        <el-table-column prop="mission_important" label="任务重要程度" width="180"></el-table-column>
        <el-table-column prop="mission_progress" label="任务进度" width="180"></el-table-column>
        <el-table-column prop="mission_tip" label="任务内容" width="180"></el-table-column>
        <el-table-column label="任务操作" width="100">
          <template slot-scope="scope">
            <el-button @click.native.prevent="handleMissionEdit(scope.$index,scope.row)" type="text" size="small">编辑
            </el-button>
            <el-button @click="deleteMission(scope.$index)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-divider></el-divider>
      <el-form :model="formTask">
        <el-form-item label="任务名称">
          <el-input v-model="formTask.mission_name" style="width: 600px;" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="重要程度">
          <el-select v-model="formTask.mission_important" placeholder="请选择任务重要程度" style="width: 600px;">
            <el-option label="一般" value="一般"></el-option>
            <el-option label="重要" value="重要"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务进度">
          <el-input v-model="formTask.mission_progress" style="width: 600px;" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="任务内容">
          <el-input v-model="formTask.mission_tip" type="textarea" maxlength="30" show-word-limit style="width: 600px;"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveTask">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑任务" :visible.sync="dialogEditMissionVisible">
      <el-divider></el-divider>
      <el-form :model="editMission" ref="formdong" label-width="100px" :rules="formrules">
        <el-form-item label="任务名称" prop="date">
          <el-input v-model="formTask.mission_name" style="width: 600px;" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="重要程度" prop="title">
          <el-select v-model="editMission.mission_important" placeholder="请选择任务重要程度" style="width: 600px;">
            <el-option label="一般" value="一般"></el-option>
            <el-option label="重要" value="重要"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务进度" prop="content">
          <el-input v-model="formTask.mission_progress" style="width: 600px;" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="任务备注" prop="people">
          <el-input v-model="editMission.mission_tip" type="textarea" maxlength="30" show-word-limit
                    style="width: 600px;" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditMissionVisible = false">取 消</el-button>
        <el-button type="primary" plain="true" @click="changePrj">确 定</el-button>
      </div>
    </el-dialog>

    <div id="title3">
      <p id='txtTitle3' style="width: 500px,flot=left;">我参与的项目</p>
    </div>
    <div id='checktable'>
      <el-table id='tablePrj' :data="joinPrjData" border style="width: 90%">
        <el-table-column prop="pid" label="项目编号" width="100"></el-table-column>
        <el-table-column prop="title" label="项目名称" width="150"></el-table-column>
        <el-table-column prop="opendate" label="开始日期" width="150"></el-table-column>
        <el-table-column prop="closedate" label="结束日期" width="150"></el-table-column>
        <el-table-column prop="content" label="项目内容" width="400"></el-table-column>
        <el-table-column prop="people" label="项目成员" width="400"></el-table-column>
        <el-table-column prop="check" label="操作" width="400"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventList',
  data() {
    return {
      editPrj: {
        pid: "",
        opendate: "",
        closedate: "",
        title: "",
        content: "",
        people: "",
      },
      newPrj: {
        pid: "",
        opendate: "",
        closedate: "",
        title: "",
        content: "",
        people: "",
      },
      formTask: {
        pid: "",
        mission_name: "",
        mission_important: "",
        mission_progress: "",
        mission_tip: "",
      },
      editMission: {
        pid: "",
        mission_name: "",
        mission_important: "",
        mission_progress: "",
        mission_tip: "",
      },
      joinPrjData: [
        {
          pid: "1",
          opendate: "2022/12/20",
          closedate: "2022/12/25",
          title: "交互式软件设计",
          content: "项目管理平台",
          people: "韩文白",
        },
        {
          pid: "2",
          opendate: "2022/12/22",
          closedate: "2023/3/15",
          title: "毕业设计",
          content: "基于Sprintboot的门诊电子处方系统的设计与实现",
          people: "韩文白",
        }
      ],
      prjData: [],
      taskData: [],
      dialogEditMissionVisible: false,
      dialogFormVisible: false,
      dialogAddVisible: false,
      dialogEditVisible: false,
      currentRow: "",
      list: []
    }
  },
  computed: {
    filtertasks: function () {
      if (this.currentRow == "") return this.taskData;
      return this.taskData.filter(data => data.pid == this.currentRow)

    },
  },
  methods: {
    handleManage(index) {
      this.dialogFormVisible = true;
      this.currentRow = index;
      console.log(this.prjData.length);
      console.log(this.currentRow);
    },

    handleEdit(index) {
      this.dialogEditVisible = true;
      this.editPrj = this.prjData[index];
      //this.currentRow=index;
      console.log(this.prjData.length);
      console.log(this.currentRow);
    },

    handleMissionEdit(index) {
      this.dialogEditMissionVisible = true;
      this.editMission = this.taskData[index];
    },

    deleteMission(index) {
      this.taskData.splice(index, 1)
    },

    deletePrj(index) {
      this.$message({
        showClose: true,
        message: '删除成功',
        type: 'error'
      });
      this.prjData.splice(index, 1);
    },

    savePrj() {
      this.$message({
        showClose: true,
        message: '恭喜你，添加成功！您已成为该项目管理员',
        type: 'success'
      });
      this.newPrj.pid = this.prjData.length + 1;
      var comment = {
        pid: this.newPrj.pid,
        opendateate: this.newPrj.opendate,
        closedate: this.newPrj.closedate,
        title: this.newPrj.title,
        content: this.newPrj.content,
        people: this.newPrj.people
      };//获取新添加的数据，保存在comment中
      var list = JSON.parse(localStorage.getItem("prjList") || "[]"); //从localStorage中获取之前发布过的数据

      // this.newPrj.pid = this.list.length;
      list.unshift(comment); //重新保存最新的数据（之前的+添加的）
      localStorage.setItem("prjList", JSON.stringify(list)); //再次调用JOSN.stringify转为数组字符串，然后调用localStorage.setItem()
      this.prjData.push(this.newPrj);
      this.newPrj = {
        pid: "",
        opendateate: "",
        closedate: "",
        title: "",
        content: "",
        people: "",
      };
      this.dialogAddVisible = false
    },

    saveTask() {
      this.formTask.pid = this.currentRow;
      this.taskData.push(this.formTask);
      this.formTask = {
        pid: "",
        mission_name: "",
        mission_important: ""
      }
    },

    changePrj() {
      this.prjData[this.currentRow].push(this.editPrj);
      this.dialogEditVisible = false;
    },
    toNotice() {
      this.$router.push({
        name: 'notice'
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

#tablePrj {
  margin-left: 138px;
}

#title2 {
  background-color: #c1d5ee;
  margin-left: 135px;
  margin-top: 5px;
  text-align: center;
  padding: 5px;
  border-radius: 4px
}

#txtTitle3 {
  text-align: left;
  margin-left: 5px;
}

#title3 {
  margin-left: 135px;
  margin-top: 5px;
  border: 1px solid #000;
  border-radius: 4px
}

#zhuxiao {
  margin-bottom: 20px;
}

#insertPrj {
  margin-right: 10px;
}
</style>
