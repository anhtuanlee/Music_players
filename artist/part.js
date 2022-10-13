const data = JSON.parse(localStorage.getItem('data')) // lay data tu app.js 
const artistIndex = JSON.parse(localStorage.getItem('index')) // lay index tu slick slider  
const arTist = data.artist
const songs = data.songs
// du lieu tu localStorage
console.log(artistIndex)

const I = document.querySelector.bind(document)
const II = document.querySelectorAll.bind(document)

const audio = I('#audio')
const thumb = I('.img-thumb')
const cdThumb = I('.music-thumb')
const nameSong = I('.music-name')
const singer = I('.music-singer')
const btnPlay = I('.btn-toggle-play')
const inputRange = I('#range')
const btnRandom = I('.btn-random')
const btnRepeat = I('.btn-repeat')
const btnNext = I('.btn-next')
const btnPrev = I('.btn-prev')
const playlistModel = I('.model-playlist-song')
const playlistSong = I('.playlist-song')
const allDuration = II('.time-duration')
const itemMenu = II('.menu-nav  li')
const menuSong = I('.music')
const btnListNav = I('.btn-list-nav')
const menuNav = I('.menu-side')
const closeMenu = I('.btn-close-menu')
const setIndex = new Set()
let playlists = songs.filter((song) => {
   if (artistIndex >= 0) {
      return song.id_singer == artistIndex// tim ra nhung thang co id_singer dua vao index cua artist 

   }
})



// render thumb
function loadingSong(index) {
   thumb.src = arTist[artistIndex].img
   nameSong.textContent = arTist[artistIndex].content
   singer.textContent = arTist[artistIndex].singer
   if (I('.playlist-song:not(active)')) { // Khi chua click vao playlist thi mặc định nó sẽ phát bài đầu tiên trong danh sách  
      audio.src = playlists[0].path
      console.log(audio.src)
   }
   else if (I('.playlist-song.active')) {
      confirm('saime r')

   }
}

//render Playlist
function renderPlayList() {
   const playlists = songs.filter((song) => {
      return song.id_singer === artistIndex // tim ra nhung thang co id_singer dua vao index cua artist 
   })
   // lấy những thằng thỏa điều kiện để render ra ngoài
   const htmls = playlists.map((item, index) => {
      return `
      <div data-index= ${index} class="playlist-song ${index === currentIndex ? 'active' : ''}" >
      <div class="playlist-img">
          <img src=" ${item.img}" alt="" srcset="">
      </div> 
      <div class="playlist-content">
          <h3> ${item.name}</h3>
          <p> ${item.singer}</p> 
      </div>  
      <audio id="datas-${index}" src=" ${item.path}" ></audio> 

      <span class="currentDuration datas-${index}"> 0:0</span>
     
      <div class="btn-heart ">  
     <i class="fa-solid fa-heart"></i>
      </div>
  </div>  
      `

   })
   playlistModel.innerHTML = htmls.join('')
}



function renderlistSong() {
   const AllList = II('.playlist-song')
   AllList.forEach((playlist, index) => {

      playlist.onclick = function (e) {
         const songNode = e.target.closest('.playlist-song:not(.active)')


         if (e.target.closest('.btn-heart')) {
            e.target.closest('.btn-heart').classList.toggle('active')
         }
         else if (songNode) {
            if (songNode.getAttribute('data-index') || Number(songNode.dataset.index)) {
               // điều kiện nếu data-index = currentIndex thì sẽ thêm active vào chính songnode đó
               if (I('.playlist-song.active')) {
                  I('.playlist-song.active').classList.remove('active') // xóa playlist-song có sẵn active
                  songNode.classList.add('active')
               }
               else {
                  songNode.classList.add('active') // khi chưa có active thì click sẽ thêm active vào chính node đó, khi có rồi nó sẽ chuyển sang logic trên
               }
            }

            currentIndex = songNode.getAttribute('data-index') || Number(songNode.dataset.index)
            // Những thằng index được lấy ra bằng data-index chứa trong playlists 
            console.log(index)
            console.log(playlists[index])
            cdThumb.style.borderRadius = "100%"
            playSong()
         }
      }
   })

}


function renderDuration() {
   //Xu li render() duration 
   for (let i = 0; i < playlists.length; i++) { // lấy length của playlist in ra song nằm trong playlists
      let audioDuration = I(`#datas-${i}`)
      let tagDuration = I(`.datas-${i}`)
      // lay tung gia tri audio va tag dựa vào index ở render() và gọi lại thông qua i ở for 
      audioDuration.onloadeddata = function () {
         // cho từng audio thuộc tính loadeddata để khi khởi động nó sẽ tựt thêm giá trị vào
         let allTime = audioDuration.duration // lấy ra duration dựa vào từng audio
         let minutes = Math.floor(allTime / 60)
         let seconds = Math.floor(allTime - minutes * 60)
         if (seconds < 10) {
            seconds = `0${seconds}`

         }
         tagDuration.innerText = ` ${minutes} :  ${seconds}`
         // in ra giá trị lấy từ audio
      }
   }


}

let currentIndex = 0
let isPlaying = false;
let isRandom = false;
let isRepeat = false;


