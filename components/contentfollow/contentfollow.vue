<template>
  <div
    class="w-[1100px] overflow-y-scroll fixed top-[65px] right-0 bottom-0 sidebar-right py-4"
  >
    <div
      v-for="(item, index) in listContentFollow"
      :key="index"
      class="flex py-4 border-b"
    >
      <nuxt-link :to="`/profilePage/${item.user.id}`" class="h-[57px]"
        ><img
          :src="item.user.avatar"
          alt=""
          class="w-[57px] h-[57px] object-cover rounded-full"
      /></nuxt-link>
      <div class="text-left w-[700px] ml-4">
        <div class="flex items-center justify-between">
          <nuxt-link :to="`/profilePage/${item.user.id}`" class="text-left">
            <a href="#" class="flex items-center mb-1 justify-between">
              <div class="flex items-center">
                <h3 class="font-bold mr-[4px] text-[18px]">
                  {{ item.user.username }}
                </h3>
                <svg
                  class="tiktok-shsbhf-StyledVerifyBadge e1aglo370 mr-[4px]"
                  width="14"
                  height="14"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="24" cy="24" r="24" fill="#20D5EC"></circle>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M37.1213 15.8787C38.2929 17.0503 38.2929 18.9497 37.1213 20.1213L23.6213 33.6213C22.4497 34.7929 20.5503 34.7929 19.3787 33.6213L10.8787 25.1213C9.70711 23.9497 9.70711 22.0503 10.8787 20.8787C12.0503 19.7071 13.9497 19.7071 15.1213 20.8787L21.5 27.2574L32.8787 15.8787C34.0503 14.7071 35.9497 14.7071 37.1213 15.8787Z"
                    fill="white"
                  ></path>
                </svg>
                <h4 class="mr-[4px] text-[13px]">{{ item.user.fullname }}</h4>
                <!-- <span class="mr-[4px]">.</span> -->
                <!-- <p class="text-[13px]">12/3/2022</p> -->
              </div>
            </a>
            <p class="mb-1 max-w-[542px] w-[70%]">
              {{ item.description }}
            </p>
            <a href="#" class="font-semibold italic hover:underline">{{
              item.hashtag_name
            }}</a>
          </nuxt-link>
          <!-- <button
            class="text-[#fe2c55] border border-[#fe2c55] py-[2px] px-[24px] font-semibold rounded-md text-[16px] hover:bg-[#faeef1] duration-300"
            :style="
              changeColorFollow
                ? {
                    color: '#aaa',
                    border: '1px solid #aaa',
                    padding: '2px 14px',
                  }
                : { color: '#fe2c55', border: '1px solid #fe2c55' }
            "
            @click="changeFollow"
          >
            {{ textFollow }}
          </button> -->
        </div>
        <div class="flex items-end">
          <nuxt-link
            :to="`/detailsVideoPage/${item.id}`"
            class="w-[70%] h-[50%] py-3"
          >
            <video
              id="videoplay"
              ref="videoRef"
              class="block w-full h-auto object-cover rounded-md videoplay"
              controls
              :src="item.url"
              :poster="item.background_video"
            ></video>
          </nuxt-link>
          <div class="ml-5 text-center">
            <div class="pb-2">
              <a
                class="w-[48px] h-[48px] rounded-full flex justify-center items-center bg-[#eee] cursor-pointer"
                @click="changeHeart"
              >
                <span
                  class="mdi mdi-heart text-[27px]"
                  :style="
                    changeColor ? { color: '#fe2c55' } : { color: '#000' }
                  "
                ></span
              ></a>
              <p class="text-[12px] font-semibold text-[#000] my-1">221.6k</p>
            </div>

            <div class="pb-2">
              <nuxt-link
                :to="`/detailsVideoPage/${item.id}`"
                class="w-[48px] h-[48px] rounded-full flex justify-center items-center bg-[#eee]"
              >
                <img
                  src="./assets/img/icon-comment.png"
                  alt=""
                  class="w-[21px]"
              /></nuxt-link>
              <p class="text-[12px] font-semibold text-[#000] my-1">2698</p>
            </div>

            <a
              href="#"
              class="w-[48px] h-[48px] rounded-full flex justify-center items-center bg-[#eee]"
            >
              <img src="./assets/img/icon-share.png" alt="" class="w-[21px]"
            /></a>
            <p class="text-[12px] font-semibold text-[#000] my-1">751</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ContentContainer',

  data() {
    return {
      listContent: [],
      changeColor: false,
      changeColorFollow: false,
      textFollow: 'Follow',
      isPlayed: false,
      listContentFollow: [],
    }
  },
  async mounted() {
    const resUser = JSON.parse(localStorage.getItem('user'))
    const resFollowings = await axios.get(
      `http://127.0.0.1:8000/api/following_user_list/${resUser.id}`
    )
    window.console.log(resFollowings.data.following)
    const resDataVideo = await axios.get(
      'http://localhost:8000/api/load_videos'
    )
    await axios.get('http://localhost:8000/api/load_users')
    this.listContent = resDataVideo.data.data

    const isFlow = resFollowings.data.following
    const result = []
    isFlow.forEach((item) => {
      window.console.log(item.user_id_2)
      const listFl = this.listContent.filter(
        (fil) => fil.user_id === item.user_id_2
      )
      result.push(listFl)
    })
    this.listContentFollow = result.flat(99)

    // const listFollow = this.listContent.filter(
    //   (res) => res.user_id === resFollowings.data.following[0].user_id_2
    // )
    // window.console.log(listFollow)
    // window.console.log(isFlow)

    // window.console.log(resFollowings.data.following.length)
    this.listContent.sort(() => Math.random() - 0.5)

    window.console.log(this.listContent)
  },
  methods: {
    changeHeart() {
      this.changeColor = !this.changeColor
    },
    changeFollow() {
      this.changeColorFollow = !this.changeColorFollow
      if (this.changeColorFollow === true) {
        this.textFollow = 'Đang Follow'
      } else {
        this.textFollow = 'Follow'
      }
    },
    videoPlay(id) {
      // const myvideo = document.getElementById('videoplay')
      const listVideo = this.$refs.videoRef
      listVideo[id - 1].play()
      window.console.log(id)
    },
    videoPause(id) {
      // const myvideo = document.getElementById('videoplay')
      const listVideo = this.$refs.videoRef
      listVideo[id - 1].pause()
    },
  },
}
</script>
<style scoped>
.sidebar-right::-webkit-scrollbar-track {
  background-color: #fff;
  border-radius: 20px;
}

.sidebar-right::-webkit-scrollbar {
  width: 8px;
  background-color: #fff;
}

.sidebar-right::-webkit-scrollbar-thumb {
  border-radius: 12px;
  background-color: #ddd;
}
</style>
