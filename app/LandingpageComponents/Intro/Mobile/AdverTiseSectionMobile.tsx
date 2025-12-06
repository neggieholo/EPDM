// AdvertiseSectionMobile.tsx
export default function AdvertiseSectionMobile() {
  return (
    <section className="bg-primary/70 py-12 px-4 sm:px-6">
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold text-black mb-4">Advertise With Us</h2>
        <p className="text-white mb-6 text-sm">
          Energy market advertising opportunities. Reach investors, traders, and potential clients.
          Showcase your products/services and make the most of your online advertising budget.
        </p>

        <ul className="text-left mb-6 space-y-2 text-sm text-white">
          <li>• Targeted audience in the energy sector</li>
          <li>• Various ad formats available</li>
          <li>• Competitive pricing</li>
          <li>• High traffic of engaged subscribers and visitors</li>
        </ul>

        <p className="text-black mb-6 text-sm">
          Contact us to learn more about advertising opportunities and boost your brand visibility in the energy market.
        </p>

        <a
          href="/contactus" // Replace with your actual contact route
          className="block bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
