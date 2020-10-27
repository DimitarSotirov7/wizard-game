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
        y: 100,
        width: 0,
        height: 0,
        lastTimeFiredFireBall: 0
    };
    let game = {
        speed: 2,
        movingMultiplier: 4,
        fireBallMultiplier: 5,
        fireInterval: 1000,
        cloudSpawnInterval: 3000
    };

    let scene = {
        score: 0,
        lastCloudSpawn: 0
    }

    function onKeyDown(e) {
        keys[e.code] = true;
    }

    function onKeyUp(e) {
        keys[e.code] = false;
    }

    function gameAction(timestamp) {
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

        if (keys.ArrowLeft && player.x > 0) {
            player.x -= game.speed * game.movingMultiplier;
        }

        if (keys.ArrowRight && player.x + player.width < gameArea.offsetWidth) {
            player.x += game.speed * game.movingMultiplier;
        }

        if (keys.Space && timestamp - player.lastTimeFiredFireBall > game.fireInterval) {
            wizard.classList.add('wizard-fire');
            addFireBall(player);
            player.lastTimeFiredFireBall = timestamp;
        } else {
            wizard.classList.remove('wizard-fire');
        }

        wizard.style.top = player.y + 'px';
        wizard.style.left = player.x + 'px';

        scene.score++;
        gamePoints.textContent = scene.score;

        addCloud(timestamp);

        let clouds = document.querySelectorAll('.cloud');
        clouds.forEach(cloud => {
            cloud.x -= game.speed;
            cloud.style.left = cloud.x + 'px';

            if (cloud.x + cloud.offsetWidth <= 0) {
                cloud.parentElement.removeChild(cloud);
            }
        });

        let fireBalls = document.querySelectorAll('.fire-ball');
        fireBalls.forEach(fB => {
            fB.x += game.speed * game.fireBallMultiplier;
            fB.style.left = fB.x + 'px';

            if (fB.x + fB.offsetWidth > gameArea.offsetWidth) {
                fB.parentElement.removeChild(fB);
            }
        });
        window.requestAnimationFrame(gameAction);
    }

    function addFireBall(player) {
        let fireBall = document.createElement('div');
        fireBall.classList.add('fire-ball');
        fireBall.style.top = (player.y + player.height / 3 - 5) + 'px';
        fireBall.x = player.x + player.width;
        fireBall.style.left = fireBall.x + 'px';

        gameArea.appendChild(fireBall);
    }

    function addCloud(timestamp) {
        if (timestamp - scene.lastCloudSpawn > game.cloudSpawnInterval + 20000 * Math.random()) {
            let cloud = document.createElement('div');
            cloud.classList.add('.cloud');
            cloud.x = gameArea.offsetWidth - 200;
            cloud.style.left = cloud.x + 'px';
            cloud.style.top = (gameArea.offsetHeight - 200) * Math.random() + 'px';
            gameArea.appendChild(cloud);
            scene.lastCloudSpawn = timestamp;
        }
    }
}