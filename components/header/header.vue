<template>
  <div class="border-b py-2">
    <div class="flex justify-between items-center w-[1170px] mx-auto">
      <a href="/" class="flex ml-2 items-center"
        ><img
          src="https://ute.udn.vn/images/logo-truong-250.png"
          alt=""
          class="w-[30px] h-[30px] mr-1"
        /><span
          alt=""
          class="w-[100px] font-bold text-[25px] text-blue-600 text-left font-serif"
          >UTENews</span
        ></a
      >
      <div
        class="flex items-center bg-[#1618230f] w-[361px] py-[10px] px-4 rounded-full"
      >
        <input
          v-model="searchTitle"
          type="text"
          class="w-[292px] focus:outline-none bg-transparent px-3"
          placeholder="Tìm kiếm tài khoản và video"
        />
        <span
          v-show="searchTitle"
          class="mdi mdi-close-box text-[18px] text-gray-400 cursor-pointer mr-[10px]"
          @click="searchTitle = ''"
        ></span>
        <span class="w-[1px] h-[28px] bg-[#bbb] mr-3"></span>
        <div class="cursor-pointer" @click="showData">
          <img src="./assets/img/search.png" alt="" class="w-[24px]" />
        </div>
      </div>
      <div v-if="dataUser" class="flex items-center">
        <nuxt-link to="/UploadPage" class="relative"
          ><span
            class="mdi mdi-upload-outline text-[30px] mr-5"
            @mouseover="boxText1 = true"
            @mouseleave="boxText1 = false"
          ></span>
          <div
            v-show="boxText1"
            @mouseover="boxText1 = true"
            @mouseleave="boxText1 = false"
          >
            <div class="css-qaagm8-arrow"></div>
            <div class="css-qaagm8-inner box-text-1" role="tooltip">
              Tải video lên
            </div>
          </div>
        </nuxt-link>
        <nuxt-link to="/ChatPage" class="relative"
          ><span
            class="mdi mdi-message-text-outline text-[28px] mr-5"
            @mouseover="boxText2 = true"
            @mouseleave="boxText2 = false"
          ></span>
          <div
            v-show="boxText2"
            @mouseover="boxText2 = true"
            @mouseleave="boxText2 = false"
          >
            <div class="css-qaagm8-arrow"></div>
            <div class="css-qaagm8-inner box-text-2" role="tooltip">
              Tin nhắn
            </div>
          </div></nuxt-link
        >
        <nuxt-link to="#" class="relative"
          ><span
            class="mdi mdi-bell-outline text-[30px] mr-6"
            @mouseover="boxText3 = true"
            @mouseleave="boxText3 = false"
          ></span>
          <div
            v-show="boxText3"
            @mouseover="boxText3 = true"
            @mouseleave="boxText3 = false"
          >
            <div class="css-qaagm8-arrow"></div>
            <div class="css-qaagm8-inner box-text-3" role="tooltip">
              Thông báo
            </div>
          </div>
        </nuxt-link>
        <button @click="showBoxProfile = !showBoxProfile">
          <img
            :src="dataUser.avatar"
            alt=""
            class="w-[35px] h-[35px] rounded-full object-cover"
          />
        </button>
        <box-profile
          :show-box-profile="showBoxProfile"
          :show-when-over="() => (showBoxProfile = true)"
          :show-when-leave="() => (showBoxProfile = false)"
        ></box-profile>
      </div>
      <div v-else class="flex items-center">
        <span
          class="font-bold text-[17px] mr-6 cursor-pointer"
          @click="showAlert"
          >Tải lên</span
        >
        <signin></signin>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import Signin from '../signin/signin.vue'
import boxProfile from './boxProfile.vue'
export default {
  name: 'HeaderContainer',
  components: { Signin, boxProfile },
  data() {
    return {
      showBoxProfile: false,
      searchTitle: '',
      dataUser: {},
      boxText1: false,
      boxText2: false,
      boxText3: false,
    }
  },
  mounted() {
    const resUser = JSON.parse(localStorage.getItem('user'))
    this.dataUser = resUser
  },
  methods: {
    showAlert() {
      this.$notify({
        type: 'warn',
        group: 'default',
        title: 'Warning',
        text: 'Vui lòng đăng nhập để thực hiện chức năng này',
      })
    },
    async showData() {
      const resAccount = await axios.post(
        'http://127.0.0.1:8000/api/search_users',
        {
          value: this.searchTitle,
        }
      )
      const resVideo = await axios.post(
        'http://127.0.0.1:8000/api/search_videos',
        {
          value: this.searchTitle,
        }
      )
      window.console.log(resVideo)
      this.$store.dispatch('actionSetTitleInfo', this.searchTitle)
      this.$store.dispatch('actionSetListAccount', resAccount.data.data)
      this.$store.dispatch('actionSetListVideos', resVideo.data.data)
      this.$router.push('/SearchPage')
      this.searchTitle = ''
    },
  },
}
</script>
<style scoped>
.css-qaagm8-arrow {
  display: block;
  position: absolute;
  width: 36px;
  height: 8px;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDM2IDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0wIDhoNi42ODZhOCA4IDAgMCAwIDUuNjU3LTIuMzQzbDQuOTUtNC45NWExIDEgMCAwIDEgMS40MTQgMGw0Ljk1IDQuOTVBOCA4IDAgMCAwIDI5LjMxNCA4SDM2IDB6IiBmaWxsPSIjNTQ1NDU0IiBmaWxsLW9wYWNpdHk9Ii45MiIvPjwvc3ZnPg==');
  top: 42px;
  left: 34%;
  margin-left: -18px;
  z-index: 100;
}

.css-qaagm8-inner {
  text-align: left;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  background-color: rgba(84 84 84 / 92%);
  color: #fff;
  padding: 8px;
  position: absolute;
  left: -25px;
  top: 50px;
  z-index: 100;
}

.box-text-1 {
  width: 116px;
  left: -39px;
}

.box-text-2 {
  width: 85px;
}

.box-text-3 {
  width: 100px;
  left: -33px;
}
</style>
