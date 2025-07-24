const modules_flsModules = {};

let bodyLockStatus = true;
let bodyUnlock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    setTimeout((() => {
      lockPaddingElements.forEach((lockPaddingElement => {
        lockPaddingElement.style.paddingRight = "";
      }));
      document.body.style.paddingRight = "";
      document.documentElement.classList.remove("lock");
    }), delay);
    bodyLockStatus = false;
    setTimeout((function () {
      bodyLockStatus = true;
    }), delay);
  }
};
let bodyLock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
    lockPaddingElements.forEach((lockPaddingElement => {
      lockPaddingElement.style.paddingRight = lockPaddingValue;
    }));
    document.body.style.paddingRight = lockPaddingValue;
    document.documentElement.classList.add("lock");
    bodyLockStatus = false;
    setTimeout((function () {
      bodyLockStatus = true;
    }), delay);
  }
};
function functions_FLS(message) {
  setTimeout((() => {
    if (window.FLS) console.log(message);
  }), 0);
}

let _slideUp = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout((() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty("height") : null;
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      !showmore ? target.style.removeProperty("overflow") : null;
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(new CustomEvent("slideUpDone", {
        detail: {
          target
        }
      }));
    }), duration);
  }
};
let _slideDown = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty("height") : null;
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout((() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(new CustomEvent("slideDownDone", {
        detail: {
          target
        }
      }));
    }), duration);
  }
};
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
};

function getHash() {
  if (location.hash) { return location.hash.replace('#', ''); }
}

function dataMediaQueries(array, dataSetValue) {
  const media = Array.from(array).filter(function (item) {
    return item.dataset[dataSetValue];
  });

  if (media.length) {
    const breakpointsArray = media.map(item => {
      const params = item.dataset[dataSetValue];
      const paramsArray = params.split(",");
      return {
        value: paramsArray[0],
        type: paramsArray[1] ? paramsArray[1].trim() : "max",
        item: item
      };
    });

    const mdQueries = uniqArray(
      breakpointsArray.map(item => `(${item.type}-width: ${item.value}px),${item.value},${item.type}`)
    );

    const mdQueriesArray = mdQueries.map(breakpoint => {
      const [query, value, type] = breakpoint.split(",");
      const matchMedia = window.matchMedia(query);
      const itemsArray = breakpointsArray.filter(item => item.value === value && item.type === type);
      return { itemsArray, matchMedia };
    });

    return mdQueriesArray;
  }
}

function uniqArray(array) {
  return array.filter(function (item, index, self) {
    return self.indexOf(item) === index;
  });
}

//========================================================================================================================================================

//Meню
const buttonMenu = document.querySelector('.button-menu');
const headerButton = document.querySelector('.header__button');

if (buttonMenu) {

  const close = document.querySelector('.dropdown__close');
  buttonMenu.addEventListener('click', function (e) {
    document.documentElement.classList.toggle('menu-open');
    e.stopPropagation();
  });

  document.addEventListener('click', function (e) {
    if (!headerButton.contains(e.target)) {
      document.documentElement.classList.remove('menu-open');
    }
  });

  close.addEventListener("click", function (e) {
    document.documentElement.classList.remove('menu-open');
  });
}

//========================================================================================================================================================

//Контакты
const buttonContacts = document.querySelector('.button-contacts');
const dropdownContacts = document.querySelector('.dropdown-contacts');
if (buttonContacts) {

  const close = document.querySelector('.dropdown-contacts__close');

  buttonContacts.addEventListener('click', function (e) {
    document.documentElement.classList.toggle('contacts-open');
    e.stopPropagation();
  });

  document.addEventListener('click', function (e) {
    if (!dropdownContacts.contains(e.target)) {
      document.documentElement.classList.remove('contacts-open');
    }
  });

  close.addEventListener("click", function (e) {
    document.documentElement.classList.remove('contacts-open');
  });
}

//========================================================================================================================================================

// Добавление к шапке при скролле
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      header.classList.add('_header-scroll');
    } else {
      header.classList.remove('_header-scroll');
    }
  });
}

//========================================================================================================================================================

function indents() {
  const header = document.querySelector('.header');
  const page = document.querySelector('.main');

  // Установка отступа под шапку
  if (header && page) {
    let hHeader = window.getComputedStyle(header).height;
    hHeader = parseFloat(hHeader);
    page.style.paddingTop = hHeader + 'px';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  indents();
});
window.addEventListener('resize', indents);
window.addEventListener('scroll', indents);

//========================================================================================================================================================

if (document.querySelector('.bottom-block-intro__slider')) {
  let swiperIntro;

  function initSwiper() {
    // Проверяем ширину экрана
    if (window.innerWidth > 768) {
      // Инициализируем Swiper только если ширина больше 768px
      if (!swiperIntro) {
        swiperIntro = new Swiper('.bottom-block-intro__slider', {
          observer: true,
          observeParents: true,
          slidesPerView: 'auto',
          spaceBetween: 20,
          speed: 400,
          navigation: {
            prevEl: '.bottom-block-intro__arrow-prev',
            nextEl: '.bottom-block-intro__arrow-next',
          },
        });
      }
    } else {
      // Если слайдер был инициализирован ранее — уничтожаем его
      if (swiperIntro) {
        swiperIntro.destroy();
        swiperIntro = null;
      }
    }
  }

  // Инициализируем при загрузке страницы
  initSwiper();

  // Перепроверяем при изменении размера окна
  window.addEventListener('resize', initSwiper);
}

if (document.querySelector('.block-began__slider')) {
  swiperBegan = new Swiper('.block-began__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 400,
    navigation: {
      prevEl: '.block-began__arrow-prev',
      nextEl: '.block-began__arrow-next',
    },
  });
}

if (document.querySelector('.block-distributors__slider')) {
  swiperDistributors = new Swiper('.block-distributors__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 2.5,
    spaceBetween: 20,
    speed: 400,
    navigation: {
      prevEl: '.block-distributors__arrow-prev',
      nextEl: '.block-distributors__arrow-next',
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      400: {
        slidesPerView: 1.2,
      },
      480: {
        slidesPerView: 1.5,
      },
      600: {
        slidesPerView: 1.8,
      },
      768: {
        slidesPerView: 2.2,
      },
      992: {
        slidesPerView: 1.7,
      },
      1100: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 2.5,
      },
    },
  });
}

if (document.querySelector('.block-collaborations__slider')) {
  swiperCollaborations = new Swiper('.block-collaborations__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 400,
    navigation: {
      prevEl: '.block-collaborations__arrow-prev',
      nextEl: '.block-collaborations__arrow-next',
    },
  });
}

let swiperCatalogInstances = [];

