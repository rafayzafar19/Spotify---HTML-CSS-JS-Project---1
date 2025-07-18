function formatTime(seconds) {
    const totalSeconds = Math.floor(seconds); // or Math.round(seconds)
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    const paddedMins = String(mins).padStart(2, '0');
    const paddedSecs = String(secs).padStart(2, '0');
    return `${paddedMins}:${paddedSecs}`;
}
let songs;
let currentfolder;
let currentsong = new Audio()
let play = document.getElementById("playcont");
let next = document.getElementById("nextcont");
let prev = document.getElementById("prevcont");

let pausedbtn = `
<svg class="svgbtn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
  <path d="M4 7C4 5.58579 4 4.87868 4.43934 4.43934C4.87868 4 5.58579 4 7 4C8.41421 4 9.12132 4 9.56066 4.43934C10 4.87868 10 5.58579 10 7V17C10 18.4142 10 19.1213 9.56066 19.5607C9.12132 20 8.41421 20 7 20C5.58579 20 4.87868 20 4.43934 19.5607C4 19.1213 4 18.4142 4 17V7Z" stroke="white" stroke-width="1.9" />
  <path d="M14 7C14 5.58579 14 4.87868 14.4393 4.43934C14.8787 4 15.5858 4 17 4C18.4142 4 19.1213 4 19.5607 4.43934C20 4.87868 20 5.58579 20 7V17C20 18.4142 20 19.1213 19.5607 19.5607C19.1213 20 18.4142 20 17 20C15.5858 20 14.8787 20 14.4393 19.5607C14 19.1213 14 18.4142 14 17V7Z" stroke="white" stroke-width="1.9" />
</svg>
`;

let playbtn = `
<svg class="svgbtn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
  <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" stroke="white" stroke-width="1.9" stroke-linejoin="round"/>
</svg>
`;
async function getsongs(folder) {
    currentfolder = folder
    
    // Fetch the songs list from JSON
    let response = await fetch('./assets/songs.json')
    let songsData = await response.json()
    
    // Get the folder name (e.g., "summer" from "songs/summer")
    let folderName = folder; // now includes `songs/Chill`

    // currentfolder = folderName;

    songs = songsData[folderName] || []
    
    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    songul.innerHTML = ""
    
    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + `<li>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                                color="#000000" fill="none">
                                <path d="M12.5 3L12.5 17" stroke="white" stroke-width="1.9" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M12.5 17C12.5 19.2091 10.7091 21 8.5 21C6.29086 21 4.5 19.2091 4.5 17C4.5 14.7909 6.29086 13 8.5 13C10.7091 13 12.5 14.7909 12.5 17Z"
                                    stroke="white" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12.5 3C16.366 3 19.5 6.13401 19.5 10C18 8.5 14.0556 6.26667 12.5 8.44444"
                                    stroke="white" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <div class="info">
                               ${song.replaceAll("%20", " ")}
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                                color="#000000" fill="none">
                                <path
                                    d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z"
                                    stroke="white" stroke-width="1.9" stroke-linejoin="round"></path>
                            </svg>
                        </li>`
    }

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").innerHTML.trim())
            playmusic(e.querySelector(".info").innerHTML.trim())
        })
    })
    
    return songs
}
function playmusic(track) {
    //let audio = new Audio("/assets/songs/" + track)
    currentsong.src = `/assets/${currentfolder}/` + track
    currentsong.play()
    playcont.innerHTML = pausedbtn;
    let displayName = track.replaceAll("%20", " ").replaceAll("%2D", "-").replace(".mp3", "")
    document.querySelector(".sinfo").innerHTML = displayName
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}
async function main() {
    await getsongs("songs/summer");
    console.log(songs);

    let isPlaying = false;

    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play();
            playcont.innerHTML = pausedbtn;
            isPlaying = true;
        } else {
            currentsong.pause();
            playcont.innerHTML = playbtn;
            isPlaying = false;
        }
    });

    currentsong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${formatTime(currentsong.currentTime)}/${formatTime(currentsong.duration)}`;
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
    });

    document.querySelector(".seekbar").addEventListener("click", e => {
        const seekbarWidth = e.target.getBoundingClientRect().width;
        const clickRatio = e.offsetX / seekbarWidth;
        document.querySelector(".circle").style.left = clickRatio * 100 + "%";
        currentsong.currentTime = currentsong.duration * clickRatio;
    });

    document.querySelector(".hamb").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    document.querySelector(".cross").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-100%";
    });

    prev.addEventListener("click", () => {
        console.log("prev click");
        let currentTrack = decodeURIComponent(currentsong.src.split("/").pop());
        let index = songs.indexOf(currentTrack);
        if (index > 0) {
            playmusic(songs[index - 1]);
        }
    });

    next.addEventListener("click", () => {
        console.log("next click");
        let currentTrack = decodeURIComponent(currentsong.src.split("/").pop());
        let index = songs.indexOf(currentTrack);
        if (index < songs.length - 1) {
            playmusic(songs[index + 1]);
        }
    });

    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            console.log(item, item.currentTarget.dataset);
            songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`);
            if (songs.length > 0) {
                playmusic(songs[0]); // Automatically play first song of the new folder
            }
        });
    });
}

main()