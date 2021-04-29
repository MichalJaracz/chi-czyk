const response = {
    gameOn: false,
    plansza: {
        red: [0, 1, 2, 3],
        green: [0, 1, 2, 3],
        blue: [0, 1, 2, 3],
        yellow: [0, 1, 2, 3],
    },
    red: {
        nick: 'Jan',
        insertTime: Date.now(),
        lastAct: Date.now(),
        serverTime: Date.now(),
        status: 'void',
    },
    green: {
        nick: 'Ela',
        insertTime: Date.now(),
        lastAct: Date.now(),
        serverTime: Date.now(),
        status: 'void',
    },
    blue: {
        nick: 'Joe',
        insertTime: Date.now(),
        lastAct: Date.now(),
        serverTime: Date.now(),
        status: 'void',
    },
    yellow: {
        nick: 'Dupa',
        insertTime: Date.now(),
        lastAct: Date.now(),
        serverTime: Date.now(),
        status: 'void',
    },
}

class StartScreen {
    constructor() {
        this.nick = null;
    }

    myFunction() {
        this.nick = document.getElementById("myText").value;
        console.log(this.nick);
        document.getElementById("hidden").style.display = "none";
    }

    appendNicks() {
        document.getElementById("red").append(response.red.nick);
        document.getElementById("blue").append(response.blue.nick);
        document.getElementById("green").append(response.green.nick);
        document.getElementById("yellow").append(response.yellow.nick);
    }

    appendPawns() {
        // const redField = document.getElementsByClassName("red-square");
        // console.log(redField.children)
        response.plansza.red.forEach(element => {
            let redDiv = document.getElementById(`redField${element}`);
            let div = document.createElement('div');
            div.className = "pawn-red"
            redDiv.append(div);
        })
        response.plansza.blue.forEach(element => {
            let blueDiv = document.getElementById(`blueField${element}`);
            let div = document.createElement('div');
            div.className = "pawn-blue"
            blueDiv.append(div);
        })
        response.plansza.green.forEach(element => {
            let greenDiv = document.getElementById(`greenField${element}`);
            let div = document.createElement('div');
            div.className = "pawn-green"
            greenDiv.append(div);
        })
        response.plansza.yellow.forEach(element => {
            let yellowDiv = document.getElementById(`yellowField${element}`);
            let div = document.createElement('div');
            div.className = "pawn-yellow"
            yellowDiv.append(div);
        })
    }
}

class Game {
    constructor() {
        this.dice = [1, 2, 3, 4, 5, 6];
        this.div = null;
        this.i = 60
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
        this.div.append(this.rollDice());
    }

    timer() {
        let changedNick = document.getElementById("red");
        if (changedNick.id === "red") {
            $('#red1').append(`<a>${this.i}</a>`);
            this.i--;
        }
    }

}

window.addEventListener('DOMContentLoaded', (event) => {
    let startGame = new StartScreen();
    document.getElementById("btOk").addEventListener("click", () => {
        startGame.myFunction();
    })
    startGame.appendNicks();
    startGame.appendPawns();

    let game = new Game();
    document.getElementById("btDice").addEventListener("click", () => {
        game.appendNumber()
    })
    setInterval(game.timer(), 1000)
})
