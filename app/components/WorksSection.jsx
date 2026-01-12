"use client";

import Image from "next/image";
import Link from "next/link";

const works = [
  { id: 1, title: "Васаби", slug: "wasabi" },
  { id: 2, title: "Американская мечта", slug: "american-dream" },
  { id: 3, title: "Скандинавский минимализм", slug: "scandinavian-minimalism" },
  { id: 4, title: "Теплый модерн", slug: "warm-modern" },
  { id: 5, title: "Городской уют", slug: "urban-cozy" },
  { id: 6, title: "Современная классика", slug: "modern-classic" },
  { id: 7, title: "Свет и воздух", slug: "light-and-air" },
  { id: 8, title: "Контраст и ритм", slug: "contrast-rhythm" },
  { id: 9, title: "Натуральные текстуры", slug: "natural-textures" },
];

export default function WorksSection() {
  return (
    <section id="works" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-10">
          Мои работы
        </h2>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-[5px]

            lg:[&>*:nth-child(1)]:rounded-tl-2xl
            lg:[&>*:nth-child(3)]:rounded-tr-2xl
            lg:[&>*:nth-child(7)]:rounded-bl-2xl
            lg:[&>*:nth-child(9)]:rounded-br-2xl
          "
        >
          {works.map((work) => (
            <Link
              key={work.id}
              href={`/works/${work.slug}`}
              className="
                group
                relative
                block
                overflow-hidden
                aspect-[4/3]
                bg-neutral-200
              "
            >
              <Image
                src={`/images/works/${work.id}.jpg`}
                alt={work.title}
                fill
                className="
                  object-cover
                  transition-all
                  duration-500
                  ease-out
                  group-hover:scale-[0.96]
                  group-hover:blur-[2px]
                "
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              <div
                className="
                  absolute inset-0
                  bg-black/20
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  duration-300
                "
              />

              <div
                className="
                  absolute bottom-4 left-4
                  text-white
                  text-sm
                  tracking-wide
                  uppercase
                  opacity-0
                  translate-y-2
                  group-hover:opacity-100
                  group-hover:translate-y-0
                  transition-all
                  duration-300
                "
              >
                {work.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
