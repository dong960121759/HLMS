<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <search id="header-search" class="right-menu-item" />

        <error-log class="errLog-container right-menu-item hover-effect" />

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>

        <lang-select class="right-menu-item hover-effect" />

      </template>

      <el-form :inline="true" :model="user" size="mini" class=" demo-form-inline right-menu-item right-menu-item-from">
        <!-- <el-row>
          <el-col :xs="6" :sm="4" :md="4" :lg="8" :xl="10"> -->
        <el-form-item label="工号:" style="padding: 0px">
          <el-input v-model="user.userID" disabled class="el-form-itemnew" style="padding: 0 1px;" placeholder="" />
        </el-form-item>
        <!-- </el-col>
          <el-col :xs="6" :sm="4" :md="4" :lg="7" :xl="1"> -->
        <el-form-item label="姓名:">
          <el-input v-model="name" disabled class="el-form-itemnew" placeholder="" />
        </el-form-item>
        <!-- </el-col>
          <el-col :xs="6" :sm="6" :md="4" :lg="9" :xl="1"> -->
        <el-form-item label="地点:" style="padding: 0px">
          <el-select v-model="value" size="mini" class="right-menu-select el-form-itemSelect" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <!-- </el-col>
        </el-row> -->
      </el-form>
      <div class="right-menu-item hover-effect">
        <el-badge value="!" style="line-height: 1;">
          <el-button size="mini" @click="drawer = true">消息</el-button>
        </el-badge>
      </div>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item>
              {{ $t('navbar.profile') }}
            </el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.dashboard') }}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-drawer
      title="消息"
      :visible.sync="drawer"
      :direction="direction"
      size="20%"
    >
      <el-badge is-dot class="item">
        <span>消息1</span>
      </el-badge>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import Search from '@/components/HeaderSearch'
import { fetchLocale } from '@/api/article'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    Search
  },
  data() {
    return {
      options: [],
      value: '',
      user: {
        userID: '111111',
        userName: '王小明'
      },
      drawer: false,
      direction: 'rtl'
    }
  },

  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'device'
    ])
  },
  mounted() {
    this.getOptions(this.id)
  },
  methods: {
    getOptions(id) {
      fetchLocale(id).then(response => {
        this.options = response
      })
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>
<style lang="scss">
.right-menu-item-from {

  .el-form-item__content  {
    margin-top: 10px;
    margin-left: 0px;
    display: inline-block;
    vertical-align: top;
    //width: 50%;
  }
  .el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    margin-top: 5px;
    padding: 0 5px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .el-input__inner {
    -webkit-appearance: none;
    background-color: #FFFFFF;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 28px;
    line-height: 28px;
    outline: none;
    padding: 0 5px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
}
}
</style>
<style lang="scss" scoped>

.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px 0 0;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 10px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
    .el-form-itemnew {
      max-width: 75px;
    }
    .el-form-itemSelect{
      max-width: 120px;
    }
  }
}
</style>
