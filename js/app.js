const btnMenu = document.querySelector('.btn-rond-menu')
const nav = document.querySelector('.nav-gauche');
const allItemNav = document.querySelectorAll('.nav-menu-item');
const ligne = document.querySelector('.cont-ligne');

btnMenu.addEventListener('click', () => {
    ligne.classList.toggle('active')
    nav.classList.toggle('menu-visible')
})

if(window.matchMedia('(max-width: 1300px)')) {
    allItemNav.forEach(item => {
        item.addEventListener('click', () => {
            nav.classList.toggle('menu-visible')
            ligne.classList.toggle('active');
        })
    })
}

// Animation écriture
const txtAnim = document.querySelector('.txt-animation');
let typewriter = new Typewriter(txtAnim, {loop: false, deleteSpeed: 20
})

typewriter 
.pauseFor(1800)
.changeDelay(19)
.typeString('<span style="color: #FEEA9A;">Je suis développeur <strong>web Python back-end</strong></span>')
.pauseFor(1600)
.deleteChars(39)
.typeString('<span style="color: #FEEA9A;">Maîtrise <strong>Django</strong></span>')
.pauseFor(500)
.typeString('<span style="color: #FEEA9A;"> et <strong>CICD</strong></span>')
.pauseFor(1000)
.deleteChars(23)
.typeString('<span style="color: #FEEA9A;">Utilisateur de <strong>GitHub</strong></span>')
.pauseFor(500)
.typeString('<span style="color: #FEEA9A;">, <strong>CircleCI</strong></span>')
.pauseFor(500)
.typeString('<span style="color: #FEEA9A;">, <strong>Sentry</strong></span>')
.pauseFor(500)
.typeString('<span style="color: #FEEA9A;"> et <strong>Docker</strong></span>')
.pauseFor(1000)
.deleteChars(49)
.typeString('<span style="color: #FEEA9A;">Impliqué dans le <strong>Green IT</span>')
.pauseFor(500)
.typeString('<span style="color: #FEEA9A;"> et la sécurité <strong>OWASP</strong></span>')
.pauseFor(1000)
.deleteChars(46)
.typeString('<span style="color: #FEEA9A;">Laurent Jouron, </span><strong><span style="color: #EF9700;">ANALYSTE DEVELOPPEUR</span></strong>')
.start()

// Animation Contact
const input_fields = document.querySelectorAll('input');

for(let i = 0; i < input_fields.length; i++) {
    let field = input_fields[i];
    field.addEventListener('input', (e) => {
        if(e.target.value !== ''){
            e.target.parentNode.classList.add('animation')
        } else if (e.target.value == ''){
            e.target.parentNode.classList.remove('animation')
        }
    })
}

// Anim GSAP + ScrollMagic
const navbar = document.querySelector('.nav-gauche');
const titre = document.querySelector('h1');
const btn = document.querySelectorAll('.btn-acc')
const btnMedias = document.querySelectorAll('.media')
const btnRondAccueil = document.querySelector('.btn-rond')

const TL1 = gsap.timeline({paused: true});

TL1 
.to(navbar, {left: '0px', ease: Power3.easeOut, duration: 0.6})
.from(titre, {y: -50, opacity: 0, ease: Power3.easeOut, duration: 0.4})
.staggerFrom(btn, 1, {opacity: 0}, 0.2, '-=0.30')
.staggerFrom(btnMedias, 1, {opacity: 0}, 0.2, '-=0.75')
.from(btnRondAccueil, {y: -50, opacity:0, ease: Power3.easeOut, duration: 0.4}, '-=1')

window.addEventListener('load', () => {
    TL1.play();
})

// Animation ScrollMagic GSAP presentation
const presentationContainer = document.querySelector('.presentation')
const titrePres = document.querySelector('.titre-pres');
const presGauche = document.querySelector('.pres-gauche')
const listePres = document.querySelectorAll('.item-liste')

const tlpres = new TimelineMax();

tlpres
.from(titrePres, {y: -200, opacity: 0, duration: 0.6})
.from(presGauche, {y:-20, opacity: 0, duration: 0.6}, '-=0.5')
.staggerFrom(listePres, 1, {opacity: 0}, 0.2, '-=0.5')

const controller = new ScrollMagic.Controller();

const scene = new ScrollMagic.Scene({
    triggerElement: presentationContainer,
    triggerHook: 0.5,
    reverse: false
})
.setTween(tlpres)
// .addIndicators()
.addTo(controller)

