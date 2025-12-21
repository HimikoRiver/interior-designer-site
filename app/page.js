"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

export default function Home() {
  const [activeLink, setActiveLink] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ ВОЗВРАЩАЮ ВСЕ ТЕКСТЫ СЛАЙДЕРА (как было раньше)
  const slides = [
    { img: "slide1.jpg", text: "Если вы здесь — первый шаг к идеальному интерьеру уже сделан." },
    { img: "slide2.jpg", text: "Минимализм, который не выглядит пустым." },
    { img: "slide3.jpg", text: "Пространство, в котором хочется жить." },
    { img: "slide4.png", text: "Баланс эстетики и функциональности." },
    { img: "slide5.jpg", text: "Интерьер, который отражает ваш характер." },
    { img: "slide6.jpg", text: "От идеи до реализованного проекта." },
    { img: "slide7.jpg", text: "Работа с любыми стилями и задачами." },
    { img: "slide8.jpg", text: "Современные решения для вашей квартиры и дома." },
    { img: "slide9.jpg", text: "Цвет, свет и фактуры в гармонии." },
    { img: "slide10.jpg", text: "Интерьеры, которые не надоедают." },
    { img: "slide11.jpg", text: "Дизайн, в который хочется возвращаться домой." },
  ];

  const navItems = [
    { id: "home", label: "Главная" },
    { id: "about", label: "Обо мне" },
    { id: "services", label: "Услуги" },
    { id: "works", label: "Мои работы" },
    { id: "reviews", label: "Отзывы" },
    { id: "contacts", label: "Контакты" },
  ];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ ESC закрывает мобильное меню (возвращаю адекватное поведение)
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    if (menuOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  function handleNavClick(id) {
    setActiveLink(id);
    setMenuOpen(false);
  }

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
                    onClick={() => setActiveLink(item.id)}
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
              className="md:hidden inline-flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-slate-900 hover:bg-slate-50 transition"
              aria-label="Открыть меню"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Закрыть меню"
            onClick={() => setMenuOpen(false)}
          />

          <div className="absolute right-0 top-0 h-full w-[78%] max-w-sm bg-white shadow-xl p-5 flex flex-col">
            <div className="flex items-center justify-between">
              <div className="text-slate-900 font-semibold tracking-wide">Меню</div>
              <button
                type="button"
                className="rounded-lg border border-slate-200 px-3 py-2 hover:bg-slate-50 transition"
                aria-label="Закрыть"
                onClick={() => setMenuOpen(false)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
                      onClick={() => handleNavClick(item.id)}
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

            <div className="mt-auto pt-6 text-sm text-slate-500">
              Нажми на пункт — меню закроется.
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
      <section id="about" className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid gap-12 lg:grid-cols-2">
          {/* FOTO */}
          <div className="overflow-hidden rounded-3xl min-h-[640px]">
            <div className="relative h-full w-full">
              <Image
                src="/images/about-placeholder.png"
                alt="Дизайнер интерьера"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 480px, 100vw"
              />
            </div>
          </div>

          {/* TEXT — НЕ ТРОГАЛ */}
          <div>
            <p className="text-sm text-neutral-500">Обо мне</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold">
              Интерьер — это не картинка. Это сценарий жизни.
            </h2>

            <div className="mt-6 space-y-4 text-neutral-700">
              <p>
                Меня зовут <strong>Мери Сью</strong>, я дизайнер интерьера. В своей работе я считаю,
                что интерьер начинается не с выбора стиля и не с красивой картинки.
              </p>
              <p>
                Он начинается с человека — с его привычек, ритма жизни и того, как он чувствует
                пространство вокруг себя.
              </p>
              <p>
                Для меня важно понять, <strong>как вы живёте</strong>, а не просто что вам нравится
                визуально. Где вы проводите больше всего времени, как начинается ваше утро, что для
                вас значит комфорт и где в доме должна быть тишина.
              </p>
              <p>
                Я не работаю с шаблонами и не подгоняю проекты под тренды. Каждое пространство я
                проектирую под конкретную жизнь — чтобы интерьер не требовал привыкания и не уставал
                со временем.
              </p>
              <p>
                Если решение выглядит эффектно, но не будет работать в реальности — я не считаю его
                хорошим. Моя задача — создать интерьер, который будет поддерживать, а не усложнять
                жизнь.
              </p>
            </div>

            {/* ===== КАРТОЧКИ: анимация как раньше, раскрывается ТОЛЬКО наведённая ===== */}
            <div className="mt-10 grid gap-2 sm:grid-cols-3 pb-28">
              {[
                { title: "Сроки", value: "Концепция 7–10 дней", icon: "/icons/icon-about1.svg" },
                { title: "Формат", value: "Онлайн + выезд на объект", icon: "/icons/icon-about2.svg" },
                { title: "Результат", value: "План + визуал + спецификация", icon: "/icons/icon-about3.svg" },
              ].map((item) => (
                <div key={item.title} className="group relative">
                  {/* Верхняя часть */}
                  <div
                    className={[
                      "border border-neutral-200 bg-white",
                      "px-4 py-4 rounded-2xl",
                      "transition-[border-radius,box-shadow] duration-300",
                      "group-hover:rounded-b-none group-hover:shadow-md",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="shrink-0">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50">
                          <Image
                            src={item.icon}
                            alt=""
                            width={22}
                            height={22}
                            className="h-6 w-6"
                          />
                        </div>
                      </div>

                      <p className="text-base font-semibold text-neutral-900 leading-snug">
                        {item.title}
                      </p>
                    </div>
                  </div>

                  {/* Нижняя раскрывающаяся часть (ТОЛЬКО у текущей карточки) */}
                  <div
                    className={[
                      "absolute left-0 right-0 top-full -mt-px z-20",
                      "pointer-events-none",
                      "opacity-0 translate-y-2",
                      "transition-all duration-300 ease-out",
                      "group-hover:opacity-100 group-hover:translate-y-0",
                    ].join(" ")}
                  >
                    <div className="rounded-b-2xl border border-neutral-200 border-t-0 bg-white px-4 py-4 shadow-md">
                      <p className="text-sm font-semibold text-neutral-900">{item.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ===== PLACEHOLDERS ===== */}
      <section id="services" className="h-[400px]" />
      <section id="works" className="h-[400px]" />
      <section id="reviews" className="h-[400px]" />
      <section id="contacts" className="h-[400px]" />
    </main>
  );
}
