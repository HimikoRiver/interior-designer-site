"use client";

import { useState } from "react";
import Image from "next/image";

const MAP_SRC =
  "https://yandex.ru/map-widget/v1/?indoorLevel=1&ll=45.694936%2C43.310606&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgo0Mzk2Njg2ODUwEnDQoNC-0YHRgdC40Y8sINCn0LXRh9C10L3RgdC60LDRjyDQoNC10YHQv9GD0LHQu9C40LrQsCwg0JPRgNC-0LfQvdGL0LksINGD0LvQuNGG0LAg0JIu0JAuINCa0LDQvS3QmtCw0LvQuNC60LAsIDU1IgoNnsc2QhUQPi1C&z=16.61";

export default function ContactsFooter() {
  const [mapActive, setMapActive] = useState(false);

  return (
    <footer className="w-full">
      {/* MAP */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-10">
          <p className="text-sm text-neutral-500">Адрес</p>
          <h3 className="text-xl font-semibold text-neutral-900 md:text-2xl">
            Чеченская Республика, г. Грозный, ул. В.А. Кан-Калика, 55
          </h3>
          <p className="mt-2 text-neutral-600">
            По предварительной договорённости.
          </p>

          <div
            className="mt-4 relative overflow-hidden rounded-2xl border border-neutral-200"
            onMouseLeave={() => setMapActive(false)}
          >
            {!mapActive && (
              <button
                type="button"
                className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
                onClick={() => setMapActive(true)}
                aria-label="Активировать карту"
              >
                <div id="contacts" className="bg-white/90 px-4 py-2 rounded-xl text-sm text-slate-700 shadow">
                  Нажмите, чтобы взаимодействовать с картой
                </div>
              </button>
            )}

            <iframe
              src={MAP_SRC}
              title="Яндекс.Карта"
              className={[
                "h-[300px] w-full md:h-[380px]",
                mapActive ? "pointer-events-auto" : "pointer-events-none",
              ].join(" ")}
              loading="lazy"
              frameBorder="0"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <section  className="w-full bg-orange-500 text-black">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
            {/* LEFT */}
            <div className="md:col-span-6">
              <p className="text-sm opacity-80">Контакты</p>
              <h2 className="mt-2 text-3xl font-semibold md:text-5xl">
                Давайте обсудим ваш проект
              </h2>

              <p className="mt-4 max-w-xl text-base opacity-90 md:text-lg">
                Напишите, что у вас за объект и на каком вы этапе — отвечу лично.
              </p>

              <div className="mt-5 space-y-2 text-base md:text-lg">
                <p className="opacity-90">
                  Телефон:{" "}
                  <a
                    href="tel:+70000000000"
                    className="font-semibold underline underline-offset-4 decoration-black/50 hover:decoration-black"
                  >
                    +7 (000) 000-00-00
                  </a>
                </p>

                <p className="opacity-90">
                  Email:{" "}
                  <a
                    href="mailto:hello@example.com"
                    className="font-semibold underline underline-offset-4 decoration-black/50 hover:decoration-black"
                  >
                    hello@example.com
                  </a>
                </p>

                <p className="text-sm opacity-80 md:text-base">
                  Обычно отвечаю в течение 24 часов.
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="md:col-span-6 flex flex-col">
              <div>
                <p className="text-sm opacity-80">Быстрый контакт</p>
                <p className="mt-1 text-lg font-semibold">
                  Выберите удобный способ связи
                </p>

                {/* ICONS */}
                <div className="mt-6 flex flex-wrap gap-3 md:gap-6">
                  {["whatsapp", "telegram", "gmail", "vk"].map((icon) => (
                    <a
                      key={icon}
                      href="#"
                      aria-label={icon}
                      className="
                        group relative overflow-hidden
                        flex items-center justify-center
                        h-20 w-20
                        rounded-2xl
                        border-[3px] border-black
                      "
                    >
                      {/* базовый градиент */}
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-br from-orange-300 via-orange-500 to-orange-600"
                      />

                      {/* лёгкий верхний блик (едва заметный) */}
                      <span
                        aria-hidden
                        className="absolute -top-8 left-1/2 h-16 w-24 -translate-x-1/2 rounded-full bg-white/15 blur-2xl"
                      />

                      {/* БЕГУЩАЯ ВОЛНА (яркая и широкая) */}
                      <span
                        aria-hidden
                        className="
                          shine-sweep
                          pointer-events-none
                          absolute inset-y-0 left-0
                          w-[90%]
                          bg-gradient-to-r from-transparent via-white/90 to-transparent
                          blur-[4px]
                        "
                      />

                      {/* иконка */}
                      <Image
                        src={`/icons/${icon}.svg`}
                        alt=""
                        width={40}
                        height={40}
                        className="relative z-10 select-none"
                      />
                    </a>
                  ))}
                </div>

                <p className="mt-4 text-sm opacity-90">
                  Метраж + город + задача = быстрый ответ.
                </p>

                <p className="mt-4 text-sm opacity-80">
                  Грозный · удалённо · жилые и коммерческие проекты
                </p>
              </div>

              <div className="mt-auto pt-6 text-sm opacity-80">
                <p>© 2025 Дизайн интерьера</p>
                <p>
                  <a
                    href="#"
                    className="underline underline-offset-4 decoration-black/50 hover:decoration-black"
                  >
                    Политика конфиденциальности
                  </a>
                </p>
              </div>
            </div>
          </div>

          <p className="mt-8 max-w-4xl text-[11px] leading-snug text-black/50">
            Компания Meta Platforms Inc., владеющая социальными сетями Facebook и Instagram,
            по решению суда от 21.03.2022 признана экстремистской организацией, её деятельность
            на территории России запрещена.
          </p>
        </div>
      </section>
    </footer>
  );
}
