gsap.config({
    trialWarn: false,
})

// https://gsap.com/docs/v3/Eases/CustomEase/
gsap.registerPlugin(CustomEase);

function map(x, a1, a2, b1, b2) {
    return ((x - a1) * (b2 - b1)) / (a2 - a1) + b1;
}

function clamp(v, min, max) {
    return Math.min(max, Math.max(min, v));
}

function lerp(v1, v2, alpha) {
    return v1 + (v2 - v1) * alpha;
}

// Fecha automática en el footer;
var currentYear = new Date().getFullYear();
document.getElementById("currentYear").innerHTML = currentYear;



// -- ÍNDICE DE ANIMACIONES APLICADAS -- //

// 1 | ANIMACIÓN DEL CURSOR CUSTOM SOBRE EL MENÚ Y BOTONES //
// 2 | ANIMACIÓN DEL TEXTO DEL HERO //
// 3 | CAMBIO DEL FONDO CON EL SCROLL //
// 4 | ANIMACIÓN DE LOS ICONOS SVG //
// 5 | ANIMACIÓN DE BARRA DE PROGRESO //



// 1 | ANIMACIÓN DEL CURSOR CUSTOM SOBRE EL MENÚ Y BOTONES //
// El cursor sigue la posición del mouse con un lerp;
// Además, cambia de estilo sobre el menú de navegación, y sobre los botones de "Planes de precio" y "Contáctanos";

// Variables;
const cursor = document.querySelector(".cursor");
const cursorCircle = cursor.querySelector(".circle");
const logoButton = document.querySelector(".boton-inicio"); // button

const positionX = {
    mouse: 0,
    button: 0,
    current: 0,
};

const positionY = {
    mouse: 0,
    button: 0,
    current: 0,
};

// Eventos;
window.addEventListener("mousemove", (e) => {
    positionX.mouse = e.clientX;
    positionY.mouse = e.clientY;
});

// Flag;
let overNav = false;
let overLogo = false;
let overBlue = false;
let overWhite = false;

const updateCursor = () => {
    const elements = document.elementsFromPoint(positionX.mouse, positionY.mouse);

    // Obtengo la posición y el tamaño del boton-inicio;
    const rectLogoButton = logoButton.getBoundingClientRect();
    positionX.button = rectLogoButton.left + rectLogoButton.width * 0.5;
    positionY.button = rectLogoButton.top + rectLogoButton.height * 0.5;

    // Compruebo si el cursor está sobre alguno de los elementos que me interesan (true);
    overNav = elements.some((el) => el.hasAttribute("nav-elem"));
    overLogo = elements.some((el) => el.hasAttribute("logo-menu"));
    overBlue = elements.some((el) => el.hasAttribute("cta-button-blue"));
    overWhite = elements.some((el) => el.hasAttribute("cta-button-white"));



    // Posición del cursor //
    let targetX = positionX.mouse;
    let targetY = positionY.mouse;

    if (overLogo) {
        // Fijo el cursor en la posición del botón de inicio;
        targetX = positionX.button;
        targetY = positionY.button;
    }

    // El cursor sigue el movimiento del mouse;
    positionX.current = lerp(positionX.current, targetX, 0.1);
    positionY.current = lerp(positionY.current, targetY, 0.1);
    cursor.style.transform = `translate(${positionX.current}px, ${positionY.current}px)`;



    // Estilo del cursor //
    if (overLogo) {
        // Estilo del cursor cuando está sobre el botón de inicio;
        gsap.to(cursorCircle, {
            width: rectLogoButton.width + 23,
            height: rectLogoButton.height + 23,
            borderRadius: "20px",
            backgroundColor: "transparent",
            border: "2.1px solid rgb(26, 39, 201)",
            duration: 0.3,
            ease: "power2.out"
        });
        cursor.style.mixBlendMode = "normal";

    } else if (overNav) {
        // Estilo del cursor cuando está sobre el menú de navegación;
        gsap.to(cursorCircle, {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "rgba(26, 39, 201, 0.3)",
            border: "2px solid transparent",
            duration: 0.3,
            ease: "power2.out",
        });
        cursor.style.mixBlendMode = "multiply";

    } else if (overBlue) {
        // Estilo del cursor cuando está sobre botones azules;
        gsap.to(cursorCircle, {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            border: "2px solid transparent",
            duration: 0.3,
            ease: "power2.out",
        });
        cursor.style.mixBlendMode = "normal";

    } else if (overWhite) {
        // Estilo del cursor cuando está sobre botones blancos;
        gsap.to(cursorCircle, {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "rgba(26, 39, 201, 0.3)",
            border: "2px solid transparent",
            duration: 0.3,
            ease: "power2.out",
        });
        cursor.style.mixBlendMode = "normal";

    } else {
        // Estilo por defecto del cursor;
        gsap.to(cursorCircle, {
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: "rgb(26, 39, 201)",
            border: "2px solid rgb(26, 39, 201)",
            duration: 0.3,
            ease: "power2.out",
        });
        cursor.style.mixBlendMode = "normal";
    }
};

