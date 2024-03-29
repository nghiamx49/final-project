import { FC, MouseEventHandler } from "react";
interface IconProps {
  size: string;
  onClick?: MouseEventHandler<SVGSVGElement>;
}

export const AngryIcon: FC<IconProps> = ({size, onClick}) => {
    return (
      <svg
        name="Angry"
        onClick={onClick}
        cursor="pointer"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        viewBox="0 0 16 16"
      >
        <path
          fill="url(#paint0_linear)"
          d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8"
        />
        <path
          fill="#000"
          d="M5.2002 13.551C5.2002 14.079 6.4532 13.995 8.0002 13.995C9.5462 13.995 10.8002 14.079 10.8002 13.551C10.8002 12.915 9.5462 12.5 8.0002 12.5C6.4532 12.5 5.2002 12.915 5.2002 13.551Z"
          filter="url(#filter0_d)"
        />
        <path
          fill="url(#paint1_linear)"
          d="M5.2002 13.551C5.2002 14.079 6.4532 13.995 8.0002 13.995C9.5462 13.995 10.8002 14.079 10.8002 13.551C10.8002 12.915 9.5462 12.5 8.0002 12.5C6.4532 12.5 5.2002 12.915 5.2002 13.551Z"
        />
        <path
          fill="url(#paint2_linear)"
          d="M3.59968 9.83139C3.59968 9.04039 4.13769 8.40039 4.79969 8.40039C5.46269 8.40039 5.99969 9.04039 5.99969 9.83139C5.99969 10.1604 5.90669 10.4644 5.74769 10.7054C5.67339 10.8164 5.55973 10.895 5.42968 10.9254C5.27968 10.9614 5.05669 11.0004 4.79969 11.0004C4.54269 11.0004 4.31869 10.9614 4.16969 10.9254C4.03951 10.8953 3.92576 10.8166 3.85168 10.7054C3.68426 10.4449 3.59667 10.1411 3.59968 9.83139V9.83139ZM9.99968 9.83139C9.99968 9.04039 10.5367 8.40039 11.1997 8.40039C11.8617 8.40039 12.3997 9.04039 12.3997 9.83139C12.3997 10.1604 12.3057 10.4644 12.1477 10.7054C12.0736 10.8166 11.9599 10.8953 11.8297 10.9254C11.6233 10.9748 11.4119 10.9999 11.1997 11.0004C10.9427 11.0004 10.7197 10.9614 10.5697 10.9254C10.4394 10.895 10.3254 10.8164 10.2507 10.7054C10.084 10.4446 9.99683 10.1409 9.99968 9.83139Z"
        />
        <path
          fill="#000"
          d="M3.59968 9.83139C3.59968 9.04039 4.13769 8.40039 4.79969 8.40039C5.46269 8.40039 5.99969 9.04039 5.99969 9.83139C5.99969 10.1604 5.90669 10.4644 5.74769 10.7054C5.67339 10.8164 5.55973 10.895 5.42968 10.9254C5.27968 10.9614 5.05669 11.0004 4.79969 11.0004C4.54269 11.0004 4.31869 10.9614 4.16969 10.9254C4.03951 10.8953 3.92576 10.8166 3.85168 10.7054C3.68426 10.4449 3.59667 10.1411 3.59968 9.83139V9.83139ZM9.99968 9.83139C9.99968 9.04039 10.5367 8.40039 11.1997 8.40039C11.8617 8.40039 12.3997 9.04039 12.3997 9.83139C12.3997 10.1604 12.3057 10.4644 12.1477 10.7054C12.0736 10.8166 11.9599 10.8953 11.8297 10.9254C11.6233 10.9748 11.4119 10.9999 11.1997 11.0004C10.9427 11.0004 10.7197 10.9614 10.5697 10.9254C10.4394 10.895 10.3254 10.8164 10.2507 10.7054C10.084 10.4446 9.99683 10.1409 9.99968 9.83139Z"
          filter="url(#filter1_i)"
        />
        <path
          fill="#4F4F67"
          d="M4.96848 9.33262C4.97338 9.35596 4.97572 9.37977 4.97548 9.40362C4.97548 9.60462 4.79948 9.76962 4.58148 9.76962C4.36448 9.76962 4.18848 9.60462 4.18848 9.40362C4.18848 9.32062 4.21848 9.24362 4.26848 9.18262C4.49248 9.23562 4.72748 9.28662 4.96848 9.33262ZM10.8945 9.76962C10.6835 9.76962 10.5115 9.61662 10.5015 9.42162C10.7605 9.38362 11.0175 9.33662 11.2675 9.28562C11.2813 9.32374 11.2881 9.36406 11.2875 9.40462C11.2875 9.60462 11.1125 9.76962 10.8945 9.76962V9.76962Z"
        />
        <path
          fill="#000"
          d="M8.99959 7.6C8.99959 7.154 9.16259 7 9.44459 7C9.72459 7 9.85859 7.276 9.95059 8.066C11.0786 8.066 12.9886 7.532 13.1726 7.532C13.3506 7.532 13.4496 7.617 13.4896 7.799C13.5246 7.957 13.4666 8.107 13.2686 8.199C12.6476 8.486 10.8256 9.134 9.28459 9.134C9.11659 9.134 8.99959 9.048 8.99959 8.833V7.6ZM6.04859 8.066C6.14059 7.276 6.27459 7 6.55459 7C6.83659 7 6.99959 7.154 6.99959 7.6V8.833C6.99959 9.048 6.88259 9.134 6.71459 9.134C5.17359 9.134 3.35159 8.486 2.73059 8.199C2.53259 8.107 2.47459 7.957 2.50959 7.799C2.55059 7.617 2.64959 7.532 2.82659 7.532C3.01059 7.532 4.92059 8.066 6.04859 8.066Z"
          filter="url(#filter2_d)"
        />
        <path
          fill="url(#paint3_linear)"
          d="M8.99959 7.6C8.99959 7.154 9.16259 7 9.44459 7C9.72459 7 9.85859 7.276 9.95059 8.066C11.0786 8.066 12.9886 7.532 13.1726 7.532C13.3506 7.532 13.4496 7.617 13.4896 7.799C13.5246 7.957 13.4666 8.107 13.2686 8.199C12.6476 8.486 10.8256 9.134 9.28459 9.134C9.11659 9.134 8.99959 9.048 8.99959 8.833V7.6ZM6.04859 8.066C6.14059 7.276 6.27459 7 6.55459 7C6.83659 7 6.99959 7.154 6.99959 7.6V8.833C6.99959 9.048 6.88259 9.134 6.71459 9.134C5.17359 9.134 3.35159 8.486 2.73059 8.199C2.53259 8.107 2.47459 7.957 2.50959 7.799C2.55059 7.617 2.64959 7.532 2.82659 7.532C3.01059 7.532 4.92059 8.066 6.04859 8.066Z"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="8"
            x2="8"
            y2="10.751"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E04300" />
            <stop offset="1" stopColor="#FFA320" />
          </linearGradient>
          <linearGradient
            id="paint1_linear"
            x1="8"
            x2="8"
            y1="12.703"
            y2="14"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3D0D00" />
            <stop offset="1" stopColor="#661C04" />
          </linearGradient>
          <linearGradient
            id="paint2_linear"
            x1="8"
            x2="8"
            y1="8.4"
            y2="11"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#191A33" />
            <stop offset=".872" stopColor="#3B426A" />
          </linearGradient>
          <linearGradient
            id="paint3_linear"
            x1="11.615"
            x2="11.615"
            y1="9.333"
            y2="7"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#9A2F00" />
            <stop offset="1" stopColor="#D44800" />
          </linearGradient>
          <filter
            id="filter0_d"
            width="7.6"
            height="3.5"
            x="4.2"
            y="12.5"
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation=".5" />
            <feColorMatrix values="0 0 0 0 1 0 0 0 0 0.509681 0 0 0 0 0 0 0 0 0.371207 0" />
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
          </filter>
          <filter
            id="filter1_i"
            width="8.8"
            height="2.6"
            x="3.6"
            y="8.4"
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
            <feColorMatrix values="0 0 0 0 0.0387428 0 0 0 0 0.0406183 0 0 0 0 0.0875053 0 0 0 1 0" />
            <feBlend in2="shape" result="effect1_innerShadow" />
          </filter>
          <filter
            id="filter2_d"
            width="11.199"
            height="2.834"
            x="2.4"
            y="7"
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy=".6" />
            <feGaussianBlur stdDeviation=".05" />
            <feColorMatrix values="0 0 0 0 0.565875 0 0 0 0 0.151272 0 0 0 0 0 0 0 0 0.15024 0" />
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    );
}

export default AngryIcon;