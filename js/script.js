const burger = document.querySelector('.burger');
const container = document.querySelector('.container');
const screens = document.querySelectorAll('.screen');
const links = document.querySelectorAll('.link');

let shadowImageOne = getComputedStyle( document.querySelector('.np-2') ,null).getPropertyValue('background');
let shadowImageTwo = getComputedStyle( document.querySelector('.np-3') ,null).getPropertyValue('background');
let oldBg;

burger.addEventListener('click', () => {
   //container.classList.toggle('active');
   activation3D();
})

function activation3D() {
   if(container.classList.contains('active')) {
      container.classList.remove('active');
      container.classList.add('no-active');
   }
   else {
      container.classList.add('active');
      container.classList.remove('no-active');
   }
}

function replaceBg(id) {
   const bg = document.getElementById(id);
   if(bg != oldBg) {
      hideUnnecessaryBg(bg);
      setShadowImage(bg);
      updateShadowValues(bg);
   }
   oldBg = bg;
}

//самокоментирующийся код :)
function hideUnnecessaryBg(bg) {
   screens.forEach(screen => {
      screen.style.display = 'none';
   })
   bg.style.display = 'block';
}

function setShadowImage(bg) {
   bg.querySelector('.shadow.one').style.background = shadowImageOne;
   bg.querySelector('.shadow.two').style.background = shadowImageTwo;
}

function updateShadowValues(bg) {
   shadowImageTwo = shadowImageOne;
   shadowImageOne = getComputedStyle( bg.querySelector('.page') ,null).getPropertyValue('background');
}

function highlightLink(linkHighlight) {
   links.forEach(link => {
      link.classList.remove('active');
   })
   linkHighlight.classList.add('active');
}

function changeBg() {
   links.forEach((link, index) => {
      
      link.addEventListener('mouseenter', e => {
         if(container.classList.contains('active')) {
            e.preventDefault();
            replaceBg(e.target.dataset.link);
            highlightLink(link);
         }
      })

      link.addEventListener('click', e => {
         e.preventDefault();
         //container.classList.toggle('active');
         activation3D();
      })
      
   })
}

//Отключаем все экраны кроме 1го
replaceBg(screens[0].id);

//Запускаем прослушку
changeBg();