function initCatalogSlider(sliderElement) {
  const swiperInstance = new Swiper(sliderElement, {
    observer: true,
    observeParents: true,
    slidesPerView: 3,
    spaceBetween: 20,
    speed: 400,
    navigation: {
      prevEl: sliderElement.closest('.right-block-catalog__navigation').querySelector('.right-block-catalog__arrow-prev'),
      nextEl: sliderElement.closest('.right-block-catalog__navigation').querySelector('.right-block-catalog__arrow-next'),
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      370: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      600: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });

  swiperCatalogInstances.push(swiperInstance);
  return swiperInstance;
}
document.querySelectorAll('.right-block-catalog__slider').forEach(sliderElement => {
  initCatalogSlider(sliderElement);
});


//========================================================================================================================================================

//Попап
class Popup {
  constructor(options) {
    let config = {
      logging: true,
      init: true,
      attributeOpenButton: "data-popup",
      attributeCloseButton: "data-close",
      fixElementSelector: "[data-lp]",
      youtubeAttribute: "data-popup-youtube",
      youtubePlaceAttribute: "data-popup-youtube-place",
      setAutoplayYoutube: true,
      classes: {
        popup: "popup",
        popupContent: "popup__content",
        popupActive: "popup_show",
        bodyActive: "popup-show"
      },
      focusCatch: true,
      closeEsc: true,
      bodyLock: true,
      hashSettings: {
        goHash: true
      },
      on: {
        beforeOpen: function () { },
        afterOpen: function () { },
        beforeClose: function () { },
        afterClose: function () { }
      }
    };
    this.youTubeCode;
    this.isOpen = false;
    this.targetOpen = {
      selector: false,
      element: false
    };
    this.previousOpen = {
      selector: false,
      element: false
    };
    this.lastClosed = {
      selector: false,
      element: false
    };
    this._dataValue = false;
    this.hash = false;
    this._reopen = false;
    this._selectorOpen = false;
    this.lastFocusEl = false;
    this._focusEl = ["a[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "button:not([disabled]):not([aria-hidden])", "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "area[href]", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'];
    this.options = {
      ...config,
      ...options,
      classes: {
        ...config.classes,
        ...options?.classes
      },
      hashSettings: {
        ...config.hashSettings,
        ...options?.hashSettings
      },
      on: {
        ...config.on,
        ...options?.on
      }
    };
    this.bodyLock = false;
    this.options.init ? this.initPopups() : null;
  }
  initPopups() {
    this.eventsPopup();
  }
  eventsPopup() {
    document.addEventListener("click", function (e) {
      const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
      if (buttonOpen) {
        e.preventDefault();
        this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ? buttonOpen.getAttribute(this.options.attributeOpenButton) : "error";
        this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ? buttonOpen.getAttribute(this.options.youtubeAttribute) : null;
        if ("error" !== this._dataValue) {
          if (!this.isOpen) this.lastFocusEl = buttonOpen;
          this.targetOpen.selector = `${this._dataValue}`;
          this._selectorOpen = true;
          this.open();
          return;
        }
        return;
      }
      const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
      if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
        e.preventDefault();
        this.close();
        return;
      }
    }.bind(this));
    document.addEventListener("keydown", function (e) {
      if (this.options.closeEsc && 27 == e.which && "Escape" === e.code && this.isOpen) {
        e.preventDefault();
        this.close();
        return;
      }
      if (this.options.focusCatch && 9 == e.which && this.isOpen) {
        this._focusCatch(e);
        return;
      }
    }.bind(this));
    if (this.options.hashSettings.goHash) {
      window.addEventListener("hashchange", function () {
        if (window.location.hash) this._openToHash(); else this.close(this.targetOpen.selector);
      }.bind(this));
      window.addEventListener("load", function () {
        if (window.location.hash) this._openToHash();
      }.bind(this));
    }
  }
  open(selectorValue) {
    if (bodyLockStatus) {
      this.bodyLock = document.documentElement.classList.contains("lock") && !this.isOpen ? true : false;
      if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) {
        this.targetOpen.selector = selectorValue;
        this._selectorOpen = true;
      }
      if (this.isOpen) {
        this._reopen = true;
        this.close();
      }
      if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
      if (!this._reopen) this.previousActiveElement = document.activeElement;
      this.targetOpen.element = document.querySelector(this.targetOpen.selector);
      if (this.targetOpen.element) {
        if (this.youTubeCode) {
          const codeVideo = this.youTubeCode;
          const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
          const iframe = document.createElement("iframe");
          iframe.setAttribute("allowfullscreen", "");
          const autoplay = this.options.setAutoplayYoutube ? "autoplay;" : "";
          iframe.setAttribute("allow", `${autoplay}; encrypted-media`);
          iframe.setAttribute("src", urlVideo);
          if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
            this.targetOpen.element.querySelector(".popup__video").setAttribute(`${this.options.youtubePlaceAttribute}`, "");
          }
          this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
        }
        const videoElement = this.targetOpen.element.querySelector("video");
        if (videoElement) {
          videoElement.muted = true;
          videoElement.currentTime = 0;
          videoElement.play().catch((e => console.error("Autoplay error:", e)));
        }
        if (this.options.hashSettings.location) {
          this._getHash();
          this._setHash();
        }
        this.options.on.beforeOpen(this);
        document.dispatchEvent(new CustomEvent("beforePopupOpen", {
          detail: {
            popup: this
          }
        }));
        this.targetOpen.element.classList.add(this.options.classes.popupActive);
        document.documentElement.classList.add(this.options.classes.bodyActive);
        if (!this._reopen) !this.bodyLock ? bodyLock() : null; else this._reopen = false;
        this.targetOpen.element.setAttribute("aria-hidden", "false");
        this.previousOpen.selector = this.targetOpen.selector;
        this.previousOpen.element = this.targetOpen.element;
        this._selectorOpen = false;
        this.isOpen = true;
        this.options.on.afterOpen(this);
        document.dispatchEvent(new CustomEvent("afterPopupOpen", {
          detail: {
            popup: this
          }
        }));
      }
    }
  }
  close(selectorValue) {
    if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) this.previousOpen.selector = selectorValue;
    if (!this.isOpen || !bodyLockStatus) return;
    this.options.on.beforeClose(this);
    document.dispatchEvent(new CustomEvent("beforePopupClose", {
      detail: {
        popup: this
      }
    }));
    if (this.youTubeCode) if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = "";
    this.previousOpen.element.classList.remove(this.options.classes.popupActive);
    const videoElement = this.previousOpen.element.querySelector("video");
    if (videoElement) videoElement.pause();
    this.previousOpen.element.setAttribute("aria-hidden", "true");
    if (!this._reopen) {
      document.documentElement.classList.remove(this.options.classes.bodyActive);
      !this.bodyLock ? bodyUnlock() : null;
      this.isOpen = false;
    }
    document.dispatchEvent(new CustomEvent("afterPopupClose", {
      detail: {
        popup: this
      }
    }));
  }
  _getHash() {
    if (this.options.hashSettings.location) this.hash = this.targetOpen.selector.includes("#") ? this.targetOpen.selector : this.targetOpen.selector.replace(".", "#");
  }
  _openToHash() {
    let classInHash = document.querySelector(`.${window.location.hash.replace("#", "")}`) ? `.${window.location.hash.replace("#", "")}` : document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` : null;
    const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace(".", "#")}"]`);
    if (buttons && classInHash) this.open(classInHash);
  }
  _setHash() {
    history.pushState("", "", this.hash);
  }
  _removeHash() {
    history.pushState("", "", window.location.href.split("#")[0]);
  }
  _focusCatch(e) {
    const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
    const focusArray = Array.prototype.slice.call(focusable);
    const focusedIndex = focusArray.indexOf(document.activeElement);
    if (e.shiftKey && 0 === focusedIndex) {
      focusArray[focusArray.length - 1].focus();
      e.preventDefault();
    }
    if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
      focusArray[0].focus();
      e.preventDefault();
    }
  }
}
modules_flsModules.popup = new Popup({});

