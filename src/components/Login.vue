<template>
  <div id="login">
    <div class="content">
      <div class="login-banner-wrap">
      </div>
      <div id="login-form">
        <div id="form-wrap">
          <div id="login-switch-tab">
            <a href="#" v-for="(item, index) in menuTab" :key="item.id" :class="{'item-active':item.isActive}"
               @click="toggleMenu(item, index)">{{ item.txt }}</a>
          </div>
          <el-form :model="loginForm" v-show="menuTab[0].isActive" status-icon :rules="rules" ref="loginForm">
            <el-form-item prop="name">
              <el-input v-model="loginForm.name" placeholder="用户名称" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item prop="password" props="password">
              <el-input type="password" v-model="loginForm.password" placeholder="请输入登录密码"
                        prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-button type="danger" @click="login()">登录</el-button>
          </el-form>
          <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" v-show="menuTab[1].isActive">
            <el-form-item prop="name">
              <el-input v-model="registerForm.name" placeholder="用户名称" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="registerForm.password" placeholder="请输入登录密码"
                        prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-form-item prop="checkPassword">
              <el-input type="password" v-model="registerForm.checkPassword" placeholder="请再次输入密码"
                        prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-button type="danger" @click="register()">注册</el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registerForm.checkPassword !== '') {
          this.$refs.registerForm.validateField('checkPassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validatePass4 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        name: '',
        // email: '',
        password: '',
      },
      registerForm: {
        name: '',
        // email: '',
        password: '',
      },
      list: [],
      menuTab: [
        {txt: '登录', isActive: true},
        {txt: '注册', isActive: false}
      ],
      rules: {
        password: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPassword: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        name: [
          {validator: validatePass4, trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    toggleMenu(item, index) {
      if (item.isActive !== true) {
        this.menuTab[1 - index].isActive = item.isActive
        item.isActive = !item.isActive
      }
    },
    login() {
      var comment = {name: this.loginForm.name, password: this.loginForm.password};
      // var comment = {name: this.loginForm.name, password: this.loginForm.password};
      var list = JSON.parse(localStorage.getItem("userList") || "[]"); //从localStorage中获取之前发布过的数据
      for (let i = 0;i < list.length;i++){
        if(comment.name === list[i].name && comment.password === list[i].password)
          this.$router.push({
            name: 'eventlist'
          })
      }
    },
    register() {
      var comment = {name: this.registerForm.name, password: this.registerForm.password};//获取新添加的数据，保存在comment中
      var list = JSON.parse(localStorage.getItem("userList") || "[]"); //从localStorage中获取之前发布过的数据
      list.unshift(comment); //重新保存最新的数据（之前的+添加的）
      localStorage.setItem("userList", JSON.stringify(list)); //再次调用JOSN.stringify转为数组字符串，然后调用localStorage.setItem()
      this.registerForm = ""; //发表之后清空input输入框

      this.$router.push({
        name: 'eventlist'
      })
    },
  }
}
</script>
<style>
#content {
  background-color: rgb(198, 235, 253);
  margin-top: 25px;
  display: flex;
  position: relative;
}

#login-form {
  width: 350px;
  height: 400px;
  display: flex;
  position: absolute;
  top: 91px;
  right: 600px;
  border: 1px solid #000;
  justify-content: center;
}

#form-wrap {
  margin: 0 25px;
  width: 100%;
}

#login-switch-tab {
  margin-bottom: 20px;
  margin-top: 20px;
}

.item-active {
  border-bottom: 2px solid #000000;
}

a {
  height: 18px;
  line-height: 5px;
  font-size: 16px;
  color: #3c3c3c;
  margin: 9px 20px 0 5px;
  font-weight: 700;
}

#form-bottom {
  text-align: right;
  margin-top: 10px;

a {
  font-size: 12px;
  color: #6c6c6c;
}

}
</style>
