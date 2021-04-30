let appData = null;
let i = 60;
let firstPawnRed = 0;
let seconPawnRed = 1;
let thirdPawnRed = 2;
let fourthPawnRed = 3;


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
                'red-protect-pawn-0', 'red-protect-pawn-1', 'red-protect-pawn-2', 'red-protect-pawn-3'
            ];
            let redDiv = document.getElementById(redFields[element]);
            redDiv.innerHTML = `<div class="pawn-red" />`;
        });
        appData.plansza.blue.forEach(element => {
            const blueFields = [
                'blueField0', 'blueField1', 'blueField2', 'blueField3',
                ...this.getPawnIds(0),
                'blue-protect-pawn-0',
                'blue-protect-pawn-1',
                'blue-protect-pawn-2',
                'blue-protect-pawn-3'
            ];
            let blueDiv = document.getElementById(blueFields[element]);
            blueDiv.innerHTML = `<div class="pawn-blue" />`;
        });
        appData.plansza.green.forEach(element => {
            const greenFields = [
                'greenField0', 'greenField1', 'greenField2', 'greenField3',
                ...this.getPawnIds(10),
                'green-protect-pawn-0',
                'green-protect-pawn-1',
                'green-protect-pawn-2',
                'green-protect-pawn-3'
            ];
            let greenDiv = document.getElementById(greenFields[element]);
            greenDiv.innerHTML = `<div class="pawn-green" />`;
        });
        appData.plansza.yellow.forEach(element => {
            const yellowFields = [
                'yellowField0', 'yellowField1', 'yellowField2', 'yellowField3',
                ...this.getPawnIds(20),
                'yellow-protect-pawn-0',
                'yellow-protect-pawn-1',
                'yellow-protect-pawn-2',
                'yellow-protect-pawn-3'
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

    // pawnTurn() {
    //     console.log(this.rollDice())
    //     if (this.rollDice() == 6) {
    //         appData = {
    //             ...appData,
    //             plansza: {
    //                 ...appData.plansza,
    //                 red: [firstPawnRed + 3, seconPawnRed, thirdPawnRed, fourthPawnRed]
    //             }
    //         };
    //     }
    // }

    timer() {
        let changedNick = document.getElementById("red");

        if (changedNick.id === "red") {
            i = i - 5;
            console.log(i)
            if (i === 0) {
                changedNick = document.getElementById("blue");
                i = 60;
            }
        }
        else if (changedNick.id === "blue") {
            i = i - 5;
            console.log(i)
            if (i === 0) {
                changedNick = document.getElementById("green");
                i = 60;
            }
        }
        else if (changedNick.id === "green") {
            i = i - 5;
            console.log(i)
            if (i === 0) {
                changedNick = document.getElementById("yellow");
                i = 60;
            }
        }
        else if (changedNick.id === "yellow") {
            i = i - 5;
            console.log(i)
            if (i === 0) {
                changedNick = document.getElementById("red");
                i = 60;
            }
        }

        apiClient.post('/room', { room: appData ? appData : null })
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
        game.appendNumber();
        // game.pawnTurn()
        // appData = {
        //     ...appData,
        //     plansza: {
        //         ...appData.plansza,
        //         red: [0, 1, 2, 3]
        //     }
        // };
    });
    setInterval(game.timer, 5000)
});
