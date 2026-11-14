import Image from "next/image";


export default function AdvertiseSection() {
  return (
    <section className="w-full bg-primary px-5 py-12 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 lg:gap-12">
          {/* Advertise Image */}
          <div className="relative w-full aspect-4/3 overflow-hidden shadow-lg">
            <Image
              src="/advertise.png"
              alt="Advertise with Energy Projects Data Media"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Advertise Content */}
          <div className="w-full text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-5">
              Advertise With Us
            </h2>

            <div className="w-full h-0.5 bg-white/40 mb-6" />

            <p className="text-base md:text-lg leading-relaxed mb-6">
              Energy market advertising opportunities. Reach investors, traders,
              and potential clients. Showcase your products/services and make
              the most of your online advertising budget.
            </p>

            <ul className="space-y-4 text-base md:text-lg mb-8">
              <li className="flex items-start gap-3">
                <span className="font-bold">✓</span>
                Targeted audience in the energy sector
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold">✓</span>
                Various ad formats available
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold">✓</span>
                Competitive pricing
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold">✓</span>
                High traffic of engaged subscribers and visitors
              </li>
            </ul>

            <p className="text-base md:text-lg leading-relaxed mb-7">
              Contact us to learn more about advertising opportunities and boost
              your brand visibility in the energy market.
            </p>

            <div className="flex justify-start">
              <a
                href="/contactus"
                className="inline-block bg-white text-primary px-7 py-3 font-bold shadow-md hover:bg-blue-100 transition-colors duration-300"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


