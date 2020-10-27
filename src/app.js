function solve() {
    const gameStart = document.querySelector('.game-start');
    const gameScore = document.querySelector('.game-score');
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

        window.requestAnimationFrame(gameAction);
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    let keys = {};
    let player = {
        x: 150,
        y:100
    };
    let game = {
        speed: 2,
        movingMultiplier: 4
    };

    function onKeyDown(e) {
        keys[e.code] = true;
    }

    function onKeyUp(e) {
        keys[e.code] = false;
    }

    function gameAction() {
        const wizard = document.querySelector('.wizard');

        if (keys.ArrowUp && player.y > 0) {
            player.y -= game.speed * game.movingMultiplier;
        }

        if (keys.ArrowDown) {
            player.y += game.speed * game.movingMultiplier;
        }

        if (keys.Left && player.x > 0) {
            player.x -= game.speed * game.movingMultiplier;
        }

        if (keys.ArrowRight) {
            player.x += game.speed * game.movingMultiplier;
        }

        wizard.style.top = player.y + 'px';
        wizard.style.left = player.x + 'px';

        window.requestAnimationFrame(gameAction);
    }
}