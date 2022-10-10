const I = document.querySelector.bind(document)
const II = document.querySelectorAll.bind(document)

const audio = I('#audio')
const thumb = I('.img-thumb')
const cdThumb = I('.music-thumb')
const nameSong = I('.music-name')
const singer = I('.music-singer')
const btnPlay = I('.btn-toggle-play')
const btnNext = I('.btn-next')
const btnPrev = I('.btn-prev')
const inputRange = I('#range')
const btnRandom = I('.btn-random')
const btnRepeat = I('.btn-repeat')
const btnListSong = I('.btn-list-song')
const playlistModel = I('.model-playlist-song')
const playlistSong = I('.playlist-song')
const allListSong = document.querySelectorAll('.playlist-song')
const btnListNav = I('.btn-list-nav')
const menuNav = I('.menu-side')
const closeMenu = I('.btn-close-menu')
const setIndex = new Set()


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    artist: [

        {
            singer: 'Đen Vâu',
            img: './artist/artist-denvau.jpg',
            content: 'Chill Cùng Đen Vâu',
            id: 0
        },

        {
            singer: 'Dick',
            img: './artist/artist-dick.jpg',
            content: 'Cháy hết mình với những bản rap của BCTM',
            id: 1
        },

        {
            singer: 'Keyo',
            img: './artist/artist-keyo.jpg',
            content: 'Và đó là Keyo',
            id: 2
        },

        {
            singer: 'Khắc Việt',
            img: './artist/artist-khacviet.jpeg',
            content: 'Hiện đại liệu có "hại điện" ?',
            id: 3
        },

        {
            singer: 'MONO',
            img: './artist/artist-mono.jpg',
            content: 'Ngẫu hứng cùng MOMO........',
            id: 4
        }
    ],

    songs: [
        {
            name: 'Đem tiền về cho mẹ',
            singer: 'Đen Vâu',
            img: './img/img_demtienvechome.jpg',
            path: 'music/mp_demtienvechome.mp3',
            id_singer: 0

        },
        {
            name: 'Ghé Qua',
            singer: 'Dick',
            img: './img/img_ghequa.jpg',
            path: 'music/mp_ghequa.mp3',
            id_singer: 1
        },
        {
            name: 'Hiện Đại',
            singer: 'Khắc Việt',
            img: './img/img_hiendai.jpg',
            path: 'music/mp_hiendai.mp3',
            id_singer: 3

        },
        {
            name: 'Lối Nhỏ',
            singer: 'Đen Vâu',
            img: 'img/img_loinho.jpg',
            path: 'music/mp_loinho.mp3',
            id_singer: 0

        },
        {
            name: 'Ta Và Nàng',
            singer: 'Đen Vâu',
            img: 'img/img_tavanang.jpg',
            path: 'music/mp_tavanang.mp3',
            id_singer: 0

        },
        {
            name: 'Tòng Phu',
            singer: 'KAYO',
            img: 'img/img_tongphu.jpg',
            path: 'music/mp_tongphu.mp3',
            id_singer: 2

        },
        {
            name: 'WaitingForYou',
            singer: 'MoNo',
            img: 'img/img_waitingforyou.jpg',
            path: 'music/mp_waitingforyou.mp3' ,
            id_singer: 4
        },
        {
            name: 'Bài này chill phết !!!',
            singer: 'Đen Vâu',
            img: './img/img_bainaychillphet.jpg',
            path: './music/mp_bainaychillphet.mp3',
            id_singer: 0
        },

        {
            name: 'Chạy Về Nơi Phía Anh',
            singer: 'Khắc Việt',
            img: './img/img_chayvenoiphiaanh.jpg',
            path: './music/mp_chayvenoiphiaanh.mp3',
            id_singer: 3
        }
        ,
        {
            name: 'Em Lấy Chồng',
            singer: 'Khắc Việt',
            img: './img/img_emlaychong.jpg',
            path: './music/mp_emlaychong.mp3',
            id_singer: 3
        }
        ,

        {
            name: 'Mười Năm',
            singer: 'Đen Vâu',
            img: './img/img_muoinam.jpg',
            path: './music/mp_muoinam.mp3',
            id_singer: 0
        }
        ,

        {
            name: 'Những Ngày Trải Qua',
            singer: 'Dick',
            img: './img/img_nhungngaytraiqua.jpg',
            path: './music/mp_nhungngaytraiqua.mp3',
            id_singer: 1
        }
        ,

        {
            name: 'Sống Cho Hết Đời Thanh Xuân',
            singer: 'Dick',
            img: './img/img_songchohetdoithanhxuan.jpg',
            path: './music/mp_songchohetdoithanhxuan.mp3',
            id_singer: 1
        }
        ,

        {
            name: 'Sống Cho Hết Đời Thanh Xuân 2',
            singer: 'Dick',
            img: './img/img_songchohetdoithanhxuan2.jpg',
            path: './music/mp_songchohetdoithanhxuan2.mp3',
            id_singer: 1
        }
        ,

        {
            name: 'Xuất Giá ',
            singer: 'KAYO',
            img: './img/img_xuatgia.jpg',
            path: './music/mp_xuatgia.mp3',
            id_singer: 2
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
            _this.render()
            _this.renderlistSong()
            _this.scollInterView()
            _this.loadingSong()
            _this.renderDuration()
            audio.play()
        }
        btnPrev.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong()
            }
            else {
                _this.prevSong()

            }
            _this.render()
            _this.scollInterView()
            _this.renderlistSong()
            _this.loadingSong()
            _this.renderDuration()
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
                I('.duration').textContent = `${minutes < 10 ? '0' + minutes : minutes} :
               ${seconds < 10 ? '0' + seconds : seconds}`
                I('.remainting').textContent = `${minutesCurrent < 10 ? '0' + minutesCurrent : minutesCurrent} :
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
        // XU li muted
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
        // Xu li khi click vao item-nav 
        II('.item-nav').forEach((item, index) => {
            item.onclick = function () {

                item.classList.add('active')
                I('.item-nav.active').classList.remove('active')

            }
        })
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
        I('.container').onclick = function (e) {
            menuNav.classList.remove('active')
            menuNav.classList.add('close')
        }
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
        setIndex.add(this.currentIndex) // them crIndex vao set  
        console.log(setIndex)
        let randomIndex
        do {
            randomIndex = Math.floor(Math.random() * this.songs.length)

        }
        while (setIndex.has(randomIndex)) // Muốn vòng lặp chạy thì điều kiện phải false, mà khi setIndex.has(randomIndex) ==
        // thì trong setIndex chưa có giá trị đó, cùng với trong Set() chỉ có được 1 phần tử duy nhất, nên nó sẽ thỏa điều kiện để thêm vào setIndex
        this.currentIndex = randomIndex

        if (setIndex.size == this.songs.length - 1) {
            // khi length cua setIndex full thi nó sẽ được đặt lại
            setIndex.clear()
        }
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
            <div data-index=${index} class="playlist-song ${index == this.currentIndex ? 'active' : ''}" >
            <div class="playlist-img">
                <img src="${song.img}" alt="" srcset="">
            </div>
            <div class="playlist-content">
                <h3>${song.name}</h3>
                <p>${song.singer}</p>
            </div>  
            <span class="data-${index}"></span>

            <audio src="./${song.path}" id="data-${index}"></audio>
            <div class="btn-heart "> 
            <i class="fa-solid fa-heart"></i>
            </div>
        </div>
            `
        })
        playlistModel.innerHTML = htmls.join('')
    },

    renderlistSong: function () {
        const AllList = II('.playlist-song')
        const _this = this
        AllList.forEach((playlist, index) => {

            playlist.onclick = function (e) {

                const songNode = e.target.closest('.playlist-song:not(.active)')


                if (e.target.closest('.btn-heart')) {
                    e.target.closest('.btn-heart').classList.toggle('active')
                }
                else if (songNode) {
                    if (songNode.getAttribute('data-index') || Number(songNode.dataset.index) == _this.currentIndex) {
                        // điều kiện nếu data-index = currentIndex thì sẽ thêm active vào chính songnode đó
                        I('.playlist-song.active').classList.remove('active')
                        songNode.classList.add('active')


                    }
                    _this.currentIndex = songNode.getAttribute('data-index') || Number(songNode.dataset.index)

                    _this.loadingSong()
                    audio.play()
                }
            }
        })
    },
    renderArtist: function () {
        const htmls = this.artist.map((item) => {
            return `
            
            <div class="item-artist">
            <figure class="img-artist-box">
                <img src="./${item.img}" alt="" class="img-artist">
            </figure>

            <h4 class="artist-song">
                ${item.content}
            </h4>
            <span class="artist-name">
                ${item.singer} 
            </span>

        </div>
           
        `
        })
        I('.song-artist').innerHTML = htmls.join('')
    },
    slickSliderArtist: function () {
        $('.item-artist').on('click', function (e) {
            const index = $(this).attr("data-slick-index");
            console.log(index)
            localStorage.setItem('index', index)
            location.href = 'artist.html'

        });
        $('.song-artist').slick(
            {
                infinite: false,
                slidesToShow: 4,
                slidesToScroll: 2,
                cssEase: 'linear',
                arrow: true,
                arrows: true,
                prevArrow: "<button type='button' class='slick-prev slick-button'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
                nextArrow: "<button type='button' class='slick-next slick-button'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
                responsive: [
                    {
                        breakpoint: 1251,
                        settings: {
                            infinite: false,
                            slidesToShow: 3,
                            slidesToScroll: 2,
                            cssEase: 'linear',
                            arrows: true,
                            draggable: true,
                        }
                    },
                    {
                        breakpoint: 820,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            arrows: true,
                            cssEase: 'linear',
                            draggable: true,

                        }
                    }, {
                        breakpoint: 740,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            arrows: false,
                            cssEase: 'linear',
                            draggable: true,
                            centerMode: true,
                            centerPadding: '100px', 
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            arrows: false,
                            cssEase: 'linear',
                            draggable: true,
                            centerPadding: '50px',
                        }
                    }
                ]
            }
        )
    },
    defineProperty: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },
    renderDuration: function () {
        //Xu li render() duration 
        let htmls = this.songs.map((item, index) => {
            let audioDuration = I(`#data-${index}`)
            let tagDuration = I(`.data-${index}`)
            // lay tung gia tri audio va tag dựa vào index ở render() và gọi lại thông qua i ở for 
            audioDuration.onloadeddata = function () {
                // cho từng audio thuộc tính loadeddata để khi khởi động nó sẽ tựt thêm giá trị vào
                let allTime = audioDuration.duration // lấy ra duration dựa vào từng audio
                let minutes = Math.floor(allTime / 60)
                let seconds = Math.floor(allTime - minutes * 60)
                if (seconds < 10) {
                    seconds = `0${seconds}`

                }
                tagDuration.textContent = ` ${minutes} :  ${seconds}`
                // in ra giá trị lấy từ audio
            }
        })
        playlistSong.innerHTML = htmls.join('')
    },
    scollInterView: function () {
        I('.model-playlist-song .active').scrollIntoView(
            {
                behavior: 'smooth',
                block: 'center'
            }
        )

    },
    start: function () {
        this.defineProperty()
        this.loadingSong()
        this.render()
        this.renderDuration()
        this.handleSong()
        this.renderlistSong()
        this.renderArtist()
        this.slickSliderArtist()
        this.scollInterView()

    }

}
app.start()

localStorage.setItem('data', JSON.stringify(app))