const animateCursor = () => {
    updateCursor();
    requestAnimationFrame(animateCursor);
};

animateCursor();



// 2 | ANIMACIÓN DEL TEXTO DEL HERO //

gsap.registerPlugin(SplitText);

const heroTitle = document.querySelector(".hero__title");
const heroSubtitle = document.querySelector(".hero__subtitle");

// Divido el texto en caracteres individuales;
const splitChars = new SplitText(heroTitle, {
    type: 'chars',
})

const char = splitChars.chars;

// Creo el timeline;
const tl = gsap.timeline({
    paused: true,
    defaults: {
        ease: 'power2.inOut',
    },
})

tl.fromTo(char, {
    opacity: 0,
    filter: 'blur(10px)',
}, {
    opacity: 1,
    filter: 'blur(0px)',
    stagger: 0.05,
    duration: 2,
})

tl.fromTo(heroSubtitle, {
    y: 20,
    opacity: 0,
}, {
    y: 0,
    opacity: 1,
    duration: 1,
})

tl.play();



// 3 | CAMBIO DEL FONDO CON EL SCROLL //

gsap.registerPlugin(CustomEase, ScrollTrigger);

// Creación de un CustomEase;
CustomEase.create(
    'customFade',
    'M0,0,C0.126,0.382,0.282,0.674,0.44,0.822,0.632,1.002,0.818,1.001,1,1',
);

const tlBackground = gsap.timeline({
    paused: true,
});

const contact = document.querySelector(".contact");

const tlGradient = gsap.timeline({
    paused: true,
});

// Fondo de color sólido;
tlBackground.fromTo("body", {
    backgroundColor: "rgba(255, 255, 255, 0)"
}, {
    backgroundColor: "rgba(26, 39, 201, 0.3)",
    duration: 1,
    ease: "customFade"
});

// Fondo gradiente;
tlGradient.fromTo(contact, {
    background: "rgba(255, 255, 255, 0)"
}, {
    background: "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(26, 39, 201, 0.6))",
    duration: 2,
    ease: "customFade"
});

// Función para crear un ScrollTrigger;
const createScrollTrigger = (trigger, start, end, timeline) => {
    ScrollTrigger.create({
        trigger,
        start,
        end,
        onEnter: () => timeline.play(),
        onLeaveBack: () => timeline.reverse(),
        onEnterBack: () => timeline.play(),
        onLeave: () => timeline.reverse(),
    });
};

// Creación de ScrollTriggers;
createScrollTrigger("#featuresSection", "top center", "bottom center", tlBackground);
createScrollTrigger("#contactSection", "top 30%", "bottom center", tlGradient);



// 4 | ANIMACIÓN DE LOS ICONOS SVG //

// gsap.registerPlugin(MorphSVGPlugin);

// // Selecciono todos los divs con la clase .feature;
// const features = document.querySelectorAll(".feature");

// features.forEach((feature) => {
//     const svg = feature.querySelector("svg");
//     const featureOrigin = svg.querySelector("path.origin");
//     const featureTarget = svg.querySelector("path.target");

//     // Almaceno la forma original del path;
//     const originalPath = featureOrigin.getAttribute("d");

//     feature.addEventListener("mouseenter", () => {
//         gsap.to(featureOrigin, {
//             duration: 0.3,
//             morphSVG: featureTarget.getAttribute("d"),
//             ease: "power1.inOut"
//         });
//     });

//     feature.addEventListener("mouseleave", () => {
//         gsap.to(featureOrigin, {
//             duration: 0.3,
//             morphSVG: originalPath,
//             ease: "power1.inOut"
//         });
//     });
// });



// 5 | ANIMACIÓN DE BARRA DE PROGRESO //

const progress = {
    target: 0,
    current: 0,
    ease: 0.1 // Suavidad de la animación;
}

// Actualizo la barra de progreso;
const updateProgressBar = () => {
    document.querySelector('.progress-bar').style.width = `${progress.current * 100}%`;
}

// Función para actualizar el progreso;
const updateScroll = () => {
    const windowH = window.innerHeight;
    const totalScroll = document.body.scrollHeight;
    const scroll = window.scrollY;

    const min = 0;
    const max = totalScroll - windowH;

    progress.target = map(scroll, min, max, 0, 1);
}

// Función de animación del scroll;
const animateScroll = () => {
    updateScroll();
    progress.current += (progress.target - progress.current) * progress.ease;
    updateProgressBar();
    requestAnimationFrame(animateScroll);
}

animateScroll();