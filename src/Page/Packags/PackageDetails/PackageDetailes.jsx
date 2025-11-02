import { useLoaderData, useParams } from "react-router-dom";
import PackageDetailesCart from "./PackageDetailesCart";

const PackageDetailes = () => {
  const packageItems = useLoaderData();
 
  const { _id } = useParams();

  const packags = packageItems?.find((item) => item._id === _id);

  return (
    <div className="w-full min-h-screen py-8 px-4 md:px-8 lg:px-16">
      <PackageDetailesCart packags={packags}></PackageDetailesCart>
    </div>
  );
};

export default PackageDetailes;
