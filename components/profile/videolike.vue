<template>
  <div>
    <div
      v-if="dataUser && dataUser.id === Number($route.params.id)"
      class="grid grid-cols-4"
    >
      <nuxt-link
        v-for="(item, index) in listVideoLike"
        :key="index"
        :to="`/detailsVideoPage/${item.video.id}`"
        class="w-[220px] h-auto py-3 relative text-left"
      >
        <video
          ref="videoRef"
          :poster="item.video.background_video"
          class="block w-full h-auto object-cover rounded-md videoplay"
          :src="item.video.url"
          muted
        ></video>
        <div class="absolute left-3 flex items-center" style="bottom: 56px">
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
          ><strong data-e2e="video-views" class="text-[#fff] text-[17px] italic"
            >65.9K</strong
          >
        </div>
        <p class="mt-2 ml-1 box-des line-clamp-1">
          {{ item.video.description }}
        </p>
      </nuxt-link>
    </div>
    <div v-else class="text-center pt-[80px]">
      <img
        src="./assets/img/lock.png"
        alt=""
        class="w-[120px] h-[120px] mx-auto"
      />
      <h2 class="text-[24px] font-bold mb-2">
        Video đã thích của người dùng này ở trạng thái riêng tư
      </h2>
      <p>Các video được thích bởi {{ userName }} hiện đang ẩn</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'VideoLikeContainer',
  props: {
    userName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dataUser: {},
      listVideoLike: [],
    }
  },
  async mounted() {
    const resUser = JSON.parse(localStorage.getItem('user'))
    this.dataUser = resUser
    if (this.dataUser) {
      const resListVideoLikes = await axios.get(
        `http://127.0.0.1:8000/api/count_video_like/${this.dataUser.id}`
      )
      this.listVideoLike = resListVideoLikes.data.data
    }
  },
}
</script>
