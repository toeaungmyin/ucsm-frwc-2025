import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import ucsm_logo from "@/components/assets/images/logo_ucsm.png";
export default function Home() {
  return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-cyan-400 p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <div className="flex flex-col gap-2 items-center">
              <Image
                  src={ucsm_logo}
                  className="aspect-square object-contain w-32 h-auto"
                  alt="UCSM_LOGO"
                  width={100}
                  height={0}
              />
              <div className="flex flex-col items-center">
                  <h1 className="font-medium font-rubik text-4xl">UCSM</h1>
                  <h2 className="font-medium text-lg">
                      FRESHERS WELCOME
                  </h2>
              </div>
          </div>
          <div className="w-full md:w-1/3 flex flex-col items-center gap-2">
              {Object.values(Category).map((cat, index) => {
                  const category = cat
                      .split("_")
                      .map(
                          (word) =>
                              word.charAt(0).toUpperCase() +
                              word.slice(1).toLowerCase()
                      )
                      .join(" ");

                  return (
                      <Link
                          href={`/candidates/${cat}`}
                          key={index}
                          className="bg-gray-50 border shadow-md p-2 rounded text-xl font-medium self-stretch"
                      >
                          <div className="flex justify-center">{category}</div>
                      </Link>
                  );
              })}
          </div>
      </div>
  );
}
