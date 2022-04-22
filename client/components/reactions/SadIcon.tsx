import { FC, MouseEventHandler } from "react";
interface IconProps {
  size: string;
  onClick?: MouseEventHandler<SVGSVGElement>;
}

const SadIcon: FC<IconProps> = ({size, onClick}) => {
    return (
      <svg
      name="Sad"
      onClick={onClick}
        cursor="pointer"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        viewBox="0 0 16 16"
      >
        <path
          fill="url(#sad0_linear)"
          d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8"
        />
        <path
          fill="url(#sad1_linear)"
          d="M5.33301 12.765C5.33301 12.902 5.42701 13 5.58301 13C5.93401 13 6.41901 12.375 8.00001 12.375C9.58101 12.375 10.067 13 10.417 13C10.573 13 10.667 12.902 10.667 12.765C10.667 12.368 9.82801 11 8.00001 11C6.17201 11 5.33301 12.368 5.33301 12.765Z"
        />
        <path
          fill="url(#sad2_linear)"
          d="M3.59872 8.79998C3.59872 7.98998 4.10772 7.33398 4.73272 7.33398C5.35972 7.33398 5.86672 7.98998 5.86672 8.79998C5.86672 9.13798 5.77772 9.44998 5.62872 9.69798C5.56211 9.80986 5.45387 9.89077 5.32772 9.92298C5.18772 9.95998 4.97472 9.99998 4.73272 9.99998C4.48972 9.99998 4.27972 9.95998 4.13772 9.92298C4.01184 9.89073 3.90393 9.8098 3.83772 9.69798C3.67817 9.42583 3.59556 9.11544 3.59872 8.79998V8.79998ZM10.1327 8.79998C10.1327 7.98998 10.6407 7.33398 11.2657 7.33398C11.8927 7.33398 12.3997 7.98998 12.3997 8.79998C12.3997 9.13798 12.3107 9.44998 12.1617 9.69798C12.1288 9.75345 12.0853 9.80188 12.0336 9.84049C11.982 9.8791 11.9232 9.90713 11.8607 9.92298C11.4708 10.024 11.0616 10.024 10.6717 9.92298C10.6092 9.90713 10.5504 9.8791 10.4988 9.84049C10.4471 9.80188 10.4036 9.75345 10.3707 9.69798C10.2115 9.42575 10.1292 9.11536 10.1327 8.79998V8.79998Z"
        />
        <path
          fill="#000"
          d="M3.59872 8.79998C3.59872 7.98998 4.10772 7.33398 4.73272 7.33398C5.35972 7.33398 5.86672 7.98998 5.86672 8.79998C5.86672 9.13798 5.77772 9.44998 5.62872 9.69798C5.56211 9.80986 5.45387 9.89077 5.32772 9.92298C5.18772 9.95998 4.97472 9.99998 4.73272 9.99998C4.48972 9.99998 4.27972 9.95998 4.13772 9.92298C4.01184 9.89073 3.90393 9.8098 3.83772 9.69798C3.67817 9.42583 3.59556 9.11544 3.59872 8.79998V8.79998ZM10.1327 8.79998C10.1327 7.98998 10.6407 7.33398 11.2657 7.33398C11.8927 7.33398 12.3997 7.98998 12.3997 8.79998C12.3997 9.13798 12.3107 9.44998 12.1617 9.69798C12.1288 9.75345 12.0853 9.80188 12.0336 9.84049C11.982 9.8791 11.9232 9.90713 11.8607 9.92298C11.4708 10.024 11.0616 10.024 10.6717 9.92298C10.6092 9.90713 10.5504 9.8791 10.4988 9.84049C10.4471 9.80188 10.4036 9.75345 10.3707 9.69798C10.2115 9.42575 10.1292 9.11536 10.1327 8.79998V8.79998Z"
          filter="url(#filter0_i)"
        />
        <path
          fill="#4E506A"
          d="M4.61595 7.98556C4.74395 8.11056 4.75195 8.35756 4.63295 8.53656C4.51295 8.71456 4.31295 8.75856 4.18495 8.63256C4.05695 8.50756 4.04995 8.26056 4.16795 8.08256C4.28795 7.90356 4.48795 7.86056 4.61595 7.98556V7.98556ZM11.105 7.98556C11.233 8.11056 11.241 8.35756 11.123 8.53656C11.003 8.71456 10.803 8.75856 10.673 8.63256C10.546 8.50756 10.539 8.26056 10.658 8.08256C10.777 7.90356 10.977 7.86056 11.105 7.98556V7.98556Z"
        />
        <path
          fill="url(#sad3_linear)"
          d="M4.1572 5.15259C4.4892 4.99959 4.7532 4.93359 4.9582 4.93359C5.2352 4.93359 5.4092 5.05259 5.5082 5.23959C5.6832 5.56859 5.6042 5.64059 5.3102 5.69859C4.2042 5.92259 3.0932 6.64059 2.6112 7.08859C2.3102 7.36859 2.0222 7.05859 2.1752 6.81459C2.3292 6.57059 2.9492 5.70959 4.1572 5.15259V5.15259ZM10.4922 5.23959C10.5912 5.05259 10.7652 4.93359 11.0422 4.93359C11.2482 4.93359 11.5112 4.99959 11.8432 5.15259C13.0512 5.70959 13.6712 6.57059 13.8242 6.81459C13.9772 7.05859 13.6902 7.36859 13.3892 7.08859C12.9062 6.64059 11.7962 5.92259 10.6892 5.69859C10.3952 5.64059 10.3182 5.56859 10.4922 5.23959V5.23959Z"
        />
        <path
          fill="url(#sad4_linear)"
          d="M13.5 16C12.672 16 12 15.252 12 14.329C12 13.407 12.356 12.784 12.643 12.182C13.241 10.924 13.359 10.75 13.5 10.75C13.641 10.75 13.759 10.924 14.357 12.182C14.644 12.784 15 13.407 15 14.329C15 15.252 14.328 16 13.5 16Z"
        />
        <path
          fill="url(#sad5_linear)"
          d="M13.5002 13.6063C13.1722 13.6063 12.9062 13.3103 12.9062 12.9463C12.9062 12.5803 13.0473 12.3333 13.1613 12.0943C13.3973 11.5963 13.4442 11.5283 13.5002 11.5283C13.5562 11.5283 13.6032 11.5963 13.8392 12.0943C13.9532 12.3343 14.0942 12.5803 14.0942 12.9453C14.0942 13.3103 13.8282 13.6063 13.5002 13.6063"
        />
        <defs>
          <linearGradient
            id="sad0_linear"
            x1="8"
            x2="8"
            y1="1.64"
            y2="16"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#FEEA70" />
            <stop offset="1" stop-color="#F69B30" />
          </linearGradient>
          <linearGradient
            id="sad1_linear"
            x1="8"
            x2="8"
            y1="11"
            y2="13"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#472315" />
            <stop offset="1" stop-color="#8B3A0E" />
          </linearGradient>
          <linearGradient
            id="sad2_linear"
            x1="7.999"
            x2="7.999"
            y1="7.334"
            y2="10"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#191A33" />
            <stop offset=".872" stop-color="#3B426A" />
          </linearGradient>
          <linearGradient
            id="sad3_linear"
            x1="8"
            x2="8"
            y1="4.934"
            y2="7.199"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#E78E0D" />
            <stop offset="1" stop-color="#CB6000" />
          </linearGradient>
          <linearGradient
            id="sad4_linear"
            x1="13.5"
            x2="13.5"
            y1="15.05"
            y2="11.692"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#35CAFC" />
            <stop offset="1" stop-color="#007EDB" />
          </linearGradient>
          <linearGradient
            id="sad5_linear"
            x1="13.5"
            x2="13.5"
            y1="11.528"
            y2="13.606"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#6AE1FF" stop-opacity=".287" />
            <stop offset="1" stop-color="#A8E3FF" stop-opacity=".799" />
          </linearGradient>
          <filter
            id="filter0_i"
            width="8.801"
            height="2.666"
            x="3.599"
            y="7.334"
            color-interpolation-filters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset />
            <feGaussianBlur stdDeviation=".5" />
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
            <feColorMatrix values="0 0 0 0 0.0411227 0 0 0 0 0.0430885 0 0 0 0 0.0922353 0 0 0 0.819684 0" />
            <feBlend in2="shape" result="effect1_innerShadow" />
          </filter>
        </defs>
      </svg>
    );
}

export default SadIcon;