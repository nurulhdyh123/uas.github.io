export const levels = {
    SD: {
        "Matematika Dasar": {
            type: "math",
            description: "Hitung Cepat (Penjumlahan & Pengurangan)",
            config: {
                operators: ["+", "-"],
                range: [1, 20], // Numbers 1-20
                timeLimit: 60, // seconds
            },
            icon: "fa-calculator"
        },
        "IPA (Sains)": {
            type: "quiz",
            description: "Pengetahuan Alam Dasar",
            timeLimit: 15, // per question
            icon: "fa-leaf",
            questions: [
                { q: "Hewan yang memakan rumput disebut...", options: ["Karnivora", "Herbivora", "Omnivora", "Insectivora"], a: 1 },
                { q: "Matahari terbit dari sebelah...", options: ["Barat", "Timur", "Utara", "Selatan"], a: 1 },
                { q: "Bagian tumbuhan yang menyerap air adalah...", options: ["Daun", "Batang", "Akar", "Bunga"], a: 2 },
                { q: "Katak hidup di dua alam, disebut hewan...", options: ["Mamalia", "Amfibi", "Reptil", "Unggas"], a: 1 },
                { q: "Benda langit yang mengelilingi bumi adalah...", options: ["Matahari", "Bulan", "Bintang", "Meteor"], a: 1 },
            ]
        },
        "Bahasa Indonesia": {
            type: "puzzle",
            description: "Susun Kata",
            icon: "fa-book",
            words: ["SEKOLAH", "BELAJAR", "BUKU", "PENSIL", "GURU"]
        }
    },
    SMP: {
        "Matematika Aljabar": {
            type: "math",
            description: "Perkalian & Pembagian",
            icon: "fa-square-root-variable",
            config: {
                operators: ["*", "/"],
                range: [2, 12],
                timeLimit: 90
            }
        },
        "Sejarah": {
            type: "quiz",
            description: "Sejarah Kemerdekaan & Dunia",
            icon: "fa-landmark",
            questions: [
                { q: "Tahun berapa Indonesia merdeka?", options: ["1942", "1945", "1948", "1950"], a: 1 },
                { q: "Siapakah proklamator Indonesia?", options: ["Soeharto", "Soekarno-Hatta", "B.J. Habibie", "Megawati"], a: 1 },
                { q: "Perang dunia ke-2 berakhir pada tahun...", options: ["1939", "1945", "1918", "1955"], a: 1 },
            ]
        },
        "Fisika": {
            type: "quiz",
            description: "Hukum Newton & Energi",
            icon: "fa-bolt",
            questions: [
                { q: "Satuan dari gaya adalah...", options: ["Joule", "Newton", "Watt", "Pascal"], a: 1 },
                { q: "Energi yang dimiliki benda diam di ketinggian adalah...", options: ["Kinetik", "Potensial", "Mekanik", "Listrik"], a: 1 },
            ]
        }
    },
    SMA: {
        "Kimia": {
            type: "quiz",
            description: "Unsur & Tabel Periodik",
            icon: "fa-flask",
            questions: [
                { q: "Lambang unsur Oksigen adalah...", options: ["O", "Ox", "Og", "On"], a: 0 },
                { q: "Air memiliki rumus kimia...", options: ["H2O", "CO2", "NaCl", "H2SO4"], a: 0 },
                { q: "Atom yang bermuatan positif disebut...", options: ["Anion", "Kation", "Elektron", "Neutron"], a: 1 },
            ]
        },
        "Biologi": {
            type: "quiz",
            description: "Sel & Genetika",
            icon: "fa-dna",
            questions: [
                { q: "Pusat pengendali kegiatan sel adalah...", options: ["Mitokondria", "Nukleus", "Ribosom", "Vakuola"], a: 1 },
                { q: "Pembelahan sel kelamin disebut...", options: ["Mitosis", "Meiosis", "Amitosis", "Regenerasi"], a: 1 },
            ]
        },
        "Logika (Puzzle)": {
            type: "puzzle",
            description: "Asah Otak",
            icon: "fa-puzzle-piece",
            words: ["ALGORITMA", "STRUKTUR", "DATA", "PROGRAM"]
        }
    }
};
