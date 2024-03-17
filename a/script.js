var healCount = 0;

var fundo = document.getElementById("overlay");

var fundo2 = document.getElementById("overlay2");

var ost = document.getElementById("ost");

var EF = document.getElementById("fogEf");

var EF2 = document.getElementById("VITEf");

document.getElementById('next').addEventListener('click', function() {
    this.style.display = 'none';

    const start = () => {
        setTimeout(function() {
            EF.play();
        }, 10);
    };
  
    //  Stop
  
    const start2 = () => {
        setTimeout(function() {
            ost.play()
            
            fundo.style.display = 'none';
        }, 4010);
    };
  
    start();
    start2();
  })

document.getElementById('attack-btn').addEventListener('click', function() {
  // Reduz a saúde do chefe aleatoriamente entre 5 e 15
  var bossDamage = Math.floor(Math.random() * 11) + 5;
  reduceBossHealth(bossDamage);
  
  // Reduz a saúde do jogador aleatoriamente entre 5 e 15
  var playerDamage = Math.floor(Math.random() * 11) + 3;
  reducePlayerHealth(playerDamage);
});

document.getElementById('heal-btn').addEventListener('click', function() {
  if (healCount < 10) {
    // Cura o jogador aleatoriamente entre 10 e 20
    var healAmount = Math.floor(Math.random() * 11) + 10;
    healPlayer(healAmount);
    
    healCount++;
    
    if (healCount === 10) {
      document.getElementById('heal-btn').disabled = true;
    }
  }
});

function reduceBossHealth(amount) {
  var bossHealthBar = document.getElementById('boss-health-bar');
  var bossHealthLabel = document.getElementById('boss-health-label');
  
  bossHealthBar.value -= amount;
  bossHealthLabel.textContent = bossHealthBar.value + "/200";
  
  if (bossHealthBar.value <= 0) {
    alert('Você venceu!');
    fundo2.style.display = 'block';
    EF2.play();
    ost.volume -= 0.3;
    ost.pause()
  }
}

function reducePlayerHealth(amount) {
  var playerHealthBar = document.getElementById('player-health-bar');
  var playerHealthLabel = document.getElementById('player-health-label');
  
  playerHealthBar.value -= amount;
  playerHealthLabel.textContent = playerHealthBar.value + "/100";
  
  if (playerHealthBar.value <= 0) {
    alert('Você perdeu!');
    resetGame();
  }
}

function healPlayer(amount) {
  var playerHealthBar = document.getElementById('player-health-bar');
  var playerHealthLabel = document.getElementById('player-health-label');
  
  playerHealthBar.value += amount;
  if (playerHealthBar.value > 100) {
    playerHealthBar.value = 100;
  }
  playerHealthLabel.textContent = playerHealthBar.value + "/100";
}

function resetGame() {
  var playerHealthBar = document.getElementById('player-health-bar');
  var bossHealthBar = document.getElementById('boss-health-bar');
  
  playerHealthBar.value = 100;
  bossHealthBar.value = 200;
  
  document.getElementById('player-health-label').textContent = '100/100';
  document.getElementById('boss-health-label').textContent = '200/200';
  
  // Reseta o contador de cura e reativa o botão de cura
  healCount = 0;
  document.getElementById('heal-btn').disabled = false;
}
