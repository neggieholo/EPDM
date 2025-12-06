import Image from "next/image";

// AdvertiseSection.tsx
export default function AdvertiseSection() {
  return (
    <section className="p-6 md:px-20 flex justify-center bg-primary">
      <div className="w-[70%] flex justify-center">
          <div className="w-[50%] relative h-auto">
            <div className="relative w-full aspect-4/3">
              <Image
                src="/advertise.png"
                alt="Advertise image"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="text-start px-2 h-full w-[50%]">
            {/* <h2 className="text-3xl font-bold text-black mb-4">Advertise With Us</h2> */}
            <p className="text-white mb-8 text-xl">
              Energy market advertising opportunities. Reach investors, traders, and potential clients.
              Showcase your products/services and make the most of your online advertising budget.
            </p>
            <ul className="list-disc pl-6 text-left text-lg md:text-center mb-8 space-y-2 text-white">
              <li className="text-start">Targeted audience in the energy sector</li>
              <li className="text-start">Various ad formats available</li>
              <li className="text-start">Competitive pricing</li>
              <li className="text-start">High traffic of engaged subscribers and visitors</li>
            </ul>
            <p className="text-secondary text-xl mb-6">
              Contact us to learn more about advertising opportunities and boost your brand visibility in the energy market.
            </p>
            <div className="w-full flex justify-end">
              <a
                href="/contactus" // replace with your actual contact route
                className="inline-block bg-secondary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition"
              >
                Get Started
              </a>
            </div>
        </div>
      </div>
      
    </section>
  );
}
