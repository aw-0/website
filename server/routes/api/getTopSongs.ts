export default defineEventHandler(async (event) => {
    // my quest to do everything without the spotify api
    const totalSongs = []
    const songQuery = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&period=3month&user=andrewwolf_&api_key=${process.env.LASTFM_KEY}&format=json`)
    const songData = await songQuery.json()
    for (let i = 0; i < 4; i++) {
        totalSongs.push(songData.toptracks.track[i])
    }

    // last.fm no longer providers album covers, so we need to add that manually
    const totalSongsWithAlbums = await Promise.all(totalSongs.map(async (song) =>{
        const pictureSearch = await fetch(`https://api.deezer.com/search?q=${song.name.replace(/ /g, '+')}+${song.artist.name.replace(/ /g, '+')}`)
        song.albumPic = (await pictureSearch.json()).data[0].album.cover_big
        return song
    }))

    setHeader(event, 'Cache-Control', 'public, max-age=172800')

    return {
        songs: totalSongsWithAlbums
    }
})