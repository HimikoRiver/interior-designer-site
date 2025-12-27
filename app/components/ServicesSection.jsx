"use client";

import Image from "next/image";

// Swiper (больше не нужен) — УДАЛИЛ
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";

const services = [
  {
    title: "Экспресс-консультация",
    forWho: "Когда нужно быстро принять решения и не наломать дров",
    bullets: [
      "Разбор планировки/идей и ваших задач",
      "Рекомендации по стилю, цветам и свету",
      "План следующих шагов и ошибок, которых избежать",
    ],
    timing: "1–2 часа",
    tag: "Быстрый старт",
  },
  {
    title: "Планировочное решение",
    forWho: "Когда важно, чтобы пространство работало, а не просто выглядело",
    bullets: [
      "2–3 варианта планировки",
      "Расстановка мебели + сценарии жизни",
      "Финальная схема с правками",
    ],
    timing: "5–10 дней",
    tag: "Функциональность",
  },
  {
    title: "Дизайн-проект (полный)",
    forWho: "Если нужен понятный ремонт без хаоса и вечных переделок",
    bullets: [
      "Концепция + коллажи/референсы",
      "Чертежи: свет, электрика, размеры, раскладки",
      "Спецификация материалов и мебели",
    ],
    timing: "3–6 недель",
    tag: "Система",
  },
  {
    title: "Авторское сопровождение",
    forWho: "Если нужен контроль, чтобы на объекте сделали как задумано",
    bullets: [
      "Контроль решений и ответы строителям",
      "Подбор замен при сроках/снятии позиций",
      "Выезды/созвоны по ключевым этапам",
    ],
    timing: "На период ремонта",
    tag: "Спокойствие",
  },
  {
    title: "Подбор материалов и мебели",
    forWho: "Чтобы получить цельный результат без беготни по магазинам",
    bullets: [
      "Отделка, мебель и свет под стиль",
      "Альтернативы под бюджет",
      "Учёт сроков поставки",
    ],
    timing: "3–7 дней",
    tag: "Комплектация",
  },
  {
    title: "Свет и электрика",
    forWho: "Чтобы всё было удобно и логично",
    bullets: [
      "Сценарии освещения",
      "Розетки и выключатели",
      "Привязка к мебели и технике",
    ],
    timing: "2–5 дней",
    tag: "Инженерия",
  },
  {
    title: "Декор и стилизация",
    forWho: "Когда хочется завершённый образ",
    bullets: [
      "Текстиль и декор",
      "Акценты и композиции",
      "Финальная сборка",
    ],
    timing: "2–4 дня",
    tag: "Финал",
  },
  {
    title: "Редизайн без ремонта",
    forWho: "Обновить интерьер без стройки",
    bullets: [
      "Работа с тем, что уже есть",
      "Перестановка и акценты",
      "Минимум вмешательств",
    ],
    timing: "3–6 дней",
    tag: "Обновление",
  },
];

export default function ServicesSection() {
  // Берём только 6 первых карточек (2 последние убираем)
  const visibleServices = services.slice(0, 6);

  return (
    <section
      id="services"
      className="w-full min-h-screen flex items-center bg-gradient-to-b from-white to-neutral-50 overflow-x-hidden py-5"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* Верх: текст + картинка */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className="text-sm tracking-wide text-neutral-500">Чем я могу помочь</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900">
              Услуги
            </h2>

            <p className="mt-3 text-base sm:text-lg leading-relaxed text-neutral-600">
              Можно начать с консультации или сразу сделать полный проект — подберём формат под вашу задачу.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="#contacts"
                className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Запросить стоимость
              </a>

              <a
                href="#contacts"
                className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 shadow-sm transition hover:border-neutral-300 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Скачать чек-лист
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src="/images/servicesImg.png"
                  alt="Скетч интерьера"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 560px, 100vw"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Статичная сетка 2 ряда по 3 */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleServices.map((s) => (
            <article
              key={s.title}
              className="group relative h-[360px] rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md hover:border-neutral-300 flex flex-col"
            >
              <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-orange-500/80" />

              <div className="pl-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-900">
                    {s.title}
                  </h3>
                  <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700">
                    {s.tag}
                  </span>
                </div>

                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{s.forWho}</p>

                <ul className="mt-4 space-y-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-neutral-300 group-hover:bg-orange-400 transition" />
                      <p className="text-sm text-neutral-700 leading-relaxed">{b}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pl-3">
                <div className="mt-4 flex items-center justify-between rounded-xl bg-neutral-50 px-4 py-3">
                  <p className="text-xs font-medium text-neutral-500">Срок</p>
                  <p className="text-sm font-semibold text-neutral-900">{s.timing}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-sm text-neutral-500 text-center">
          Цены и сроки зависят от площади и задачи. После короткого брифа скажу точную вилку и план.
        </p>
      </div>
    </section>
  );
}
