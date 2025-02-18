(function () {
  "use strict";

  /**
   * Função auxiliar para selecionar elementos
   */
  const select = (el, all = false) => {
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  /**
   * Adiciona eventos facilmente a elementos
   */
  const on = (type, el, listener, all = false) => {
    let elements = select(el, all);
    if (elements) {
      if (all) {
        elements.forEach((e) => e.addEventListener(type, listener));
      } else {
        elements.addEventListener(type, listener);
      }
    }
  };

  /**
   * Alterna entre navegação desktop e mobile
   */
  const updateNavbarMode = () => {
    let navbar = select("#navbar");
    if (window.innerWidth > 991) {
      navbar.classList.remove("navbar-mobile");
    }
  };
  window.addEventListener("resize", updateNavbarMode);
  window.addEventListener("load", updateNavbarMode);

  /**
   * Alterna o menu mobile
   */
  on("click", ".mobile-nav-toggle", function () {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Fecha o menu mobile ao clicar em um link
   */
  on("click", ".scrollto", function (e) {
    let navbar = select("#navbar");
    if (select(this.hash)) {
      e.preventDefault(); // Impede o comportamento padrão do link
      if (navbar.classList.contains("navbar-mobile")) {
        navbar.classList.remove("navbar-mobile");
        select(".mobile-nav-toggle").classList.toggle("bi-list");
        select(".mobile-nav-toggle").classList.toggle("bi-x");
      }
      scrollto(this.hash); // Rola até a seção
    }
  }, true);

  /**
   * Alterna os dropdowns no menu mobile
   */
  on("click", ".navbar .dropdown > a", function (e) {
    if (select("#navbar").classList.contains("navbar-mobile")) {
      e.preventDefault();
      this.nextElementSibling.classList.toggle("dropdown-active");
    }
  }, true);

  /**
   * Atualiza navbar links ativos ao rolar a página
   */
  const navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((link) => {
      if (!link.hash) return;
      let section = select(link.hash);
      if (!section) return;

      // Se a posição da página estiver dentro da seção
      if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Garante que "Início" seja ativado apenas quando estiver no topo da página
    let homeLink = select('a[href="index.html"]');
    if (window.scrollY === 0) {
      homeLink.classList.add("active"); // Ativa o "Início" no topo
    } else {
      homeLink.classList.remove("active"); // Remove a classe active quando não estiver no topo
    }
  };

  window.addEventListener("load", navbarlinksActive);
  document.addEventListener("scroll", navbarlinksActive);

  /**
   * Rola suavemente até uma seção
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight - (header.classList.contains("header-scrolled") ? 0 : 16);
    let elementPos = select(el).offsetTop;
    window.scrollTo({ top: elementPos - offset, behavior: "smooth" });
  };

  /**
   * Configuração do Swiper
   */
  const initSwiper = (selector, config) => {
    if (select(selector)) {
      new Swiper(selector, config);
    }
  };

  initSwiper(".clients-slider", {
    speed: 400,
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    slidesPerView: "auto",
    pagination: { el: ".swiper-pagination", clickable: true },
    breakpoints: { 320: { slidesPerView: 2 }, 640: { slidesPerView: 4 }, 992: { slidesPerView: 6 } }
  });

  initSwiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    slidesPerView: "auto",
    pagination: { el: ".swiper-pagination", clickable: true },
    breakpoints: { 320: { slidesPerView: 1 }, 1200: { slidesPerView: 3 } }
  });

  /**
   * Inicia animações ao rolar a página
   */
  window.addEventListener("load", () => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true, mirror: false });
  });

  /**
   * Contador animado
   */
  new PureCounter();

})();
