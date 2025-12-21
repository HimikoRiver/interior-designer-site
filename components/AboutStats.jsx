"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ITEMS = [
  {
    key: "edu",
    label: "Образование",
    value: "Интерьерный дизайн",
    details: [
      "Обучение современным подходам к планировке и эргономике.",
      "Работа со светом, материалами, колористикой.",
      "Проектирование под реализацию, а не «картинку».",
    ],
  },
  {
    key: "exp",
    label: "Опыт",
    value: "Квартиры / дома",
    details: [
      "Планировочные решения: хранение, маршруты, сценарии жизни.",
      "Подбор отделки и мебели под бюджет.",
      "Сопровождение: от концепции до финального результата.",
    ],
  },
  {
    key: "approach",
    label: "Подход",
    value: "Функция + эстетика",
    details: [
      "Сначала логика и удобство — потом красота.",
      "Простые решения, которые реально построят.",
      "Честно говорю, что работает, а что — нет.",
    ],
  },
];

export default function AboutStats() {
  const [activeKey, setActiveKey] = useState(null);

  const activeItem = useMemo(
    () => ITEMS.find((i) => i.key === activeKey) || null,
    [activeKey]
  );

  return (
    <>
      <dl className="mt-8 grid gap-4 sm:grid-cols-3">
        {ITEMS.map((item) => (
          <motion.button
            key={item.key}
            type="button"
            onClick={() => setActiveKey(item.key)}
            className="group text-left rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm outline-none
                       focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {/* тонкая оранжевая «полоска-сигнал» */}
            <div className="mb-3 h-1 w-10 rounded-full bg-orange-400/0 transition-all duration-300 group-hover:bg-orange-400/70" />

            <dt className="text-xs font-medium text-neutral-500">{item.label}</dt>
            <dd className="mt-1 text-sm font-semibold text-neutral-900">
              {item.value}
            </dd>

            {/* подсказка действия */}
            <div className="mt-4 text-xs text-neutral-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Нажми — открою детали
            </div>
          </motion.button>
        ))}
      </dl>

      {/* MODAL */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden="true"
          >
            {/* backdrop */}
            <motion.button
              type="button"
              className="absolute inset-0 bg-neutral-900/40"
              onClick={() => setActiveKey(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* dialog */}
            <div className="relative flex min-h-full items-center justify-center p-4">
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="about-modal-title"
                className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl"
                initial={{ y: 18, scale: 0.98, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                exit={{ y: 12, scale: 0.98, opacity: 0 }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium text-neutral-500">
                      {activeItem.label}
                    </p>
                    <h3
                      id="about-modal-title"
                      className="mt-1 text-xl font-semibold text-neutral-900"
                    >
                      {activeItem.value}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveKey(null)}
                    className="rounded-xl border border-neutral-200 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                  >
                    Закрыть
                  </button>
                </div>

                <div className="mt-5 space-y-3 text-sm leading-relaxed text-neutral-700">
                  {activeItem.details.map((t, idx) => (
                    <p key={idx} className="relative pl-4">
                      <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-orange-400" />
                      {t}
                    </p>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveKey(null)}
                    className="rounded-2xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
                  >
                    Понял
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
