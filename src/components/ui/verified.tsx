import Verified from "../../assets/verified.svg";

export default function VerifiedBadge({ className }: { className: string }) {
  return (
    <div className="relative inline-block group">
      <img src={Verified} className={`${className} cursor-help`} />
      <span className="hidden group-hover:block absolute z-10 bg-blue-400 text-white text-xs px-2 py-1 rounded bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1">
        Verified
      </span>
    </div>
  );
}
