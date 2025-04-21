import ToastComponent from "@/components/resueable-components/ToastComponent";
import Link from "next/link";
import LoadingButtons from "../resueable-components/LoadingButtons";
import MultipleInputs from "../resueable-components/MultipleInputs";

const MainComponent = () => {
  return (
    <div className="container mx-auto p-5">
      {/* icon input */}
      <div className="mb-4">
        <MultipleInputs />
      </div>
      {/* toast */}
      <div className="mb-4">
        <ToastComponent />
      </div>

      {/* internet connection */}
      <div className="flex flex-col gap-4 mb-4">
        <b>
          This is a demo component that simulates an offline state. It&apos;s
          designed to wrap around your layout and display a specific UI when
          there&apos;s no internet connection.
        </b>
        <Link href="/no-internet">
          <p className="bg-gray-400 p-4 text-center rounded-lg cursor-pointer hover:bg-gray-500 transition">
            Click here to view the &quot;No Internet Connection&quot; page
          </p>
        </Link>
      </div>

      {/* Loading button */}
      <LoadingButtons />
    </div>
  );
};

export default MainComponent;
