<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>

    <!-- 页面主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
         <el-menu background-color="#333744" text-color="#fff"
                  active-text-color="#409EFF" unique-opened
                  :collapse="isCollapse" :collapse-transition='false'
                  router :default-active='activePath'>
          <el-submenu :index="item.id + ''"
            v-for="item in meunlist" :key="item.id">
            <template slot="title">
              <i :class="iconObj[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
              <el-menu-item :index="'/' + subitem.path"
                    v-for="subitem in item.children" :key="subitem.id"
                    @click="saveNavState('/' + subitem.path)">
                <i class="el-icon-menu"></i>
                <span>{{ subitem.authName }}</span>
              </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 右侧内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      // 左侧菜单数据
      meunlist: [],
      iconObj: {
        125: 'el-icon-user-solid',
        103: 'el-icon-s-tools',
        101: 'el-icon-s-goods',
        102: 'el-icon-s-order',
        145: 'el-icon-s-data'
      },
      // 是否折叠导航栏
      isCollapse: false,
      // 被激活的链接地址
      activePath: ''
    }
  },
  methods: {
    // 用户注销退出
    logout () {
      sessionStorage.clear()
      this.$message.success('用户注销成功')
      this.$router.push('/login')
    },
    // 获取所有的菜单
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.meunlist = res.data
    },
    // 折叠导航栏
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 每次点击导航菜单时，记录当前点击的菜单项，给与其高亮显示
    saveNavState (activePath) {
      sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  },
  created () {
    this.getMenuList()
    this.activePath = sessionStorage.getItem('activePath')
  }
}
</script>

<style lang='less' scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  >div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }

  .toggle-button {
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
}

.el-main {
  background-color: #EAEDF1;
}
</style>
