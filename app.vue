<template>
  <div class="px-8 lg:px-24 xl:px-34 2xl:px-48 min-[2000px]:px-[500px] min-[2500px]:px-[800px] h-full md:h-screen font-serif bg-orange-50">
    <div class="pt-12 flex flex-col items-center">
      <div class="md:flex gap-8">
        <div class="flex flex-col items-center">
          <img class="ml-2 h-48 w-48 rounded-full border-4 border-amber-400 border-opacity-75" src="/me.jpg" />
        </div>
        <div class="mt-4 md:my-auto">
          <h1 class="text-5xl font-semibold my-auto">👋 heya, i'm andrew.</h1>
          <p v-if="presence.spotify" class="text-xl text-center">i'm listening to <a :href="`https://open.spotify.com/track/${presence.spotify.track_id}`" target="_blank" class="italic hover:underline decoration-wavy decoration-amber-500">{{ presence.spotify.song }} &bull; {{ presence.spotify.artist.split(';')[0] }}</a> right now <span class="animate-pulse">🎧</span></p>
        </div>
      </div>
    </div>
    <div class="grid md:grid-cols-2 mt-10 gap-4 h-fit">
      <div class="bg-orange-100 border-2 border-amber-200 rounded-lg p-4 text-2xl xl:text-3xl">
        <p class="">i'm a self-taught fullstack engineer from the Windy City. i tinker with cool things like <a class="italic hover:underline decoration-wavy decoration-amber-500" href="https://stevenson.space" target="_blank">stevenson.space</a> and build out features in <a class="italic hover:underline decoration-wavy decoration-amber-500" href="https://digitalconcierge.io" target="_blank">DigitalConcierge</a>.</p>
        <p class="mt-4">recently, i've spent the past 6 months organizing <a class="italic hover:underline decoration-wavy decoration-amber-500" href="https://windycityhacks.com" target="_blank">Windy City Hacks</a>, one of the only 2024 hackathons in the Chicagoland area. we raised over $4k with over 100 students registered to build something amazing over 24 hours. we offered three meals & dessert, various swag, and prizes for eighteen attendees :)</p>
      </div>
      <div class="bg-orange-100 border-2 border-amber-200 rounded-lg p-4">
        <h3 class="text-3xl">let's chat:</h3>
        <ul class="mt-1 text-5xl italic text-center">
          <li class="mt-2 mb-2"><a href="mailto:me@andreww.co" class="hover:underline decoration-wavy decoration-amber-500">email</a></li>
          <li class="mb-2"><NuxtLink to="/links/twitter" target="_blank" class="hover:underline decoration-wavy decoration-amber-500">twitter</NuxtLink></li>
          <li class="mb-2"><NuxtLink to="/links/linkedin" target="_blank" class="hover:underline decoration-wavy decoration-amber-500">linkedin</NuxtLink></li>
          <li class="mb-2 flex flex-col items-center">
            <div class="flex"> 
              <NuxtLink to="/links/discord" target="_blank" class="ml-1 hover:underline decoration-wavy decoration-amber-500">
                discord
              </NuxtLink>
              <span v-if="presence.discord_status != 'offline'" class="ml-2.5 flex">
                <span :class="`animate-ping absolute inline-flex h-3 w-3 rounded-full opacity-75 ` + computedStatusClass"></span>
                <span :class="`relative inline-flex rounded-full h-3 w-3 ` + computedStatusClass"></span>
              </span>
            </div>
          </li>
          <li class="mb-2"><NuxtLink to="/links/github" target="_blank" class="hover:underline decoration-wavy decoration-amber-500">github</NuxtLink></li>
        </ul>
      </div>
      <div class="bg-orange-100 border-2 border-amber-200 rounded-lg p-4 flex flex-col">
        <p class="text-3xl">my <i class="mr-1">very</i> recent work:</p>
        <div class="my-auto">
        <ul class="mt-4 text-xl marker:text-amber-500 font-mono">
          <li v-if="latestCommits.length == 0" v-for="index in 4" :key="index" class="flex gap-4 mb-4">
            <div class="p-6 bg-orange-200 animate-pulse rounded-md"></div>
            <div class="my-2 p-4 bg-orange-200 animate-pulse rounded-md w-2/3"></div>
          </li>
          <li v-for="commit in latestCommits" :key="commit.id">
            <a :href="`https://github.com/${commit.repo.name}/commit/${commit.payload.commits[0].sha}`" target="_blank" class="flex italic hover:underline decoration-wavy decoration-amber-500 mb-4">
              <img class="h-12 w-12 rounded-md border-2 border-amber-500" :src="'org' in commit ? commit.org.avatar_url : commit.actor.avatar_url" /> <p class="my-auto ml-3">{{ commit.repo.name }}: {{ commit.payload.commits[0].message }}</p>
            </a>
          </li>
        </ul>
        </div>
        <p class="text-lg mt-auto">commits from <NuxtLink to="/links/github" target="_blank" class="italic hover:underline decoration-wavy decoration-amber-500">github</NuxtLink>.</p>
      </div>
      <div class="bg-orange-100 border-2 border-amber-200 rounded-lg p-4 flex flex-col mb-12 md:mb-0">
        <p class="text-3xl">my top songs this month:</p>
        <div class="grid grid-cols-2 grid-rows-2 gap-4 mt-6">
          <div v-if="topSongs.length == 0" v-for="index in 4" :key="index" class="flex flex-col items-center gap-4 mb-4">
            <div class="h-24 w-24 rounded-md bg-orange-200 animate-pulse"></div>
            <div class="mt-1 p-3 bg-orange-200 animate-pulse rounded-md w-2/3"></div>
          </div>
          <div v-for="song in topSongs" :key="song.artist.name" class="flex flex-col items-center">
            <img class="h-24 w-24 rounded-md border-2 border-amber-500" :src="song.albumPic" />
            <p class="mt-2 text-xl">{{ song.name }} &bull; {{ song.artist.name }}</p>
          </div>
        </div>
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
  const latestCommits = ref([]);
  const topSongs = ref([]);
  const computedStatusClass = computed(() => {
    switch (presence.value.discord_status) {
      case 'online':
        return 'bg-green-500'
      case 'idle':
        return 'bg-amber-500'
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

    // fetch latest commits
    const commits = await fetch('https://api.github.com/users/aw-0/events/public?per_page=50')
    const commitsData = await commits.json()

    // get last 4 unique commits in different repos
    let i = 0
    for (const commit of commitsData) {
      if (commit.type == 'PushEvent' && commit.payload.commits.length > 0) {
        const commitRepo = commit.repo.name
        if (latestCommits.value.length == 0 || commitRepo != latestCommits.value[latestCommits.value.length - 1].repo.name) {
          latestCommits.value.push(commit)
          i++
          if (i == 4) {
            break
          }
        }
      }
    }

    // fetch top songs
    const apiTopSongs = await fetch('/api/getTopSongs')
    apiTopSongs.json().then(data => {
      topSongs.value = data.songs
    })
  })
</script>

