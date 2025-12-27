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
    text: "Понравилось, что дизайн не «для картинки», а под реальную жизнь. Планировку разложили по полочкам, хранение продумали до мелочей. Итог — спокойно, удобно и красиво.",
    rating: 5,
    avatar: "/avatars/2.jpg",
  },
  {
    name: "Марат С.",
    role: "Студия 38 м²",
    text: "Самое ценное — ясность. Быстро поняли приоритеты, убрали лишнее и сделали компактно, но без ощущения «коробки». Визуально — очень чисто.",
    rating: 5,
    avatar: "/avatars/4.jpg",
  },
  {
    name: "Екатерина И.",
    role: "Дом 120 м²",
    text: "У нас сложная семья: дети, работа из дома, гости. Сделали интерьер, который выдерживает жизнь и при этом выглядит дорого. Очень точное попадание в стиль.",
    rating: 5,
    avatar: "/avatars/7.jpg",
  },
  {
    name: "Алексей Н.",
    role: "Кухня-гостиная",
    text: "Не ожидал, что можно так грамотно собрать свет и материалы без перегруза. Получилось современно, но не холодно. Плюс — внятная логика по бюджету.",
    rating: 5,
    avatar: "/avatars/10.jpg",
  },
  {
    name: "Ольга П.",
    role: "Квартира под аренду",
    text: "Задача была: сделать ликвидно и быстро. Сделали не банально, но без дорогих решений. В итоге — выглядит лучше конкурентов и сдаётся быстрее.",
    rating: 5,
    avatar: "/avatars/6.jpg",
  },
  {
    name: "Диана Р.",
    role: "Спальня + гардероб",
    text: "Боялась тёмных оттенков, но всё сделали мягко и благородно. Плюс — очень удобные системы хранения. Теперь спальня не просто красивая, а комфортная.",
    rating: 5,
    avatar: "/avatars/5.jpg",
  },
  {
    name: "Руслан Т.",
    role: "Квартира 82 м²",
    text: "Наконец-то дизайн, который не устаёт через неделю. Всё собрано в один стиль, нет визуального шума. Решения не конфликтуют с реальной жизнью.",
    rating: 5,
    avatar: "/avatars/9.jpg",
  },
  {
    name: "София Л.",
    role: "Детская комната",
    text: "Сделали детскую «на вырост»: уютно и безопасно, но без инфантильности. Продумали хранение, рабочее место и свет — прям взрослый уровень.",
    rating: 5,
    avatar: "/avatars/1.jpg",
  },
  {
    name: "Тимур М.",
    role: "Санузел",
    text: "Небольшой санузел, но выглядит как в хорошем отеле. Всё просчитано: где плитка, где подсветка, как не «съесть» пространство визуально.",
    rating: 5,
    avatar: "/avatars/3.jpg",
  },
  {
    name: "Ирина В.",
    role: "Гостиная",
    text: "Собрали интерьер, который отражает мой характер: тепло, современно, но без лишнего пафоса. Очень понравилась работа с цветом и тем, как «подружили» мебель.",
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
          className={i < rating ? "text-orange-500" : "text-neutral-300"}
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
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl sm:text-4xl font-semibold">Отзывы</h2>
          <p className="text-neutral-600 max-w-2xl">
            Слова клиентов — лучшее подтверждение, что результат оправдал ожидания.
          </p>
        </div>

        <div className="mt-10">
          <Swiper
            modules={[Autoplay]}
            loop
            centeredSlides
            grabCursor
            speed={800}
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
                    className={[
                      "group relative overflow-hidden rounded-2xl bg-white shadow-sm",
                      // фикс высоты у всех карточек
                      "h-[340px] sm:h-[360px]",
                      // без рывков: не transition-all
                      "transition-[transform,box-shadow] duration-500 ease-out",
                      isActive
                        ? "scale-100 shadow-md"
                        : "scale-[0.92]",
                      "hover:shadow-lg",
                    ].join(" ")}
                  >
                    {/* рамка (вместо border) — аккуратнее выглядит */}
                    <div
                      className={[
                        "pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset transition duration-300",
                        isActive ? "ring-orange-200" : "ring-neutral-200",
                        "group-hover:ring-orange-300",
                      ].join(" ")}
                      aria-hidden="true"
                    />

                    {/* “красота”: насыщенный оранжевый hover/active градиент */}
                    <div
                      className={[
                        "pointer-events-none absolute inset-0 transition-opacity duration-300",
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-orange-500/32 blur-3xl" />
                      <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-orange-500/24 blur-3xl" />
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-orange-500/10 to-orange-500/18" />
                    </div>

                    <div className="relative p-6 sm:p-7 h-full flex flex-col">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 min-w-0">
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-neutral-200 ring-1 ring-neutral-200 group-hover:ring-orange-300 transition">
                            <Image
                              src={r.avatar}
                              alt={r.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                              priority={idx < 3}
                            />
                          </div>

                          {/* без многоточий: роль переносится вниз */}
                          <div className="min-w-0">
                            <p className="font-semibold text-neutral-900 leading-tight">
                              {r.name}
                            </p>

                            <div className="mt-2 flex items-center gap-3">
                              <Stars rating={r.rating} />
                            </div>

                            <p className="mt-2 text-sm text-neutral-600 whitespace-normal">
                              {r.role}
                            </p>
                          </div>
                        </div>

                        <div className="text-orange-500 text-3xl leading-none select-none transition-transform duration-300 group-hover:rotate-6">
                          “
                        </div>
                      </div>

                      <p
                        className={[
                          "mt-5 text-neutral-700 leading-relaxed overflow-hidden",
                          "[display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:5]",
                        ].join(" ")}
                      >
                        {r.text}
                      </p>

                      <div className="mt-auto pt-6 flex items-center justify-between">
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