function menuOpen() {
  bodyLock();
  document.documentElement.classList.add("menu-open");
}
function menuClose() {
  bodyUnlock();
  document.documentElement.classList.remove("menu-open");
}

//========================================================================================================================================================

//Форма
function formFieldsInit(options = { viewPass: true, autoHeight: false }) {
  // === Обработчик фокуса ===
  document.body.addEventListener("focusin", function (e) {
    const targetElement = e.target;
    if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
      if (!targetElement.hasAttribute('data-no-focus-classes')) {
        targetElement.classList.add('_form-focus');
        targetElement.parentElement.classList.add('_form-focus');
      }
      formValidate.removeError(targetElement);
      targetElement.hasAttribute('data-validate') ? formValidate.removeError(targetElement) : null;
    }
  });
  document.body.addEventListener("focusout", function (e) {
    const targetElement = e.target;
    if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
      if (!targetElement.hasAttribute('data-no-focus-classes')) {
        targetElement.classList.remove('_form-focus');
        targetElement.parentElement.classList.remove('_form-focus');
      }
      targetElement.hasAttribute('data-validate') ? formValidate.validateInput(targetElement) : null;
    }
  });

  // === Обработчик заполненности полей ===
  document.body.addEventListener("input", function (e) {
    const targetElement = e.target;
    if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
      const parent = targetElement.parentElement;
      if (targetElement.value.trim() !== '') {
        parent.classList.add('_filled');
      } else {
        parent.classList.remove('_filled');
      }
    }
  });

  // === Проверка заполненности при загрузке страницы ===
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    const parent = input.parentElement;
    if (input.value.trim() !== '') {
      parent.classList.add('_filled');
    }
    // Обработчик на случай автозаполнения браузером
    input.addEventListener('change', () => {
      if (input.value.trim() !== '') {
        parent.classList.add('_filled');
      } else {
        parent.classList.remove('_filled');
      }
    });
  });

  // === Проверка автозаполнения (через небольшую задержку) ===
  setTimeout(() => {
    document.querySelectorAll('input').forEach(input => {
      const parent = input.parentElement;
      if (input.value.trim() !== '') {
        parent.classList.add('_filled');
      }
    });
  }, 100);

  // === Обработчик показа/скрытия пароля ===
  if (options.viewPass) {
    document.addEventListener("click", function (e) {
      const targetElement = e.target;
      if (targetElement.closest('.form__viewpass')) {
        const viewpassBlock = targetElement.closest('.form__viewpass');
        const input = viewpassBlock.closest('.form__input').querySelector('input');
        if (input) {
          const isActive = viewpassBlock.classList.contains('_viewpass-active');
          input.setAttribute("type", isActive ? "password" : "text");
          viewpassBlock.classList.toggle('_viewpass-active');
        } else {
          console.error('Input не найден!');
        }
      }
    });
  }

  // === Автовысота для textarea ===
  if (options.autoHeight) {
    const textareas = document.querySelectorAll('textarea[data-autoheight]');
    if (textareas.length) {
      textareas.forEach(textarea => {
        const startHeight = textarea.hasAttribute('data-autoheight-min') ?
          Number(textarea.dataset.autoheightMin) : Number(textarea.offsetHeight);
        const maxHeight = textarea.hasAttribute('data-autoheight-max') ?
          Number(textarea.dataset.autoheightMax) : Infinity;
        const setHeight = (el, height) => {
          el.style.height = `${height}px`;
        };
        setHeight(textarea, Math.min(startHeight, maxHeight));
        textarea.addEventListener('input', () => {
          if (textarea.scrollHeight > startHeight) {
            textarea.style.height = `auto`;
            setHeight(textarea, Math.min(Math.max(textarea.scrollHeight, startHeight), maxHeight));
          }
        });
      });
    }
  }
}
formFieldsInit({
  viewPass: true,
  autoHeight: false
});

