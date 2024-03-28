import Image from "next/image";

const logos: { src: string; alt: string; link: string }[] = [
  {
    src: "/fastapi-logo.png",
    alt: "FastAPI",
    link: "https://fastapi.tiangolo.com/",
  },
  { src: "/hf-logo.png", alt: "HF Logo", link: "#" },
  { src: "/next-logo.png", alt: "Next.js", link: "https://nextjs.org/" },
  { src: "/spacy-logo.png", alt: "spaCy", link: "https://spacy.io/" },
  {
    src: "/tailwind-css.png",
    alt: "Tailwind CSS",
    link: "https://tailwindcss.com/",
  },
  {
    src: "/tf-logo.png",
    alt: "TensorFlow",
    link: "https://www.tensorflow.org/",
  },
  {
    src: "/azure-logo.png",
    alt: "Microsoft Azure",
    link: "https://azure.microsoft.com/",
  },
];

const CompanyLogos = () => {
  return (
    <section className="">
      <div className="py-8 lg:py-8 mx-auto max-w-screen-xl px-4">
        <div className="grid grid-cols-2 gap-8 sm:gap-12 md:grid-cols-3 lg:grid-cols-7">
          {logos.map((logo) => (
            <a
              href={logo.link}
              key={logo.src}
              className="relative overflow-hidden group hover:scale-110 transition duration-300"
              target="_blank"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={125}
                height={35}
                layout="fixed"
                objectFit="cover"
                className="h-full w-full object-scale-down group-hover:brightness-110 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-0  transition duration-300"></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyLogos;
