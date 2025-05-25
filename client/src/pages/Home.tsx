import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const { authenticated } = useAuth();

  return (
    <div className="min-h-screen">
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Streamline Your Procurement Process
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Automatically identify, classify, and track bids from your emails
            with our intelligent bid management system.
          </p>

          <div className="flex gap-4 justify-center">
            {!authenticated ? (
              <>
                <Link
                  to="/login"
                  className="px-6 py-3 bg-teal-500 text-white text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-3 border border-gray-300 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Create Account
                </Link>
              </>
            ) : (
              <Link
                to="/dashboard"
                className="px-6 py-3 bg-teal-500 text-white text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Bid Identification",
                description:
                  "Automatically detect bid-related emails using AI-powered analysis",
                icon: "📧",
              },
              {
                title: "Smart Classification",
                description:
                  "Tag and categorize bids by project, contractor, and type",
                icon: "🏷️",
              },
              {
                title: "Contract Tracking",
                description:
                  "Monitor contract status and related communications",
                icon: "📑",
              },
            ].map((feature) => (
              <div key={feature.title} className="bg-gray-50 p-6 rounded-xl">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How BidFlow Works
          </h2>
          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Email Integration",
                description:
                  "Connect your email account to automatically ingest bid communications",
              },
              {
                step: "2",
                title: "Automatic Processing",
                description:
                  "Our system identifies and extracts key bid information",
              },
              {
                step: "3",
                title: "Dashboard View",
                description:
                  "Monitor all bids in one centralized dashboard with filters",
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-6">
                <div className="flex-shrink-0 bg-teal-500 text-white text-white rounded-full w-10 h-10 flex items-center justify-center">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-teal-500 text-white text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Procurement?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Start managing bids efficiently with BidFlow today.
          </p>
          <Link
            to={authenticated ? "/dashboard" : "/register"}
            className="inline-block px-8 py-3 bg-white text-teal-500 font-medium rounded-lg hover:bg-gray-100 transition-colors"
          >
            {authenticated ? "Go to Dashboard" : "Get Started Now"}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