function handleSong() {
   //Xoay thumb 

   const scrollThumb = cdThumb.animate(
      [{
         transform: 'rotate(360deg) scale(1)',

      }
      ],
      {
         duration: 10000,
         iterations: Infinity
      }
   )
   scrollThumb.pause()

   // Khi dung` bai hat se goi lai no
   const cancelThumb = cdThumb.animate(
      [{
         transform: 'rotate(360deg) scale(1)',
      }
      ],
      {
         duration: 300,
         iterations: 1
      }
   )
   cancelThumb.pause()
   // Khi cancel ket thuc thi no se tra ve border = 10px
   function cancelFinish() {
      cancelThumb.onfinish = function (e) {
         cdThumb.style.borderRadius = 10 + 'px'
      }
   }

   // Xu li button Play pause 

   btnPlay.onclick = function () {
      let cdThumb = I('.music-thumb')
      if (isPlaying) {
         audio.pause()
         cancelThumb.play()
      }
      else {
         audio.play()
         cdThumb.style.borderRadius = "100%"
      }
      cancelFinish()

   }
   audio.onplay = function () {
      isPlaying = true
      btnPlay.classList.add('active')
      scrollThumb.play()

   }
   audio.onpause = function () {
      isPlaying = false
      btnPlay.classList.remove('active')
      scrollThumb.cancel()
   }

   // Xu li range 

   audio.ontimeupdate = function () {
      const currentTime = audio.currentTime
      const allTime = audio.duration
      const minutes = Math.floor(audio.duration / 60)
      const seconds = Math.floor(audio.duration - minutes * 60)
      const newTime = Math.floor(currentTime / allTime * 100)
      const minutesCurrent = Math.floor(audio.currentTime / 60)
      const secondsCurrent = Math.floor(audio.currentTime - minutesCurrent * 60)

      if (audio.duration) {
         inputRange.value = newTime
         I('.duration').textContent = `${minutes < 10 ? '0' + minutes : minutes} :${seconds < 10 ? '0' + seconds : seconds}`
         I('.remainting').textContent = `${minutesCurrent < 10 ? '0' + minutesCurrent : minutesCurrent} :  ${secondsCurrent < 10 ? '0' + secondsCurrent : secondsCurrent}`
      }
      else {
         inputRange.value = 0
      }
   }

   inputRange.oninput = function (e) {
      const timePercent = Math.floor(e.target.value / 100 * audio.duration)

      audio.currentTime = timePercent
   }
   //Xu li end 
   audio.onended = function () {
      if (isRepeat) {
         audio.play()
      }
      else {
         ranDom()
      }
      if (isRandom) {
         this.ranDom()
      }
      else {
      }
   }
   // Xu li next
   btnNext.onclick = function (e) {
      if (isRandom) {
         ranDom()
      }
      else {
         nextSong()
      }
      playSong()
      renderPlayList()
      renderlistSong()

      renderDuration()

   }
   // Xu li prev
   btnPrev.onclick = function (e) {
      if (isRandom) {
         ranDom()
      }
      else {
         prevSong()
      }
      playSong()
      renderPlayList()
      renderlistSong()
      renderDuration()
   }
   // Xu li random 
   btnRandom.onclick = function () {
      isRandom = !isRandom
      btnRandom.classList.toggle('active')
   }
   // xu li Repeat 
   btnRepeat.onclick = function () {
      isRepeat = !isRepeat
      btnRepeat.classList.toggle('active')
   }
   // Xu li ket thuc
   audio.onended = function () {
      if (isRepeat === true) {
         audio.play()
      }
      else {
         btnNext.click()
      }
   }

   // Xu li muted audio 
   I('.btn-volumn').onclick = function () {
      I('.btn-vol-on').classList.toggle('muted')
      if (I('.btn-vol-on')) {
         audio.muted = false // Khi vol on audio mac dinh
      }
      I('.btn-vol-off').classList.toggle('muted')
      if (I('.btn-vol-off.muted')) {
         audio.muted = true  // Khi vol on audio muted
      }
   }
   // Xu li btn-list-nav 
   btnListNav.onclick = function () {
      menuNav.classList.add('active')
      menuNav.classList.remove('close')

   }
   //Xu li khi click vao close off menu-nav
   closeMenu.onclick = function () {
      menuNav.classList.add('close')
      menuNav.classList.remove('active')

   }
   // Xu li click vao body se close menu-nav 
   I('.song-container').onclick = function (e) {
      menuNav.classList.remove('active')
      menuNav.classList.add('close')
   }

   // Xu li khi click vao item-nav 
   II('.item-nav').forEach((item, index) => {
      item.onclick = function () {
         I('.item-nav.active').classList.remove('active')

         item.classList.add('active')
      }
   })
   //Xu li logo back
   I('#logo').onclick = function (e) {
      location.href = './index.html'
   }

}
function playSong() {
   audio.src = playlists[currentIndex].path
   cdThumb.style.borderRadius = '100%' // khi play thi cdthumb tron
   audio.play()
}

function nextSong() {
   if (currentIndex >= playlists.length - 1) {
      currentIndex = 0
   }
   else {
      currentIndex++
   }
}
function prevSong() {
   if (currentIndex <= 0) {
      currentIndex = playlists.length - 1
   }
   else {
      currentIndex--
   }
}
function ranDom() {
   setIndex.add(currentIndex) // them crIndex vao set  
   console.log(setIndex)
   let randomIndex
   do {
      randomIndex = Math.floor(Math.random() * playlists.length)

   }
   while (setIndex.has(randomIndex)) // Muốn vòng lặp chạy thì điều kiện phải false, mà khi setIndex.has(randomIndex) ==
   // thì trong setIndex chưa có giá trị đó, cùng với trong Set() chỉ có được 1 phần tử duy nhất, nên nó sẽ thỏa điều kiện để thêm vào setIndex
   currentIndex = randomIndex

   if (setIndex.size == playlists.length - 1) {
      // khi length cua setIndex full thi nó sẽ được đặt lại
      setIndex.clear()
   }
}

handleSong()
renderPlayList()
renderlistSong()
loadingSong()
renderDuration()


