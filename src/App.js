const MissionUtils = require("@woowacourse/mission-utils");


class App {
  constructor() {
    this.randomNum = new RandomCount();
    this.game = new GameCourse(this.randomNum);
  }

  play() {
    this.game.startText();
    this.game.writeInput();
  }
}

class RandomCount {
  get getCount () {
    const computer = [];
    while (computer.length < 3) {
      const number = MissionUtils.Random.pickNumberInRange(1, 9);
      if (!computer.includes(number)) {
        computer.push(number);
      }
    }
    return computer;
  }
}

class GameCourse {
  constructor(randomNum) {
    this.randomNum = randomNum;
  }

  startText() {
    MissionUtils.Console.print('숫자 야구 게임을 시작합니다.');
  }

  writeInput() {
    MissionUtils.Console.readLine('숫자를 입력해주세요 :', (answer) => {
      MissionUtils.Console.print(this.compareValue(answer, this.randomNum.getCount));
      // return this.writeInput();
    });
  }

  strike(answer, randomNum) {
    let count = 0;

    randomNum.forEach((num, index) => {
      if (num === +answer[index]) {
        count++;
      }
    });

    return count;
  }

  ball(answer, randomNum) {
    let count = 0;

    randomNum.forEach((num, index, numArr) => {
      if (num !== +answer[index] && numArr.includes(+answer[index])) {
        count++;
      }
    });

    return count;
  }

  compareValue(answer, randomNum) {
    let strike = this.strike(answer, randomNum);
    let ball = this.ball(answer, randomNum)

    console.log(strike, ball)
  }
}

module.exports = App;
