const header = document.getElementById('header');
const hamburgerImg = document.getElementById('hamburger-img');
const closeImg = document.getElementById('close-img');
const logoContainer = document.getElementById('header-logo-container');
const headerNav = document.getElementById('header-nav');
const leftButton = document.getElementById('left-button');
const rightButton = document.getElementById('right-button');
const heroImages = document.querySelectorAll('.grid-container__image--hero');
const heroContainer = document.getElementById('hero-container');
const heading = document.getElementById('heading');
const paragraph = document.getElementById('paragraph');
const gridItem1 = document.querySelector('.grid-container__grid-item-1');
const gridItem3 = document.querySelector('.grid-container__grid-item-3');
const buttonContainer = document.querySelector('.grid-container__button-container');
const menuButton = document.getElementById('menu-button');

let currentIndex = 0;
let targetIndex = 0;

const contentData = [
    {
      header: "Discover innovative ways to decorate",
      paragraph: "We provide unmatched quality, comfort, and style for property \
      owners CICO55 the country. Our experts combine form and \
      function in bringing your vision to life. Create? a room in your \
      own style with our coHection and make your property a \
      reflection of you and what you love."
    },
    {
      header: "We are available all across the globe",
      paragraph: "With stores all over the world. its easy for you to find furniture \
      for your home or place of business. Locally, we’re in most \
      major cities throughout the country. Find the branch nearest \
      you using our store locator, Any questions? Don’t hesitate to \
      contact us today."
    },
    {
      header: "Manufactured with the best materials",
      paragraph: "Our modem furniture store provide o high level of quality. Our \
      company has invested in advanced technology to ensure that \
      every product is made as perfect and as consistent os \
      possible. With three decodes of expeñence in this industry, we \
      understand what customers wont for their home and office."
    }
  ];

leftButton.addEventListener('click', function() {
    updateImages('left');
});

rightButton.addEventListener('click', function() {
    updateImages('right');
});

menuButton.addEventListener('click', function() {

    if(header.classList.contains('header--menu-open')) {
        closeMenu();
    } else {
        openMenu();
    }
});

heroImages.forEach(image => {
    image.addEventListener('transitionend', function() {
        
        heroImages[currentIndex].classList.add('grid-container__image--no-display');

        image.classList.remove('grid-container__image--animate-left');
        image.classList.remove('grid-container__image--animate-right');
        image.classList.remove('grid-container__image--overlay-left');
        image.classList.remove('grid-container__image--overlay-right');

        currentIndex= targetIndex;

        leftButton.disabled = false;
        rightButton.disabled = false;
        
    });
});

document.addEventListener('DOMContentLoaded', () => { 
    checkWindowSize();
});

window.addEventListener('resize', checkWindowSize);

function updateImages(direction) {
    
    leftButton.disabled = true;
    rightButton.disabled = true;

    let dimensions;
    let overlayClassName;
    let animateClassName;

    if (direction === 'right') {
        targetIndex = currentIndex + 1;
        overlayClassName = 'grid-container__image--overlay-right';
        animateClassName = 'grid-container__image--animate-right';
    } else {
        targetIndex = currentIndex - 1;
        overlayClassName = 'grid-container__image--overlay-left';
        animateClassName = 'grid-container__image--animate-left';
    }

    targetIndex = (direction === 'right') ? currentIndex + 1 : currentIndex - 1;

    if (targetIndex < 0) {
        targetIndex = heroImages.length - 1;
    } else if (targetIndex >= heroImages.length) {
        targetIndex = 0;
    }

    updateText();
    dimensions = heroContainer.getBoundingClientRect();

    heroImages[targetIndex].style.width = dimensions.width;
    heroImages[targetIndex].style.width = dimensions.height;
    heroImages[targetIndex].classList.remove('grid-container__image--no-display');
    heroImages[targetIndex].classList.add(overlayClassName);

    void heroImages[targetIndex].offsetWidth;

    heroImages[targetIndex].classList.add(animateClassName);
}

function updateText() {

    heading.textContent = contentData[targetIndex].header;
    paragraph.textContent = contentData[targetIndex].paragraph;
}

function checkWindowSize() {
    if(this.window.innerWidth <= 767) {
        gridItem1.appendChild(buttonContainer);
    } else {
        if(gridItem1.contains(buttonContainer)) {
            gridItem3.appendChild(buttonContainer);
        }
    }
}

function openMenu() {
    header.classList.add('header--menu-open');
    hamburgerImg.classList.add('header__img--no-display');
    closeImg.classList.remove('header__img--no-display');
    logoContainer.classList.add('header__logo-container--no-display');
    headerNav.classList.add('header__nav-menu--display');
}

function closeMenu() {
    header.classList.remove('header--menu-open');
    hamburgerImg.classList.remove('header__img--no-display');
    closeImg.classList.add('header__img--no-display');
    logoContainer.classList.remove('header__logo-container--no-display');
    headerNav.classList.remove('header__nav-menu--display');
}