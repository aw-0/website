import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const lastFmKey = process.env.LASTFM_KEY

    if (!lastFmKey) {
      console.warn('LASTFM_KEY environment variable is not set')
      return NextResponse.json(
        { songs: [], error: 'Last.fm API key not configured' },
        { status: 200 }
      )
    }

    // Fetch top tracks from Last.fm
    const songQuery = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&period=1month&user=andrewwolf_&api_key=${lastFmKey}&limit=6&format=json`
    )

    if (!songQuery.ok) {
      throw new Error(`Last.fm API error: ${songQuery.status}`)
    }

    const songData = await songQuery.json()

    if (!songData.toptracks?.track) {
      return NextResponse.json({ songs: [] }, { status: 200 })
    }

    //console.log(songData)

    // Handle both array and single object responses from Last.fm
    const tracks = Array.isArray(songData.toptracks.track)
      ? songData.toptracks.track
      : [songData.toptracks.track]

    //console.log(tracks)

    // Last.fm no longer provides album covers, so we fetch from Deezer
    const totalSongsWithAlbums = await Promise.all(
      tracks.map(async (song: any) => {
        try {
          const pictureSearch = await fetch(
            `https://api.deezer.com/search?q=${encodeURIComponent(song.name)}+${encodeURIComponent(song.artist.name)}`
          )
          const deezerData = await pictureSearch.json()

          return {
            name: song.name,
            artist: { name: song.artist.name },
            albumPic:
              deezerData.data?.[0]?.album?.cover_big ||
              'https://via.placeholder.com/300?text=No+Image',
          }
        } catch (error) {
          console.error(`Failed to fetch album art for ${song.name}:`, error)
          return {
            name: song.name,
            artist: { name: song.artist.name },
            albumPic: 'https://via.placeholder.com/300?text=No+Image',
          }
        }
      })
    )

    console.log(totalSongsWithAlbums)

    return NextResponse.json(
      { songs: totalSongsWithAlbums },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=172800',
        },
      }
    )
  } catch (error) {
    console.error('Error fetching top songs:', error)
    return NextResponse.json({ songs: [], error: 'Failed to fetch top songs' }, { status: 500 })
  }
}
