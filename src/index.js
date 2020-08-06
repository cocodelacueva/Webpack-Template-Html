import './assets/css/style.scss';

import { viewportsOnWrapper, loadLazyImages } from './assets/js/helpers';

const siteWrapper = document.querySelector('.site-wrapper');

document.addEventListener('DOMContentLoaded', function(){
    viewportsOnWrapper(siteWrapper);

    loadLazyImages();
});