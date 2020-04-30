function isBigger(firstNumber, secondNumber) {
  return +firstNumber > +secondNumber;
}
function countPoints(countArr) {
  if (!countArr) {
    return ;
  }
  const WIN_POINTS = 3;
  const DRAW_POINTS = 1;
  let totalCount = 0;
  for(let i = 0; i < countArr.length; i++) {
    let gameScore = countArr[i].split(':');
    if (gameScore[0] && gameScore[1]) {
      let scoredGoals =+ gameScore[0];
      let missedGoals =+ gameScore[1];
      if (scoredGoals === missedGoals) {
        totalCount += DRAW_POINTS;
      } else if (isBigger(scoredGoals, missedGoals)) {
        totalCount += WIN_POINTS;
      }
    }
  }
  return totalCount;
}
countPoints();