let formValidate = {
  getErrors(form) {
    let error = 0;
    let formRequiredItems = form.querySelectorAll('*[data-required]');
    if (formRequiredItems.length) {
      formRequiredItems.forEach(formRequiredItem => {
        if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) {
          error += this.validateInput(formRequiredItem);
        }
      });
    }
    return error;
  },
  validateInput(formRequiredItem) {
    let error = 0;
    if (formRequiredItem.dataset.required === "email") {
      formRequiredItem.value = formRequiredItem.value.replace(" ", "");
      if (this.emailTest(formRequiredItem)) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    } else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
      this.addError(formRequiredItem);
      this.removeSuccess(formRequiredItem);
      error++;
    } else if (formRequiredItem.dataset.validate === "password-confirm") {
      const passwordInput = document.getElementById('password');
      if (!passwordInput) return error;
      if (formRequiredItem.value !== passwordInput.value) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    } else {
      if (!formRequiredItem.value.trim()) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    }
    return error;
  },
  addError(formRequiredItem) {
    formRequiredItem.classList.add('_form-error');
    formRequiredItem.parentElement.classList.add('_form-error');
    let inputError = formRequiredItem.parentElement.querySelector('.form__error');
    if (inputError) formRequiredItem.parentElement.removeChild(inputError);
    if (formRequiredItem.dataset.error) {
      formRequiredItem.parentElement.insertAdjacentHTML('beforeend', `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
    }
  },
  removeError(formRequiredItem) {
    formRequiredItem.classList.remove('_form-error');
    formRequiredItem.parentElement.classList.remove('_form-error');
    if (formRequiredItem.parentElement.querySelector('.form__error')) {
      formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector('.form__error'));
    }
  },
  addSuccess(formRequiredItem) {
    formRequiredItem.classList.add('_form-success');
    formRequiredItem.parentElement.classList.add('_form-success');
  },
  removeSuccess(formRequiredItem) {
    formRequiredItem.classList.remove('_form-success');
    formRequiredItem.parentElement.classList.remove('_form-success');
  },
  formClean(form) {
    form.reset();
    setTimeout(() => {
      let inputs = form.querySelectorAll('input,textarea');
      for (let index = 0; index < inputs.length; index++) {
        const el = inputs[index];
        el.parentElement.classList.remove('_form-focus', '_filled');
        el.classList.remove('_form-focus');
        formValidate.removeError(el);
      }
      let checkboxes = form.querySelectorAll('.checkbox__input');
      if (checkboxes.length > 0) {
        for (let index = 0; index < checkboxes.length; index++) {
          const checkbox = checkboxes[index];
          checkbox.checked = false;
        }
      }
      if (modules_flsModules.select) {
        let selects = form.querySelectorAll('div.select');
        if (selects.length) {
          for (let index = 0; index < selects.length; index++) {
            const select = selects[index].querySelector('select');
            modules_flsModules.select.selectBuild(select);
          }
        }
      }
    }, 0);
  },
  emailTest(formRequiredItem) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
  }
};

function formSubmit() {
  const forms = document.forms;
  if (forms.length) {
    for (const form of forms) {
      form.addEventListener('submit', function (e) {
        const form = e.target;
        formSubmitAction(form, e);
      });
      form.addEventListener('reset', function (e) {
        const form = e.target;
        formValidate.formClean(form);
      });
    }
  }

  async function formSubmitAction(form, e) {
    const error = !form.hasAttribute('data-no-validate') ? formValidate.getErrors(form) : 0;
    if (error === 0) {
      const ajax = form.hasAttribute('data-ajax');
      if (ajax) {
        e.preventDefault();
        const formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
        const formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
        const formData = new FormData(form);
        form.classList.add('_sending');
        const response = await fetch(formAction, {
          method: formMethod,
          body: formData
        });
        if (response.ok) {
          let responseResult = await response.json();
          form.classList.remove('_sending');
          formSent(form, responseResult);
        } else {
          alert("Ошибка");
          form.classList.remove('_sending');
        }
      } else if (form.hasAttribute('data-dev')) {
        e.preventDefault();
        formSent(form);
      }
    } else {
      e.preventDefault();
      if (form.querySelector('._form-error') && form.hasAttribute('data-goto-error')) {
        const formGoToErrorClass = form.dataset.gotoError ? form.dataset.gotoError : '._form-error';
        gotoBlock(formGoToErrorClass, true, 1000);
      }
    }
  }

  function formSent(form, responseResult = ``) {
    document.dispatchEvent(new CustomEvent("formSent", {
      detail: {
        form: form
      }
    }));
    setTimeout(() => {
      if (modules_flsModules.popup) {
        const popup = form.dataset.popupMessage;
        popup ? modules_flsModules.popup.open(popup) : null;
      }
    }, 0);
    formValidate.formClean(form);
    formLogging(`Форма отправлена!`);
  }

  function formLogging(message) {
    console.log(`[Формы]: ${message}`);
  }
}

formSubmit();

//========================================================================================================================================================

const columns = document.querySelectorAll('.block-forms__columns');
if (columns) {
  const speed = 0.3; // Общая скорость скролла

  // Клонируем карточки для бесконечного скролла
  columns.forEach(column => {
    const cards = column.querySelectorAll('.block-forms__column');
    cards.forEach(card => {
      column.appendChild(card.cloneNode(true));
    });
  });

  function animateColumns() {
    const scrollY = window.scrollY || window.pageYOffset;

    columns.forEach((column, index) => {
      const direction = index === 1 ? 1 : -1; // 1 = вниз, -1 = вверх
      const columnHeight = column.scrollHeight / 2; // Учитываем клоны
      const offset = (scrollY * speed * direction) % columnHeight;

      // Для центральной колонки добавляем дополнительное смещение
      if (index === 1) {
        column.style.transform = `translateY(calc(${offset}px - 50%))`;
      } else {
        column.style.transform = `translateY(${offset}px)`;
      }

      // Сброс позиции для бесконечности
      if (Math.abs(offset) >= columnHeight) {
        column.style.transform = index === 1 ? 'translateY(-50%)' : 'translateY(0)';
      }
    });

    requestAnimationFrame(animateColumns);
  }

  animateColumns();
}

//========================================================================================================================================================

//Прокрутка к блоку
let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
  const targetBlockElement = document.querySelector(targetBlock);
  if (targetBlockElement) {
    let headerItem = '';
    let headerItemHeight = 0;
    if (noHeader) {
      headerItem = 'header.header';
      const headerElement = document.querySelector(headerItem);
      if (!headerElement.classList.contains('_header-scroll')) {
        headerElement.style.cssText = `transition-duration: 0s;`;
        headerElement.classList.add('_header-scroll');
        headerItemHeight = headerElement.offsetHeight;
        headerElement.classList.remove('_header-scroll');
        setTimeout(() => {
          headerElement.style.cssText = ``;
        }, 0);
      } else {
        headerItemHeight = headerElement.offsetHeight;
      }
    }
    let options = {
      speedAsDuration: true,
      speed: speed,
      header: headerItem,
      offset: offsetTop,
      easing: 'easeOutQuad',
    };
    // Закриваємо меню, якщо воно відкрите
    document.documentElement.classList.contains("menu-open") ? menuClose() : null;

    if (typeof SmoothScroll !== 'undefined') {
      // Прокручування з використанням доповнення
      new SmoothScroll().animateScroll(targetBlockElement, '', options);
    } else {
      // Прокручування стандартними засобами
      let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
      targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
      targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
      window.scrollTo({
        top: targetBlockElementPosition,
        behavior: "smooth"
      });
    }
  }
};
function pageNavigation() {
  document.addEventListener("click", pageNavigationAction);
  document.addEventListener("watcherCallback", pageNavigationAction);
  function pageNavigationAction(e) {
    if (e.type === "click") {
      const targetElement = e.target;
      if (targetElement.closest('[data-goto]')) {
        const gotoLink = targetElement.closest('[data-goto]');
        const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : '';
        const noHeader = gotoLink.hasAttribute('data-goto-header') ? true : false;
        const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
        const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
        if (modules_flsModules.fullpage) {
          const fullpageSection = document.querySelector(`${gotoLinkSelector}`).closest('[data-fp-section]');
          const fullpageSectionId = fullpageSection ? +fullpageSection.dataset.fpId : null;
          if (fullpageSectionId !== null) {
            modules_flsModules.fullpage.switchingSection(fullpageSectionId);
            document.documentElement.classList.contains("menu-open") ? menuClose() : null;
          }
        } else {
          gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
        }
        e.preventDefault();
      }
    } else if (e.type === "watcherCallback" && e.detail) {
      const entry = e.detail.entry;
      const targetElement = entry.target;
      if (targetElement.dataset.watch === 'navigator') {
        const navigatorActiveItem = document.querySelector(`[data-goto]._navigator-active`);
        let navigatorCurrentItem;
        if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) {
          navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`);
        } else if (targetElement.classList.length) {
          for (let index = 0; index < targetElement.classList.length; index++) {
            const element = targetElement.classList[index];
            if (document.querySelector(`[data-goto=".${element}"]`)) {
              navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
              break;
            }
          }
        }
        if (entry.isIntersecting) {
          navigatorCurrentItem ? navigatorCurrentItem.classList.add('_navigator-active') : null;
        } else {
          navigatorCurrentItem ? navigatorCurrentItem.classList.remove('_navigator-active') : null;
        }
      }
    }
  }
}
pageNavigation()

