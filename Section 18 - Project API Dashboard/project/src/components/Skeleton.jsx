function Skeleton({ short = false }) {
  return <div className={`skeleton${short ? " skeleton--short" : ""}`} />;
}

export default Skeleton;
