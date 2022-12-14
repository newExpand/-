const MissionUtils = require("@woowacourse/mission-utils");

class App {
  constructor() {
    this.game = new GameCourse();
  }

  play() {
    this.game.startText();
    this.game.repeatContext();
  }
}

class RandomCount {
  get getCount() {
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
    this.victory = false;
  }

  startText() {
    MissionUtils.Console.print("숫자 야구 게임을 시작합니다.");
  }

  repeatContext() {
    const computerAnswer = new RandomCount();
    this.writeInput(computerAnswer.getCount);
  }

  userInputErrorHandler(answer) {
    try {
      if (Number.isNaN(answer)) {
        throw "숫자가 아닌값이 포함되있습니다";
      }
      if (answer.includes(" ")) {
        throw "공백이 포함되있습니다";
      }
      if (/[^1-9]/g.test(answer)) {
        throw "1~9가 아닌 수가 포함되있습니다.";
      }
      if (new Set(answer).size !== 3) {
        throw "중복된 숫자가 포함되있습니다";
      }
      if (answer.length !== 3) {
        throw "3자리의 수를 입력해주세요";
      }
    } catch (err) {
      MissionUtils.Console.close();
      throw new Error(err);
    }


    return true;
  }

  writeInput(computerAnswer) {
    MissionUtils.Console.readLine("숫자를 입력해주세요 :", (answer) => {
      this.userInputErrorHandler(answer);
      MissionUtils.Console.print(this.compareValue(answer, computerAnswer));
      if (this.victory) {return this.reset()};
      return this.writeInput(computerAnswer);
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
    let ball = this.ball(answer, randomNum);

    console.log('answer =>' , answer, 'randomNum =>', randomNum)
    if (strike === 0 && ball === 0) {
      return `낫싱`;
    }
    if (strike === 0 && ball !== 0) {
      return `${ball}볼`;
    }
    if (ball === 0 && strike !== 0 && strike !== 3) {
      return `${strike}스트라이크`;
    }
    if (strike === 3) {
      this.victory = true;
      return `3스트라이크\n3개의 숫자를 모두 맞히셨습니다! 게임 종료`;
    }
    return `${ball}볼 ${strike}스트라이크`;
  }

  reset() {
    MissionUtils.Console.readLine("게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.",(input) => {
        if (input === "1") {
          this.victory = false;
          return this.repeatContext();
        }

        if (input === "2") {
          return MissionUtils.Console.close();
        }
      }
    );
  }
}

module.exports = App;
