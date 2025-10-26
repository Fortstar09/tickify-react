import { Link } from "react-router-dom";

/**
 * Tickify — Landing Page (single file)
 *
 * - Max width 1440px centered
 * - Hero with wavy SVG bottom edge
 * - At least two decorative circles (overlapping hero)
 * - Box-shaped feature & content cards with shadows and rounded corners
 * - Responsive (mobile/tablet/desktop)
 * - Accessible: semantic HTML, alt text, focus-visible styles
 *
 * Replace icon URLs with your own assets if desired.
 */

const FeatureCard = ({ icon, title, children }) => (
  <article
    className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-3"
    role="article"
  >
    <img src={icon} alt={`${title} icon`} className="w-12 h-12" />
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm text-gray-600">{children}</p>
  </article>
);

const Testimonial = ({ name, role, text }) => (
  <div
    className="bg-white rounded-xl shadow-lg p-5"
    role="article"
    aria-label={`Testimonial from ${name}`}
  >
    <p className="text-gray-700 mb-4">“{text}”</p>
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 font-medium"
        aria-hidden
      >
        {name[0]}
      </div>
      <div>
        <div className="text-sm font-medium">{name}</div>
        <div className="text-xs text-gray-400">{role}</div>
      </div>
    </div>
  </div>
);

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Outer centered wrapper (max-width 1440px) */}
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        {/* HERO */}
        <header className="relative overflow-visible">
          {/* Decorative circle top-right */}
          <div
            className="pointer-events-none hidden md:block absolute right-0 -top-20 w-72 h-72 rounded-full bg-gradient-to-tr from-blue-300 to-indigo-400 opacity-40 blur-2xl transform rotate-12"
            aria-hidden="true"
          />

          {/* Decorative circle bottom-left */}
          <div
            className="pointer-events-none absolute -left-12 top-36 w-40 h-40 rounded-full bg-rose-200 opacity-25 blur-lg"
            aria-hidden="true"
          />

          <div className="relative z-10 pt-20 pb-32 md:pt-28 md:pb-36">
            <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-center gap-8">
              <div className="flex items-center justify-center flex-col">
                <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full mb-4">
                  New • Ticketing made simple
                </span>

                <h1 className="text-5xl md:text-[75px] max-w-[850px] text-center font-light leading-tight mt-4">
                  <span className="text-blue-600"> Tickify</span> - Ticket
                  management built for teams
                </h1>

                <p className="mt-4 text-gray-500 font-normal text-base text-center max-w-xl">
                  Route, prioritize and resolve customer requests faster.
                  Tickify brings SLAs, automation and analytics in a single,
                  intuitive dashboard.
                </p>

                <div className="mt-8 flex flex-col md:flex-row items-center justify-center  w-full  gap-5 md:gap-8">
                  <Link
                    to="/signin"
                    className="w-full md:w-fit px-8 py-2 text-center rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                    aria-label="Login to Tickify"
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    className="w-full md:w-fit text-center px-8 py-2 rounded-lg bg-white hover:bg-gray-50 border border-[#efefef] text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200"
                    aria-label="Get started with Tickify"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="size-10 bg-transparent border-4 border-blue-200 absolute right-1/2 top-1/2 rounded-full"></div>

          {/* Wave SVG bottom edge of hero */}
          <div
            className="absolute left-0 right-0 bottom-0 pointer-events-none"
            aria-hidden="true"
          >
            {/* <svg
              viewBox="0 0 1440 140"
              preserveAspectRatio="none"
              className="w-full h-36 md:h-48"
            >
              <path
                d="M0,56 C200,140 400,0 720,48 C1040,96 1200,32 1440,96 L1440 140 L0 140 Z"
                fill="#f8fafc"
              />
            </svg> */}
          </div>
        </header>

        {/* FEATURES */}
        <main className="-mt-8 md:-mt-12 ">
          <section id="features" className="py-32">
            <div className="max-w-7xl mx-auto">
                
              <h2 className="text-3xl font-medium text-center mb-3">
                Powerful features
              </h2>
              <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                Routing, SLAs, automation and analytics — everything to run a
                reliable support workflow.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
                <FeatureCard
                  icon="https://www.svgrepo.com/show/354355/automation-robot.svg"
                  title="Smart Routing"
                >
                  Automatically route tickets to the right team using rules and
                  keywords.
                </FeatureCard>

                <FeatureCard
                  icon="https://www.svgrepo.com/show/354204/clock-timer.svg"
                  title="SLA & Prioritization"
                >
                  Set SLAs, priorities and reminders so nothing falls through
                  the cracks.
                </FeatureCard>

                <FeatureCard
                  icon="https://www.svgrepo.com/show/354271/report.svg"
                  title="Analytics & Reports"
                >
                  Track performance with clear reports — reduce response times
                  and improve quality.
                </FeatureCard>
              </div>
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-medium text-center mb-6">
                What customers say
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
                <Testimonial
                  name="Aisha Bello"
                  role="Support Lead, BrightRetail"
                  text="Tickify reduced our response times by 60% and made routing painless."
                />
                <Testimonial
                  name="Daniel Okoro"
                  role="CTO, ShopLink"
                  text="Great integrations and analytics helped us identify recurring issues quickly."
                />
                <Testimonial
                  name="Maria Gomez"
                  role="Customer Success, Foodly"
                  text="Easy to implement and train new agents — onboarding was seamless."
                />
              </div>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="py-8 border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="text-xl font-bold flex justify-center items-center gap-2">
         
                <img
                  src="/logo.svg"
                  alt="Tickify Logo"
                  className="w-5 h-5"
                />
                <span>Tickify</span>
              </div>
              <div className="text-sm text-gray-500">
                — Ticketing made simple
              </div>
            </div>

            <nav
              className="flex gap-4 text-sm text-gray-600"
              aria-label="Footer navigation"
            >
              <a
                className="hover:text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 px-2 py-1 rounded"
                href="#"
              >
                Home
              </a>
              <a
                className="hover:text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 px-2 py-1 rounded"
                href="#features"
              >
                Features
              </a>
              <a
                className="hover:text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 px-2 py-1 rounded"
                href="#"
              >
                Contact
              </a>
              <a
                className="hover:text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 px-2 py-1 rounded"
                href="#"
              >
                Docs
              </a>
            </nav>

            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Tickify. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
