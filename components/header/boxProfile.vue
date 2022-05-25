<template>
  <div
    v-show="showBoxProfile"
    class="absolute top-[66px] z-10 ml-5"
    @mouseover="showWhenOver"
    @mouseleave="showWhenLeave"
  >
    <ul
      class="bg-white text-black text-left py-1 rounded-lg"
      style="box-shadow: rgb(0 0 0 / 20%) 0 2px 8px"
    >
      <li>
        <nuxt-link
          :to="`/profilePage/${dataUser.id}`"
          class="flex justify-start items-center"
        >
          <span class="mdi mdi-account text-[20px] mr-2"></span> Hồ
          sơ</nuxt-link
        >
      </li>
      <li>
        <nuxt-link to="/CoinPage" class="flex justify-start items-center">
          <span class="mdi mdi-coin text-[20px] mr-2"></span> Tình trạng xu cá
          nhân</nuxt-link
        >
      </li>
      <li>
        <a
          href="#"
          class="flex justify-start items-center"
          @click="showModal = true"
        >
          <span class="mdi mdi-wrench text-[20px] mr-2"></span> Đổi mật khẩu</a
        >
      </li>
      <li>
        <a href="#" class="flex justify-start items-center">
          <span class="mdi mdi-comment-question text-[20px] mr-2"></span>
          Hỗ Trợ</a
        >
      </li>
      <li @click="signOut">
        <a href="#" class="flex justify-start items-center">
          <span class="mdi mdi-forward text-[20px] mr-2"></span>
          Đăng xuất</a
        >
      </li>
    </ul>
    <modal-change-pass :show-modal="showModal" :un-show-modal="unShowModal" />
  </div>
</template>

<script>
import modalChangePass from './modalChangePass.vue'
export default {
  components: { modalChangePass },
  props: {
    showBoxProfile: {
      type: Boolean,
      default: false,
    },
    showWhenOver: {
      type: Function,
      default: () => 1,
    },
    showWhenLeave: {
      type: Function,
      default: () => 1,
    },
  },
  data() {
    return {
      dataUser: {},
      showModal: false,
    }
  },

  mounted() {
    const resUser = JSON.parse(localStorage.getItem('user'))
    this.dataUser = resUser
  },
  methods: {
    unShowModal() {
      this.showModal = false
    },
    signOut() {
      localStorage.clear()
      window.location.reload()
    },
  },
}
</script>
<style scoped>
ul li {
  padding: 8px 20px 8px 17px;
  cursor: pointer;
}

ul li:hover {
  background-color: #eee;
}
</style>
