// Kuis Pintar SD - Game Logic

// --- Audio Context for Sound Effects ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (type === 'correct') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1046.5, audioCtx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.5);
    } else if (type === 'wrong') {
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
        oscillator.frequency.linearRampToValueAtTime(100, audioCtx.currentTime + 0.3);
        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.3);
    } else if (type === 'win') {
        playNote(523.25, 0.1, 0);
        playNote(659.25, 0.1, 0.15);
        playNote(783.99, 0.2, 0.3);
        playNote(1046.5, 0.4, 0.5);
    }
}

function playNote(freq, duration, startTimeOffset) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime + startTimeOffset);
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime + startTimeOffset);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + startTimeOffset + duration);
    osc.start(audioCtx.currentTime + startTimeOffset);
    osc.stop(audioCtx.currentTime + startTimeOffset + duration);
}

// --- Data: Static Question Banks (Non-Math) ---
// Expanded list to ~15-20 per subject per level
const subjectBanks = {
    dasar: { // SD 1-2
        ipa: [
            { q: "Hewan pemakan tumbuhan disebut...", options: ["Herbivora", "Karnivora", "Omnivora", "Insektivora"], answer: "Herbivora" },
            { q: "Matahari terbit di sebelah...", options: ["Timur", "Barat", "Utara", "Selatan"], answer: "Timur" },
            { q: "Bagian tumbuhan yang menyerap air...", options: ["Akar", "Daun", "Batang", "Bunga"], answer: "Akar" },
            { q: "Hewan yang berkokok pagi hari...", options: ["Ayam", "Kucing", "Anjing", "Sapi"], answer: "Ayam" },
            { q: "Kita bernapas menghirup...", options: ["Oksigen", "Air", "Tanah", "Api"], answer: "Oksigen" },
            { q: "Ikan berenang menggunakan...", options: ["Sirip", "Kaki", "Sayap", "Ekor"], answer: "Sirip" },
            { q: "Benda yang mudah terbakar...", options: ["Kertas", "Batu", "Air", "Besi"], answer: "Kertas" },
            { q: "Sumber cahaya terbesar di bumi...", options: ["Matahari", "Lampu", "Bulan", "Api"], answer: "Matahari" },
            { q: "Kucing berkembang biak dengan...", options: ["Melahirkan", "Bertelur", "Tunas", "Membelah diri"], answer: "Melahirkan" },
            { q: "Buah yang berwarna kuning...", options: ["Pisang", "Apel", "Anggur", "Salak"], answer: "Pisang" }
        ],
        ips: [
            { q: "Ibu kota negara Indonesia...", options: ["Jakarta", "Bandung", "Surabaya", "Bali"], answer: "Jakarta" },
            { q: "Tempat ibadah umat Islam...", options: ["Masjid", "Gereja", "Pura", "Vihara"], answer: "Masjid" },
            { q: "Warna bendera Indonesia...", options: ["Merah Putih", "Merah Biru", "Putih Merah", "Kuning"], answer: "Merah Putih" },
            { q: "Presiden pertama Indonesia...", options: ["Soekarno", "Soeharto", "Habibie", "Jokowi"], answer: "Soekarno" },
            { q: "Ayah dan Ibu adalah orang...", options: ["Tua", "Asing", "Jauh", "Lain"], answer: "Tua" },
            { q: "Kita sekolah untuk mencari...", options: ["Ilmu", "Uang", "Makanan", "Musuh"], answer: "Ilmu" },
            { q: "Tempat menyimpan uang aman...", options: ["Bank", "Kasur", "Tanah", "Saku"], answer: "Bank" },
            { q: "Tetangga adalah orang yang tinggal di...", options: ["Dekat rumah", "Luar kota", "Luar negeri", "Hutan"], answer: "Dekat rumah" },
            { q: "Ruang kelas harus dijaga ke...", options: ["Bersihannya", "Kotorannya", "Rusakannya", "Bisingnya"], answer: "Bersihannya" },
            { q: "Tempat berhenti kereta api...", options: ["Stasiun", "Bandara", "Pelabuhan", "Terminal"], answer: "Stasiun" }
        ],
        bahasa: [
            { q: "Lawan kata 'Besar'...", options: ["Kecil", "Luas", "Tinggi", "Panjang"], answer: "Kecil" },
            { q: "Persamaan kata 'Indah'...", options: ["Cantik", "Jelek", "Buruk", "Kotor"], answer: "Cantik" },
            { q: "Ayah ... kopi di teras.", options: ["Minum", "Makan", "Tidur", "Lari"], answer: "Minum" },
            { q: "Sapi makan...", options: ["Rumput", "Nasi", "Roti", "Daging"], answer: "Rumput" },
            { q: "Sebelum makan kita harus...", options: ["Berdoa", "Tidur", "Bermain", "Lari"], answer: "Berdoa" },
            { q: "Lawan kata 'Panas'...", options: ["Dingin", "Hangat", "Sejuk", "Bakar"], answer: "Dingin" },
            { q: "Ibu membelikan adik ... baru.", options: ["Baju", "Jalan", "Rumah", "Langit"], answer: "Baju" },
            { q: "Adik menangis karena...", options: ["Jatuh", "Senang", "Tidur", "Makan"], answer: "Jatuh" },
            { q: "Huruf vokal adalah...", options: ["a, i, u, e, o", "b, c, d", "k, l, m", "x, y, z"], answer: "a, i, u, e, o" },
            { q: "Budi ... bola di lapangan.", options: ["Bermain", "Memasak", "Menulis", "Membaca"], answer: "Bermain" }
        ],
        pkn: [
            { q: "Lambang negara Indonesia...", options: ["Garuda", "Harimau", "Banteng", "Padi"], answer: "Garuda" },
            { q: "Sila pertama Pancasila...", options: ["Ketuhanan YME", "Kemanusiaan", "Persatuan", "Keadilan"], answer: "Ketuhanan YME" },
            { q: "Warna merah bendera artinya...", options: ["Berani", "Suci", "Takut", "Bersih"], answer: "Berani" },
            { q: "Simbol sila pertama...", options: ["Bintang", "Rantai", "Peringin", "Banteng"], answer: "Bintang" },
            { q: "Sebelum masuk rumah ucapkan...", options: ["Salam", "Teriak", "Diam", "Marah"], answer: "Salam" },
            { q: "Kepala keluarga di rumah...", options: ["Ayah", "Ibu", "Kakak", "Adik"], answer: "Ayah" },
            { q: "Semboya Bhinneka Tunggal Ika artinya...", options: ["Berbeda tetap satu", "Bersatu kita teguh", "Merdeka atau mati", "Maju terus"], answer: "Berbeda tetap satu" },
            { q: "Upacara bendera hari...", options: ["Senin", "Selasa", "Rabu", "Minggu"], answer: "Senin" },
            { q: "Lagu kebangsaan kita...", options: ["Indonesia Raya", "Padamu Negeri", "Halo Bandung", "Garuda Pancasila"], answer: "Indonesia Raya" },
            { q: "Rambu lampu merah artinya...", options: ["Berhenti", "Jalan", "Hati-hati", "Ngebut"], answer: "Berhenti" }
        ]
    },
    menengah: { // SD 3-4
        ipa: [
            { q: "Tumbuhan memasak makanan...", options: ["Fotosintesis", "Respirasi", "Adaptasi", "Reproduksi"], answer: "Fotosintesis" },
            { q: "Hewan hidup di dua alam...", options: ["Amfibi", "Reptil", "Mamalia", "Aves"], answer: "Amfibi" },
            { q: "Benda langit mengelilingi bumi...", options: ["Bulan", "Matahari", "Bintang", "Meteor"], answer: "Bulan" },
            { q: "Padat menjadi cair disebut...", options: ["Mencair", "Membeku", "Menguap", "Menyublim"], answer: "Mencair" },
            { q: "Simbol kimia oksigen...", options: ["O2", "H2O", "CO2", "N2"], answer: "O2" },
            { q: "Hewan menyusui disebut...", options: ["Mamalia", "Reptil", "Unggas", "Ikan"], answer: "Mamalia" },
            { q: "Energi gerak menjadi listrik...", options: ["Generator", "Motor", "Baterai", "Lampu"], answer: "Generator" },
            { q: "Bagian bunga jantan...", options: ["Benang Sari", "Putik", "Mahkota", "Kelopak"], answer: "Benang Sari" },
            { q: "Planet terdekat matahari...", options: ["Merkurius", "Venus", "Bumi", "Mars"], answer: "Merkurius" },
            { q: "Zat hijau daun disebut...", options: ["Klorofil", "Stomata", "Kambium", "Xilem"], answer: "Klorofil" }
        ],
        ips: [
            { q: "Provinsi paling barat...", options: ["Aceh", "Papua", "Bali", "Jawa"], answer: "Aceh" },
            { q: "Alat tukar yang sah...", options: ["Uang", "Daun", "Batu", "Emas"], answer: "Uang" },
            { q: "Rumah adat Sumbar...", options: ["Gadang", "Joglo", "Honai", "Tongkonan"], answer: "Gadang" },
            { q: "Kerajaan Hindu tertua...", options: ["Kutai", "Tarumanegara", "Majapahit", "Sriwijaya"], answer: "Kutai" },
            { q: "Semboyan negara kita...", options: ["Bhinneka Ika", "Tut Wuri", "Pancasila", "Merdeka"], answer: "Bhinneka Ika" },
            { q: "Pahlawan pendidikan...", options: ["Ki Hajar Dewantara", "Kartini", "Sudirman", "Soekarno"], answer: "Ki Hajar Dewantara" },
            { q: "Gunung tertinggi di Jawa...", options: ["Semeru", "Rinjani", "Kerinci", "Bromo"], answer: "Semeru" },
            { q: "Laut yang luas disebut...", options: ["Samudra", "Selat", "Teluk", "Danau"], answer: "Samudra" },
            { q: "Bapak Koperasi Indonesia...", options: ["Moh Hatta", "Soekarno", "Suroso", "Habibie"], answer: "Moh Hatta" },
            { q: "Candi Hindu terbesar...", options: ["Prambanan", "Borobudur", "Mendut", "Kalasan"], answer: "Prambanan" }
        ],
        bahasa: [
            { q: "Sinonim 'Pintar'...", options: ["Pandai", "Bodoh", "Malas", "Giat"], answer: "Pandai" },
            { q: "Cerita hewan...", options: ["Fabel", "Legenda", "Mitos", "Sage"], answer: "Fabel" },
            { q: "Kata tanya tempat...", options: ["Di mana", "Kapan", "Siapa", "Apa"], answer: "Di mana" },
            { q: "Tanda seru (!) untuk kalimat...", options: ["Perintah", "Tanya", "Berita", "Langsung"], answer: "Perintah" },
            { q: "Paragraf awal disebut...", options: ["Pembukaan", "Isi", "Penutup", "Judul"], answer: "Pembukaan" },
            { q: "Orang yang menulis puisi...", options: ["Penyair", "Penulis", "Wartawan", "Pelukis"], answer: "Penyair" },
            { q: "Arti pribahasa 'Buah Tangan'...", options: ["Oleh-oleh", "Anak", "Sombong", "Karya"], answer: "Oleh-oleh" },
            { q: "Penulisan tempat tanggal lahir...", options: ["Jakarta, 12 Mei 2010", "Jakarta: 12 Mei", "Jakarta; 12 Mei", "Jakarta. 12 Mei"], answer: "Jakarta, 12 Mei 2010" },
            { q: "Lawan kata 'Sedikit'...", options: ["Banyak", "Kurang", "Jarang", "Sempit"], answer: "Banyak" },
            { q: "Huruf kapital digunakan untuk...", options: ["Nama Orang", "Nama Buah", "Nama Hewan", "Nama Benda"], answer: "Nama Orang" }
        ],
        pkn: [
            { q: "Sikap menghargai perbedaan...", options: ["Toleransi", "Diskriminasi", "Egois", "Sombong"], answer: "Toleransi" },
            { q: "Ketua RT dipilih oleh...", options: ["Warga", "Presiden", "Polisi", "Guru"], answer: "Warga" },
            { q: "Hari Kemerdekaan...", options: ["17 Agustus", "21 April", "1 Mei", "28 Oktober"], answer: "17 Agustus" },
            { q: "Simbol sila ke-3...", options: ["Pohon Beringin", "Bintang", "Rantai", "Banteng"], answer: "Pohon Beringin" },
            { q: "Hak adalah sesuatu yang...", options: ["Diterima", "Dilakukan", "Dibuang", "Diberi"], answer: "Diterima" },
            { q: "Kewajiban pelajar...", options: ["Belajar", "Bekerja", "Main", "Tidur"], answer: "Belajar" },
            { q: "Musyawarah untuk mencapai...", options: ["Mufakat", "Kemenangan", "Keributan", "Kekayaan"], answer: "Mufakat" },
            { q: "Sikap jujur artinya...", options: ["Tidak bohong", "Suka mencuri", "Sombong", "Malas"], answer: "Tidak bohong" },
            { q: "Membantu korban bencana...", options: ["Kemanusiaan", "Keadilan", "Ketuhanan", "Persatuan"], answer: "Kemanusiaan" },
            { q: "Dasar negara Indonesia...", options: ["Pancasila", "UUD 45", "GBHN", "Perpres"], answer: "Pancasila" }
        ]
    },
    sulit: { // SD 5-6
        ipa: [
            { q: "Planet terbesar...", options: ["Jupiter", "Saturnus", "Bumi", "Mars"], answer: "Jupiter" },
            { q: "Alat napas ikan...", options: ["Insang", "Paru-paru", "Trakea", "Kulit"], answer: "Insang" },
            { q: "Panas tanpa perantara...", options: ["Radiasi", "Konduksi", "Konveksi", "Isolasi"], answer: "Radiasi" },
            { q: "Bakteri tempe...", options: ["Rhizopus", "E.Coli", "Salmonella", "Yeast"], answer: "Rhizopus" },
            { q: "Enzim di mulut...", options: ["Ptialin", "Pepsin", "Renin", "Lipase"], answer: "Ptialin" },
            { q: "Tulang daun sejajar...", options: ["Padi", "Mangga", "Jambu", "Singkong"], answer: "Padi" },
            { q: "Perkembangbiakan pisang...", options: ["Tunas", "Biji", "Stek", "Okulasi"], answer: "Tunas" },
            { q: "Fungsi jantung...", options: ["Memompa darah", "Menyaring darah", "Mencerna", "Bernapas"], answer: "Memompa darah" },
            { q: "Magnet paling kuat di...", options: ["Kutub", "Tengah", "Samping", "Dalam"], answer: "Kutub" },
            { q: "Listrik statis contohnya...", options: ["Penggaris digosok", "Aliran kabel", "Baterai", "Aki"], answer: "Penggaris digosok" }
        ],
        ips: [
            { q: "Organisasi ASEAN...", options: ["Asia Tenggara", "Asia Timur", "Dunia", "Eropa"], answer: "Asia Tenggara" },
            { q: "Penjajah terlama...", options: ["Belanda", "Jepang", "Inggris", "Portugis"], answer: "Belanda" },
            { q: "Garis tengah bumi...", options: ["Khatulistiwa", "Bujur", "Lintang", "Meridian"], answer: "Khatulistiwa" },
            { q: "Candi Budha terbesar...", options: ["Borobudur", "Prambanan", "Penataran", "Jago"], answer: "Borobudur" },
            { q: "Mata uang Malaysia...", options: ["Ringgit", "Rupiah", "Dollar", "Baht"], answer: "Ringgit" },
            { q: "Negara Gajah Putih...", options: ["Thailand", "Vietnam", "Laos", "Kamboja"], answer: "Thailand" },
            { q: "Perjanjian Linggarjati...", options: ["Jawa Barat", "Jawa Tengah", "Bali", "Jakarta"], answer: "Jawa Barat" },
            { q: "Bunga nasional Indonesia...", options: ["Melati", "Mawar", "Tulip", "Sakura"], answer: "Melati" },
            { q: "Provinsi termuda...", options: ["Papua Barat Daya", "Timor Leste", "Banten", "Gorontalo"], answer: "Papua Barat Daya" },
            { q: "Kerja paksa zaman Jepang...", options: ["Romusha", "Rod", "Tanam Paksa", "Sewa Tanah"], answer: "Romusha" }
        ],
        bahasa: [
            { q: "Gagasan utama paragraf...", options: ["Ide Pokok", "Penjelas", "Tema", "Alur"], answer: "Ide Pokok" },
            { q: "Majas benda mati hidup...", options: ["Personifikasi", "Metafora", "Hiperbola", "Litotes"], answer: "Personifikasi" },
            { q: "Dongeng asal usul...", options: ["Legenda", "Mite", "Sage", "Fabel"], answer: "Legenda" },
            { q: "Imbuhan 'me-' sapu...", options: ["Menyapu", "Mensapu", "Mesapu", "Mnyapu"], answer: "Menyapu" },
            { q: "Kalimat utama di awal...", options: ["Deduktif", "Induktif", "Campuran", "Naratif"], answer: "Deduktif" },
            { q: "Pidato persiapan...", options: ["Naskah", "Mic", "Kursi", "Meja"], answer: "Naskah" },
            { q: "Latar tempat cerita...", options: ["Setting", "Alur", "Tokoh", "Amanat"], answer: "Setting" },
            { q: "Arti 'Banting Tulang'...", options: ["Kerja Keras", "Jatuh", "Sakit", "Menari"], answer: "Kerja Keras" },
            { q: "Tanda jeda baca puisi...", options: ["/", "//", "?", "!"], answer: "/" },
            { q: "Surat resmi menggunakan...", options: ["Baku", "Gaul", "Santai", "Daerah"], answer: "Baku" }
        ],
        pkn: [
            { q: "Pembuat undang-undang...", options: ["DPR", "Presiden", "MA", "MK"], answer: "DPR" },
            { q: "Amandemen UUD 45...", options: ["4 kali", "3 kali", "2 kali", "1 kali"], answer: "4 kali" },
            { q: "Bapak Proklamator...", options: ["Soekarno-Hatta", "Soeharto", "Habibie", "Sudirman"], answer: "Soekarno-Hatta" },
            { q: "Cinta tanah air...", options: ["Nasionalisme", "Patriotisme", "Liberalisme", "Komunisme"], answer: "Nasionalisme" },
            { q: "Pemilu setiap...", options: ["5 tahun", "4 tahun", "6 tahun", "3 tahun"], answer: "5 tahun" },
            { q: "Hak dipilih dan memilih...", options: ["Politik", "Ekonomi", "Budaya", "Sosial"], answer: "Politik" },
            { q: "Asas Pemilu...", options: ["Luber Jurdil", "Cepat", "Rahasia", "Terbuka"], answer: "Luber Jurdil" },
            { q: "Konstitusi negara...", options: ["UUD 1945", "Pancasila", "Perpu", "Keppres"], answer: "UUD 1945" },
            { q: "Provinsi dipimpin oleh...", options: ["Gubernur", "Bupati", "Walikota", "Camat"], answer: "Gubernur" },
            { q: "Menjaga keutuhan NKRI...", options: ["Kewajiban", "Hak", "Pilihan", "Hobi"], answer: "Kewajiban" }
        ]
    }
};

