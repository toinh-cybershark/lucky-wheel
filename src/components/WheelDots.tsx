import { Fragment } from "react/jsx-runtime";
type Props = {
  prizeLength: number;
  wheelSegmentDegrees: number;
};
const WheelDots = (props: Props) => {
  const { prizeLength, wheelSegmentDegrees } = props;
  const DOT_DISTANCE_FROM_CENTER = "-2px";
  const DOT_OFFSET_FROM_EDGE_DEG = 0;
  return Array.from({ length: prizeLength }).map((_, index) => {
    const leftDotAngle = wheelSegmentDegrees * index + DOT_OFFSET_FROM_EDGE_DEG;
    return (
      <Fragment key={`dots-for-segment-${index}`}>
        <div
          className="absolute top-0 left-0 w-full h-full origin-center"
          style={{
            transform: `rotate(${leftDotAngle}deg)`,
          }}
        >
          <div
            style={{
              top: DOT_DISTANCE_FROM_CENTER,
              boxShadow:
                "inset 0px 4px 4px rgba(0, 0, 0, 0.08), inset 0px -4px 4px #00000014",
            }}
            className="absolute left-1/2 -translate-x-1/2 size-2 rounded-full bg-[radial-gradient(circle_at_50%_35%,#A0D0FE_0%,#72A7ED_100%)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.08),inset_0_-1px_2px_rgba(0,0,0,0.08)]"
          />
        </div>
      </Fragment>
    );
  });
};

export default WheelDots;