//========================================================================================================================================================

//Наблюдатель
class ScrollWatcher {
  constructor(props) {
    let defaultConfig = {
      logging: true,
    }
    this.config = Object.assign(defaultConfig, props);
    this.observer;
    !document.documentElement.classList.contains('watcher') ? this.scrollWatcherRun() : null;
  }

  scrollWatcherUpdate() {
    this.scrollWatcherRun();
  }

  scrollWatcherRun() {
    document.documentElement.classList.add('watcher');
    this.scrollWatcherConstructor(document.querySelectorAll('[data-watch]'));
  }

  scrollWatcherConstructor(items) {
    if (items.length) {

      let uniqParams = uniqArray(Array.from(items).map(function (item) {
        if (item.dataset.watch === 'navigator' && !item.dataset.watchThreshold) {
          let valueOfThreshold;
          if (item.clientHeight > 2) {
            valueOfThreshold =
              window.innerHeight / 2 / (item.clientHeight - 1);
            if (valueOfThreshold > 1) {
              valueOfThreshold = 1;
            }
          } else {
            valueOfThreshold = 1;
          }
          item.setAttribute(
            'data-watch-threshold',
            valueOfThreshold.toFixed(2)
          );
        }
        return `${item.dataset.watchRoot ? item.dataset.watchRoot : null}|${item.dataset.watchMargin ? item.dataset.watchMargin : '0px'}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`;
      }));

      uniqParams.forEach(uniqParam => {
        let uniqParamArray = uniqParam.split('|');
        let paramsWatch = {
          root: uniqParamArray[0],
          margin: uniqParamArray[1],
          threshold: uniqParamArray[2]
        }
        let groupItems = Array.from(items).filter(function (item) {
          let watchRoot = item.dataset.watchRoot ? item.dataset.watchRoot : null;
          let watchMargin = item.dataset.watchMargin ? item.dataset.watchMargin : '0px';
          let watchThreshold = item.dataset.watchThreshold ? item.dataset.watchThreshold : 0;
          if (
            String(watchRoot) === paramsWatch.root &&
            String(watchMargin) === paramsWatch.margin &&
            String(watchThreshold) === paramsWatch.threshold
          ) {
            return item;
          }
        });

        let configWatcher = this.getScrollWatcherConfig(paramsWatch);
        this.scrollWatcherInit(groupItems, configWatcher);
      });
    }
  }

  getScrollWatcherConfig(paramsWatch) {
    let configWatcher = {}
    if (document.querySelector(paramsWatch.root)) {
      configWatcher.root = document.querySelector(paramsWatch.root);
    }
    configWatcher.rootMargin = paramsWatch.margin;
    if (paramsWatch.threshold === 'prx') {
      paramsWatch.threshold = [];
      for (let i = 0; i <= 1.0; i += 0.005) {
        paramsWatch.threshold.push(i);
      }
    } else {
      paramsWatch.threshold = paramsWatch.threshold.split(',');
    }
    configWatcher.threshold = paramsWatch.threshold;

    return configWatcher;
  }

  scrollWatcherCreate(configWatcher) {
    console.log(configWatcher);
    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        this.scrollWatcherCallback(entry, observer);
      });
    }, configWatcher);
  }

  scrollWatcherInit(items, configWatcher) {
    this.scrollWatcherCreate(configWatcher);
    items.forEach(item => this.observer.observe(item));
  }

  scrollWatcherIntersecting(entry, targetElement) {
    if (entry.isIntersecting) {
      !targetElement.classList.contains('_watcher-view') ? targetElement.classList.add('_watcher-view') : null;
    } else {
      targetElement.classList.contains('_watcher-view') ? targetElement.classList.remove('_watcher-view') : null;
    }
  }

  scrollWatcherOff(targetElement, observer) {
    observer.unobserve(targetElement);
  }

  scrollWatcherCallback(entry, observer) {
    const targetElement = entry.target;
    this.scrollWatcherIntersecting(entry, targetElement);
    targetElement.hasAttribute('data-watch-once') && entry.isIntersecting ? this.scrollWatcherOff(targetElement, observer) : null;
    document.dispatchEvent(new CustomEvent("watcherCallback", {
      detail: {
        entry: entry
      }
    }));
  }
}
modules_flsModules.watcher = new ScrollWatcher({});

//========================================================================================================================================================

//Табы каталог
const tabBlocks = document.querySelectorAll('.right-block-catalog__tabs');
if (tabBlocks) {

  tabBlocks.forEach(block => {
    const slides = block.querySelectorAll('.right-block-catalog__slide');
    const bodies = block.querySelectorAll('.right-block-catalog__body');

    function switchActive(targetProduct) {
      slides.forEach(slide => slide.classList.remove('_active'));
      bodies.forEach(body => body.classList.remove('_active'));

      const activeSlide = block.querySelector(`.right-block-catalog__slide[data-product="${targetProduct}"]`);
      const activeBody = block.querySelector(`.right-block-catalog__body[data-product="${targetProduct}"]`);

      if (activeSlide) activeSlide.classList.add('_active');
      if (activeBody) activeBody.classList.add('_active');
    }

    slides.forEach(slide => {
      slide.addEventListener('click', function () {
        const product = this.getAttribute('data-product');
        switchActive(product);
      });
    });
  });
}

const tabHeaders = document.querySelectorAll('.left-block-catalog__button');
const tabContents = document.querySelectorAll('.right-block-catalog__tabs');

