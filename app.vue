<template>
  <div class="px-8 md:px-16 xl:px-96 h-screen font-serif bg-orange-50">
    <div class="pt-12 flex flex-col items-center">
      <div class="flex gap-8">
        <img class="ml-2 h-48 w-48 rounded-full border-4 border-amber-400 border-opacity-75" src="/me.jpg" />
        <h1 class="text-5xl font-semibold my-auto">👋 heya, i'm andrew.</h1>
      </div>
    </div>
    <div class="grid md:grid-cols-2 mt-10 gap-4 h-fit">
      <div class="bg-orange-100 border-2 border-amber-200 rounded-lg p-4">
        <p class="text-2xl">i'm a self-taught fullstack engineer from the Windy City. i tinker with cool things like <a class="italic hover:underline decoration-wavy decoration-amber-500" href="https://stevenson.space" target="_blank">stevenson.space</a> and <a class="italic hover:underline decoration-wavy decoration-amber-500" href="https://shsmaps.com" target="_blank">SHSMaps</a>, and build out features in <a class="italic hover:underline decoration-wavy decoration-amber-500" href="https://digitalconcierge.io" target="_blank">DigitalConcierge</a>.</p>
        <p class="mt-4 text-2xl">recently, i've spent the past 6 months organizing <a class="italic hover:underline decoration-wavy decoration-amber-500" href="https://windycityhacks.com" target="_blank">Windy City Hacks</a>, one of the only 2024 hackathons in the Chicagoland area. we raised over $4k with over 100 students registered to build something amazing over 24 hours. we offered three meals & dessert, various swag, and prizes for eighteen attendees :)</p>
      </div>
      <div class="bg-orange-100 border-2 border-amber-200 rounded-lg p-4 flex flex-col">
        <p class="text-3xl">my <i class="mr-1.5">very</i> recent work:</p>
        <ul class="ml-6 mt-4 text-2xl marker:text-amber-500 flex flex-col items-center">
          <li>
            <a href="/links/koal" target="_blank" class="flex italic hover:underline decoration-wavy decoration-amber-500 mb-2">
              <img class="h-10 w-10 rounded-md border-2 border-amber-500" src="https://avatars.githubusercontent.com/u/48663984?" /> <p class="my-auto ml-2">windycityhacks/site: fix times for tmrw</p>
            </a>
          </li>
          <li>
            <a href="/links/koal" target="_blank" class="flex italic hover:underline decoration-wavy decoration-amber-500 mb-2">
              <img class="h-10 w-10 rounded-md border-2 border-amber-500" src="https://avatars.githubusercontent.com/u/48663984?" /> <p class="my-auto ml-2">windycityhacks/site: fix times for tmrw</p>
            </a>
          </li>
          <li>
            <a href="/links/koal" target="_blank" class="flex italic hover:underline decoration-wavy decoration-amber-500 mb-2">
              <img class="h-10 w-10 rounded-md border-2 border-amber-500" src="https://avatars.githubusercontent.com/u/48663984?" /> <p class="my-auto ml-2">windycityhacks/site: fix times for tmrw</p>
            </a>
          </li>
          <li>
            <a href="/links/koal" target="_blank" class="flex italic hover:underline decoration-wavy decoration-amber-500 mb-2">
              <img class="h-10 w-10 rounded-md border-2 border-amber-500" src="https://avatars.githubusercontent.com/u/48663984?" /> <p class="my-auto ml-2">windycityhacks/site: fix times for tmrw</p>
            </a>
          </li>
          <li>
            <a href="/links/koal" target="_blank" class="flex italic hover:underline decoration-wavy decoration-amber-500 mb-4">
              <img class="h-10 w-10 rounded-md border-2 border-amber-500" src="https://avatars.githubusercontent.com/u/48663984?" /> <p class="my-auto ml-2">windycityhacks/site: fix times for tmrw</p>
            </a>
          </li>
        </ul>
        <p class="text-lg mt-auto">commits from <NuxtLink to="/links/github" target="_blank" class="italic hover:underline decoration-wavy decoration-amber-500">my github</NuxtLink></p>
      </div>
      <div class="bg-orange-100 border-2 border-amber-200 rounded-lg p-4 flex flex-col">
        <p class="text-3xl">my top songs this month:</p>
        <div class="grid grid-cols-2 grid-rows-2 gap-4 mt-4">
          
        </div>
      </div>
    </div>
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

