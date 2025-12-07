import Image from "next/image";

export default function AdvertiseSectionMobile() {
  return (
    <section className="p-2 flex justify-center bg-primary">
          <div className="w-full flex flex-col justify-center items-center">
                <div className="relative w-full aspect-4/3">
                  <Image
                    src="/advertise.png"
                    alt="Advertise image"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
    
              <div className="text-start px-2 h-full flex flex-col w-full mt-4">
                {/* <h2 className="text-3xl font-bold text-black mb-4">Advertise With Us</h2> */}
                <p className="text-white mb-8 text-lg">
                  Energy market advertising opportunities. Reach investors, traders, and potential clients.
                  Showcase your products/services and make the most of your online advertising budget.
                </p>
                <ul className="list-disc pl-6 text-left text-md mb-8 space-y-2 text-white">
                  <li className="text-start">Targeted audience in the energy sector</li>
                  <li className="text-start">Various ad formats available</li>
                  <li className="text-start">Competitive pricing</li>
                  <li className="text-start">High traffic of engaged subscribers and visitors</li>
                </ul>
                <p className="text-secondary text-lg mb-6">
                  Contact us to learn more about advertising opportunities and boost your brand visibility in the energy market.
                </p>
                <div className="w-full flex justify-end">
                  <a
                    href="/contactus" // replace with your actual contact route
                    className="inline-block bg-secondary text-white px-2 py-2 rounded-lg "
                  >
                    Get Started
                  </a>
                </div>
            </div>
          </div>
          
        </section>
  );
}
