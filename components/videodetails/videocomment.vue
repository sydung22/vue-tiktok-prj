<template>
  <div class="w-[30%] pt-8 flex flex-col h-[100vh]">
    <div class="pb-4 border-b px-8">
      <div class="flex justify-between items-center pt-[22px] pb-4">
        <div class="flex items-center">
          <img
            class="w-[45px] h-[45px] object-cover rounded-full"
            :src="avatar"
            alt=""
          />
          <div class="ml-[12px]">
            <h2 class="text-[18px] font-bold leading-[25px]">{{ userName }}</h2>
            <h3 class="text-[14px] italic">{{ fullName }}</h3>
          </div>
        </div>
        <!-- <button
          class="border rounded-md text-[#FE2C55] border-[#FE2C55] font-semibold px-8 py-1.5"
        >
          Follow
        </button> -->
        <button
          v-if="dataUser && videoDataUser !== dataUser.id"
          class="text-[#fe2c55] border border-[#fe2c55] py-[2px] px-[24px] font-semibold rounded-md text-[16px] hover:bg-[#faeef1] duration-300"
          :style="
            !isFollow()
              ? {
                  color: '#fe2c55',
                  border: '1px solid #fe2c55',
                  padding: '6px 32px',
                }
              : {
                  color: '#000',
                  border: '1px solid #ccc',
                  padding: '6px 14px',
                }
          "
          @click="changeFollowings"
        >
          {{ !isFollow() ? 'Follow' : 'Đang Follow' }}
        </button>
      </div>
      <p>{{ description }}</p>
      <a
        href="#"
        class="font-bold text-[16px] flex items-center my-1 hover:underline"
      >
        {{ hashtag }}
      </a>
      <div class="flex justify-between items-center py-4">
        <div class="flex items-center">
          <div class="flex items-center">
            <div
              class="w-[32px] h-[32px] rounded-full flex justify-center items-center bg-[#eee]"
            >
              <button
                class="mdi mdi-heart text-[20px] cursor-pointer button-heart w-[32px] h-[32px]"
                :style="changeColor ? { color: '#fe2c55' } : { color: '#000' }"
                @click="changeHeart"
              ></button>
            </div>
            <p
              class="text-[12px] font-semibold text-[#161823] my-1 ml-2 semibold"
            >
              {{ countLike }}
            </p>
          </div>
          <div class="flex items-center ml-[20px]">
            <a
              href="#"
              class="w-[32px] h-[32px] rounded-full flex justify-center items-center bg-[#eee]"
            >
              <span class="mdi mdi-comment-multiple text-[17px]"></span>
            </a>
            <p
              class="text-[12px] font-semibold text-[#161823] my-1 ml-2 semibold"
            >
              {{ listComments.length }}
            </p>
          </div>
        </div>
        <div class="flex">
          <a
            :href="urlVideo"
            class="mdi mdi-download text-[17px] w-7 h-7 flex items-center justify-center text-black rounded-full bg-[#eee] mr-2 list-icon-share"
          ></a>
          <span
            class="mdi mdi-send text-[15px] w-7 h-7 flex items-center pl-2 bg-[#FE2C55] text-white rounded-full rotate-[-40deg] mr-2 list-icon-share"
          ></span>
          <a
            href="https://www.facebook.com/sharer/sharer.php?u=example.org"
            target="_blank"
            class="mdi mdi-facebook text-[32px] w-7 h-7 flex items-center justify-center text-[#0075fa] rounded-full mr-2 list-icon-share"
          ></a>
          <span
            class="mdi mdi-whatsapp text-[15px] w-7 h-7 flex items-center justify-center text-white rounded-full bg-green-500 mr-2 list-icon-share"
          ></span>
          <span
            class="mdi mdi-twitter text-[17px] w-7 h-7 flex items-center justify-center text-white rounded-full bg-[#1da1f2] mr-2 list-icon-share"
          ></span>
          <span
            class="mdi mdi-share text-[17px] w-7 h-7 flex items-center justify-center text-black rounded-full bg-[#eee] list-icon-share"
          ></span>
        </div>
      </div>
      <div class="border rounded-sm mt-4 text-[14px] flex">
        <p
          class="text-ellipsis overflow-hidden whitespace-nowrap pl-2 py-1.5 pr-1 bg-[#eee]"
          style="flex: 1 1 auto"
        >
          {{ urlDetails }}
        </p>
        <button class="font-semibold py-1.5 px-4" style="flex: 0 0 auto">
          Sao chép liên kết
        </button>
      </div>
    </div>
    <div
      class="w-full bottom-0 sidebar-left bg-[#f8f8f8] max-h-full box-comment py-2 h-full"
      style="overflow: hidden auto"
    >
      <div v-if="dataUser && listComments.length">
        <div
          v-for="(item, index) in listComments"
          :key="index"
          class="flex justify-between py-3 px-8 border-b"
        >
          <div class="flex">
            <a href="#" class="mr-3"
              ><img
                :src="item.user.avatar"
                alt=""
                class="w-[40px] h-[40px] object-cover rounded-full"
            /></a>
            <div class="w-[340px]">
              <h2 class="text-[18px] font-bold leading-6">
                {{ item.user.username }}
              </h2>
              <p class="leading-5 mt-1 mb-2">{{ item.content }}</p>
              <div class="flex text-[14px] text-[#16182380]">
                <p class="mr-6">
                  {{ timeCreated(item.created_at) }}
                </p>
                <p class="cursor-pointer" @click="repCmt(item.id)">Trả Lời</p>
              </div>
              <span
                v-if="dataUser && loadReplies(item.id).length > 0"
                class="text-gray-500 mt-2 inline-block cursor-pointer text-[14px] font-semibold italic"
                @click="showReply(index)"
                >{{
                  showIndex === index
                    ? 'Ẩn câu trả lời'
                    : 'Xem thêm câu trả lời'
                }}</span
              >
              <div
                v-show="showIndex === index"
                v-if="dataUser && loadReplies(item.id).length > 0"
                class="mt-3"
              >
                <div
                  v-for="(itemReply, indexReply) in loadReplies(item.id)"
                  :key="indexReply"
                  class="flex mt-3 justify-between"
                >
                  <div class="flex">
                    <a href="#" class="mr-3"
                      ><img
                        :src="itemReply.user.avatar"
                        alt=""
                        class="w-[40px] h-[40px] object-cover rounded-full"
                    /></a>
                    <div>
                      <h2 class="text-[18px] font-bold leading-6">
                        {{ itemReply.user.username }}
                      </h2>
                      <p class="leading-5 mt-1 mb-2">
                        {{ itemReply.content }}
                      </p>
                      <div class="flex text-[14px] text-[#16182380]">
                        <p class="mr-6">
                          {{ timeCreated(itemReply.created_at) }}
                        </p>
                        <p>Trả Lời</p>
                      </div>
                    </div>
                  </div>
                  <div class="text-center leading-4 ml-[70px] mt-3">
                    <span
                      class="mdi mdi-heart text-[20px] cursor-pointer"
                      :style="false ? { color: '#fe2c55' } : { color: '#000' }"
                      @click="changeHeart"
                    ></span>
                    <p class="text-[12px]">0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center leading-4 mt-3">
            <button
              class="mdi mdi-heart text-[20px] cursor-pointer button-heart"
              :style="isLike(index) ? { color: '#fe2c55' } : { color: '#000' }"
              @click="onLikeComment(index)"
            ></button>
            <p class="text-[12px]">{{ loadCountLikeComment(index) }}</p>
          </div>
        </div>
      </div>
      <div
        v-else-if="dataUser && listComments.length <= 0"
        class="font-bold italic text-lg text-center"
      >
        Chưa có bình luận nào
      </div>
      <div v-else class="font-bold italic text-xl text-center mt-[150px]">
        Vui lòng đăng nhập để xem nội dung bình luận
      </div>
    </div>
    <div class="px-8 py-5 relative">
      <div
        v-show="showUpReply"
        class="absolute left-0 bottom-[83px] bg-[#f0eeee] px-8 py-2 border w-full flex justify-between"
      >
        <div>
          <p class="font-bold text-[17px]">
            Đang trả lời
            <span
              v-if="repCmtData.user && repCmtData.user.id === dataUser.id"
              class="text-blue-600 font-bold italic text-[17px]"
              >chính mình</span
            >
            <span v-else class="text-blue-600 font-bold italic text-[17px]">{{
              repCmtData.user && repCmtData.user.username
            }}</span>
          </p>
          <p class="text-gray-600">{{ repCmtData.content }}</p>
        </div>
        <span
          class="mdi mdi-close-box text-[18px] text-[#aaa] cursor-pointer"
          @click="showUpReply = false"
        ></span>
      </div>
      <div class="flex items-center">
        <div
          class="flex items-center bg-[#1618230f] w-[432px] py-[5px] px-4 rounded-md"
        >
          <input
            v-model="commentContent"
            type="text"
            class="w-[328px] focus:outline-none bg-transparent text-[15px]"
            placeholder="Thêm bình luận..."
          />
          <span class="font-bold text-[22px] text-[#161823] ml-4">@</span>

          <emoji-picker :search="search" @emoji="insert">
            <div
              slot="emoji-invoker"
              slot-scope="{ events: { click: clickEvent } }"
              @click.stop="clickEvent"
            >
              <span
                class="mdi mdi-emoticon-happy-outline text-[22px] text-[#161823] mt-1 ml-3 cursor-pointer"
              ></span>
            </div>
            <div
              slot="emoji-picker"
              slot-scope="{ emojis, insert }"
              style="
                position: absolute;
                right: 20px;
                bottom: 70px;
                width: 300px;
                height: 300px;
                background-color: #fff;
                padding: 10px;
                overflow-y: scroll;
                border-radius: 8px;
              "
            >
              <div>
                <div>
                  <div v-for="(emojiGroup, category) in emojis" :key="category">
                    <h5>{{ category }}</h5>
                    <div>
                      <span
                        v-for="(emoji, emojiName) in emojiGroup"
                        :key="emojiName"
                        class="cursor-grabbing"
                        :title="emojiName"
                        @click="insert(emoji)"
                        >{{ emoji }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </emoji-picker>
        </div>
        <button
          class="text-[16px] text-white bg-[#FE2C55] ml-4 font-semibold py-1.5 px-5 rounded-md hover:opacity-80 duration-200"
          @click="saveComment"
        >
          Đăng
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { EmojiPicker } from 'vue-emoji-picker'
import moment from 'moment'

import axios from 'axios'
export default {
  name: 'VideoCommentContainer',
  components: {
    EmojiPicker,
  },
  props: {
    userName: {
      type: String,
      default: '',
    },
    fullName: {
      type: String,
      default: '',
    },
    hashtag: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: '',
    },
    urlDetails: {
      type: String,
      default: '',
    },
    countLike: {
      type: Number,
      default: 0,
    },
    listComments: {
      type: Array,
      default: () => [],
    },
    videoDataUser: {
      type: Number,
      default: 0,
    },
    isFollow: {
      type: Function,
      default: () => 1,
    },
    changeFollowings: {
      type: Function,
      default: () => 1,
    },
    urlVideo: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      changeColor: false,
      replyComment: 'Xem thêm câu trả lời',
      showComment: false,
      commentContent: '',
      detailsVideo: {},
      input: '',
      search: '',
      dataUser: {},
      detailsLikes: {},
      dataReplies: {},
      listLikeComments: [],
      listCheckLikeComments: [],
      showIndex: null,
      showUpReply: false,
      repCmtData: {},
      listReply: [],
    }
  },
  computed: {
    listCmt() {
      return this.listComments
    },
    getListReplyComments() {
      return this.$store.state.listReplyComments
    },
    getCountLikeCmt() {
      return this.$store.state.listCountCmtLikes
    },
  },
  // watch: {
  //   getListReplyComments() {
  //     this.loadReplyComments()
  //   },
  // },
  async mounted() {
    const resUser = JSON.parse(localStorage.getItem('user'))
    this.dataUser = resUser
    if (this.dataUser) {
      this.loadCountLike()
      const resLikeVideo = await axios.post(
        'http://127.0.0.1:8000/api/check_like_video',
        {
          user_id: this.dataUser.id,
          video_id: Number(this.$route.params.id),
        }
      )
      // window.console.log(resLikeVideo)
      if (resLikeVideo.data.alert === 200) {
        this.changeColor = true
      } else {
        this.changeColor = false
      }
    }
    this.loadReplyComments()
    this.loadDetailCmt()
    // window.console.log(this.listLikeComments)
    // window.console.log(this.loadReplies(2))
    // window.console.log(this.loadCountLikeComment(1))
  },

  methods: {
    repCmt(id) {
      const res = this.listCmt.find((data) => data.id === id)
      this.repCmtData = res
      this.showUpReply = true
      // window.console.log(typeof this.repCmtData.user)
    },
    timeCreated(value) {
      return moment(value).format('MM-DD-YYYY')
    },
    async loadCountLike() {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/count_like/${this.$route.params.id}`
      )
      this.detailsLikes = res.data
      this.$store.dispatch('actionsetCountLikeVideos', this.detailsLikes.like)
    },
    async changeHeart() {
      if (this.dataUser) {
        if (this.changeColor === true) {
          await axios.post('http://127.0.0.1:8000/api/dislike_video', {
            user_id: this.dataUser.id,
            video_id: Number(this.$route.params.id),
          })
          this.changeColor = false
          this.$notify({
            type: 'success',
            group: 'default',
            title: 'Success',
            text: 'Bạn vừa bỏ thích bài đăng này',
          })
          this.loadCountLike()
          // window.console.log(resData)
        } else {
          await axios.post('http://127.0.0.1:8000/api/like_video', {
            user_id: this.dataUser.id,
            video_id: Number(this.$route.params.id),
          })
          this.changeColor = true
          this.$notify({
            type: 'success',
            group: 'default',
            title: 'Success',
            text: 'Bạn vừa bỏ thích bài đăng này',
          })
          this.loadCountLike()

          // window.console.log(resData)
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
    insert(emoji) {
      this.commentContent += emoji
    },
    async loadComments() {
      const resDataVideo = await axios.get(
        `http://127.0.0.1:8000/api/get_video/${this.$route.params.id}`
      )
      this.detailsVideo = resDataVideo.data.data
      const res = await axios.post('http://127.0.0.1:8000/api/load_comments', {
        user_id: this.detailsVideo.user.id,
        video_id: this.$route.params.id,
      })
      // window.console.log(res.data.data)
      this.$store.dispatch('actionsetListComments', res.data.data)
    },
    async loadReplyComments() {
      if (this.dataUser) {
        const res = await axios.post(
          `http://127.0.0.1:8000/api/load_replies`,
          this.dataUser.id
        )
        this.$store.dispatch('actionsetListReplyComments', res.data.data)
        // this.listReply = this.getListReplyComments
      }
    },
    async saveComment() {
      const resUser = JSON.parse(localStorage.getItem('user'))
      if (resUser) {
        if (this.showUpReply === false) {
          const res = await axios.post('http://127.0.0.1:8000/api/comments', {
            content: this.commentContent,
            user_id: resUser.id,
            video_id: this.$route.params.id,
          })
          this.loadComments()
          this.loadDetailCmt()
          window.console.log(res)
          this.commentContent = ''
          this.$notify({
            type: 'success',
            group: 'default',
            title: 'Success',
            text: 'Bạn vừa bình luận bài viết này',
          })
        } else {
          const res = await axios.post('http://127.0.0.1:8000/api/replies', {
            content: this.commentContent,
            user_id: resUser.id,
            comment_id: this.repCmtData.id,
          })
          this.loadReplyComments()
          window.console.log(res)
          this.commentContent = ''
          this.showUpReply = false
          this.$notify({
            type: 'success',
            group: 'default',
            title: 'Success',
            text: 'Bạn vừa trả lời câu bình luận này',
          })
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
    loadCountLikeComment(index) {
      return this.getCountLikeCmt[index]
    },
    loadReplies(id) {
      // const listReply = this.dataReplies.data.data
      const dataReply = this.getListReplyComments.filter(
        (el) => el.comment_id === id
      )
      // window.console.log(dataReply)
      return dataReply
    },
    async loadCountLikeReplies(id) {
      const res = await axios.post(
        `http://127.0.0.1:8000/api/load_replies`,
        this.dataUser.id
      )
      const dataCountLikeReply = res.data.data_count.filter(
        (el) => el.comment_id === id
      )
      // window.console.log(dataReply)
      return dataCountLikeReply
    },
    showReply(index) {
      if (this.showIndex !== index) {
        this.showIndex = index
      } else {
        this.showIndex = null
      }
    },
    async loadDetailCmt() {
      if (this.dataUser) {
        const reslistLikeComments = await axios.post(
          `http://127.0.0.1:8000/api/load_comments`,
          { user_id: this.dataUser.id, video_id: this.$route.params.id }
        )

        this.listLikeComments = reslistLikeComments.data.data_count
        this.listCheckLikeComments = reslistLikeComments.data.data_check
        this.$store.dispatch(
          'actionsetListCountCmtLikes',
          reslistLikeComments.data.data_count
        )
      }
    },
    isLike(index) {
      if (this.listCheckLikeComments[index] === 1) {
        return true
      } else {
        return false
      }
    },
    async onLikeComment(index) {
      if (this.dataUser) {
        const reslistLikeComments = await axios.post(
          `http://127.0.0.1:8000/api/load_comments`,
          { user_id: this.dataUser.id, video_id: this.$route.params.id }
        )
        const listCmt = reslistLikeComments.data.data
        // window.console.log(listCmt[index])
        if (this.listCheckLikeComments[index] === 1) {
          await axios.post('http://127.0.0.1:8000/api/delete_like_cmt', {
            user_id: this.dataUser.id,
            comment_id: listCmt[index].id,
          })
          this.$notify({
            type: 'success',
            group: 'default',
            title: 'Success',
            text: 'Bạn vừa bỏ thích bình luận này',
          })
          this.loadDetailCmt()
        } else {
          await axios.post('http://127.0.0.1:8000/api/like_comment', {
            user_id: this.dataUser.id,
            comment_id: listCmt[index].id,
            status: 1,
          })
          this.$notify({
            type: 'success',
            group: 'default',
            title: 'Success',
            text: 'Bạn vừa thích bình luận này',
          })
          this.loadDetailCmt()
        }
      }
    },
  },
}
</script>
<style scoped>
.box-comment::-webkit-scrollbar-track {
  background-color: #fff;
  border-radius: 20px;
}

.box-comment::-webkit-scrollbar {
  width: 8px;
  background-color: #fff;
}

.box-comment::-webkit-scrollbar-thumb {
  border-radius: 12px;
  background-color: #ddd;
}

.list-icon-share {
  cursor: pointer;
  transition: all 0.5s;
}

.list-icon-share:hover {
  transform: translateY(-5px);
}

.button-heart {
  transition-duration: 0.3s;
  position: relative;
}

.button-heart::after {
  content: '';
  display: block;
  position: absolute;
  border-radius: 50%;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: all 0.4s;
  box-shadow: 0 0 10px 30px #fe2c55;
}

.button-heart:active::after {
  box-shadow: 0 0 0 0 #fe2c55;
  position: absolute;
  border-radius: 50%;
  left: 0;
  top: 0;
  opacity: 1;
  transition: 0s;
}

.button-heart:active {
  transform: translateY(5px);
}
</style>
