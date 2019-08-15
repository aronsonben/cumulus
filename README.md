# cumulus
soundcloud chrome extension

Currently if you go to a user's "following" list and you click on the lazy loading list it will populate the space beneath their names with that user's tracks and followers. This is helpful for finding new artists (to me, at least).


##### old roadmap:
-store data for future display:
{
    artist: xxx
    songs: {
        [
            title: xxx
            plays: xxx
            last_played: xxx
            ...
        ], [...], [...]
    }
    tags: {xxx, xxx, ..., xxx},
    total_plays: xxx,
    rank: xxx,
    playlists: xxx,
    groups: xxx
}