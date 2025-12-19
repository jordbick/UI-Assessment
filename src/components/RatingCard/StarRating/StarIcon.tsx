import React from "react";

type Props = React.SVGProps<SVGSVGElement>;

export const StarIcon: React.FC<Props> = (props) => (
  <svg
    viewBox="0 0 28 28"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="m9.692 9.111-9.087.674a.66.66 0 0 0-.379 1.162l5.025 4.258c2.642-.777 4.48-3.27 4.44-6.096l.001.002"
    />
    <path
      fill="currentColor"
      d="m26.912 9.798-9.093-.674-3.45-8.442a.661.661 0 0 0-1.224 0l-1.613 3.951c.58 1.075.939 2.312 1.035 3.658.27 3.737-1.917 7.252-5.399 8.553l.018.014-2.166 8.859a.66.66 0 0 0 .99.719l7.748-4.8 7.75 4.8a.66.66 0 0 0 .99-.72l-2.166-8.858 6.959-5.895a.66.66 0 0 0-.38-1.163v-.002"
    />
  </svg>
);
