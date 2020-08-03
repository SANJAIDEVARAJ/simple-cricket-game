var Cricket = /** @class */ (function () {
    function Cricket(n) {
        this.player = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.over = 0;
        this.balls = 0;
        this.totalscore = 0;
        this.name = n;
    }
    Cricket.prototype.hit = function () {
        var score = Math.floor(Math.random() * 7);
        this.totalscore += score;
        this.player[Math.floor(this.over)] = score + this.player[Math.floor(this.over)];
        console.log(score, (this.over + 1).toString(), (this.balls + 1).toString());
        document.getElementById(this.name + "score").innerText = this.totalscore.toString();
        if (score === 0)
            document.getElementById(this.name + (this.over + 1).toString() + (this.balls + 1).toString()).innerText = 'W';
        else
            document.getElementById(this.name + (this.over + 1).toString() + (this.balls + 1).toString()).innerText = score.toString();
        document.getElementById(this.name + (this.over + 1).toString() + "7").innerText = this.player[this.over];
        //console.log(this.player , this.over, this.balls)
        if (this.balls === 5 || score == 0) {
            this.balls = 0;
            this.over++;
        }
        else
            this.balls++;
        if (this.over === 10) {
            clearInterval(timer);
            document.getElementById(this.name).disabled = true;
            document.getElementById("start").disabled = false;
            if (isMatchStarted === 3) {
                document.getElementById("start").disabled = true;
                document.getElementById("result").disabled = false;
            }
        }
    };
    Cricket.prototype.generateResult = function (team1, team2) {
        document.getElementById("resultArea").innerText = (team1.totalscore > team2.totalscore ? "Team 1 " : "Team 2 ") + "wins by " + Math.abs(team1.totalscore - team2.totalscore) + ".";
        var start = document.getElementById("start");
        start.onclick = restart;
        start.innerText = "RESTART";
        document.getElementById("start").disabled = false;
    };
    return Cricket;
}());
var team1;
var team2;
var isMatchStarted = 1;
var timer;
function restart() {
    generateTable("table1div", 1);
    generateTable("table2div", 2);
    document.getElementById("team1score").innerText = '0';
    document.getElementById("team2score").innerText = '0';
    document.getElementById("resultArea").innerText = "";
    document.getElementById("result").disabled = true;
    var start = document.getElementById("start");
    start.onclick = startMatch;
    start.innerText = "START";
    isMatchStarted = 1;
    startMatch();
}
function updateTimer() {
    document.getElementById("timer").innerText = (+document.getElementById("timer").innerText - 1).toString();
}
function startTimer() {
    clearInterval(timer);
    document.getElementById("timer").innerText = '60';
    document.getElementById("team1").disabled = true;
    document.getElementById("team2").disabled = true;
    document.getElementById("start").disabled = false;
    if (isMatchStarted === 3) {
        document.getElementById("start").disabled = true;
        document.getElementById("result").disabled = false;
    }
}
function startMatch() {
    if (isMatchStarted === 1) {
        team1 = new Cricket("team1");
        document.getElementById("timer").innerText = '60';
        document.getElementById("team1").disabled = false;
        document.getElementById("start").disabled = true;
        timer = setInterval(updateTimer, 1000);
        setTimeout(function () { return startTimer(); }, 60000);
        isMatchStarted = 2;
    }
    else if (isMatchStarted === 2) {
        team2 = new Cricket("team2");
        document.getElementById("timer").innerText = '60';
        document.getElementById("team1").disabled = true;
        document.getElementById("team2").disabled = false;
        document.getElementById("start").disabled = true;
        timer = setInterval(updateTimer, 1000);
        setTimeout(function () { return startTimer(); }, 60000);
        isMatchStarted = 3;
    }
}
renderHTML();
generateTable("table1div", 1);
generateTable("table2div", 2);
function generateTable(node, n) {
    var div = document.getElementById(node);
    var table = document.createElement("table");
    table.classList.add("table");
    table.classList.add("table-bordered");
    table.classList.add("table-sm");
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");
    for (var i = 0; i <= 7; i++) {
        var th = document.createElement("th");
        if (i === 0) {
            th.innerText = "Team " + n;
        }
        else if (i === 7) {
            th.innerText = "Total";
        }
        else {
            th.innerText = i.toString();
        }
        tr.appendChild(th);
    }
    thead.appendChild(tr);
    table.appendChild(thead);
    var tbody = document.createElement("tbody");
    function addRow(n) {
        var tr = document.createElement("tr");
        for (var i = 0; i <= 7; i++) {
            var tx = void 0;
            if (i === 0)
                tx = document.createElement("th");
            else
                tx = document.createElement("td");
            if (i === 0)
                tx.innerText = "Player " + n;
            else
                tx.setAttribute("id", (node === "table1div" ? "team1" : "team2") + n.toString() + i.toString());
            tr.appendChild(tx);
        }
        tbody.appendChild(tr);
    }
    for (var i = 1; i <= 10; i++) {
        addRow(i);
    }
    table.appendChild(tbody);
    div.innerHTML = '';
    div.appendChild(table);
}
function renderHTML() {
    var container = document.getElementById("root");
    container.innerHTML = "";
    container.className = "container text-center";
    var row1 = document.createElement("div");
    row1.className = "row";
    var col = document.createElement('div');
    col.className = 'col-4';
    var p = document.createElement('p');
    p.innerText = "TEAM 1 SCORE";
    col.appendChild(p);
    var h2 = document.createElement('h2');
    h2.innerText = '0';
    h2.setAttribute('id', 'team1score');
    col.appendChild(h2);
    var button = document.createElement('button');
    button.disabled = true;
    button.setAttribute('id', 'team1');
    button.className = 'btn btn-primary';
    button.setAttribute("onclick", "team1.hit()");
    button.innerText = "HIT";
    col.appendChild(button);
    row1.appendChild(col);
    var col = document.createElement('div');
    col.className = 'col-4';
    var p = document.createElement('p');
    p.innerText = "TIMER";
    col.appendChild(p);
    var h2 = document.createElement('h1');
    h2.innerText = '60';
    h2.setAttribute('id', 'timer');
    col.appendChild(h2);
    var button = document.createElement('button');
    button.setAttribute('id', 'start');
    button.className = 'btn btn-primary';
    button.onclick = startMatch;
    button.innerText = "START";
    col.appendChild(button);
    row1.appendChild(col);
    var col = document.createElement('div');
    col.className = 'col-4';
    var p = document.createElement('p');
    p.innerText = "TEAM 2 SCORE";
    col.appendChild(p);
    var h2 = document.createElement('h2');
    h2.innerText = '0';
    h2.setAttribute('id', 'team2score');
    col.appendChild(h2);
    var button = document.createElement('button');
    button.disabled = true;
    button.setAttribute('id', 'team2');
    button.className = 'btn btn-primary';
    button.setAttribute("onclick", "team2.hit()");
    button.innerText = "HIT";
    col.appendChild(button);
    row1.appendChild(col);
    container.appendChild(row1);
    var row2 = document.createElement('div');
    row2.className = "row";
    var col = document.createElement('div');
    col.className = 'col-12 mt-3';
    var button = document.createElement('button');
    button.disabled = true;
    button.setAttribute('id', 'result');
    button.className = 'btn btn-primary';
    button.setAttribute("onclick", "team1.generateResult(team1, team2)");
    button.innerText = "GENERATE RESULT";
    col.appendChild(button);
    row2.appendChild(col);
    container.appendChild(row2);
    var row3 = document.createElement('div');
    row3.className = "row";
    var col = document.createElement('div');
    col.className = 'col-12 mt-3';
    var h2 = document.createElement('h2');
    h2.setAttribute('id', 'resultArea');
    col.appendChild(h2);
    row3.appendChild(col);
    container.appendChild(row3);
    var row4 = document.createElement('div');
    row4.className = "row";
    var col = document.createElement('div');
    col.className = 'col-md-6';
    col.setAttribute('id', 'table1div');
    row4.appendChild(col);
    var col = document.createElement('div');
    col.className = 'col-md-6';
    col.setAttribute('id', 'table2div');
    row4.appendChild(col);
    container.appendChild(row4);
}