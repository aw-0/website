<template>
  <div class="px-4 md:px-16 lg:px-56 xl:px-96 flex flex-col h-screen items-center font-serif bg-gradient-to-b from-white  to-orange-400">
    <div class="pt-12 text-center">
      <h1 class="text-5xl font-semibold">{{time}}, i'm andrew.</h1>
      <div class="mt-1 animate-pulse bg-gradient-to-r from-orange-400 via-purple-400 to-red-400 p-0.5 rounded-full"></div>
    </div>
    <p class="mt-4 text-xl text-center">i'm a self-taught fullstack engineer from the USA. i build cool things like <a class="italic underline" href="https://koal.us">Koal</a>, <a class="italic underline" href="https://koal.us">anstalla</a> :)</p>
    <h3 class="mt-4 text-3xl font-semibold text-center">let's chat:</h3>
    <ul class="mt-1 ">
      <li class="text-lg">&bull; <a href="mailto:me@andreww.co" class="italic underline">email</a></li>
      <li class="text-lg flex">
        &bull; 
        <NuxtLink to="/links/discord" target="_blank" class="ml-1 italic underline">
          discord
        </NuxtLink>
        <span v-if="presence.discord_status != 'offline'" class="ml-1 flex">
          <span :class="`animate-ping absolute inline-flex h-2 w-2 rounded-full opacity-75 ` + computedStatusClass"></span>
          <span :class="`relative inline-flex rounded-full h-2 w-2 ` + computedStatusClass"></span>
        </span>
      </li>
      <li class="text-lg">&bull; <NuxtLink to="/links/github" target="_blank" class="italic underline">github</NuxtLink></li>
      <li class="text-lg">&bull; <NuxtLink to="/links/twitter" target="_blank" class="italic underline">twitter</NuxtLink></li>
    </ul>
    <div v-if="presence.spotify" class="text-center">
      <h3 class="mt-4 text-3xl font-semibold">here's what i'm listening to right now:</h3>
      <div class="p-4">
        <img class="mx-auto h-32 w-32 rounded-lg border-4 border-orange-400 border-opacity-75" :src="presence.spotify.album_art_url" />
        <p class="mt-2 text-center text-xl italic">{{ presence.spotify.song }} &bull; {{ presence.spotify.artist }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { LanyardData } from '~/types/lanyard'

  const currentHour = new Date().getHours()
  const time = ref<String>("")
  if (currentHour < 12) {
    time.value = "morning";
  } else if (currentHour < 18) {
    time.value = "afternoon";
  } else {
    time.value = "evening";
  }

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

<style>
  .waving:before {
    content: attr(data-hover);
  }

  .waving:hover {
    animation-name: wave-animation;
    animation-duration: 3.0s;
    animation-iteration-count: infinite;
    transform-origin: 70% 70%;
  }

  @keyframes wave-animation {
    0% {
      transform: rotate( 0.0deg)
    }
    10% {
      transform: rotate(14.0deg)
    }
    20% {
      transform: rotate(-8.0deg)
    }
    30% {
      transform: rotate(14.0deg)
    }
    40% {
      transform: rotate(-4.0deg)
    }
    50% {
      transform: rotate(10.0deg)
    }
    60% {
      transform: rotate( 0.0deg)
    }
    100% {
      transform: rotate( 0.0deg)
    }
  }
</style>

