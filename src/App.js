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
  getCount () {
    const computer = [];
    while (computer.length < 3) {
      const number = MissionUtils.Random.pickNumberInRange(1, 9);
      if (!computer.includes(number)) {
        computer.push(number);
      }
    }
    // console.log(computer)
    return computer;
  }
}

class GameCourse {
  constructor(randomNum) {
    this.randomNum = randomNum;
  }

  startText() {
    MissionUtils.Console.print('숫자 야구 게임을 시작합니다.');
    // this.randomNum.getCount();
  }

  writeInput() {
    MissionUtils.Console.readLine('숫자를 입력해주세요 :', (answer) => {
      MissionUtils.Console.print(answer);
      
    });
  }
}

module.exports = App;
