import { Avatar, Badge, Button, Tooltip } from "flowbite-react";
import { FaDribbble, FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import {
  HiBriefcase,
  HiEye,
  HiLocationMarker,
  HiPencilAlt,
  HiTrash,
} from "react-icons/hi";

export function AdvancedReadUserSection() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-6xl py-8 lg:py-16">
        <div className="mb-4 grid gap-4 px-4 sm:mb-5 sm:grid-cols-3 sm:gap-6 md:gap-12">
          <div className="sm:col-span-2">
            <div className="flex items-center space-x-4">
              <Avatar
                img="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png"
                rounded
                size="lg"
              />
              <div>
                <h2 className="mb-2 flex items-center text-xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl">
                  Helene Engels
                  <Badge color="gray" className="ml-3 text-base uppercase">
                    Pro
                  </Badge>
                </h2>
                <Badge color="info" className="w-fit px-3">
                  <HiEye className="mb-0.5 mr-1 h-3 w-3" />
                  Moderator
                </Badge>
              </div>
            </div>
            <dl className="mt-4">
              <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                Biography
              </dt>
              <dd className="mb-4 text-gray-500 dark:text-gray-400 sm:mb-5">
                UI/UX Designer, creating things that stand out, Featured by
                Adobe, Figma, Webflow and others, Daily design tips & resources,
                Exploring Web3.
              </dd>
              <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                Social
              </dt>
              <dd className="mb-4 inline-flex items-center space-x-1 sm:mb-5">
                <Tooltip content="Facebook profile">
                  <a
                    href="#"
                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <FaFacebook className="h-5 w-5" />
                  </a>
                </Tooltip>
                <Tooltip content="Instagram profile">
                  <a
                    href="#"
                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <FaInstagram className="h-5 w-5" />
                  </a>
                </Tooltip>
                <Tooltip content="GitHub profile">
                  <a
                    href="#"
                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <FaGithub className="h-5 w-5" />
                  </a>
                </Tooltip>
                <Tooltip content="Dribbble profile">
                  <a
                    href="#"
                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <FaDribbble className="h-5 w-5" />
                  </a>
                </Tooltip>
              </dd>
              <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                Location
              </dt>
              <dd className="mb-4 flex items-center text-gray-900 dark:text-white sm:mb-5">
                <HiLocationMarker className="mr-1.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
                <span className="text-gray-500 dark:text-gray-400">
                  California, United States of America
                </span>
              </dd>
              <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                Job Title
              </dt>
              <dd className="flex items-center text-gray-900 dark:text-white">
                <HiBriefcase className="mr-1.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
                <span className="text-gray-500 dark:text-gray-400">
                  Frontend Developer
                </span>
              </dd>
            </dl>
          </div>
          <dl>
            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
              Email Adress
            </dt>
            <dd className="mb-4 text-gray-500 dark:text-gray-400 sm:mb-5">
              helene@company.com
            </dd>
            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
              Home Adress
            </dt>
            <dd className="mb-4 text-gray-500 dark:text-gray-400 sm:mb-5">
              92 Miles Drive, Newark, NJ 07103, California, United States of
              America
            </dd>
            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
              Phone Number
            </dt>
            <dd className="mb-4 text-gray-500 dark:text-gray-400 sm:mb-5">
              +1234 567 890 / +12 345 678
            </dd>
            <dt className="mb-2.5 font-semibold leading-none text-gray-900 dark:text-white">
              Software Skills
            </dt>
            <dd className="mb-4 flex items-center space-x-1 sm:mb-5">
              <Tooltip content="inDesign">
                <a
                  href="#"
                  className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <svg
                    aria-hidden
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                  >
                    <path
                      d="M15.1558 0.238281H1.51087C0.676432 0.238281 0 0.916011 0 1.75205V15.4231C0 16.2592 0.676432 16.9369 1.51087 16.9369H15.1558C15.9902 16.9369 16.6667 16.2592 16.6667 15.4231V1.75205C16.6667 0.916011 15.9902 0.238281 15.1558 0.238281Z"
                      fill="#DC395F"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.5851 4.48532C6.5851 5.05555 6.12098 5.49063 5.56694 5.49063C5.0129 5.49063 4.5489 5.05549 4.5489 4.48532C4.5489 3.91548 5.0129 3.48047 5.56694 3.48047C6.12098 3.48047 6.5851 3.91548 6.5851 4.48532ZM3.36647 11.6283C3.36647 11.4037 3.39648 11.1283 3.45632 10.8732H3.45638L4.21986 7.74784H3.03711L3.39648 6.41952H6.24128L5.11823 10.8828C5.04336 11.168 5.01341 11.4046 5.01341 11.5693C5.01341 11.8547 5.15365 11.9382 5.37292 11.9877C5.50645 12.0177 6.57045 11.9967 7.14968 10.7066L7.88731 7.74784H6.68946L7.04883 6.41952H9.60899L9.27969 7.92762C9.72878 7.0874 10.6272 6.28906 11.5106 6.28906C12.4538 6.28906 13.2324 6.96236 13.2324 8.25246C13.2324 8.58238 13.1874 8.94147 13.0677 9.34641L12.5885 11.0709C12.5437 11.2514 12.5136 11.4012 12.5136 11.5362C12.5136 11.8361 12.6334 11.986 12.858 11.986C13.0826 11.986 13.3671 11.8206 13.6966 10.906L14.3553 11.1608C13.966 12.526 13.2623 13.0958 12.3789 13.0958C11.3458 13.0958 10.8518 12.4811 10.8518 11.6408C10.8518 11.4009 10.8816 11.1458 10.9565 10.8907L11.4507 9.12059C11.5106 8.92549 11.5255 8.74565 11.5255 8.58056C11.5255 8.01072 11.1812 7.66552 10.6272 7.66552C9.92344 7.66552 9.45932 8.17164 9.21973 9.14668L8.2614 12.9977H6.58464L6.88562 11.7875C6.39271 12.5988 5.70814 13.1012 4.86374 13.1012C3.84557 13.1012 3.36647 12.5135 3.36647 11.6283Z"
                      fill="white"
                    />
                  </svg>
                  <span className="sr-only">inDesign</span>
                </a>
              </Tooltip>
              <Tooltip content="Sketch">
                <a
                  href="#"
                  className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <svg
                    aria-hidden
                    viewBox="0 0 18 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                  >
                    <path
                      d="M4.29749 1.44122L8.98499 0.9375L13.6725 1.44122L17.3015 6.39306L8.98499 16.237L0.668457 6.39306L4.29749 1.44122Z"
                      fill="#FDB300"
                    />
                    <path
                      d="M4.03512 6.39453L8.98304 16.2384L0.666504 6.39453H4.03512Z"
                      fill="#EA6C00"
                    />
                    <path
                      d="M13.9288 6.39453L8.98082 16.2384L17.2974 6.39453H13.9288Z"
                      fill="#EA6C00"
                    />
                    <path
                      d="M4.03369 6.39453H13.9295L8.98162 16.2384L4.03369 6.39453Z"
                      fill="#FDAD00"
                    />
                    <path
                      d="M8.98357 0.9375L4.29605 1.44121L4.03564 6.39305L8.98357 0.9375Z"
                      fill="#FDD231"
                    />
                    <path
                      d="M8.98225 0.9375L13.6698 1.44121L13.9302 6.39305L8.98225 0.9375Z"
                      fill="#FDD231"
                    />
                    <path
                      d="M17.2993 6.39324L13.6703 1.44141L13.9307 6.39324H17.2993Z"
                      fill="#FDAD00"
                    />
                    <path
                      d="M0.666504 6.39324L4.29552 1.44141L4.03512 6.39324H0.666504Z"
                      fill="#FDAD00"
                    />
                    <path
                      d="M8.98357 0.9375L4.03564 6.39305H13.9315L8.98357 0.9375Z"
                      fill="#FEEEB7"
                    />
                  </svg>
                  <span className="sr-only">Sketch</span>
                </a>
              </Tooltip>
              <Tooltip content="Figma">
                <a
                  href="#"
                  className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <svg
                    aria-hidden
                    viewBox="0 0 12 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                  >
                    <path
                      d="M3.07953 16.9342C4.61287 16.9342 5.85731 15.6877 5.85731 14.1517V11.3691H3.07953C1.5462 11.3691 0.301758 12.6157 0.301758 14.1517C0.301758 15.6877 1.5462 16.9342 3.07953 16.9342Z"
                      fill="#0ACF83"
                    />
                    <path
                      d="M0.301758 8.58723C0.301758 7.05127 1.5462 5.80469 3.07953 5.80469H5.85731V11.3698H3.07953C1.5462 11.3698 0.301758 10.1232 0.301758 8.58723Z"
                      fill="#A259FF"
                    />
                    <path
                      d="M0.301758 3.02278C0.301758 1.48682 1.5462 0.240234 3.07953 0.240234H5.85731V5.80533H3.07953C1.5462 5.80533 0.301758 4.55875 0.301758 3.02278Z"
                      fill="#F24E1E"
                    />
                    <path
                      d="M5.8584 0.240234H8.63618C10.1695 0.240234 11.414 1.48681 11.414 3.02278C11.414 4.55874 10.1695 5.80532 8.63618 5.80532H5.8584V0.240234Z"
                      fill="#FF7262"
                    />
                    <path
                      d="M11.414 8.58723C11.414 10.1232 10.1695 11.3698 8.63618 11.3698C7.10284 11.3698 5.8584 10.1232 5.8584 8.58723C5.8584 7.05127 7.10284 5.80469 8.63618 5.80469C10.1695 5.80469 11.414 7.05127 11.414 8.58723Z"
                      fill="#1ABCFE"
                    />
                  </svg>
                  <span className="sr-only">Figma</span>
                </a>
              </Tooltip>
              <Tooltip content="HTML">
                <a
                  href="#"
                  className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <svg
                    aria-hidden
                    viewBox="0 0 13 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.12301 0.771564H4.80021V2.31469H5.56748V0.771564H6.24801V0H4.12301V0.771564ZM2.31024 2.81701e-05H1.54297V2.31473H2.31691V1.54316H3.01746V2.31473H3.78473V2.81701e-05H3.01746V0.764886H2.31024V2.81701e-05ZM6.58398 2.81701e-05H7.38795L7.88167 0.815203L8.37539 2.81701e-05H9.17935V2.31472H8.41208V1.16744L7.875 1.99939L7.33791 1.16744V2.31472H6.58398V2.81701e-05ZM10.3278 2.81701e-05H9.56055V2.31472H11.4153V1.54987H10.3278V2.81701e-05Z"
                      fill="black"
                    />
                    <path
                      d="M1.51493 15.8006L0.414062 3.375H12.5169L11.416 15.7939L6.45547 17.176"
                      fill="#E44D26"
                    />
                    <path
                      d="M6.46484 16.119V4.39453H11.4121L10.468 14.9952"
                      fill="#F16529"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.46706 5.91406H2.66406L3.07772 10.5166H6.46706V8.99697H4.46548L4.32537 7.43707H6.46706V5.91406ZM4.66377 11.2822H3.14258L3.35608 13.6741L6.46518 14.5463V12.9562L4.77052 12.5L4.66377 11.2822Z"
                      fill="#EBEBEB"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.45898 5.91406H10.2553L10.1152 7.43707H6.45898V5.91406ZM6.45703 8.99756H9.97646L9.55946 13.6739L6.45703 14.5394V12.956L8.14836 12.4998L8.32516 10.5206H6.45703V8.99756Z"
                      fill="white"
                    />
                  </svg>
                  <span className="sr-only">HTML</span>
                </a>
              </Tooltip>
              <Tooltip content="Adobe XD">
                <a
                  href="#"
                  className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <svg
                    aria-hidden
                    viewBox="0 0 16 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                  >
                    <path
                      d="M13.2735 14.9046H3.03744C1.64855 14.9046 0.516602 13.7899 0.516602 12.4221V2.75202C0.516602 1.38426 1.64855 0.269531 3.03744 0.269531H13.2666C14.6624 0.269531 15.7874 1.38426 15.7874 2.75202V12.4153C15.7944 13.7899 14.6624 14.9046 13.2735 14.9046Z"
                      fill="#2E001F"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.41134 7.07379L8.35579 10.7531C8.39051 10.8078 8.36968 10.8625 8.31412 10.8625H7.10579C7.0294 10.8625 6.99468 10.842 6.95995 10.7736C6.8451 10.5403 6.72979 10.307 6.61389 10.0726L6.61373 10.0723C6.28119 9.39953 5.94383 8.71708 5.59884 7.99703H5.58495C5.16829 8.91343 4.70995 9.8777 4.26551 10.7804C4.23079 10.8351 4.19606 10.8557 4.14051 10.8557H2.99467C2.92523 10.8557 2.91829 10.8009 2.95301 10.7599L4.85579 7.19005L3.01551 3.57914C2.97384 3.52443 3.01551 3.4834 3.05717 3.4834H4.25162C4.32106 3.4834 4.34884 3.49708 4.37662 3.55863C4.81412 4.46135 5.25856 5.39143 5.67523 6.301H5.68912C6.0919 5.39827 6.53634 4.46135 6.9669 3.56547L6.96817 3.56347C7.00214 3.50992 7.02331 3.47656 7.0919 3.47656H8.20996C8.26551 3.47656 8.28635 3.5176 8.25162 3.57231L6.41134 7.07379ZM8.69629 8.18851C8.69629 6.59506 9.77268 5.3504 11.481 5.3504C11.6268 5.3504 11.7032 5.3504 11.8421 5.36408V3.55179C11.8421 3.51075 11.8768 3.4834 11.9116 3.4834H13.0088C13.0643 3.4834 13.0782 3.50391 13.0782 3.53811V9.81615C13.0782 10.0008 13.0782 10.2333 13.113 10.4864C13.113 10.5274 13.0991 10.5411 13.0574 10.5616C12.4741 10.8351 11.863 10.9582 11.2796 10.9582C9.77268 10.9651 8.69629 10.0487 8.69629 8.18851ZM11.4402 6.36914C11.6069 6.36914 11.7458 6.3965 11.843 6.43753V9.82275C11.711 9.87746 11.5305 9.89798 11.3638 9.89798C10.5791 9.89798 9.9541 9.3919 9.9541 8.13356C9.9541 7.03251 10.5652 6.36914 11.4402 6.36914Z"
                      fill="#FFD9F2"
                    />
                  </svg>
                  <span className="sr-only">Adobe XD</span>
                </a>
              </Tooltip>
            </dd>
            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
              Languages
            </dt>
            <dd className="text-gray-500 dark:text-gray-400">
              English, French, Spanish
            </dd>
          </dl>
        </div>
        <div className="flex items-center space-x-4 px-4">
          <Button size="lg" className="[&>span]:text-sm">
            <HiPencilAlt className="-ml-1 mr-1 h-5 w-5" />
            Edit
          </Button>
          <Button
            color="gray"
            size="lg"
            className="dark:bg-gray-800 [&>span]:text-sm"
          >
            Preview
          </Button>
          <Button color="failure" size="lg" className="[&>span]:text-sm">
            <HiTrash className="-ml-1 mr-1.5 h-5 w-5" />
            Delete
          </Button>
        </div>
      </div>
    </section>
  );
}
