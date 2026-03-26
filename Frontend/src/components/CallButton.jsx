import { VideoIcon } from "lucide-react";

const CallButton = ({ handleVideoCall }) => {
  return (
    <button
      onClick={handleVideoCall}
      className="btn btn-success btn-sm h-9 px-4 text-white rounded-full shadow-md hover:shadow-lg transition-all gap-2"
    >
      <VideoIcon className="size-4" />
      <span className="text-xs font-bold uppercase tracking-wider">Call</span>
    </button>
  );
};

export default CallButton;
