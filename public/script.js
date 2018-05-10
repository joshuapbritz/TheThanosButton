const doomed = [];
const audio = createTrack('snap.mp3');
const bg = createTrack('bg.mp3');
let dramaticMusicHasPlayedAndEveryoneIsCryingLikeABitch = false;
window.onload = () => {
    const buttons = Array.from(document.getElementsByTagName('button'));
    const notThanos = buttons.filter(
        button => !button.classList.contains('thanos-button')
    );
    const amount = Math.round(notThanos.length / 2);
    for (let i = 0; i < amount; i++) {
        const doom = Math.floor(Math.random() * notThanos.length);
        doomed.push(notThanos[doom]);
        console.log(`${notThanos[doom].textContent}: ${i} | ${doom}`);
        notThanos.splice(doom, 1);
    }

    document.querySelector('.thanos-button').addEventListener('click', () => {
        playSound();
        if (!dramaticMusicHasPlayedAndEveryoneIsCryingLikeABitch) {
            let i = 0;
            for (const victim of doomed) {
                setTimeout(() => {
                    victim.style.transition =
                        'cubic-bezier(1,.76,1,-0.1) 5000ms';
                    victim.style.transform = `translateY(30px) scale(20)`;
                    victim.style.filter = `blur(200px)`;
                    victim.style.opacity = 0.1;
                    // setTimeout(() => {
                    //     // victim.style.transition = 'none';
                    //     // victim.style.textDecoration = 'line-through';
                    //     // victim.style.filter = `blur(0)`;
                    //     // victim.style.transform = `scale(1)`;
                    //     // victim.style.opacity = 0.9;
                    //     victim.remove();
                    // }, 10000);
                }, Math.floor(Math.random() * 8000) + 500);
            }
            doomed.length = 0;
            dramaticMusicHasPlayedAndEveryoneIsCryingLikeABitch = true;
        }
    });
};

function playSound() {
    audio.play();
    if (!dramaticMusicHasPlayedAndEveryoneIsCryingLikeABitch) {
        setTimeout(() => {
            playBG();
        }, 700);
    }
}

function playBG() {
    bg.play();
    bg.onended = () => {
        startAgain();
    };
}

function createTrack(_src) {
    const _audio = document.createElement('AUDIO');
    const src = document.createElement('SOURCE');
    src.src = _src;
    src.type = 'audio/mpeg';
    _audio.appendChild(src);
    return _audio;
}

function startAgain() {
    const reload = document.createElement('DIV');
    reload.style.position = 'fixed';
    reload.style.top = 0;
    reload.style.right = 0;
    reload.style.width = 'auto';
    reload.style.height = '50px';
    reload.style.lineHeight = '50px';
    reload.style.backgroundColor = 'transparent';
    reload.style.padding = '0 20px';
    reload.textContent = 'Start Again';
    reload.style.zIndex = '999';
    reload.style.cursor = 'pointer';
    reload.onmouseenter = () => {
        reload.style.textDecoration = 'underline';
    };
    reload.onmouseleave = () => {
        reload.style.textDecoration = 'none';
    };
    reload.onclick = () => {
        location.reload();
    };
    document.body.insertBefore(reload, document.body.firstChild);
}
