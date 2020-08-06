/*
 * HELPERS DE VIEWPORT
 * 
 * sendHeight: envia la altura del contenedor al padre, util si el sitio esta en un iframe
 * loadLazyImages: carga las images de manera asincrona, se pueden definir los viewports
 * isVisible: chequea si hay un elemento visible en el viewport, util para las animaciones
 * smoothScroll: hace smothscroll hacia el tag 
 * getOffset: calcula la posicion de un elemento
 * browserDetection: devuelve el browser
 * viewportsOnWrapper: chequea el width del wrapper y agrega clases para hacerlo responsive
*/

//chequea el width del wrapper y agrega clases para hacerlo responsive
function viewportsOnWrapper(siteWrapper, breakpoints={xs: 576,sm: 767,md: 991,lg:1199, xlg:1500}) {
    
    if ( siteWrapper.classList.contains('responsive-wrapper') ) {

        insertBreakPoinsts(siteWrapper);

        window.addEventListener('resize', function(){
            insertBreakPoinsts(siteWrapper);
        })
        
    }


    function insertBreakPoinsts(wrapper) {
        const width = wrapper.getBoundingClientRect().width;

        wrapper.classList.remove('xlg');
        wrapper.classList.remove('lg');
        wrapper.classList.remove('md');
        wrapper.classList.remove('sm');
        wrapper.classList.remove('xs');

        if (width>breakpoints.xlg) {
            wrapper.classList.add('xlg');
        } else if (width>breakpoints.lg) {
            wrapper.classList.add('lg');
        } else if (width>breakpoints.md) {
            wrapper.classList.add('md');
        } else if (width>breakpoints.sm) {
            wrapper.classList.add('sm');
        } else if (width>breakpoints.xs) {
            wrapper.classList.add('xs');
        }

    }

}

//envia la altura hacia el parent, si esta en un iframe es util
function sendHeight(){
    var actual_height = document.querySelector('body').scrollHeight;
    var data = {
      'contentheight':actual_height
    }
    window.parent.postMessage(JSON.stringify(data),"*");
}


//lazy loads de images
function loadLazyImages() {
    let dimensiones = {
        mobile: 50,
        tablet: 768,
        desktop: 992,
    }

    let lazyImages = document.querySelectorAll('.lazy-load-image');

    
    if ( lazyImages.length > 0 ) {

        //cargamos todas las imagenes
        lazyImages.forEach(element => {
        
            //recuperamos data de imagen orginal
            let image = element.querySelector('img');
            //recoletamos los datos del elemento
            let iSrc = image.getAttribute('data-src');
            let iSrc768 = image.getAttribute('data-src-768');
            let iSrcMov = image.getAttribute('data-src-mobile');
            let iSrcSVG= image.getAttribute('data-src-svg');
            let alt = image.getAttribute('alt');
    
            if ( iSrc.trim() == '' ) { 
                return;
            }


            //elemento picture
            let picture = document.createElement('picture');

            
            //elemento svg 
            if ( iSrcSVG != null ) {

                let sourceSVG = document.createElement('source');
                    sourceSVG.setAttribute('type', 'image/svg+xml' );
                    sourceSVG.setAttribute('srcset', iSrcSVG.trim() );

                picture.appendChild(sourceSVG);
            }

            //elemento source por defecto, es el mayor

            let srcDefaults = iSrc.trim().split(',' );
            let dataSrcDesktop = '';

            for (let a = 0; a < srcDefaults.length; a++) {
                if (a !=0) {
                    dataSrcDesktop += ', ';
                }
                dataSrcDesktop += srcDefaults[a] + ' ' + (a+1) + 'x';
            }


            let sourcedesktop = document.createElement('source');
                sourcedesktop.setAttribute('media', '(min-width: '+dimensiones.desktop+'px)' );
                sourcedesktop.setAttribute('srcset', dataSrcDesktop );

            
            picture.appendChild(sourcedesktop);
           

            //elemento source segundo

            if ( iSrc768.trim() != '' ) {
                let src768 = iSrc768.trim().split(',' );

                let dataSrc768 = '';

                for (let b = 0; b < src768.length; b++) {
                    if (b !=0) {
                        dataSrc768 += ', ';
                    }
                    dataSrc768 += src768[b] + ' ' + (b+1) + 'x';
                }


                let source768 = document.createElement('source');
                    source768.setAttribute('media', '(min-width: '+dimensiones.tablet+'px)' );
                    source768.setAttribute('srcset', dataSrc768 );

                
                picture.appendChild(source768);
            }
            

            //elemento source mobile

            if ( iSrcMov.trim() != '' ) {
                let srcMobile = iSrcMov.trim().split(',' );

                let dataSrcMobile = '';

                for (let c = 0; c < srcMobile.length; c++) {
                    if (c !=0) {
                        dataSrcMobile += ', ';
                    }
                    dataSrcMobile += srcMobile[c] + ' ' + (c+1) + 'x';
                }


                let sourceMobile = document.createElement('source');
                    sourceMobile.setAttribute('media', '(min-width: '+dimensiones.mobile+'px)' );
                    sourceMobile.setAttribute('srcset', dataSrcMobile );

                
                picture.appendChild(sourceMobile);
            }
            

            //creamos elemento img por defecto
            let img = document.createElement('img');
                img.src = srcDefaults[0];
                img.setAttribute('alt', alt);

                picture.appendChild(img);
            

            //borro la imagen original si es que estaba
            element.innerHTML = '';
            //agregamos la imagen al dom
            element.appendChild(picture);
    
        });
    }
}

