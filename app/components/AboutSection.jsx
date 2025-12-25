"use client";


import { useState } from "react";
import Image from "next/image";

export default function AboutSection() {
  const [openCard, setOpenCard] = useState(null);

  return (
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
                          Мой подход —{" "}
                          <span className="text-orange-500">интерьер</span>, адаптированный под человека.
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
            ].map((item, idx) => {
              const isOpen = openCard === idx;
            
              return (
                <div key={item.title} className="group relative">
                  {/* Верхняя часть */}
                  <div
                    className={[
                      "border border-neutral-200 bg-white",
                      "px-4 py-4 rounded-2xl",
                      "transition-[border-radius,box-shadow] duration-300",
                      // hover — только десктоп
                      "md:group-hover:rounded-b-none md:group-hover:shadow-md",
                      // мобилка: при открытии убираем низ и нижний бордер (убирает шов)
                      isOpen ? "rounded-b-none border-b-0 shadow-md" : "",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="shrink-0">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50">
                          <Image src={item.icon} alt="" width={22} height={22} className="h-6 w-6" />
                        </div>
                      </div>
            
                      <p className="text-base font-semibold text-neutral-900 leading-snug">
                        {item.title}
                      </p>
            
                      {/* Стрелка — мобилка */}
                      <button
                        type="button"
                        className="ml-auto md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white text-orange-500 hover:bg-orange-50 transition"
                        aria-label="Показать детали"
                        aria-expanded={isOpen}
                        onClick={() => setOpenCard(isOpen ? null : idx)}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          className={["transition-transform duration-200", isOpen ? "rotate-180" : ""].join(" ")}
                          aria-hidden="true"
                        >
                          <path
                            d="M6 9l6 6 6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
            
                  {/* Desktop hover раскрытие (как было) */}
                  <div
                    className={[
                      "absolute left-0 right-0 top-full -mt-px z-20",
                      "pointer-events-none",
                      "opacity-0 translate-y-2",
                      "transition-all duration-300 ease-out",
                      "md:group-hover:opacity-100 md:group-hover:translate-y-0",
                      "hidden md:block",
                    ].join(" ")}
                  >
                    <div className="rounded-b-2xl border border-neutral-200 border-t-0 bg-white px-4 py-4 shadow-md">
                      <p className="text-sm font-semibold text-neutral-900">{item.value}</p>
                    </div>
                  </div>
            
                  {/* Mobile tap раскрытие — без шва */}
                  <div
                    className={[
                      "md:hidden overflow-hidden",
                      "transition-[max-height,opacity] duration-300 ease-out",
                      isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0",
                    ].join(" ")}
                  >
                    <div className="border border-neutral-200 border-t-0 rounded-b-2xl bg-white px-4 py-4 -mt-px">
                      <p className="text-sm font-semibold text-neutral-900">{item.value}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            
            
                        </div>
            
                      </div>
                    </div>
                  </section>
      );
}