if (tabHeaders.length > 0 && tabContents.length > 0) {
  tabHeaders.forEach(header => {
    header.addEventListener('click', function () {
      const targetTab = this.getAttribute('data-tabs');

      tabHeaders.forEach(btn => btn.classList.remove('_tab-active'));
      this.classList.add('_tab-active');

      tabContents.forEach(content => content.classList.remove('_tab-active'));
      const targetContent = document.querySelector(`.right-block-catalog__tabs[data-tabs="${targetTab}"]`);
      if (targetContent) {
        targetContent.classList.add('_tab-active');
      }

      const customSelect = document.querySelector('.left-block-catalog__select');
      if (customSelect && customSelect.closest('.select')) {
        const originalSelect = customSelect;
        const targetOption = originalSelect.querySelector(`option[data-tabs="${targetTab}"]`);
        if (targetOption) {
          originalSelect.selectedIndex = targetOption.index;
          originalSelect.dispatchEvent(new Event('change'));
        }
      }
    });
  });
}

document.addEventListener("selectCallback", function (e) {
  const changedSelect = e.detail.select;
  if (changedSelect && changedSelect.classList.contains('left-block-catalog__select')) {
    const selectedOption = changedSelect.options[changedSelect.selectedIndex];
    const targetTab = selectedOption.dataset.tabs;

    if (targetTab) {
      tabContents.forEach(content => content.classList.remove('_tab-active'));
      const targetContent = document.querySelector(`.right-block-catalog__tabs[data-tabs="${targetTab}"]`);
      if (targetContent) {
        targetContent.classList.add('_tab-active');
      }

      tabHeaders.forEach(btn => btn.classList.remove('_tab-active'));
      const targetButton = document.querySelector(`.left-block-catalog__button[data-tabs="${targetTab}"]`);
      if (targetButton) {
        targetButton.classList.add('_tab-active');
      }
    }
  }
});

//========================================================================================================================================================

