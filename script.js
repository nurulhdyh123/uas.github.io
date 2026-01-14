import { levels } from './data.js';

class GameEngine {
    constructor(config, onGameOver, onScoreUpdate) {
        this.config = config;
        this.onGameOver = onGameOver;
        this.onScoreUpdate = onScoreUpdate;
        this.score = 0;
        this.timer = 0;
        this.interval = null;
        this.isActive = false;
    }

    startTimer(seconds) {
        this.timer = seconds;
        this.updateTimerDisplay();
        this.interval = setInterval(() => {
            this.timer--;
            this.updateTimerDisplay();
            if (this.timer <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    updateTimerDisplay() {
        const timerEl = document.getElementById('timer');
        if (timerEl) timerEl.textContent = this.timer;
        if (this.timer <= 5 && timerEl) timerEl.style.color = '#ff4d4d';
        else if (timerEl) timerEl.style.color = 'var(--accent-cyan)';
    }

    stopTimer() {
        clearInterval(this.interval);
    }

    addScore(points) {
        this.score += points;
        this.onScoreUpdate(this.score);
    }

    endGame() {
        this.stopTimer();
        this.isActive = false;
        this.onGameOver(this.score);
    }
}

class QuizGame extends GameEngine {
    constructor(config, onGameOver, onScoreUpdate) {
        super(config, onGameOver, onScoreUpdate);
        this.questions = [...config.questions]; // Copy
        this.currentQIndex = 0;
    }

    start() {
        this.isActive = true;
        this.score = 0;
        this.currentQIndex = 0;
        this.loadQuestion();
    }

    loadQuestion() {
        if (this.currentQIndex >= this.questions.length) {
            this.endGame();
            return;
        }

        const q = this.questions[this.currentQIndex];
        const container = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');

        // Reset View
        container.innerHTML = q.q;
        optionsContainer.innerHTML = '';

        // Timer per question (optional, using global game time for now or per question config)
        // For this quiz, let's use global time limit per question? 
        // Logic: The config.timeLimit in data.js is 15s. That implies per question.
        if (this.config.timeLimit) {
            this.stopTimer();
            this.startTimer(this.config.timeLimit);
        }

        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = opt;
            btn.onclick = () => this.handleAnswer(idx, q.a, btn);
            optionsContainer.appendChild(btn);
        });
    }

    handleAnswer(selectedIdx, correctIdx, btnElement) {
        if (!this.isActive) return;

        this.stopTimer(); // Pause timer while showing feedback

        const allBtns = document.querySelectorAll('.option-btn');
        allBtns.forEach(b => b.disabled = true);

        if (selectedIdx === correctIdx) {
            btnElement.classList.add('correct');
            this.addScore(100);
            this.playSound('correct');
        } else {
            btnElement.classList.add('wrong');
            allBtns[correctIdx].classList.add('correct');
            this.playSound('wrong');
        }

        setTimeout(() => {
            this.currentQIndex++;
            this.loadQuestion();
        }, 1500);
    }

    playSound(type) {
        // Placeholder for sound integration
        console.log(`Playing sound: ${type}`);
    }
}

class MathGame extends GameEngine {
    constructor(config, onGameOver, onScoreUpdate) {
        super(config, onGameOver, onScoreUpdate);
        this.operators = config.config.operators;
        this.range = config.config.range;
        this.globalTime = config.config.timeLimit || 60;
    }

    start() {
        this.isActive = true;
        this.score = 0;
        this.startTimer(this.globalTime);
        this.generateProblem();
    }

    generateProblem() {
        if (!this.isActive) return;

        const container = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');

        const num1 = Math.floor(Math.random() * (this.range[1] - this.range[0] + 1)) + this.range[0];
        const num2 = Math.floor(Math.random() * (this.range[1] - this.range[0] + 1)) + this.range[0];
        const op = this.operators[Math.floor(Math.random() * this.operators.length)];

        // Ensure no negative results for SD if subtraction
        let n1 = num1, n2 = num2;
        if (op === '-' && n1 < n2) [n1, n2] = [n2, n1];
        if (op === '/' && n1 % n2 !== 0) n1 = n1 * n2; // Ensure clean division

        this.currentAnswer = eval(`${n1} ${op} ${n2}`);

        const operatorSymbol = op === '*' ? '×' : op === '/' ? '÷' : op;

        container.innerHTML = `<span style="font-size:3rem">${n1} ${operatorSymbol} ${n2} = ?</span>`;
        optionsContainer.innerHTML = `
            <input type="number" id="math-answer" class="math-input" placeholder="Jawab..." autofocus autocomplete="off">
            <button class="card-btn" style="padding:1rem; grid-column: span 2;" id="submit-math">Jawab</button>
        `;

        const input = document.getElementById('math-answer');
        const submitBtn = document.getElementById('submit-math');

        input.focus();

        const check = () => {
            const val = parseInt(input.value);
            if (!isNaN(val)) this.checkAnswer(val);
        };

        submitBtn.onclick = check;
        input.onkeypress = (e) => {
            if (e.key === 'Enter') check();
        };
    }

    checkAnswer(val) {
        if (val === this.currentAnswer) {
            this.addScore(50);
            // Visual feedback
            const input = document.getElementById('math-answer');
            input.style.borderColor = '#2ecc71';
            setTimeout(() => this.generateProblem(), 500);
        } else {
            const input = document.getElementById('math-answer');
            input.style.borderColor = '#e74c3c';
            input.value = '';
            input.focus();
        }
    }
}

class PuzzleGame extends GameEngine {
    constructor(config, onGameOver, onScoreUpdate) {
        super(config, onGameOver, onScoreUpdate);
        this.words = config.words;
        this.idx = 0;
    }

    start() {
        this.isActive = true;
        this.score = 0;
        this.idx = 0;
        this.startTimer(90); // Fixed time for scramble
        this.loadPuzzle();
    }

    shuffleWord(word) {
        const arr = word.split('');
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.join('');
    }

    loadPuzzle() {
        if (this.idx >= this.words.length) {
            this.endGame();
            return;
        }

        const targetWord = this.words[this.idx];
        let scrambled = this.shuffleWord(targetWord);
        while (scrambled === targetWord) scrambled = this.shuffleWord(targetWord); // Ensure it's shuffled

        const container = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');

        container.innerHTML = `
            <div style="margin-bottom:1rem; font-size:1rem; color:#aaa;">Susun Kata Ini:</div>
            <div style="font-size:3rem; letter-spacing:10px; color:#ffdd59;">${scrambled}</div>
        `;

        optionsContainer.innerHTML = `
            <input type="text" id="puzzle-answer" class="math-input" placeholder="Ketik jawaban..." style="text-transform:uppercase;">
            <button class="card-btn" style="padding:1rem; grid-column: span 2;" id="submit-puzzle">Cek</button>
        `;

        const input = document.getElementById('puzzle-answer');
        const submitBtn = document.getElementById('submit-puzzle');
        input.focus();

        const check = () => {
            if (input.value.toUpperCase().trim() === targetWord) {
                this.addScore(100);
                this.idx++;
                this.loadPuzzle();
            } else {
                input.style.borderColor = '#e74c3c';
                setTimeout(() => input.style.borderColor = 'rgba(255,255,255,0.2)', 1000);
            }
        };

        submitBtn.onclick = check;
        input.onkeypress = (e) => {
            if (e.key === 'Enter') check();
        }
    }
}

class App {
    constructor() {
        this.currentLevel = null;
        this.currentGame = null;
        this.init();
    }

    init() {
        // Expose global nav functions
        window.app = this;
    }

    showView(viewId) {
        document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
        document.getElementById(viewId).classList.add('active');
    }

    selectLevel(levelKey) {
        this.currentLevel = levelKey;
        this.renderSubjects(levelKey);
        this.showView('subject-view');
    }

    renderSubjects(levelKey) {
        const grid = document.getElementById('subject-grid');
        const title = document.getElementById('level-title');
        title.innerText = `Materi ${levelKey}`;
        grid.innerHTML = '';

        const subjects = levels[levelKey];
        Object.keys(subjects).forEach(subKey => {
            const data = subjects[subKey];
            const btn = document.createElement('button');
            btn.className = 'card-btn';
            btn.innerHTML = `
                <i class="fa-solid ${data.icon}"></i>
                <span style="font-size:1.2rem">${subKey}</span>
                <span style="font-size:0.8rem; font-weight:400; color:#ccc;">${data.type.toUpperCase()}</span>
            `;
            btn.onclick = () => this.startGame(subKey);
            grid.appendChild(btn);
        });
    }

    goHome() {
        if (this.currentGame) {
            this.currentGame.stopTimer();
            this.currentGame = null;
        }
        this.showView('home-view');
    }

    startGame(subjectKey) {
        const subjectData = levels[this.currentLevel][subjectKey];
        this.showView('game-view');

        // Reset UI
        document.getElementById('score').innerText = '0';
        document.getElementById('timer').innerText = '--';

        const onGameOver = (finalScore) => {
            this.showResults(finalScore);
        };

        const onScoreUpdate = (score) => {
            const el = document.getElementById('score');
            // Animate score
            el.style.transform = 'scale(1.5)';
            el.style.color = '#ffd700';
            el.innerText = score;
            setTimeout(() => {
                el.style.transform = 'scale(1)';
                el.style.color = 'var(--accent-cyan)';
            }, 300);
        };

        if (subjectData.type === 'quiz') {
            this.currentGame = new QuizGame(subjectData, onGameOver, onScoreUpdate);
        } else if (subjectData.type === 'math') {
            this.currentGame = new MathGame(subjectData, onGameOver, onScoreUpdate);
        } else if (subjectData.type === 'puzzle') {
            this.currentGame = new PuzzleGame(subjectData, onGameOver, onScoreUpdate);
        }

        this.currentGame.start();
    }

    showResults(score) {
        document.getElementById('final-score').innerText = score;
        this.showView('result-view');
    }

    restartGame() {
        this.selectLevel(this.currentLevel); // Go back to subject selection effectively or restart same game?
        // Let's go to subject selection to allow choosing different topic easily
        this.showView('subject-view');
    }
}

new App();
