const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const audio = $('#audio')
const thumb = $('.img-thumb')
const cdThumb = $('.music-thumb')
const nameSong = $('.music-name')
const singer = $('.music-singer')
const btnPlay = $('.btn-toggle-play')
const btnNext = $('.btn-next')
const btnPrev = $('.btn-prev')
const inputRange = $('#range')
const btnRandom = $('.btn-random')
const btnRepeat = $('.btn-repeat')
const btnListSong = $('.btn-list-song')
const playlistModel = $('.model-playlist-song')
const playlistSong = $('.playlist-song')
const allListSong = document.querySelectorAll('.playlist-song')


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: 'Đem tiền về cho mẹ',
            singer: 'Đen Vâu',
            img: './img/img_demtienvechome.jpg',
            path: 'music/mp_demtienvechome.mp3'
        },
        {
            name: 'Ghé Qua',
            singer: 'Dick',
            img: './img/img_ghequa.jpg',
            path: 'music/mp_ghequa.mp3'
        },
        {
            name: 'Hiện Đại',
            singer: 'Khắc Việt',
            img: './img/img_hiendai.jpg',
            path: 'music/mp_hiendai.mp3'
        },
        {
            name: 'Lối Nhỏ',
            singer: 'Đen Vâu',
            img: 'img/img_loinho.jpg',
            path: 'music/mp_loinho.mp3'
        },
        {
            name: 'Ta Và Nàng',
            singer: 'Đen Vâu',
            img: 'img/img_tavanang.jpg',
            path: 'music/mp_tavanang.mp3'
        },
        {
            name: 'Tòng Phu',
            singer: 'KAYO',
            img: 'img/img_tongphu.jpg',
            path: 'music/mp_tongphu.mp3'
        },
        {
            name: 'WaitingForYou',
            singer: 'MoNo',
            img: 'img/img_waitingforyou.jpg',
            path: 'music/mp_waitingforyou.mp3'
        }

    ],

    handleSong: function () {
        const _this = this
        //Xoay thumb 
        const scrollThumb = cdThumb.animate(
            [{
                transform: 'rotate(360deg) scale(0.9)',

            }
            ],
            {
                duration: 10000,
                iterations: Infinity
            }

        )
        scrollThumb.pause()

        // Xu li button Play pause 
        btnPlay.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()
            }
            else {
                audio.play()
            }
        }
        audio.onplay = function () {
            _this.isPlaying = true
            btnPlay.classList.add('active')
            scrollThumb.play()
        }
        audio.onpause = function () {
            _this.isPlaying = false
            btnPlay.classList.remove('active')
            scrollThumb.pause()
        }

        // Xu li next prev 
        btnNext.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong()

            }
            else {
                _this.nextSong()
            }

            _this.loadingSong()
            audio.play()
        }
        btnPrev.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong()
            }
            else {
                _this.prevSong()

            }
            _this.loadingSong()
            audio.play()
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
                $('.duration').textContent = `${minutes < 10 ? '0' + minutes : minutes} :
                ${seconds < 10 ? '0' + seconds : seconds}`
                $('.remainting').textContent = `${minutesCurrent < 10 ? '0' + minutesCurrent : minutesCurrent} :
                 ${secondsCurrent < 10 ? '0' + secondsCurrent : secondsCurrent}`
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
            if (_this.isRepeat) {
                audio.play()
            }
            else {
                btnNext.click()
            }
        }
        // Xu li random 
        btnRandom.onclick = function () {
            _this.isRandom = !_this.isRandom
            btnRandom.classList.toggle('active')
        }
        // xu li Repeat 
        btnRepeat.onclick = function () {
            _this.isRepeat = !_this.isRepeat
            btnRepeat.classList.toggle('active')
        }

        // Xu li hien danh sach bai hat
        btnListSong.onclick = function (e) {

            btnListSong.classList.toggle('active')
            playlistModel.classList.toggle('active')
        }
        // Xu li click playlist 


        allListSong.forEach((song, index) => {


            song.onclick = function (e) {

                const songNode = e.target.closest(".playlist-song:not(.active)");

                if (e.target.closest('.btn-heart')) {
                    e.target.closest('.btn-heart').classList.toggle('active')

                }
                else if (songNode) {

                    const dataIndex = songNode.getAttribute("data-index") || Number(songNode.dataset.index)

                    _this.currentIndex = dataIndex

                    _this.loadingSong()
                    audio.play()

                }

            }
        })


        // Xu li click vao playlist phat chinh bai hat do 


    },

    renderlistSong: function () {
        const AllList = $$('.playlist-song')
        const _this = this
        AllList.forEach((playlist, index) => {




       
            playlist.onclick = function (e) {
                const songNode = e.target.closest('.playlist-song:not(.active)')
                if (songNode.getAttribute('data-index') == _this.currentIndex) {
                   
                    songNode.classList.add('active')
                }


                if (e.target.closest('.btn-heart')) {
                    e.target.closest('.btn-heart').classList.toggle('active')
                }
                else if (songNode) {

                    _this.currentIndex = songNode.getAttribute('data-index') || Number(songNode.dataset.index)

                    _this.loadingSong()
                    audio.play()
                }
            }
        })


    },
    nextSong: function () {
        if (this.currentIndex == this.songs.length - 1) {
            this.currentIndex = 0
        }
        else {
            ++this.currentIndex
        }

    },
    prevSong: function () {
        if (this.currentIndex == 0) {
            this.currentIndex = this.songs.length - 1
        }
        else {
            this.currentIndex--
        }
    },
    randomSong: function () {
        let randomIndex
        do {
            randomIndex = Math.floor(Math.random() * this.songs.length)

        }
        while (this.currentIndex === randomIndex)
        this.currentIndex = randomIndex
        this.loadingSong()
    },
    loadingSong: function () {
        thumb.src = this.currentSong.img
        nameSong.textContent = this.currentSong.name
        singer.textContent = this.currentSong.singer
        audio.src = this.currentSong.path

    },
    render: function () {
        const htmls = this.songs.map((song, index) => {

            return `
            <div data-index=${index} class="playlist-song" >
            <div class="playlist-img">
                <img src="${song.img}" alt="" srcset="">
            </div>
            <div class="playlist-content">
                <h3>${song.name}</h3>
                <p>${song.singer}</p>
            </div>  
       

            <div class="btn-heart "> 
            <i class="fa-solid fa-heart"></i>
            </div>
        </div>
            `
        })


        playlistModel.innerHTML = htmls.join('')
    },


    defineProperty: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },
    start: function () {
        this.defineProperty()
        this.loadingSong()
        this.render()
        this.handleSong()
        this.renderlistSong()

    }

}


app.start()