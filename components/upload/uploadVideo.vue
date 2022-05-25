<template>
  <div class="bg-[rgb(240, 240, 240)] py-9">
    <div
      class="bg-white w-3/5 mx-auto py-6 px-14 rounded"
      style="box-shadow: rgb(0 0 0 / 20%) 0 2px 8px"
    >
      <h2 class="text-[24px] font-bold">Tải video lên</h2>
      <h3 class="text-[18px] text-[#868484]">
        Đăng video vào tải khoản của bạn
      </h3>
      <div class="flex mt-8">
        <div class="w-[40%]">
          <div class="demoVideo text-center" v-if="srcVideo">
            <span class="text-xl font-bold italic text-gray-700 mb-3 block"
              >Demo Video</span
            >
            <video
              :src="srcVideo"
              alt="An image example with Cloudinary"
              class="w-[400px] h-auto"
              autoplay
              controls
              muted
            />
          </div>
          <label for="uploadVideo" class="cursor-pointer block mt-7" v-else>
            <div
              class="border-2 border-dashed p-5 text-center rounded-lg box-upload-video"
            >
              <img
                src="./assets/img/upload.jpg"
                alt=""
                class="w-[35px] mx-auto my-4"
              />
              <h2 class="font-bold text-[18px] mb-2">Chọn video để tải lên</h2>
              <input
                id="uploadVideo"
                class="absolute opacity-0 z-[-2]"
                type="file"
                accept=".mp4,video/mp4"
                aria-label="upload image button"
                @change="selectFileVideo"
              />
              <h3 class="font-semibold text-[17px] mb-7">
                Hoặc kéo thả tập tin
              </h3>
              <p class="mb-3 text-[#16182380]">MP4 hoặc WebM</p>
              <p class="mb-3 text-[#16182380]">Độ phân giải 720*1280 trở lên</p>
              <p class="mb-3 text-[#16182380]">Tối đa 10 phút</p>
              <p class="mb-3 text-[#16182380]">Ít hơn 2GB</p>
              <label
                for="uploadVideo"
                class="cursor-pointer relative z-10 block h-full"
              >
                <button
                  class="relative z-[-1] bg-[#2563EB] font-semibold py-2 px-7 text-white rounded my-5"
                >
                  Chọn tập tin
                </button>
              </label>
            </div>
          </label>
          <div
            class="flex border rounded mt-3 px-6 py-1 justify-between items-center"
            v-if="nameFile"
          >
            <p class="text-gray-600 text-sm">{{ nameFile }}</p>
            <label
              for="uploadVideo"
              class="text-blue-600 text-sm italic font-semibold cursor-pointer underline"
              >Thay đổi video
              <input
                id="uploadVideo"
                class="absolute opacity-0 z-[-2]"
                type="file"
                accept=".mp4,video/mp4"
                aria-label="upload image button"
                @change="selectFileVideo"
            /></label>
          </div>
        </div>
        <div class="form ml-5 flex-1 w-[60%]">
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Nội dung
            </label>
            <div class="flex items-center relative">
              <textarea
                id="username"
                class="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-[100px]"
                type="text"
                placeholder="Nội dung"
                v-model="description"
              />
              <emoji-picker
                :search="search"
                @emoji="insert"
                class="absolute right-3 top-1/2 translate-y-[-50%]"
              >
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
                    right: -300px;
                    top: 0;
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
                      <div
                        v-for="(emojiGroup, category) in emojis"
                        :key="category"
                      >
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
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Hashtag name
            </label>
            <input
              id="username"
              class="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Hashtag"
              v-model="hashtag"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="tagname"
            >
              Hashtag
            </label>
            <div class="tag-input">
              <div
                v-for="(tag, index) in tags"
                :key="tag"
                class="tag-input-tag"
              >
                <span @click="removeTag(index)">x</span>
                {{ tag }}
              </div>
              <input
                id="tagname"
                type="text"
                placeholder="Enter a Tag"
                class="tag-input-text"
                @keydown.enter="addTag"
                @keydown.delete="removeLastTag"
              />
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              Ảnh bìa
            </label>
            <div
              class="shadow border rounded p-2 flex overflow-x-auto sidebar-left"
            >
              <label
                v-for="(item, index) in listImg"
                :key="index"
                class="mr-0.5 w-[84px] h-[150px]"
              >
                <input
                  type="radio"
                  name="test"
                  :value="item"
                  checked
                  ref="detailImg"
                  @click="getValue(index)"
                />
                <img
                  :src="item"
                  alt="bg-video"
                  class="w-full h-full object-cover"
                />
              </label>
              <div
                class="bg-[#16182308] w-[84px] h-[150px]"
                v-if="listImg.length <= 0"
              ></div>
            </div>
          </div>
          <!-- This example requires Tailwind CSS v2.0+ -->
          <!-- <div class="relative inline-block text-left mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              Ai có thể xem nội dung này
            </label>
            <div>
              <button
                id="menu-button"
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                aria-expanded="true"
                aria-haspopup="true"
                @click="showSelectBox"
              >
                Công khai
                <svg
                  class="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div
              v-show="showSelect"
              class="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabindex="-1"
            >
              <div class="py-1" role="none">
                <a
                  id="menu-item-0"
                  href="#"
                  class="text-gray-700 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabindex="-1"
                  >Công khai</a
                >
                <a
                  id="menu-item-1"
                  href="#"
                  class="text-gray-700 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabindex="-1"
                  >Bạn bè</a
                >
                <a
                  id="menu-item-2"
                  href="#"
                  class="text-gray-700 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabindex="-1"
                  >Riêng tư</a
                >
              </div>
            </div>
          </div> -->
          <!-- <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              Cho phép người dùng
            </label>
            <div class="flex mt-2">
              <div class="form-check">
                <input
                  id="flexCheckDefault"
                  class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-[#2563EB] checked:border-[#2563EB] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  value=""
                  checked
                />
                <label
                  class="form-check-label inline-block text-gray-800"
                  for="flexCheckDefault"
                >
                  Bình luận
                </label>
              </div>
              <div class="form-check ml-6">
                <input
                  id="flexCheckChecked"
                  class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-[#2563EB] checked:border-[#2563EB] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  value=""
                  checked
                />
                <label
                  class="form-check-label inline-block text-gray-800"
                  for="flexCheckChecked"
                >
                  Duet
                </label>
              </div>
              <div class="form-check ml-6">
                <input
                  id="flexCheckChecked"
                  class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-[#2563EB] checked:border-[#2563EB] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  value=""
                  checked
                />
                <label
                  class="form-check-label inline-block text-gray-800"
                  for="flexCheckChecked"
                >
                  Stitch
                </label>
              </div>
            </div>
          </div> -->
          <div class="mt-2">
            <div class="flex items-center">
              <label
                class="form-check-label block text-gray-700 text-sm font-bold mr-2"
                for="flexSwitchCheckDefault"
                >Chạy quy trình kiểm tra bản quyền</label
              >
              <div class="form-check form-switch">
                <input
                  id="flexSwitchCheckDefault"
                  class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm checked:bg-[#2563EB]"
                  type="checkbox"
                  role="switch"
                />
              </div>
            </div>
            <div class="text-[13px] text-gray-500 mt-1 italic">
              Chúng tôi sẽ kiểm tra xem video của bạn có sử dụng âm thanh vi
              phạm bản quyền hay không. Nếu chúng tôi phát hiện có vi phạm, bạn
              có thể chỉnh sửa video trước khi đăng.<a
                href="#"
                class="text-[13px] font-bold text-black not-italic"
                >Tìm hiểu thêm</a
              >
            </div>
          </div>
          <div class="mt-5 flex">
            <button
              class="border px-7 py-2 text-base font-bold rounded w-[164px]"
            >
              Hủy Bỏ
            </button>
            <button
              class="bg-[#2563EB] px-7 py-2 text-base font-bold text-white rounded ml-4 w-[164px]"
              @click="showData"
            >
              Đăng Bài
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EmojiPicker } from 'vue-emoji-picker'
import VideoSnapshot from 'video-snapshot'
import axios from 'axios'
export default {
  components: {
    EmojiPicker,
  },
  data() {
    return {
      showSelect: false,
      tags: ['hello', 'world'],
      srcVideo: '',
      src: this.$cloudinary.image.url(
        `https://res.cloudinary.com/dswt194ko/image/upload/v1652616652/imageUser/l0rykkyij5skwuxuvxa1.jpg`
      ),
      listImg: [],
      description: '',
      hashtag: '',
      dataLinkImg: '',
      nameFile: '',
      input: '',
      search: '',
    }
  },
  methods: {
    insert(emoji) {
      this.description += emoji
    },
    getValue(index) {
      this.dataLinkImg = this.$refs.detailImg[index].value
    },
    async showData() {
      await this.$cloudinary
        .upload(this.dataLinkImg, {
          folder: 'imageUser',
          uploadPreset: 'q4qrbvqz',
        })
        .then((res) => (this.src = res.secure_url))
      // this.dataUpdateObj.avatar = this.src
      console.log(this.src)
      if (this.hashtag !== '' && this.description !== '') {
        const resVideo = await axios.post(
          'http://127.0.0.1:8000/api/upload_video',
          {
            url: this.srcVideo,
            description: this.description,
            user_id: 14,
            hashtag_name: this.hashtag,
            background_video: this.src,
          }
        )
        window.console.log(resVideo)
        this.$notify({
          type: 'success',
          group: 'default',
          title: 'Success',
          text: 'Tải bài đăng thành công',
        })
        setTimeout(() => {
          this.$router.push('/')
        }, 1000)
      } else {
        this.$notify({
          type: 'warn',
          group: 'default',
          title: 'Warning',
          text: 'Vui lòng điền đầy đủ nội dung video',
        })
      }
    },
    showSelectBox() {
      this.showSelect = !this.showSelect
    },
    addTag(event) {
      event.preventDefault()
      const val = event.target.value.trim()
      window.console.log(val)
      if (val.length) {
        this.tags.push(val)
        event.target.value = ''
        window.console.log(this.tags)
      }
    },
    removeTag(index) {
      this.tags.splice(index, 1)
    },
    removeLastTag(event) {
      if (event.target.value.length === 0) {
        this.removeTag(this.tags.length - 1)
      }
    },
    async selectFileVideo(e) {
      const file = e.target.files[0]
      /* Make sure file exists */
      if (!file) return

      /* create a reader */
      const readData = (f) =>
        new Promise((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.readAsDataURL(f)
        }).then((res) => res)

      /* Read data */
      const data = await readData(file)
      /* upload the converted data */
      const instance = await this.$cloudinary
        .upload(data, {
          folder: 'videoUser',
          uploadPreset: 'ihmfg0bi',
        })
        .then((res) => (this.srcVideo = res.secure_url))
      //  secure_url)
      this.nameFile = file.name

      const snapshoter = new VideoSnapshot(e.target.files[0])
      const arr = []
      for (let i = 0; i < 3; i += 0.3) {
        const previewSrc = await snapshoter.takeSnapshot(i)
        arr.push(previewSrc)
      }
      this.listImg = arr
      console.log(instance)
    },
  },
}
</script>
<style scoped>
.tag-input {
  width: 100%;
  border: 1px solid #eee;
  font-size: 0.9em;
  height: 50px;
  box-sizing: border-box;
  padding: 0 10px;
}

.tag-input-tag {
  height: 30px;
  float: left;
  margin-right: 10px;
  background-color: #eee;
  margin-top: 10px;
  line-height: 30px;
  padding: 0 5px;
  border-radius: 5px;
}

.tag-input-tag > span {
  cursor: pointer;
  opacity: 0.75;
}

.tag-input-text {
  border: none;
  outline: none;
  font-size: 0.9em;
  line-height: 50px;
  background: none;
}

.box-upload-video:hover {
  background: rgba(22 24 35/ 3%);
  border-color: #2563eb;
}

.sidebar-left {
  transition: 0.5s;
  max-width: 610px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(87px, 1fr));
  grid-auto-flow: column;
  grid-auto-columns: auto;
  scroll-snap-type: x mandatory;
  scroll-snap-stop: always;
  overflow-x: auto;
  padding: 14px;
}

.sidebar-left::-webkit-scrollbar-track {
  background-color: #fff;
  border-radius: 20px;
}

.sidebar-left::-webkit-scrollbar {
  width: 8px;
  background-color: #fff;
}

.sidebar-left::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #ccc;
}

[type='radio'] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

/* IMAGE STYLES */
[type='radio'] + img {
  cursor: pointer;
  opacity: 0.7;
  position: relative;
}

/* CHECKED STYLES */
[type='radio']:checked + img {
  outline: 2px solid #2563eb;
  opacity: 1.5;
  transform: scale(1.15);
  z-index: 10;
}
</style>
