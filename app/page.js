"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Sections
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import WorksSection from "./components/WorksSection";
import ReviewsSection from "./components/ReviewsSection";
import ContactsSection from "./components/ContactsSection";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

export default function Home() {
  const [activeLink, setActiveLink] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuPanelRef = useRef(null);
  const menuCloseBtnRef = useRef(null);

  // ✅ refs для “заморозки” activeLink на время программного скролла
  const programmaticScrollRef = useRef(false);
  const targetIdRef = useRef(null);
  const unlockTimerRef = useRef(null);

  // ✅ ВОЗВРАЩАЮ ВСЕ ТЕКСТЫ СЛАЙДЕРА (как было раньше)
  const slides = [
    { img: "slide1.jpg", text: "Проектирование интерьера от идеи до реализации" },
    { img: "slide2.jpg", text: "Минимализм, который не выглядит пустым" },
    { img: "slide3.jpg", text: "Пространство, в котором хочется жить" },
    { img: "slide4.png", text: "Баланс эстетики и функциональности" },
    { img: "slide5.jpg", text: "Интерьер, который отражает ваш характер" },
    { img: "slide6.jpg", text: "От идеи до реализованного проекта" },
    { img: "slide7.jpg", text: "Работа с любыми стилями и задачами" },
    { img: "slide8.jpg", text: "Современные решения для вашей квартиры и дома" },
    { img: "slide9.jpg", text: "Цвет, свет и фактуры в гармонии" },
    { img: "slide10.jpg", text: "Интерьеры, которые не надоедают" },
    { img: "slide11.jpg", text: "Дизайн, в который хочется возвращаться домой" },
  ];

  const navItems = [
    { id: "home", label: "Главная" },
    { id: "about", label: "Обо мне" },
    { id: "services", label: "Услуги" },
    { id: "works", label: "Мои работы" },
    { id: "reviews", label: "Отзывы" },
    { id: "contacts", label: "Контакты" },
  ];

  function closeMenu() {
    setMenuVisible(false);
    setTimeout(() => setMenuOpen(false), 220);
  }

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ ESC закрывает мобильное меню (возвращаю адекватное поведение)
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") closeMenu();
    }
    if (menuOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    // 1) lock scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 2) focus into panel (на кнопку закрытия)
    const t = window.setTimeout(() => {
      menuCloseBtnRef.current?.focus();
    }, 0);

    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  // ✅ ФОКУС-ТРАП В МЕНЮ (как у тебя было)
  useEffect(() => {
    if (!menuOpen) return;

    function getFocusable(container) {
      if (!container) return [];
      const selectors = [
        "a[href]",
        "button:not([disabled])",
        "input:not([disabled])",
        "select:not([disabled])",
        "textarea:not([disabled])",
        "[tabindex]:not([tabindex='-1'])",
      ].join(",");
      return Array.from(container.querySelectorAll(selectors)).filter(
        (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
      );
    }

    function onKeyDown(e) {
      if (e.key !== "Tab") return;

      const panel = menuPanelRef.current;
      const focusables = getFocusable(panel);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      // shift+tab на первом -> прыгнуть на последний
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
      // tab на последнем -> прыгнуть на первый
      else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) setMenuVisible(false);
  }, [menuOpen]);

  function openMenu() {
    setMenuOpen(true);
    setTimeout(() => setMenuVisible(true), 0);
  }

  // ✅ ЕДИНСТВЕННАЯ handleNavClick (фикс подсветки + smooth scroll + lock)
  function handleNavClick(id, e) {
    if (e) e.preventDefault();

    // включаем “режим автоскролла к цели”
    programmaticScrollRef.current = true;
    targetIdRef.current = id;

    // мгновенно подсветить цель (чтобы не прыгало)
    setActiveLink(id);

    // на всякий случай сбросить старый таймер
    if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    closeMenu();

    // страховка: если браузер не даст “момента цели” — отпускаем через время
    unlockTimerRef.current = setTimeout(() => {
      programmaticScrollRef.current = false;
      targetIdRef.current = null;
    }, 1400);
  }

  // ✅ СТАБИЛЬНОЕ определение активной секции по scroll (вместо observer)
  useEffect(() => {
    const ids = navItems.map((i) => i.id);
    const headerOffset = 120;

    let raf = 0;

    const detectActive = () => {
      const sections = ids
        .map((id) => document.getElementById(id))
        .filter(Boolean);

      if (sections.length === 0) return;

      const line = headerOffset + 1;

      let current = null;

      // 1) Ищем секцию, которая “держит” линию под хедером
      for (const sec of sections) {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= line && rect.bottom > line) {
          current = sec.id;
          break;
        }
      }

      // 2) Если между секциями — берём ближайшую секцию сверху
      if (!current) {
        let bestTop = -Infinity;
        for (const sec of sections) {
          const top = sec.getBoundingClientRect().top;
          if (top <= line && top > bestTop) {
            bestTop = top;
            current = sec.id;
          }
        }
      }

      if (!current) current = "home";

      // lock во время программного скролла: не даём “пробегать”
      if (programmaticScrollRef.current) {
        if (current !== targetIdRef.current) return;

        programmaticScrollRef.current = false;
        targetIdRef.current = null;
        if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);
      }

      setActiveLink(current);
    };

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(detectActive);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    detectActive();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* ===== HEADER ===== */}
      <header
        className={`sticky top-0 z-40 transition-colors duration-300 ${
          isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-white"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-2">
          <nav className="flex items-center justify-between">
            <Image
              src="/logo11.png"
              alt="Logo"
              width={300}
              height={120}
              className="h-20 md:h-28 w-auto"
              priority
            />

            {/* DESKTOP NAV (НЕ ТРОГАЮ ЛОГИКУ: underline только active, hover = только цвет) */}
            <ul className="hidden md:flex gap-6 text-xl">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(item.id, e)}
                    className={
                      activeLink === item.id
                        ? [
                            "relative text-orange-500 transition-colors duration-300",
                            "after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1",
                            "after:h-[2px] after:w-[70%] after:bg-orange-500 after:rounded-full",
                            "after:origin-center after:scale-x-100 after:transition-transform after:duration-300 after:ease-out",
                          ].join(" ")
                        : [
                            "relative text-slate-900 transition-colors duration-300 hover:text-orange-500",
                            "after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1",
                            "after:h-[2px] after:w-[70%] after:bg-orange-500 after:rounded-full",
                            "after:origin-center after:scale-x-0 after:transition-transform after:duration-300 after:ease-out",
                          ].join(" ")
                    }
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* ✅ MOBILE BURGER (ВОЗВРАЩАЮ) */}
            <button
              type="button"
              className="md:hidden group inline-flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-slate-900 hover:bg-slate-50 transition"
              aria-label="Открыть меню"
              aria-expanded={menuOpen}
              onClick={openMenu}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="text-orange-500 group-hover:text-orange-600"
              >
                <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </nav>
        </div>
      </header>

      {/* ✅ MOBILE MENU (ВОЗВРАЩАЮ) */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* overlay */}
          <button
            type="button"
            className={[
              "absolute inset-0 bg-black/50 transition-opacity duration-200",
              menuVisible ? "opacity-100" : "opacity-0",
            ].join(" ")}
            aria-label="Закрыть меню"
            onClick={closeMenu}
          />

          {/* panel */}
          <div
            ref={menuPanelRef}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            className={[
              "absolute top-0 right-0 h-full bg-white shadow-2xl",
              "w-[78vw] max-w-[360px]", // <<< ВАЖНО: vw, чтобы не было глюков ширины
              "transition-transform duration-200 ease-out",
              menuVisible ? "translate-x-0" : "translate-x-full",
              "z-10",
            ].join(" ")}
          >
            <div className="p-5 flex flex-col h-full">
              <div className="flex items-center justify-between">
                <div className="text-orange-500 text-xl font-semibold tracking-wide">Меню</div>

                <button
                  ref={menuCloseBtnRef}
                  type="button"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-orange-500 hover:bg-orange-50 hover:text-orange-600 transition"
                  aria-label="Закрыть"
                  onClick={closeMenu}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="mt-4 h-px bg-slate-200" />

              <ul className="mt-4 flex flex-col gap-2 text-lg">
                {navItems.map((item) => {
                  const isActive = activeLink === item.id;

                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => handleNavClick(item.id, e)}
                        className={
                          isActive
                            ? "block rounded-lg px-3 py-2 text-orange-500 bg-orange-50"
                            : "block rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-50"
                        }
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto pt-6 text-sm text-slate-500">Нажми на пункт — меню закроется.</div>
            </div>
          </div>
        </div>
      )}

      {/* ===== HERO ===== */}
      <section className="w-full h-[600px] relative" id="home">
        <Swiper
          modules={[Pagination, Autoplay, EffectCreative]}
          loop
          direction="vertical"
          effect="creative"
          // ✅ направление как ты описывала: слайд приезжает СВЕРХУ ВНИЗ
          creativeEffect={{
            prev: { translate: [0, "100%", -1] }, // уходит вниз
            next: { translate: [0, "-100%", 0] }, // приходит сверху
          }}
          // ✅ пагинация как раньше — стили берёт из global.css
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          speed={900}
          className="w-full h-full hero-swiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('/slides/${slide.img}')` }}
                />

                {/* ✅ ТЕКСТОВОЙ ОВЕРЛЕЙ — анимация управляется CSS через .slide-text */}
                <div className="absolute inset-0">
                  <div className="h-full max-w-6xl mx-auto px-6 flex items-center justify-start">
                    <div className="max-w-3xl flex flex-col gap-4 slide-text">
                      <div className="block w-full">
                        <div className="inline-block bg-white/80 px-6 py-5">
                          <div className="text-4xl md:text-5xl font-semibold tracking-wide text-slate-800">
                            7BIEVA
                          </div>
                          <div className="mt-3 h-px w-40 bg-slate-800/40" />
                        </div>
                      </div>

                      <div className="block w-full">
                        <div className="inline-block bg-white/80 px-6 py-4">
                          <p className="text-xl md:text-2xl text-slate-700 leading-snug max-w-[52ch] whitespace-normal break-words">
                            {slide.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ===== ABOUT ===== */}
      <AboutSection />

      {/* ===== SERVICES ===== */}
      <ServicesSection />

      {/* ===== WORKS ===== */}
      <WorksSection />

      {/* ===== REVIEWS ===== */}
      <ReviewsSection />

      {/* ===== CONTACTS ===== */}
      <ContactsSection />

    </main>
  );
}
