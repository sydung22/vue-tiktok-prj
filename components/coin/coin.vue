<template>
  <div class="bg-[rgb(240, 240, 240)] py-9">
    <div
      class="bg-white w-3/5 mx-auto py-6 px-14 rounded"
      style="box-shadow: rgb(0 0 0 / 20%) 0 2px 8px"
    >
      <span class="text-2xl font-bold mb-5 block">Tình trạng xu</span>
      <div
        class="flex py-4 px-5 bg-[#eee] min-w-[235px] max-w-full w-max rounded-md items-center justify-center"
      >
        <img
          class="w-[47px] h-[47px] rounded-full"
          src="https://scontent.fdad3-5.fna.fbcdn.net/v/t1.6435-9/131983622_1764246023751239_4482106337413797845_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=BmEir26yWkQAX8QdVK7&_nc_ht=scontent.fdad3-5.fna&oh=00_AT_YfTb67B865zs3QO87Nx6dvbr0tMM6RNLtQkF5BitA0g&oe=62B4AA8D"
          alt=""
        />
        <div class="ml-3">
          <h2 class="font-bold italic">Nguyễn Sỹ Dũng</h2>
          <p class="flex items-center text-sm mt-0.5">
            <img
              class="w-4 h-4 mr-1"
              src="https://cdn-icons-png.flaticon.com/512/306/306079.png"
              alt=""
            />
            0
          </p>
        </div>
      </div>
      <div class="font-bold mt-6 text-lg">
        <span class="text-blue-600 font-semibold">Hướng dẫn:</span> Cách tích
        điểm xu cá nhân trong khi sử dụng UTENews
      </div>
      <div class="py-5 grid grid-cols-4 gap-4">
        <div
          class="border rounded inline-block px-10 py-2 text-center"
          v-for="i in 8"
          :key="i"
        >
          <div class="flex items-center text-lg justify-center">
            <span class="mdi mdi-arrow-up-thick text-lg text-red-600"></span>
            <img
              class="w-6 h-6 mr-1"
              src="https://cdn-icons-png.flaticon.com/512/306/306079.png"
              alt=""
            />
            50
          </div>
          <p class="font-semibold text-gray-600 italic mt-1.5">Đăng bài viết</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoinContainer',
}
</script>
