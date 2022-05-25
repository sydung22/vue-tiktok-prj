<template>
  <div v-show="showModalSignUp">
    <div
      v-show="showAlertFail"
      class="bg-red-600 text-white font-bold mb-2 mx-[-25px] py-2 text-[18px]"
    >
      Đăng ký thất bại
    </div>
    <div
      v-show="showAlertSuccess"
      class="bg-green-600 text-white font-bold mb-2 mx-[-25px] py-2 text-[18px]"
    >
      Đăng ký thành công
    </div>
    <h1 class="text-[26px] font-bold mb-5">Đăng ký bằng email</h1>
    <div class="my-4">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
        for="username"
      >
        Username
      </label>
      <input
        v-model="signup.username"
        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="username"
        type="text"
        placeholder="Username"
      />
    </div>
    <div class="my-4">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
        for="fullname"
      >
        Họ và Tên
      </label>
      <input
        v-model="signup.fullname"
        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="fullname"
        type="text"
        placeholder="Fullname"
      />
    </div>
    <div class="my-4">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
        for="email"
      >
        Email
      </label>
      <input
        v-model="signup.email"
        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="email"
        type="text"
        placeholder="Email"
      />
    </div>
    <div class="my-4">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
        for="age"
      >
        Tuổi
      </label>
      <input
        v-model="signup.age"
        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="age"
        type="number"
        placeholder="Age"
      />
    </div>
    <div class="my-4">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
        for="gender"
      >
        Giới tính
      </label>
      <div class="relative">
        <select
          v-model="signup.gender"
          class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="gender"
        >
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
        >
          <svg
            class="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="my-4">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
        for="password"
      >
        Mật khẩu
      </label>
      <input
        v-model="signup.password"
        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="password"
        type="password"
        placeholder="********"
      />
    </div>
    <div class="my-4">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
        for="confirmpassword"
      >
        Xác nhận mật khẩu
      </label>
      <input
        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="confirmpassword"
        type="password"
        placeholder="********"
      />
    </div>

    <button
      class="text-white bg-[#FE2C55] font-bold w-full flex items-center justify-center py-3 rounded-md my-5"
      @click="signUp"
    >
      Đăng Ký
    </button>
    <div class="py-4 border-t mx-[-25px]">
      <div class="font-semibold text-sm text-center">
        Bạn đã có tài khoản?
        <button
          class="text-[#FE2C55] font-bold italic hover:underline text-base"
          @click="clickShowSignIn"
        >
          Đăng nhập
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUpForm',

  props: {
    showModalSignUp: Boolean,
    clickShowSignIn: {
      type: Function,
      default: () => 1,
    },
  },
  data() {
    return {
      signup: {
        gender: 'Male',
      },
      showAlertFail: false,
      showAlertSuccess: false,
    }
  },
  methods: {
    async signUp() {
      const ip = await this.$axios.$post(
        'http://127.0.0.1:8000/api/signup',
        this.signup
      )
      window.console.log(ip)
      if (typeof ip.data !== 'undefined') {
        this.showAlertSuccess = true
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } else {
        this.showAlertFail = true
      }
    },
  },
}
</script>
<style scoped>
@import '../assets/style.css';
</style>