const portfolioContainer = document.querySelector('.portfolio');
const titrePortfolio = document.querySelector('.titre-port');
const itemPortfolio = document.querySelectorAll('.vague1');
const videos = document.querySelectorAll('.cont-img-port video');
const videoContainers = document.querySelectorAll('.cont-img-port');

const tlPortfolio = new TimelineMax();

tlPortfolio
.from(titrePortfolio, {y: -50, opacity: 0, duration: 0.5})
.staggerFrom(itemPortfolio, 1, {opacity: 0}, 0.2, '-=0.5');

const scene2 = new ScrollMagic.Scene({
    triggerElement: portfolioContainer,
    triggerHook: 0.5,
    reverse: false
})
.setTween(tlPortfolio)
.addTo(controller);

// Désactive la lecture automatique des vidéos par défaut
videos.forEach(video => {
    video.removeAttribute('autoplay');
    video.pause();
});

// Ajoute une animation TweenMax pour chaque conteneur de vidéo
videoContainers.forEach(container => {
    let isPlaying = false;

    container.addEventListener('mouseenter', () => {
        const video = container.querySelector('video');
        isPlaying = true;
        video.play();
    });

    container.addEventListener('mouseleave', () => {
        const video = container.querySelector('video');
        isPlaying = false;
        video.currentTime = 0;
        video.pause();
    });

    // Détection du défilement de la page
    window.addEventListener('scroll', () => {
        // Récupère les dimensions de la fenêtre
        const windowHeight = window.innerHeight;

        // Vérifie la position de chaque conteneur de vidéo par rapport à la fenêtre
        const containerRect = container.getBoundingClientRect();
        const containerTop = containerRect.top;
        const containerBottom = containerRect.bottom;

        // Calcule les pourcentages
        const bottomPercentage = (containerBottom / windowHeight) * 100;
        const topPercentage = ((windowHeight - containerTop) / windowHeight) * 100;

        // Démarre ou arrête la vidéo en fonction de la position du conteneur
        if (bottomPercentage > 35 && topPercentage > 30 && !isPlaying) {
            const video = container.querySelector('video');
            video.play();
            isPlaying = true;
        } else if ((bottomPercentage < 35 || topPercentage < 30) && isPlaying) {
            const video = container.querySelector('video');
            video.pause();
            isPlaying = false;
        }
    });
});

// Vague 2
const itemPortfolio2 = document.querySelectorAll('.vague2')

const tlPortfolio2 = new TimelineMax();

tlPortfolio2
.staggerFrom(itemPortfolio2, 1, {opacity: 0}, 0.2, '-=0.5')

const scene3 = new ScrollMagic.Scene({
    triggerElement: itemPortfolio,
    triggerHook: 0.2,
    reverse: false
})
.setTween(tlPortfolio2)
.addTo(controller)

// Vague 3
const itemPortfolio3 = document.querySelectorAll('.vague3')

const tlPortfolio3 = new TimelineMax();

tlPortfolio3
.staggerFrom(itemPortfolio3, 1, {opacity: 0}, 0.2, '-=0.5')

const scene4 = new ScrollMagic.Scene({
    triggerElement: itemPortfolio2,
    triggerHook: 0.2,
    reverse: false
})
.setTween(tlPortfolio3)

// .addIndicators()
.addTo(controller)

// Animation range
const sectionComp = document.querySelector('.section-range');
const titreComp = document.querySelector('.titre-exp');
const allLabel = document.querySelectorAll('.label-skill')
const allPourcent = document.querySelectorAll('.number-skill')
const allBarres = document.querySelectorAll('.barre-skill')
const allShadowBarres = document.querySelectorAll('.barre-grises')

const tlCompetences = new TimelineMax();

tlCompetences
.from(titreComp, {opacity: 0, duration: 0.6})
.staggerFrom(allLabel, 0.5, {y: -50, opacity:0}, 0.1, '-=0.5')
.staggerFrom(allPourcent, 0.5, {y: -10, opacity:0}, 0.1, '-=1')
.staggerFrom(allShadowBarres, 0.5, {y: -10, opacity:0}, 0.1, '-=1')
.staggerFrom(allBarres, 0.5, {y: -10, opacity:0}, 0.1, '-=1')

const scene5 = new ScrollMagic.Scene({
    triggerElement: sectionComp,
    reverse: false
})
.setTween(tlCompetences)
.addTo(controller);
