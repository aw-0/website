<template>
  <div class="px-4 md:px-16 lg:px-56 xl:px-96 flex flex-col h-screen items-center font-serif bg-gradient-to-b from-white  to-orange-400">
    <div class="pt-12 text-center">
      <h1 class="text-5xl font-semibold">{{ time }}, i'm andrew.</h1>
      <div class="mt-1 animate-pulse bg-gradient-to-r from-orange-400 via-purple-400 to-red-400 p-0.5 rounded-full"></div>
    </div>
    <p class="mt-4 text-xl text-center">i'm a self-taught fullstack engineer from the USA. i build cool things like <a class="italic hover:underline" href="https://koal.us" target="_blank">Koal</a> and <a class="italic hover:underline" href="https://stevenson.space" target="_blank">stevenson.space</a> :)</p>
    <h3 class="mt-4 text-3xl font-semibold text-center">let's chat:</h3>
    <ul class="mt-1 ">
      <li class="text-lg">&bull; <a href="mailto:me@andreww.co" class="italic hover:underline">email</a></li>
      <li class="text-lg flex">
        &bull; 
        <NuxtLink to="/links/discord" target="_blank" class="ml-1 italic hover:underline">
          discord
        </NuxtLink>
        <span v-if="presence.discord_status != 'offline'" class="ml-1 flex">
          <span :class="`animate-ping absolute inline-flex h-2 w-2 rounded-full opacity-75 ` + computedStatusClass"></span>
          <span :class="`relative inline-flex rounded-full h-2 w-2 ` + computedStatusClass"></span>
        </span>
      </li>
      <li class="text-lg">&bull; <NuxtLink to="/links/github" target="_blank" class="italic hover:underline">github</NuxtLink></li>
      <li class="text-lg">&bull; <NuxtLink to="/links/linkedin" target="_blank" class="italic hover:underline">linkedin</NuxtLink></li>
      <li class="text-lg">&bull; <NuxtLink to="/links/twitter" target="_blank" class="italic hover:underline">twitter</NuxtLink></li>
    </ul>
    <div v-if="presence.spotify" class="text-center">
      <h3 class="mt-4 text-3xl font-semibold">here's what i'm listening to right now:</h3>
      <div class="p-4">
        <img class="mx-auto mb-2 h-32 w-32 rounded-lg border-4 border-orange-400 border-opacity-75" :src="presence.spotify.album_art_url" />
        <a :href="`https://open.spotify.com/track/${presence.spotify.track_id}`" target="_blank" class="text-center hover:underline text-xl italic">{{ presence.spotify.song }} &bull; {{ presence.spotify.artist }}</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { LanyardData } from '@/types/lanyard'
  import { ref, onMounted, computed } from 'vue'

  const { data: time } = await useAsyncData(async () => {
    const currentHour = new Date().getHours()
    const time = ref<String>("hiya")
    if (currentHour < 12) {
      return "morning";
    } else if (currentHour < 18) {
      return "afternoon";
    } else {
      return "evening";
    }
  })

  const { $lanyard } = useNuxtApp()
  const { data: presenceData } = await $lanyard({
    userId: '289894338132180992'
  })
  const presence = ref<LanyardData>(presenceData)
  const computedStatusClass = computed(() => {
    switch (presence.value.discord_status) {
      case 'online':
        return 'bg-green-500'
      case 'idle':
        return 'bg-yellow-500'
      case 'dnd':
        return 'bg-red-500'
      default: return 'bg-gray-700'
    }
  })

  onMounted(async () => {
    const socket = await $lanyard({
      userId: '289894338132180992',
      socket: true
    })
    socket.addEventListener('message', ({ data }) => {
      const { d } = JSON.parse(data)
      if (!d.heartbeat_interval) {
        presence.value = d
      }
    })
  })
</script>

