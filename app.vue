<template>
  <div class="flex flex-col h-screen justify-center items-center bg-slate-200">
    <div class="flex">
      <h1 class="text-5xl font-bold text-gray-700">Hi, I'm Andrew.</h1>
      <h1 class="text-5xl waving">&nbsp; 👋</h1>
    </div>
    <div class="mt-4 flex">
      <NuxtLink to="/links/github" target="_blank" class="text-4xl text-gray-700 hover:text-gray-900 ml-4"><i class="fa-brands fa-github"></i></NuxtLink>
      <a href="mailto:me@andreww.co" class="text-3xl text-gray-700 hover:text-gray-900 ml-4 mt-1"><i class="fa-solid fa-envelope"></i></a>
      <NuxtLink href="/links/spotify" target="_blank" :class="'text-4xl ml-4 ' + (presence.listening_to_spotify ? 'text-[#1DD760]' : 'text-gray-700 hover:text-gray-900')"><i class="fa-brands fa-spotify"></i></NuxtLink>
      <NuxtLink href="/links/discord" target="_blank" :class="'text-4xl ml-4 ' + computedStatusClass"><i class="fa-brands fa-discord"></i></NuxtLink>
      <NuxtLink href="/links/twitter" target="_blank" class="text-4xl text-gray-700 hover:text-gray-900 ml-4"><i class="fa-brands fa-twitter"></i></NuxtLink>
      <NuxtLink href="/links/linkedin" target="_blank" class="text-4xl text-gray-700 hover:text-gray-900 ml-4"><i class="fa-brands fa-linkedin"></i></NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { LanyardData } from '~/types/lanyard'
  const { $lanyard } = useNuxtApp()


  const { data: presenceData } = await $lanyard({
    userId: '289894338132180992'
  })

  const presence = ref<LanyardData>({
    ...presenceData
  })

  const computedStatusClass = computed(() => {
    switch (presence.value.discord_status) {
      case 'online':
        return 'text-green-500 hover:text-green-700'
      case 'idle':
        return 'text-yellow-500 hover:text-yellow-700'
      case 'dnd':
        return 'text-red-500 hover:text-red-700'
      default: return 'text-gray-700 hover:text-gray-900'
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
        presence.value = {
          ...d
        }
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

