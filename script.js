(function () {
  document.addEventListener('DOMContentLoaded', function () {

    'use strict';

    Wishlist.init();
    conf.InfoBox();
    Settings.theme();

  });
})();

const Wishlist = {

  init: () => {
    Wishlist.handlingItems();
    //Wishlist.imageHoverPerspective();
  },

  //  Handling the Items onclick and create these details
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  handlingItems: () => {

    let itemObj = Wishlist.getItemTree().items,
    container = conf.qS('.wishlist-container'),
    tileNodeList = conf.CqSA(container, '.item');

    if (tileNodeList.length) {
      tileNodeList.forEach(tile => {
        tile.onclick = e => {
          let tileAttr = parseInt(tile.getAttribute('data-item'), 10);
          e.preventDefault();

          if (!tile.classList.contains('active')) {
            tile.classList.add('active');

            for (let i = 0; i < itemObj.length; i++) {
              if (i === tileAttr) {
                itemObj[i].products.forEach(product => {
                  createItemNode(product, tileAttr);
                });
                closeButton(tileAttr);
                break;
              }
            }
          }
        };
      });
    }

    let closeButton = index => {
      let container = document.querySelector('.item-detail-container[data-item="' + index + '"]'),
      close = document.createElement('div');

      close.classList.add('close-button');
      conf.qS('.mobile-container').appendChild(close);
      setTimeout(() => {
        close.classList.add('active');
      }, 300);

      close.onclick = () => {
        container.parentElement.classList.remove('active');
        container.classList.remove('active');

        for (let item of conf.qSA('.wishlist-container .item')) {
          if (item.classList.contains('active')) {
            item.classList.remove('active');
            break;
          }
        }

        conf.CqSA(container, 'div').forEach(elem => {
          elem.remove();
        });

        close.remove();
      };
    };

    let createItemNode = (product, index) => {
      let container = document.querySelector('.item-detail-container[data-item="' + index + '"]');
      let div = document.createElement('div'),
      imgWrapper = document.createElement('div'),
      img = document.createElement('img'),
      content = document.createElement('div'),
      title = document.createElement('span'),
      price = document.createElement('span'),
      link = document.createElement('a');

      div.classList.add('item');

      imgWrapper.classList.add('image');
      img.setAttribute('alt', 'Thumbnail for ' + product.name);
      img.setAttribute('src', product.img);
      img.setAttribute('draggable', 'false');

      content.classList.add('content');
      title.innerText = product.name;
      price.innerText = product.price;

      link.classList.add('link');
      link.setAttribute('aria-label', 'Go to kobys Website or Social Media links.');
      link.setAttribute('href', product.link);
      link.setAttribute('target', '_blank');

      container.appendChild(div);
      div.appendChild(imgWrapper);
      imgWrapper.appendChild(img);
      div.appendChild(content);
      content.appendChild(title);
      content.appendChild(price);
      div.appendChild(link);

      container.parentElement.classList.add('active');
      container.classList.add('active');
    };
  },

  getItemTree: () => {
    return {
      items: [
      {
        products: [
        {
          name: 'Bürostuhl',
          price: '24,99€',
          link: 'https://www.koby.dev',
          img: 'https://source.unsplash.com/100x100?chair' },

        {
          name: 'Schreibtisch',
          price: '199,99€',
          link: 'https://www.twitter.com/builtbymax',
          img: 'https://source.unsplash.com/100x100?office-desk' },

        {
          name: 'Pflanze',
          price: '54,99€',
          link: 'https://www.codepen.io/builtbymax',
          img: 'https://source.unsplash.com/100x100?plant' },

        {
          name: 'Teppich',
          price: '179,95€',
          link: 'https://www.instagram.com/koby.dev/',
          img: 'https://source.unsplash.com/100x100?carpet' }] },



      {
        products: [
        {
          name: 'Pflanze',
          price: '54,99€',
          link: 'https://www.codepen.io/builtbymax',
          img: 'https://source.unsplash.com/100x100?plant' },

        {
          name: 'Sitzbank',
          price: '24,99€',
          link: 'https://www.koby.dev',
          img: 'https://source.unsplash.com/100x100?bank' },

        {
          name: 'Tisch',
          price: '199,99€',
          link: 'https://www.twitter.com/builtbymax',
          img: 'https://source.unsplash.com/100x100?desk' },

        {
          name: 'Zaun',
          price: '179,95€',
          link: 'https://www.instagram.com/koby.dev/',
          img: 'https://source.unsplash.com/100x100?fence' }] },



      {
        products: [
        {
          name: 'Bettdecke',
          price: '24,99€',
          link: 'https://www.koby.dev',
          img: 'https://source.unsplash.com/100x100?blanket' },

        {
          name: 'Kissen',
          price: '199,99€',
          link: 'https://www.twitter.com/builtbymax',
          img: 'https://source.unsplash.com/100x100?pillow' },

        {
          name: 'Teppich',
          price: '179,95€',
          link: 'https://www.instagram.com/koby.dev/',
          img: 'https://source.unsplash.com/100x100?carpet' }] },



      {
        products: [
        {
          name: 'Sofa',
          price: '24,99€',
          link: 'https://www.koby.dev',
          img: 'https://source.unsplash.com/100x100?couch' },

        {
          name: 'Pflanze',
          price: '54,99€',
          link: 'https://www.codepen.io/builtbymax',
          img: 'https://source.unsplash.com/100x100?plant' }] }] };





  },

  //  Change the Image perspective on mouseover
  // - - - - - - - - - - - - - - - - - - - - - - - - - -

  imageHoverPerspective: () => {
    let container = conf.qS('.wishlist-container'),
    tileNodeList = conf.CqSA(container, '.item');

    if (tileNodeList.length) {
      tileNodeList.forEach(function (item) {
        let image = item;
        image.onmousemove = e => {

          let offset = image.getBoundingClientRect(),
          elX = offset.left + document.body.scrollTop,
          elY = offset.top + document.body.scrollTop,
          elWidth = image.offsetWidth,
          elHeight = image.offsetHeight,
          intensity = 11,
          mouseX = e.pageX,
          mouseY = e.pageY,
          rotateY = (elWidth / 2 - (mouseX - elX)) / (elWidth / 2) * intensity,
          rotateX = (elHeight / 2 - (mouseY - elY)) / (elHeight / 2) * intensity;

          let style = 'transform: rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)';
          image.setAttribute('style', style);
        };
        image.onmouseleave = () => {
          image.removeAttribute('style');
        };
      });
    }
  } };


const Settings = {
  theme: () => {
    let toggle = conf.qS('.top-row .settings'),
    section = conf.qS('.section-container');

    if (toggle) {
      toggle.onclick = () => {
        if (section.getAttribute('data-color-scheme') === 'dark' || section.getAttribute('data-color-scheme') === '') {
          section.setAttribute('data-color-scheme', 'light');
        } else {
          section.setAttribute('data-color-scheme', 'dark');
        }
      };
    }
  } };


//  Config Functions
// - - - - - - - - - - - - - - - - - - - - - - - - - -

const conf = {
  qS: selector => {
    return document.querySelector(selector);
  },
  qSA: selector => {
    return document.querySelectorAll(selector);
  },
  CqS: (container, selector) => {
    return container.querySelector(selector);
  },
  CqSA: (container, selector) => {
    return container.querySelectorAll(selector);
  },
  InfoBox: () => {
    let toggle = conf.qS('.infobox-container .infobox-toggle'),
    detail = conf.qS('.infobox-container .infobox-detail-container');

    if (toggle) {
      toggle.onclick = e => {
        e.preventDefault();
        detail.classList.toggle('active');
      };
    }
  } };