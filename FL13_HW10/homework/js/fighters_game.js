function Fighter() {
  const this$ = {};

  class Fighter {
    constructor(fighter) {
      this$.name = fighter['name'];
      this$.damage = fighter['damage'];
      this$.maxTotalHp = fighter['hp'];
      this$.currentHp = fighter['hp'];
      this$.strength = fighter['strength'];
      this$.agility = fighter['agility'];
      this$.wins = 0;
      this$.losses = 0;
    }
    getName() {
      return this$.name;
    }
    getDamage() {
      return this$.damage;
    }
    getStrength() {
      return this$.strength;
    }
    getAgility() {
      return this$.agility;  
    }
    getHealth() {
      return this$.currentHp;
    }
    attack(enemy) {
      const MAX_PROBABILITY = 100;
      const ENEMY_PROTECTION = enemy.getAgility() + enemy.getStrength();
      if (Math.floor(Math.random() * MAX_PROBABILITY) > ENEMY_PROTECTION) {
        enemy.dealDemage(this$.damage);
        console.log(`${this$.name} makes ${this$.damage} damage to ${enemy.getName()}`);
      } else {
        console.log(`${this$.name} attack missed`);
      }
    }
    logCombatHistory() {
      console.log(`Name: ${this$.name}, Wins: ${this$.wins}, Losses: ${this$.losses}`);
    }
    heal(amount) {
      this$.currentHp = this$.currentHp + amount > this$.maxTotalHp ? this$.maxTotalHp : this$.currentHp + amount;
    }
    dealDemage(coughtDamage) {
      this$.currentHp = this$.currentHp - coughtDamage < 0 ? 0 : this$.currentHp - coughtDamage;
    }
    addWin() {
      this$.wins++;
    }
    addLoss() {
      this$.losses++;
    }
  }
  const instance = new Fighter(...arguments);
  Object.setPrototypeOf(Object.getPrototypeOf(instance) , this);
  return instance;
}
function battle(fighter1, fighter2) {
  if (fighter1.getHealth() === 0 || fighter2.getHealth() === 0) {
    fighter1.getHealth() === 0 ? console.log(`${fighter1.getName()} is dead and can't fight.`)
    : console.log(`${fighter2.getName()} is dead and can't fight.`);
  } else {
    let attacker = fighter1;
    let defender = fighter2;
    while(fighter1.getHealth() && fighter2.getHealth()) {
      attacker.attack(defender);
      if (defender.getHealth() > 0 ) {
        [attacker, defender] = [defender, attacker];
      }
    }
    defender.addLoss();
    attacker.addWin();
    console.log(`${attacker.getName()} has won!`);
  }
}
