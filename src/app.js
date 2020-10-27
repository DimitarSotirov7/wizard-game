function solve() {
    const gameStart = document.querySelector('.game-start');
    const gameScore = document.querySelector('.game-score');
    const gamePoints = document.querySelector('.points');
    const gameArea = document.querySelector('.game-area');
    const gameOver = document.querySelector('.game-over');

    gameStart.addEventListener('click', onGameStart);

    function onGameStart(e) {
        gameStart.classList.add('hide');

        const wizard = document.createElement('div');
        wizard.classList.add('wizard');
        wizard.style.top = player.y + 'px';
        wizard.style.left = player.x + 'px';
        gameArea.appendChild(wizard);

        player.width = wizard.offsetWidth;
        player.height = wizard.offsetHeight;

        window.requestAnimationFrame(gameAction);
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    let keys = {};
    let player = {
        x: 150,
        y:100,
        width: 0,
        height: 0
    };
    let game = {
        speed: 2,
        movingMultiplier: 4
    };

    let scene = {
        score: 0
    }

    function onKeyDown(e) {
        keys[e.code] = true;
    }

    function onKeyUp(e) {
        keys[e.code] = false;
    }

    function gameAction() {
        const wizard = document.querySelector('.wizard');

        let isInAir = (player.y + player.height) <= gameArea.offsetHeight;
        if (isInAir) {
            player.y += game.speed;
        }

        if (keys.ArrowUp && player.y > 0) {
            player.y -= game.speed * game.movingMultiplier;
        }

        if (keys.ArrowDown && isInAir) {
            player.y += game.speed * game.movingMultiplier;
        }

        if (keys.Left && player.x > 0) {
            player.x -= game.speed * game.movingMultiplier;
        }

        if (keys.ArrowRight && player.x + player.width < gameArea.offsetWidth) {
            player.x += game.speed * game.movingMultiplier;
        }

        if (keys.Space) {
            wizard.classList.add('wizard-fire');
            addFireBall();
        } else {
            wizard.classList.remove('wizard-fire');
        }

        wizard.style.top = player.y + 'px';
        wizard.style.left = player.x + 'px';

        scene.score++;
        gamePoints.textContent = scene.score;

        let fireBalls = document.querySelectorAll('.fire-ball');
        fireBalls.forEach(fB => {
            fB.x += game.speed;
            fB.style.left = fB.x + 'px';
        });
        window.requestAnimationFrame(gameAction);
    }

    function addFireBall() {
        let fireBall = document.createElement('div');
        fireBall.classList.add('fire-ball');
        fireBall.style.top = (player.y + player.height / 3 - 5) + 'px';
        fireBall.x = player.x + player.width;
        fireBall.style.left = fireBall.x + 'px'; 

        gameArea.appendChild(fireBall);
    }
}