// --- Game State ---
let currentLevel = 'dasar';
let currentQuestionIndex = 0;
let score = 0;
let levelQuestions = [];
let isAnswering = false;

// --- DOM Elements ---
const homeScreen = document.getElementById('home-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const scoreEl = document.getElementById('score');
const qNumEl = document.getElementById('question-number');
const levelIndicator = document.getElementById('level-indicator');
const progressFill = document.getElementById('progress-fill');

const finalScoreEl = document.getElementById('final-score');
const feedbackEl = document.getElementById('feedback');
const resultMessageEl = document.getElementById('result-message');
const questionCountInput = document.getElementById('question-count');

// --- Helper Functions ---

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateMathQuestion(level) {
    let qText, correctAnswer;
    let n1, n2, n3;

    if (level === 'dasar') {
        n1 = getRandomInt(1, 20);
        n2 = getRandomInt(1, 15);
        let op = Math.random() > 0.5 ? '+' : '-';
        if (op === '-') {
            if (n1 < n2) [n1, n2] = [n2, n1];
            correctAnswer = n1 - n2;
        } else {
            correctAnswer = n1 + n2;
        }
        qText = `${n1} ${op} ${n2}`;
    } else if (level === 'menengah') {
        n1 = getRandomInt(10, 30);
        n2 = getRandomInt(5, 20);
        n3 = getRandomInt(1, 15);
        if (Math.random() > 0.5) {
            let partial = n1 + n2;
            if (partial < n3) n3 = getRandomInt(1, partial);
            correctAnswer = partial - n3;
            qText = `${n1} + ${n2} - ${n3}`;
        } else {
            if (n1 < n2) [n1, n2] = [n2, n1];
            correctAnswer = (n1 - n2) + n3;
            qText = `${n1} - ${n2} + ${n3}`;
        }
    } else if (level === 'sulit') {
        let pattern = Math.random();
        if (pattern < 0.33) {
            n1 = getRandomInt(5, 20);
            n2 = getRandomInt(2, 9);
            n3 = getRandomInt(2, 9);
            correctAnswer = n1 + (n2 * n3);
            qText = `${n1} + ${n2} x ${n3}`;
        } else if (pattern < 0.66) {
            n1 = getRandomInt(2, 9);
            n2 = getRandomInt(2, 9);
            n3 = getRandomInt(1, (n1 * n2) - 1);
            correctAnswer = (n1 * n2) - n3;
            qText = `${n1} x ${n2} - ${n3}`;
        } else {
            let n3_div = getRandomInt(2, 5);
            let n2_div = n3_div * getRandomInt(2, 5);
            n1 = getRandomInt(5, 20);
            correctAnswer = n1 + (n2_div / n3_div);
            qText = `${n1} + ${n2_div} : ${n3_div}`;
        }
    }

    let options = new Set();
    options.add(correctAnswer);
    while (options.size < 4) {
        let offset = getRandomInt(-10, 10);
        let wrong = correctAnswer + offset;
        if (wrong !== correctAnswer && wrong >= 0) options.add(wrong);
    }

    return {
        q: `${qText} = ?`,
        options: Array.from(options).sort(() => Math.random() - 0.5),
        answer: correctAnswer,
        subject: 'Matematika'
    };
}

function generateMixedQuestions(level, count) {
    let generated = [];

    // 1. Gather all non-math questions into a 'deck'
    let deck = [];
    const subjects = ['ipa', 'ips', 'bahasa', 'pkn'];

    subjects.forEach(subj => {
        if (subjectBanks[level][subj]) {
            // Copy items and tag them
            let items = subjectBanks[level][subj].map(item => ({ ...item, subject: subj.toUpperCase() }));
            deck = deck.concat(items);
        }
    });

    // 2. Shuffle the deck to randomize order logic
    deck = shuffleArray(deck);

    // 3. Fill the requested count
    for (let i = 0; i < count; i++) {
        // Decide: Math vs Non-Math?
        // Let's bias towards even spread. 
        // If we have cards in deck, pick one. If deck empty, force Math.
        // Also introduce randomness so it's not JUST deck then match.
        // Strategy: 20% Math, 80% Other until deck runs out? 
        // Or pure random?

        let pickMath = Math.random() < 0.2; // 20% chance for Math always

        if (pickMath || deck.length === 0) {
            generated.push(generateMathQuestion(level));
        } else {
            // Pick unique from deck
            let card = deck.pop(); // Removes from deck -> Unique!

            // Shuffle options for display
            let shuffledOpts = [...card.options].sort(() => Math.random() - 0.5);

            generated.push({
                q: card.q,
                options: shuffledOpts,
                answer: card.answer,
                subject: card.subject
            });
        }
    }

    return generated.map(item => {
        let ansIndex = item.options.indexOf(item.answer);
        return {
            q: item.q,
            options: item.options,
            answer: ansIndex,
            subject: item.subject
        };
    });
}

function startLevel(level) {
    let count = parseInt(questionCountInput.value);
    if (isNaN(count) || count < 1) count = 10;
    if (count > 50) count = 50;

    currentLevel = level;
    levelQuestions = generateMixedQuestions(level, count);

    currentQuestionIndex = 0;
    score = 0;
    scoreEl.innerText = score;

    levelIndicator.innerText = `Level: ${level.charAt(0).toUpperCase() + level.slice(1)}`;

    const headerSpan = document.querySelector('.quiz-header span:last-child');
    headerSpan.innerHTML = `Soal: <span id="question-number">1</span>/${levelQuestions.length}`;

    showScreen(quizScreen);
    renderQuestion();
}

function renderQuestion() {
    isAnswering = false;
    const q = levelQuestions[currentQuestionIndex];

    questionText.innerHTML = `<span style="display:block; font-size: 1rem; color: var(--color-primary); margin-bottom:10px;">[${q.subject}]</span> ${q.q}`;

    document.getElementById('question-number').innerText = currentQuestionIndex + 1;

    const progressPercent = ((currentQuestionIndex) / levelQuestions.length) * 100;
    progressFill.style.width = `${progressPercent}%`;

    optionsContainer.innerHTML = '';

    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-option';
        btn.innerHTML = opt;
        btn.onclick = () => checkAnswer(index, q.answer, btn);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selected, correct, btnElement) {
    if (isAnswering) return;
    isAnswering = true;

    const options = document.querySelectorAll('.btn-option');

    if (selected === correct) {
        btnElement.classList.add('correct');
        score += 10;
        scoreEl.innerText = score;
        showFeedback(true);
        playSound('correct');
    } else {
        btnElement.classList.add('wrong');
        if (options[correct]) options[correct].classList.add('correct');
        showFeedback(false);
        playSound('wrong');
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < levelQuestions.length) {
            renderQuestion();
        } else {
            endGame();
        }
    }, 1500);
}

function showFeedback(isCorrect) {
    feedbackEl.innerText = isCorrect ? "BENAR! 🎉" : "SALAH! 😅";
    feedbackEl.className = `feedback-overlay ${isCorrect ? 'feedback-correct' : 'feedback-wrong'} show`;

    setTimeout(() => {
        feedbackEl.classList.remove('show');
    }, 1000);
}

function endGame() {
    showScreen(resultScreen);
    playSound('win');

    const maxScore = levelQuestions.length * 10;
    finalScoreEl.innerText = `${score} / ${maxScore}`;

    const percentage = (score / maxScore) * 100;

    if (percentage === 100) {
        resultMessageEl.innerText = "SEMPURNA! Kamu Jenius! 🌟";
    } else if (percentage >= 80) {
        resultMessageEl.innerText = "Hebat! Pertahankan! 👏";
    } else if (percentage >= 50) {
        resultMessageEl.innerText = "Bagus, tapi bisa lebih baik lagi! 💪";
    } else {
        resultMessageEl.innerText = "Jangan menyerah, ayo belajar lagi! 📚";
    }
}

function restartGame() {
    startLevel(currentLevel);
}

function goHome() {
    showScreen(homeScreen);
}

function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}
