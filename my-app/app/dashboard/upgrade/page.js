import React from 'react'

export default function UpgradePlans() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-800">Subscription Plans</h2>
        <p className="text-blue-600 mt-2">Choose the perfect plan for your note-taking needs</p>
      </div>
      
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch md:gap-8">
          {/* Free Plan Card */}
          <div className="rounded-2xl border border-blue-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 sm:px-8 lg:p-12 flex flex-col">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-blue-800">
                Free
                <span className="sr-only">Plan</span>
              </h2>

              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-blue-800 sm:text-4xl">$0</strong>
                <span className="text-sm font-medium text-blue-600">/month</span>
              </p>
            </div>

            <ul className="mt-6 space-y-3 flex-grow">
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-blue-600"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                <span className="text-gray-700"><span className="font-medium">5</span> PDF documents</span>
              </li>

              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-blue-600"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                <span className="text-gray-700"><span className="font-medium">Unlimited</span> notes</span>
              </li>

              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-blue-600"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                <span className="text-gray-700">Email support</span>
              </li>

              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-blue-600"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                <span className="text-gray-700">Help center access</span>
              </li>
            </ul>

            <a
              href="#"
              className="mt-8 block rounded-full border border-blue-600 bg-white px-12 py-3 text-center text-sm font-medium text-blue-600 hover:bg-blue-50 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-colors duration-200"
            >
              Get Started
            </a>
          </div>

          {/* Premium Plan Card */}
          <div
            className="rounded-2xl border border-blue-600 p-6 shadow-md hover:shadow-lg transition-shadow duration-300 relative sm:px-8 lg:p-12 flex flex-col"
          >
            <div className="absolute -top-4 right-4 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold">
              POPULAR
            </div>
            
            <div className="text-center">
              <h2 className="text-xl font-semibold text-blue-800">
                Premium
                <span className="sr-only">Plan</span>
              </h2>

              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-blue-800 sm:text-4xl">$9.99</strong>
                <span className="text-sm font-medium text-blue-600">/month</span>
              </p>
            </div>

            <ul className="mt-6 space-y-3 flex-grow">
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-blue-600"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                <span className="text-gray-700"><span className="font-medium">Unlimited</span> PDF documents</span>
              </li>

              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-blue-600"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                <span className="text-gray-700"><span className="font-medium">Unlimited</span> notes</span>
              </li>

              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-blue-600"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                <span className="text-gray-700">Priority email support</span>
              </li>

              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-blue-600"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                <span className="text-gray-700">Advanced AI features</span>
              </li>

              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-blue-600"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                <span className="text-gray-700">Collaboration tools</span>
              </li>

              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-blue-600"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                <span className="text-gray-700">Premium templates</span>
              </li>
            </ul>

            <a
              href="#"
              className="mt-8 block rounded-full border border-blue-600 bg-blue-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors duration-200"
            >
              Upgrade Now
            </a>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-4 text-blue-600 text-sm">
        <p>Questions about our plans? <a href="#" className="underline font-medium">Contact us</a></p>
      </div>
    </div>
  )
}