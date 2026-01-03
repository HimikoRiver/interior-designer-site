"use client";

import Image from "next/image";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const reviews = [
  {
    name: "Анна К.",
    role: "Квартира 64 м²",
    text:
      "Понравилось, что дизайн не «для картинки», а под реальную жизнь. Планировку разложили по полочкам, хранение продумали до мелочей. Итог — спокойно, удобно и красиво.",
    rating: 5,
    avatar: "/avatars/2.jpg",
  },
  {
    name: "Марат С.",
    role: "Студия 38 м²",
    text:
      "Самое ценное — ясность. Быстро поняли приоритеты, убрали лишнее и сделали компактно, но без ощущения «коробки». Визуально — очень чисто.",
    rating: 5,
    avatar: "/avatars/4.jpg",
  },
  {
    name: "Екатерина И.",
    role: "Дом 120 м²",
    text:
      "У нас сложная семья: дети, работа из дома, гости. Сделали интерьер, который выдерживает жизнь и при этом выглядит дорого. Очень точное попадание в стиль.",
    rating: 5,
    avatar: "/avatars/7.jpg",
  },
  {
    name: "Алексей Н.",
    role: "Кухня-гостиная",
    text:
      "Не ожидал, что можно так грамотно собрать свет и материалы без перегруза. Получилось современно, но не холодно. Плюс — внятная логика по бюджету.",
    rating: 5,
    avatar: "/avatars/10.jpg",
  },
  {
    name: "Ольга П.",
    role: "Квартира под аренду",
    text:
      "Задача была: сделать ликвидно и быстро. Сделали не банально, но без дорогих решений. В итоге — выглядит лучше конкурентов и сдаётся быстрее.",
    rating: 5,
    avatar: "/avatars/6.jpg",
  },
  {
    name: "Диана Р.",
    role: "Спальня + гардероб",
    text:
      "Боялась тёмных оттенков, но всё сделали мягко и благородно. Плюс — очень удобные системы хранения. Теперь спальня не просто красивая, а комфортная.",
    rating: 5,
    avatar: "/avatars/5.jpg",
  },
  {
    name: "Руслан Т.",
    role: "Квартира 82 м²",
    text:
      "Наконец-то дизайн, который не устаёт через неделю. Всё собрано в один стиль, нет визуального шума. Решения не конфликтуют с реальной жизнью.",
    rating: 5,
    avatar: "/avatars/9.jpg",
  },
  {
    name: "София Л.",
    role: "Детская комната",
    text:
      "Сделали детскую «на вырост»: уютно и безопасно, но без инфантильности. Продумали хранение, рабочее место и свет — прям взрослый уровень.",
    rating: 5,
    avatar: "/avatars/1.jpg",
  },
  {
    name: "Тимур М.",
    role: "Санузел",
    text:
      "Небольшой санузел, но выглядит как в хорошем отеле. Всё просчитано: где плитка, где подсветка, как не «съесть» пространство визуально.",
    rating: 5,
    avatar: "/avatars/3.jpg",
  },
  {
    name: "Ирина В.",
    role: "Гостиная",
    text:
      "Собрали интерьер, который отражает мой характер: тепло, современно, но без лишнего пафоса. Очень понравилась работа с цветом и тем, как «подружили» мебель.",
    rating: 5,
    avatar: "/avatars/8.jpg",
  },
];