//ve si el elemento es visible se pasa el node tomado antes por un querySelector
function isVisible ( el ) {
    var result = false;
    // Browser viewport
    var viewport_h = window.innerHeight;
    var viewport_top = window.pageYOffset;
    var viewport_bottom = viewport_top + viewport_h;
    // DOM Element
    var el_h = el.offsetHeight;                  // Height
    var el_top = el.getBoundingClientRect().top; // Top
    var el_bottom = el_top + el_h;               // Bottom
    // Is inside viewport?
    if ( el_bottom > 0 && el_top < viewport_h ) { 
      result = 1.0 - ( el_top + el_h ) / ( viewport_h + el_h );
    }
    
    return result;
  }


//realiza un smoth scroll hacia el #ancla enviada
function smoothScroll(eID) {

    //toma la posicion del elemento, el cual debe pasarse para que sea uno solo por queryselector: '.clase', '#id', 'tag'
    function elmYPosition(eID) {
        var elm = document.querySelector(eID);
        var y = elm.offsetTop;
        var node = elm;
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
  
            if ( window.innerWidth < 768) {
                y-=50;   
            }
        }
        return y;
    }
    
    //toma la posicion actual de la ventana
    function currentYPosition() {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) return self.pageYOffset;
        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop)
            return document.documentElement.scrollTop;
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) return document.body.scrollTop;
        return 0;
    }
  
  
    //smoth scroll
    var startY = currentYPosition();
    var stopY = elmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY); return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for ( var i=startY; i<stopY; i+=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
    }
    for ( var i=startY; i>stopY; i-=step ) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
}


//calcula la posicion de un elemento
function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}


//detecta el browser
function browserDetection() {
    let userAgent = navigator.userAgent.toLowerCase(); 
    let browser;
    if ( userAgent.indexOf('trident') > -1 || userAgent.indexOf('msie') > -1) {
        browser = 'ie';
    } else if ( userAgent.indexOf('edge') > -1 ) {
        browser = 'edge';
    } else if (userAgent.indexOf('safari')!=-1){ 
        if (userAgent.indexOf('chrome')  > -1){
            browser = 'chrome';
        } else if((userAgent .indexOf('opera')  > -1)||(userAgent.indexOf('opr')  > -1)){
            browser = 'opera';
        } else {
            browser = 'safari';
        }
  
    } else if (userAgent.indexOf('firefox') !=-1) {
        browser = 'firefox';
    } else {
        browser = 'dont-know';    
    }
    
    return browser;
}


export {viewportsOnWrapper, sendHeight, loadLazyImages, isVisible, smoothScroll, getOffset, browserDetection}