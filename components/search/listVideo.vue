<template>
  <div
    class="w-[1155px] overflow-y-scroll fixed top-[164px] right-0 bottom-0 sidebar-right py-4"
  >
    <div v-if="listVideo.length">
      <div class="grid grid-cols-3 gap-2 w-[800px]">
        <nuxt-link
          v-for="(item, index) in listVideo"
          :key="index"
          :to="`/detailsVideoPage/${item.id}`"
          class="h-auto py-3 relative"
        >
          <video
            :poster="item.background_video"
            class="block w-full h-auto object-cover rounded-md videoplay"
            :src="item.url"
          ></video>
          <div class="absolute bottom-24 left-3 flex items-center">
            <svg
              class="mr-1"
              width="18"
              height="18"
              viewBox="0 0 48 48"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16 10.554V37.4459L38.1463 24L16 10.554ZM12 8.77702C12 6.43812 14.5577 4.99881 16.5569 6.21266L41.6301 21.4356C43.5542 22.6038 43.5542 25.3962 41.6301 26.5644L16.5569 41.7873C14.5577 43.0012 12 41.5619 12 39.223V8.77702Z"
              ></path></svg
            ><strong
              data-e2e="video-views"
              class="text-[#fff] text-[17px] italic"
              >65.9K</strong
            >
          </div>
          <p class="text-left line-clamp-1 mt-1.5">{{ item.description }}</p>
          <p class="text-left line-clamp-1 font-bold font-mono leading-5">
            {{ item.hashtag.hashtag_name }}
          </p>
          <div class="flex items-center font-serif mt-1.5">
            <img
              :src="item.user.avatar"
              alt=""
              class="w-[24px] h-[24px] rounded-full object-cover mr-2"
            />
            <p>{{ item.user.username }}</p>
          </div>
        </nuxt-link>
      </div>
    </div>
    <div v-else class="text-blue-600 font-bold text-xl">
      <p>Không có dữ liệu</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listVideo: [],
    }
  },
  computed: {
    getTitleSearch() {
      return this.$store.state.searchTitle
    },
    getListVideos() {
      return this.$store.state.listVideos
    },
  },
  watch: {
    getListVideos() {
      this.getVideos()
    },
  },
  mounted() {
    this.getVideos()
  },
  methods: {
    getVideos() {
      if (this.getTitleSearch) {
        this.listVideo = this.getListVideos
      } else {
        window.console.log('No videos')
      }
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
