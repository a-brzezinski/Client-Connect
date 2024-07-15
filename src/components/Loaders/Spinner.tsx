import { Loader } from "lucide-react";

const Spinner = () => {
  return (
    <div className="flex h-96 items-center justify-center">
      <Loader size={90} className="animate-spin text-violet-200" />
    </div>
  );
};
export default Spinner;