function Stars({ rating = 5 }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Оценка: ${rating} из 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={[
            "text-[14px] leading-none",
            i < rating ? "text-orange-500" : "text-neutral-300",
          ].join(" ")}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section id="reviews" className="bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-semibold sm:text-4xl">Отзывы</h2>
          <p className="max-w-2xl text-neutral-600">
            Слова клиентов — лучшее подтверждение, что результат оправдал ожидания.
          </p>
        </div>

        <div className="mt-10">
          <Swiper
            modules={[Autoplay]}
            loop
            centeredSlides
            grabCursor
            speed={900}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            spaceBetween={18}
            breakpoints={{
              0: { slidesPerView: 1.15 },
              640: { slidesPerView: 1.35 },
              768: { slidesPerView: 3 },
            }}
            className="!pb-2"
          >
            {reviews.map((r, idx) => (
              <SwiperSlide key={`${r.name}-${idx}`}>
                {({ isActive }) => (
                  <article
                    style={{ willChange: "transform" }}
                    className={[
                      "group relative overflow-hidden rounded-2xl",
                      // базовое стекло: тихо и дорого
                      "bg-white/75 backdrop-blur-xl",
                      // фикс высоты у всех карточек
                      "h-[340px] sm:h-[360px]",
                      // движение
                      "transform-gpu transition-[transform,box-shadow,opacity,filter] duration-700 ease-out",
                      // не трогаем scale-[0.95]
                      isActive
                        ? "scale-100 opacity-100 shadow-[0_18px_55px_-28px_rgba(0,0,0,0.35)]"
                        : "scale-[0.95] opacity-95 shadow-[0_10px_35px_-30px_rgba(0,0,0,0.35)]",
                    ].join(" ")}
                  >
                    {/* PREMIUM MULTI-LAYER SHELL */}
                    <div className="pointer-events-none absolute inset-0" aria-hidden>
                      {/* 1) Тихий общий "paper/stone" градиент — вместо неона */}
                      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50/90 via-white/55 to-neutral-100/70" />

                      {/* 2) Тонкий шампань-акцент по диагонали — очень деликатно */}
                      <div
                        className={[
                          "absolute inset-0 transition-opacity duration-300",
                          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                        ].join(" ")}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-100/45 via-transparent to-orange-200/35" />
                      </div>

                      {/* 3) Lux ring (градиентный кант) через padding — как у премиум карточек */}
                      <div
                        className={[
                          "absolute inset-0 rounded-2xl p-[1px] transition-opacity duration-300",
                          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                        ].join(" ")}
                      >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/70 via-orange-100/55 to-white/40" />
                        <div className="absolute inset-[1px] rounded-2xl bg-white/65" />
                      </div>

                      {/* 4) Micro highlight сверху (стеклянный блик) */}
                      <div
                        className={[
                          "absolute -top-28 left-1/2 h-56 w-[420px] -translate-x-1/2 rounded-full blur-2xl transition-opacity duration-300",
                          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                        ].join(" ")}
                        style={{
                          background:
                            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.75), rgba(255,255,255,0) 65%)",
                        }}
                      />

                      {/* 5) Film grain — очень тонко, но даёт «дорогую материальность» */}
                      <div className="absolute inset-0 opacity-[0.06] [background:repeating-linear-gradient(135deg,rgba(0,0,0,0.65)_0px,rgba(0,0,0,0.65)_1px,transparent_1px,transparent_7px)]" />

                      {/* 6) Постоянная мягкая рамка (не оранжевая, чтобы не было «аляповато») */}
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-neutral-200/80" />
                    </div>

                    <div className="relative flex h-full flex-col p-6 sm:p-7">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-neutral-200 ring-1 ring-neutral-200/80 transition group-hover:ring-orange-200">
                            <Image
                              src={r.avatar}
                              alt={r.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                              priority={idx < 3}
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="font-semibold leading-tight text-neutral-900">
                              {r.name}
                            </p>

                            <div className="mt-2 flex items-center gap-3">
                              <Stars rating={r.rating} />
                            </div>

                            <p className="mt-2 whitespace-normal text-sm text-neutral-600">
                              {r.role}
                            </p>
                          </div>
                        </div>

                        {/* кавычка — тише и благороднее */}
                        <div className="select-none text-3xl leading-none text-orange-500/80">
                          “
                        </div>
                      </div>

                      <p className="mt-5 overflow-hidden leading-relaxed text-neutral-700 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:5]">
                        {r.text}
                      </p>

                      <div className="mt-auto flex items-center justify-between pt-6">
                        <span className="text-xs text-neutral-800">Частный проект</span>
                        <span className="text-xs text-neutral-500">
                          {idx + 1}/{reviews.length}
                        </span>
                      </div>
                    </div>
                  </article>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