//Селект
class SelectConstructor {
  constructor(props, data = null) {
    let defaultConfig = {
      init: true,
      logging: true,
      speed: 150
    }
    this.config = Object.assign(defaultConfig, props);
    this.selectClasses = {
      classSelect: "select",
      classSelectBody: "select__body",
      classSelectTitle: "select__title",
      classSelectValue: "select__value",
      classSelectLabel: "select__label",
      classSelectInput: "select__input",
      classSelectText: "select__text",
      classSelectLink: "select__link",
      classSelectOptions: "select__options",
      classSelectOptionsScroll: "select__scroll",
      classSelectOption: "select__option",
      classSelectContent: "select__content",
      classSelectRow: "select__row",
      classSelectData: "select__asset",
      classSelectDisabled: "_select-disabled",
      classSelectTag: "_select-tag",
      classSelectOpen: "_select-open",
      classSelectActive: "_select-active",
      classSelectFocus: "_select-focus",
      classSelectMultiple: "_select-multiple",
      classSelectCheckBox: "_select-checkbox",
      classSelectOptionSelected: "_select-selected",
      classSelectPseudoLabel: "_select-pseudo-label",
    }
    this._this = this;
    if (this.config.init) {
      const selectItems = data ? document.querySelectorAll(data) : document.querySelectorAll('select');
      if (selectItems.length) {
        this.selectsInit(selectItems);
      }
    }
  }
  getSelectClass(className) {
    return `.${className}`;
  }
  getSelectElement(selectItem, className) {
    return {
      originalSelect: selectItem.querySelector('select'),
      selectElement: selectItem.querySelector(this.getSelectClass(className)),
    }
  }
  selectsInit(selectItems) {
    selectItems.forEach((originalSelect, index) => {
      this.selectInit(originalSelect, index + 1);
    });
    document.addEventListener('click', function (e) {
      this.selectsActions(e);
    }.bind(this));
    document.addEventListener('keydown', function (e) {
      this.selectsActions(e);
    }.bind(this));
    document.addEventListener('focusin', function (e) {
      this.selectsActions(e);
    }.bind(this));
    document.addEventListener('focusout', function (e) {
      this.selectsActions(e);
    }.bind(this));
  }
  selectInit(originalSelect, index) {
    const _this = this;
    let selectItem = document.createElement("div");
    selectItem.classList.add(this.selectClasses.classSelect);
    originalSelect.parentNode.insertBefore(selectItem, originalSelect);
    selectItem.appendChild(originalSelect);
    originalSelect.hidden = true;
    index ? originalSelect.dataset.id = index : null;
    if (this.getSelectPlaceholder(originalSelect)) {
      originalSelect.dataset.placeholder = this.getSelectPlaceholder(originalSelect).value;
      if (this.getSelectPlaceholder(originalSelect).label.show) {
        const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
        selectItemTitle.insertAdjacentHTML('afterbegin', `<span class="${this.selectClasses.classSelectLabel}">${this.getSelectPlaceholder(originalSelect).label.text ? this.getSelectPlaceholder(originalSelect).label.text : this.getSelectPlaceholder(originalSelect).value}</span>`);
      }
    }
    selectItem.insertAdjacentHTML('beforeend', `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`);
    this.selectBuild(originalSelect);
    originalSelect.dataset.speed = originalSelect.dataset.speed ? originalSelect.dataset.speed : this.config.speed;
    this.config.speed = +originalSelect.dataset.speed;
    originalSelect.addEventListener('change', function (e) {
      _this.selectChange(e);
    });
  }
  selectBuild(originalSelect) {
    const selectItem = originalSelect.parentElement;
    selectItem.dataset.id = originalSelect.dataset.id;
    originalSelect.dataset.classModif ? selectItem.classList.add(`select_${originalSelect.dataset.classModif}`) : null;
    originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectMultiple) : selectItem.classList.remove(this.selectClasses.classSelectMultiple);
    originalSelect.hasAttribute('data-checkbox') && originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectCheckBox) : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);
    this.setSelectTitleValue(selectItem, originalSelect);
    this.setOptions(selectItem, originalSelect);
    originalSelect.hasAttribute('data-search') ? this.searchActions(selectItem) : null;
    originalSelect.hasAttribute('data-open') ? this.selectAction(selectItem) : null;
    this.selectDisabled(selectItem, originalSelect);
  }
  selectsActions(e) {
    const targetElement = e.target;
    const targetType = e.type;
    if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)) || targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
      const selectItem = targetElement.closest('.select') ? targetElement.closest('.select') : document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId}"]`);
      const originalSelect = this.getSelectElement(selectItem).originalSelect;
      if (targetType === 'click') {
        if (!originalSelect.disabled) {
          if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
            const targetTag = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag));
            const optionItem = document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`);
            this.optionAction(selectItem, originalSelect, optionItem);
          } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTitle))) {
            this.selectAction(selectItem);
          } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption))) {
            const optionItem = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption));
            this.optionAction(selectItem, originalSelect, optionItem);
          }
        }
      } else if (targetType === 'focusin' || targetType === 'focusout') {
        if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))) {
          targetType === 'focusin' ? selectItem.classList.add(this.selectClasses.classSelectFocus) : selectItem.classList.remove(this.selectClasses.classSelectFocus);
        }
      } else if (targetType === 'keydown' && e.code === 'Escape') {
        this.selectsСlose();
      }
    } else {
      this.selectsСlose();
    }
  }
  selectsСlose(selectOneGroup) {
    const selectsGroup = selectOneGroup ? selectOneGroup : document;
    const selectActiveItems = selectsGroup.querySelectorAll(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);
    if (selectActiveItems.length) {
      selectActiveItems.forEach(selectActiveItem => {
        this.selectСlose(selectActiveItem);
      });
    }
  }
  selectСlose(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    if (!selectOptions.classList.contains('_slide')) {
      selectItem.classList.remove(this.selectClasses.classSelectOpen);
      _slideUp(selectOptions, originalSelect.dataset.speed);
      setTimeout(() => {
        selectItem.style.zIndex = '';
      }, originalSelect.dataset.speed);
    }
  }
  selectAction(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    const selectOpenzIndex = originalSelect.dataset.zIndex ? originalSelect.dataset.zIndex : 3;
    this.setOptionsPosition(selectItem);
    this.selectsСlose();
    setTimeout(() => {
      if (!selectOptions.classList.contains('_slide')) {
        selectItem.classList.toggle(this.selectClasses.classSelectOpen);
        _slideToggle(selectOptions, originalSelect.dataset.speed);
        if (selectItem.classList.contains(this.selectClasses.classSelectOpen)) {
          selectItem.style.zIndex = selectOpenzIndex;
        } else {
          setTimeout(() => {
            selectItem.style.zIndex = '';
          }, originalSelect.dataset.speed);
        }
      }
    }, 0);
  }
  setSelectTitleValue(selectItem, originalSelect) {
    const selectItemBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
    const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
    if (selectItemTitle) selectItemTitle.remove();
    selectItemBody.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(selectItem, originalSelect));
    originalSelect.hasAttribute('data-search') ? this.searchActions(selectItem) : null;
  }
  getSelectTitleValue(selectItem, originalSelect) {
    let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;
    if (originalSelect.multiple && originalSelect.hasAttribute('data-tags')) {
      selectTitleValue = this.getSelectedOptionsData(originalSelect).elements.map(option => `<span role="button" data-select-id="${selectItem.dataset.id}" data-value="${option.value}" class="_select-tag">${this.getSelectElementContent(option)}</span>`).join('');
      if (originalSelect.dataset.tags && document.querySelector(originalSelect.dataset.tags)) {
        document.querySelector(originalSelect.dataset.tags).innerHTML = selectTitleValue;
        if (originalSelect.hasAttribute('data-search')) selectTitleValue = false;
      }
    }
    selectTitleValue = selectTitleValue.length ? selectTitleValue : (originalSelect.dataset.placeholder ? originalSelect.dataset.placeholder : '');
    let pseudoAttribute = '';
    let pseudoAttributeClass = '';
    if (originalSelect.hasAttribute('data-pseudo-label')) {
      pseudoAttribute = originalSelect.dataset.pseudoLabel ? ` data-pseudo-label="${originalSelect.dataset.pseudoLabel}"` : ` data-pseudo-label="Заполните атрибут"`;
      pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
    }
    this.getSelectedOptionsData(originalSelect).values.length ? selectItem.classList.add(this.selectClasses.classSelectActive) : selectItem.classList.remove(this.selectClasses.classSelectActive);
    if (originalSelect.hasAttribute('data-search')) {
      return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`;
    } else {
      const customClass = this.getSelectedOptionsData(originalSelect).elements.length && this.getSelectedOptionsData(originalSelect).elements[0].dataset.class ? ` ${this.getSelectedOptionsData(originalSelect).elements[0].dataset.class}` : '';
      return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span></button>`;
    }
  }
  getSelectElementContent(selectOption) {
    const selectOptionData = selectOption.dataset.asset ? `${selectOption.dataset.asset}` : '';
    const selectOptionDataHTML = selectOptionData.indexOf('img') >= 0 ? `<img src="${selectOptionData}" alt="">` : selectOptionData;
    let selectOptionContentHTML = ``;
    selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectRow}">` : '';
    selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectData}">` : '';
    selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : '';
    selectOptionContentHTML += selectOptionData ? `</span>` : '';
    selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectText}">` : '';
    selectOptionContentHTML += selectOption.innerHTML;
    selectOptionContentHTML += selectOptionData ? `</span>` : '';
    selectOptionContentHTML += selectOptionData ? `</span>` : '';
    return selectOptionContentHTML;
  }
  getSelectPlaceholder(originalSelect) {
    const selectPlaceholder = Array.from(originalSelect.options).find(option => !option.value);
    if (selectPlaceholder) {
      return {
        value: selectPlaceholder.textContent,
        show: selectPlaceholder.hasAttribute("data-show"),
        label: {
          show: selectPlaceholder.hasAttribute("data-label"),
          text: selectPlaceholder.dataset.label
        }
      }
    }
  }
  getSelectedOptionsData(originalSelect, type) {
    let selectedOptions = [];
    if (originalSelect.multiple) {
      selectedOptions = Array.from(originalSelect.options).filter(option => option.value).filter(option => option.selected);
    } else {
      selectedOptions.push(originalSelect.options[originalSelect.selectedIndex]);
    }
    return {
      elements: selectedOptions.map(option => option),
      values: selectedOptions.filter(option => option.value).map(option => option.value),
      html: selectedOptions.map(option => this.getSelectElementContent(option))
    }
  }
  getOptions(originalSelect) {
    const selectOptionsScroll = originalSelect.hasAttribute('data-scroll') ? `data-simplebar` : '';
    const customMaxHeightValue = +originalSelect.dataset.scroll ? +originalSelect.dataset.scroll : null;
    let selectOptions = Array.from(originalSelect.options);
    if (selectOptions.length > 0) {
      let selectOptionsHTML = ``;
      if ((this.getSelectPlaceholder(originalSelect) && !this.getSelectPlaceholder(originalSelect).show) || originalSelect.multiple) {
        selectOptions = selectOptions.filter(option => option.value);
      }
      selectOptionsHTML += `<div ${selectOptionsScroll} ${selectOptionsScroll ? `style="max-height: ${customMaxHeightValue}px"` : ''} class="${this.selectClasses.classSelectOptionsScroll}">`;
      selectOptions.forEach(selectOption => {
        selectOptionsHTML += this.getOption(selectOption, originalSelect);
      });
      selectOptionsHTML += `</div>`;
      return selectOptionsHTML;
    }
  }
  getOption(selectOption, originalSelect) {
    const selectOptionSelected = selectOption.selected ? ` ${this.selectClasses.classSelectOptionSelected}` : '';
    const selectOptionHide = selectOption.selected && !originalSelect.hasAttribute('data-show-selected') && !originalSelect.multiple ? `hidden` : ``;
    const selectOptionClass = selectOption.dataset.class ? ` ${selectOption.dataset.class}` : '';
    const selectOptionLink = selectOption.dataset.href ? selectOption.dataset.href : false;
    const selectOptionLinkTarget = selectOption.hasAttribute('data-href-blank') ? `target="_blank"` : '';
    let selectOptionHTML = ``;
    selectOptionHTML += selectOptionLink ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">` : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`;
    selectOptionHTML += this.getSelectElementContent(selectOption);
    selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
    return selectOptionHTML;
  }
  setOptions(selectItem, originalSelect) {
    const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    selectItemOptions.innerHTML = this.getOptions(originalSelect);
  }
  setOptionsPosition(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    const selectItemScroll = this.getSelectElement(selectItem, this.selectClasses.classSelectOptionsScroll).selectElement;
    const customMaxHeightValue = +originalSelect.dataset.scroll ? `${+originalSelect.dataset.scroll}px` : ``;
    const selectOptionsPosMargin = +originalSelect.dataset.optionsMargin ? +originalSelect.dataset.optionsMargin : 10;
    if (!selectItem.classList.contains(this.selectClasses.classSelectOpen)) {
      selectOptions.hidden = false;
      const selectItemScrollHeight = selectItemScroll.offsetHeight ? selectItemScroll.offsetHeight : parseInt(window.getComputedStyle(selectItemScroll).getPropertyValue('max-height'));
      const selectOptionsHeight = selectOptions.offsetHeight > selectItemScrollHeight ? selectOptions.offsetHeight : selectItemScrollHeight + selectOptions.offsetHeight;
      const selectOptionsScrollHeight = selectOptionsHeight - selectItemScrollHeight;
      selectOptions.hidden = true;
      const selectItemHeight = selectItem.offsetHeight;
      const selectItemPos = selectItem.getBoundingClientRect().top;
      const selectItemTotal = selectItemPos + selectOptionsHeight + selectItemHeight + selectOptionsScrollHeight;
      const selectItemResult = window.innerHeight - (selectItemTotal + selectOptionsPosMargin);
      if (selectItemResult < 0) {
        const newMaxHeightValue = selectOptionsHeight + selectItemResult;
        if (newMaxHeightValue < 100) {
          selectItem.classList.add('select--show-top');
          selectItemScroll.style.maxHeight = selectItemPos < selectOptionsHeight ? `${selectItemPos - (selectOptionsHeight - selectItemPos)}px` : customMaxHeightValue;
        } else {
          selectItem.classList.remove('select--show-top');
          selectItemScroll.style.maxHeight = `${newMaxHeightValue}px`;
        }
      }
    } else {
      setTimeout(() => {
        selectItem.classList.remove('select--show-top');
        selectItemScroll.style.maxHeight = customMaxHeightValue;
      }, +originalSelect.dataset.speed);
    }
  }
  optionAction(selectItem, originalSelect, optionItem) {
    const selectOptions = selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOptions)}`);
    if (!selectOptions.classList.contains('_slide')) {
      if (originalSelect.multiple) {
        optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);
        const originalSelectSelectedItems = this.getSelectedOptionsData(originalSelect).elements;
        originalSelectSelectedItems.forEach(originalSelectSelectedItem => {
          originalSelectSelectedItem.removeAttribute('selected');
        });
        const selectSelectedItems = selectItem.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectOptionSelected));
        selectSelectedItems.forEach(selectSelectedItems => {
          originalSelect.querySelector(`option[value = "${selectSelectedItems.dataset.value}"]`).setAttribute('selected', 'selected');
        });
      } else {
        const previouslySelectedOption = selectOptions.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOptionSelected)}`);

        if (previouslySelectedOption) {
          previouslySelectedOption.classList.remove(this.selectClasses.classSelectOptionSelected);
          if (previouslySelectedOption.hidden) {
            previouslySelectedOption.hidden = false;
          }
        }

        optionItem.classList.add(this.selectClasses.classSelectOptionSelected);

        originalSelect.value = optionItem.hasAttribute('data-value') ? optionItem.dataset.value : optionItem.textContent;
        this.selectAction(selectItem);
      }
      this.setSelectTitleValue(selectItem, originalSelect);
      this.setSelectChange(originalSelect);
    }
  }
  selectChange(e) {
    const originalSelect = e.target;
    this.selectBuild(originalSelect);
    this.setSelectChange(originalSelect);
  }
  setSelectChange(originalSelect) {
    if (originalSelect.hasAttribute('data-validate')) {
      formValidate.validateInput(originalSelect);
    }
    if (originalSelect.hasAttribute('data-submit') && originalSelect.value) {
      let tempButton = document.createElement("button");
      tempButton.type = "submit";
      originalSelect.closest('form').append(tempButton);
      tempButton.click();
      tempButton.remove();
    }
    const selectItem = originalSelect.parentElement;
    this.selectCallback(selectItem, originalSelect);
  }
  selectDisabled(selectItem, originalSelect) {
    if (originalSelect.disabled) {
      selectItem.classList.add(this.selectClasses.classSelectDisabled);
      this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = true;
    } else {
      selectItem.classList.remove(this.selectClasses.classSelectDisabled);
      this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = false;
    }
  }
  searchActions(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectInput = this.getSelectElement(selectItem, this.selectClasses.classSelectInput).selectElement;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    const selectOptionsItems = selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption} `);
    const _this = this;
    selectInput.addEventListener("input", function () {
      selectOptionsItems.forEach(selectOptionsItem => {
        if (selectOptionsItem.textContent.toUpperCase().includes(selectInput.value.toUpperCase())) {
          selectOptionsItem.hidden = false;
        } else {
          selectOptionsItem.hidden = true;
        }
      });
      selectOptions.hidden === true ? _this.selectAction(selectItem) : null;
    });
  }
  selectCallback(selectItem, originalSelect) {
    document.dispatchEvent(new CustomEvent("selectCallback", {
      detail: {
        select: originalSelect
      }
    }));
  }
}
modules_flsModules.select = new SelectConstructor({});