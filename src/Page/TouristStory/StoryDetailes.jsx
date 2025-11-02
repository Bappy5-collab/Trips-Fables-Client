import StoryDetalesCart from "./StoryDetalesCart";
import { useLoaderData, useParams } from "react-router-dom";


const StoryDetailes = () => {
    const data = useLoaderData();
    const {_id}=useParams();
    const findData = data?.filter((item) => item._id === _id);
    console.log(findData)
    return (
        <div className="w-full py-12 px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            {findData?.map(data => <StoryDetalesCart key={data._id} data={data}></StoryDetalesCart>)}
          </div>
        </div>
    );
};

export default StoryDetailes;