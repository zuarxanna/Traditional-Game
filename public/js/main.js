class RockPaperScissor {
  hands = ['rock', 'paper', 'scissor'];
  result = document.getElementById('result');
  constructor(name) {
    this.name = name;
    this.alreadySelected = false;
    this.player = null;
    this.playerElement = null;
    this.comp = null;
    this.compElement = null;
    this.winner = null;
    this.score = null;
    this.asd = null;
  }

  match(element) {
    if (!this.alreadySelected) {
      this.playerElement = element;
      this.playerElement.classList.add('border');
      this.player = this.playerElement.id;
      this.#randomCompHand();
      this.#rules();
      this.winner = this.#rules();
      this.#score(this.winner);
      this.asd = this.#score(this.winner);
      console.log(this.asd);
      this.alreadySelected = true;
    } else {
      alert('Anda Sudah Memilih, Klik Ikon Refresh Untuk Bermain Lagi ^_^');
    }
    console.log(game);
  }

  #randomCompHand() {
    this.comp = this.hands[Math.floor(Math.random() * this.hands.length)];
    this.compElement = document.querySelector(`#comp-${this.comp}`);
    this.compElement.classList.add('border');
  }

  #rules() {
    let msg;
    if (this.player == this.comp) {
      msg = 'DRAW';
    } else {
      if ((this.player == 'rock' && this.comp == 'scissor') || (this.player == 'scissor' && this.comp == 'paper') || (this.player == 'paper' && this.comp == 'rock')) {
        msg = 'PLAYER 1 WIN';
      } else {
        msg = 'COMP WIN';
      }
    }
    result.innerHTML = msg;
    msg == 'DRAW' ? this.result.classList.add('msg', 'msg-draw') : this.result.classList.add('msg', 'msg-win');
    if (msg === 'DRAW') {
      return null;
    }
    if (msg === 'PLAYER 1 WIN') {
      return msg.substring(0, msg.length - 4);
    } else {
      return msg.substring(0, msg.length - 4);
    }
  }

  #score(winner) {
    let score = [0, 0];
    if (winner === 'PLAYER 1') {
      score[0]++;
    }
    if (winner === 'COMP') {
      score[1]++;
    }
    return {
      player1: score[0],
      comp: score[1],
    };
  }

  refresh() {
    if (this.alreadySelected) {
      this.asd = this.#score(this.winner);
      console.log(this.asd);
      this.alreadySelected = false;
      this.playerElement.classList.remove('border');
      this.compElement.classList.remove('border');
      this.player = null;
      this.comp = null;
      this.result.classList.remove('msg', 'msg-draw', 'msg-win');
      this.result.innerHTML = 'VS';
    } else {
      return alert('Silahkan Pilih Tangan Untuk Bermain Lalu Menangkan!!');
    }
    console.log(game);
  }
}

let game = new RockPaperScissor('player 1');
