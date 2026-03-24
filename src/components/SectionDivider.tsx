interface Props {
  flip?: boolean;
  className?: string;
}

const SectionDivider = ({ flip, className = "" }: Props) => (
  <div className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""} ${className}`}>
    <svg
      viewBox="0 0 1200 80"
      preserveAspectRatio="none"
      className="w-full h-6 md:h-10 block"
    >
      <path
        d="M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 L1200,80 L0,80 Z"
        className="fill-background"
      />
    </svg>
  </div>
);

export default SectionDivider;
