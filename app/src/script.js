let appData = null;

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
});

class StartScreen {
    nick = '';

    constructor() {
        this.nick = null;
    }

    async onSetUsernameClick() {
        this.nick = document.getElementById("myText").value;
        document.getElementById("hidden").style.display = "none";
        this.setUsername();
    }

    appendNicks() {
        document.getElementById("red").innerText = appData.red.nick;
        document.getElementById("blue").innerText = appData.blue.nick;
        document.getElementById("green").innerText = appData.green.nick;
        document.getElementById("yellow").innerText = appData.yellow.nick;
    }

    getPawns(firstField) {
        const lastGameField = 41;
        const arrayToIterate = [firstField, ...Array(lastGameField)];

        return arrayToIterate.reduce((array, currentValue, index) => {
            if (currentValue) {
                return [...array, currentValue]
            }
            const newValue = array[index - 1] + 1;
            if (!currentValue && newValue <= lastGameField) {
                return [...array, newValue]
            } else {
                return [...array, 0];
            }
        }, []);
    }

    getPawnIds(firstField) {
        return this.getPawns(firstField).map(id => `pawn-${id}`);
    }

    removePawns() {
        $('div.pawn-red').remove();
        $('div.pawn-blue').remove();
        $('div.pawn-green').remove();
        $('div.pawn-yellow').remove();
    }

    appendPawns() {
        appData.plansza.red.forEach(element => {
            const redFields = [
                'redField0', 'redField1', 'redField2', 'redField3',
                ...this.getPawnIds(30),
                /* reszta idkow "finalnych" pol */
            ];
            let redDiv = document.getElementById(redFields[element]);
            redDiv.innerHTML = `<div class="pawn-red" />`;
        });
        appData.plansza.blue.forEach(element => {
            const blueFields = [
                'blueField0', 'blueField1', 'blueField2', 'blueField3',
                ...this.getPawnIds(0),
                /* reszta idkow "finalnych" pol */
            ];
            let blueDiv = document.getElementById(blueFields[element]);
            blueDiv.innerHTML = `<div class="pawn-blue" />`;
        });
        appData.plansza.green.forEach(element => {
            const greenFields = [
                'greenField0', 'greenField1', 'greenField2', 'greenField3',
                ...this.getPawnIds(10),
                /* reszta idkow "finalnych" pol */
            ];
            let greenDiv = document.getElementById(greenFields[element]);
            greenDiv.innerHTML = `<div class="pawn-green" />`;
        });
        appData.plansza.yellow.forEach(element => {
            const yellowFields = [
                'yellowField0', 'yellowField1', 'yellowField2', 'yellowField3',
                ...this.getPawnIds(20),
                /* reszta idkow "finalnych" pol */
            ];
            let yellowDiv = document.getElementById(yellowFields[element]);
            yellowDiv.innerHTML = `<div class="pawn-yellow" />`;
        });
    }

    async setUsername() {
        return await apiClient.post('/user', { username: this.nick });
    }
}

class Game {
    constructor() {
        this.dice = [1, 2, 3, 4, 5, 6];
        this.div = null;
        this.i = 60;
        this.data = null;
    }

    rollDice() {
        let num = Math.floor(Math.random() * this.dice.length);
        if (num === 0) return 1;
        if (num === 1) return 2;
        if (num === 2) return 3;
        if (num === 3) return 4;
        if (num === 4) return 5;
        if (num === 5) return 6;
    }

    appendNumber() {
        this.div = document.getElementById("diceNumber");
        this.div.innerText = this.rollDice();
    }

    timer() {
        let changedNick = document.getElementById("red");
        if (changedNick.id === "red") {
            $('#red1').append(`<a>${this.i}</a>`);
            this.i--;
        }

        apiClient.post('/room')
          .then((response) => {
              appData = response.data;
          })
          .finally(() => {
              if (appData) {
                  startGame.appendNicks();
                  startGame.removePawns();
                  startGame.appendPawns();
              }
          })
    }
}

let startGame = new StartScreen();
let game = new Game();

window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("btOk").addEventListener("click", () => {
        startGame.onSetUsernameClick();
    });

    document.getElementById("btDice").addEventListener("click", () => {
        game.appendNumber()
    });
    setInterval(game.timer, 3000)
});
