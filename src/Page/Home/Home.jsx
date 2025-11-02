import Banner from "../Banner/Banner";
import TourType from "../TourType/TourType";
import Tourism from "../Tourism and Travel Guide/Tourism";
import TouristStory from "../TouristStory/TouristStory";

const Home = () => {
    return (
        <div className="w-full">
            <Banner></Banner>
            <div className="w-full px-4 md:px-8 lg:px-16">
                <Tourism></Tourism>
                <TourType></TourType>
                <TouristStory></TouristStory>
            </div>
        </div>
    );
};

export default Home;