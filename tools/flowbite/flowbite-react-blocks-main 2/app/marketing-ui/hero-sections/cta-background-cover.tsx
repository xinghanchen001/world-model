import { Button } from "flowbite-react";

export function BackgroundCoverImageWithCTAsHero() {
  return (
    <section className="bg-gray-700 bg-[url('https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/coast-house-view.jpg')] bg-cover bg-center bg-no-repeat bg-blend-multiply ">
      <div className="relative z-10 mx-auto max-w-screen-xl px-4 py-8 text-white lg:py-16">
        <div className="mb-6 max-w-screen-lg lg:mb-0">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl">
            We invest in the world’s potential
          </h1>
          <p className="mb-6 text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
            The need for energy is universal. That's why Flowbite scientists and
            engineers are pioneering new research and pursuing new technologies
            to reduce emissions while creating more efficient fuels. We're
            committed to responsibly meeting the world's energy needs.
          </p>
          <Button size="lg" className="[&>span]:items-center">
            Learn more about the plan
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </div>
        <div className="mt-8 grid gap-8 border-t border-gray-600 pt-8 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:pt-12">
          <div>
            <h2 className="mb-1 text-lg font-bold">Fourth quarter 2021</h2>
            <p className="mb-1 text-sm text-gray-400">
              We announced fourth quarter 2021 results
            </p>
            <a
              href="#"
              className="inline-flex items-center text-sm font-semibold text-primary-500 hover:underline"
            >
              Read more
              <svg
                className="ml-1 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
          <div>
            <h2 className="mb-1 text-lg font-bold">Zero emissions</h2>
            <p className="mb-1 text-sm text-gray-400">
              Flowbite aims to achieve net-zero emissions
            </p>
            <a
              href="#"
              className="inline-flex items-center text-sm font-semibold text-primary-500 hover:underline"
            >
              Read more
              <svg
                className="ml-1 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
          <div>
            <h2 className="mb-1 text-lg font-bold">New York</h2>
            <p className="mb-1 text-sm text-gray-400">
              Plans for net zero emissions in New York
            </p>
            <a
              href="#"
              className="inline-flex items-center text-sm font-semibold text-primary-500 hover:underline"
            >
              Read more
              <svg
                className="ml-1 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
          <div>
            <h2 className="mb-1 text-lg font-bold">2022 plans</h2>
            <p className="mb-1 text-sm text-gray-400">
              Investing in the future of Africa
            </p>
            <a
              href="#"
              className="inline-flex items-center text-sm font-semibold text-primary-500 hover:underline"
            >
              Read more
              <svg
                className="ml-1 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
