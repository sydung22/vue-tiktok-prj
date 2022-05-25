<template>
  <div>
    <div v-show="showLayout" class="flex relative" style="z-index: 2">
      <videoplay
        :background-video="detailsVideo.background_video"
        :url-video="detailsVideo.url"
        :show-report="showReport"
      />
      <videocomment
        :user-name="detailsUser.username"
        :full-name="detailsUser.fullname"
        :hashtag="detailsVideo.hashtag_name"
        :description="detailsVideo.description"
        :avatar="detailsUser.avatar"
        :url-details="setUrl"
        :count-like="getCountLike"
        :list-comments="getListComments"
        :video-data-user="detailsUser.id"
        :is-follow="isFollow"
        :change-followings="changeFollowings"
        :url-video="detailsVideo.url"
      />
      <modal-report :show-modal="showModal" :un-show-modal="unShowModal" />
    </div>
    <test-page v-show="showSpin"></test-page>
    <notifications group="default" position="top left" />
  </div>
</template>

<script>
import axios from 'axios'
import testPage from '~/components/testpage/testPage.vue'
import Videoplay from '~/components/videodetails/videoplay.vue'
import Videocomment from '~/components/videodetails/videocomment.vue'
import ModalReport from '~/components/videodetails/modalReport.vue'
export default {
  name: 'DetailsVideo',

  components: { testPage, Videoplay, Videocomment, ModalReport },
  data() {
    return {
      detailsVideo: {},
      detailsUser: {},
      detailsLikes: {},
      listComments: [],
      setUrl: '',
      showSpin: false,
      showLayout: false,
      loading: false,
      dataUser: {},
      showModal: false,
    }
  },
  computed: {
    getListComments() {
      return this.$store.state.listComments
    },
    getCountLike() {
      return this.$store.state.countLikeVideos
    },
    getListFollowings() {
      return this.$store.state.listUserFollowings
    },
  },
  // watch: {
  //   getListComments() {
  //     this.loadComments()
  //   },
  // },
  async mounted() {
    this.showSpin = true

    const resDataVideo = await axios.get(
      `http://127.0.0.1:8000/api/get_video/${this.$route.params.id}`
    )
    const resUser = JSON.parse(localStorage.getItem('user'))
    this.dataUser = resUser
    this.detailsVideo = resDataVideo.data.data
    this.detailsUser = resDataVideo.data.data.user
    this.setUrl = `http://localhost:3000${this.$route.fullPath}`
    this.loadDataUser()
    this.loadCountLike()
    this.loadComments()
    this.showSpin = false
    this.showLayout = true
  },

  methods: {
    showReport() {
      this.showModal = true
    },
    unShowModal() {
      this.showModal = false
    },
    async isFollow() {
      const resDataVideo = await axios.get(
        `http://127.0.0.1:8000/api/get_video/${this.$route.params.id}`
      )
      this.detailsVideo = resDataVideo.data.data
      const isFollowing = !!this.getListFollowings.find(
        (ele) => ele.user_id_2 === this.detailsVideo.user.id
      )
      return isFollowing
    },
    async loadDataCountLikes() {
      const resData = await axios.get(
        `http://127.0.0.1:8000/api/count_like/${this.$route.params.id}`
      )
      return resData.data.like
    },
    async loadDataUser() {
      // const resUser = JSON.parse(localStorage.getItem('user'))
      if (this.dataUser) {
        const resFollowings = await axios.get(
          `http://127.0.0.1:8000/api/following_user_list/${this.dataUser.id}`
        )
        this.$store.dispatch(
          'actionsetListUserFollowings',
          resFollowings.data.following
        )
      }
    },
    async changeFollowings() {
      if (this.dataUser) {
        if (!this.isFollow()) {
          await axios.post('http://127.0.0.1:8000/api/follow', {
            user_id_1: this.dataUser.id,
            user_id_2: this.detailsVideo.user.id,
          })
          this.loadDataUser()
          // window.location.reload()
        } else {
          await axios.post('http://127.0.0.1:8000/api/unfollow', {
            user_id_1: this.dataUser.id,
            user_id_2: this.detailsVideo.user.id,
          })
          this.loadDataUser()
          // window.location.reload()
        }
      } else {
        this.$notify({
          type: 'warn',
          group: 'default',
          title: 'Warning',
          text: 'Vui lòng đăng nhập để thực hiện chức năng này',
        })
      }
    },

    async loadCountLike() {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/count_like/${this.$route.params.id}`
      )
      this.detailsLikes = res.data
    },
    async loadComments() {
      const res = await axios.post('http://127.0.0.1:8000/api/load_comments', {
        user_id: this.detailsVideo.user.id,
        video_id: this.$route.params.id,
      })
      this.$store.dispatch('actionsetListComments', res.data.data)
      // this.listComments = this.getListComments
    },
  },
}
</script>
