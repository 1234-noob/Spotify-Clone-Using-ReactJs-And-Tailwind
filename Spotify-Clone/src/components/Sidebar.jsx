import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[25%] h-full flex-col p-5 gap-2 text-white hidden lg:flex lg:block ">
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        <div
          className=" flex justify-start  items-center gap-5 cursor-pointer pl-8 "
          onClick={() => navigate("/")}
        >
          <img className="w-8" src={assets.home_icon} alt="" />
          <p className="font-bold ">Home</p>
        </div>
        <div className=" flex justify-start  items-center gap-5 cursor-pointer pl-8">
          <img className="w-8" src={assets.search_icon} alt="" />
          <p className="font-bold ">Search</p>
        </div>
      </div>
      <div className="bg-[#121212] h-[85%] rounded">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={assets.stack_icon} alt="" className="w-8" />
            <p className="font-semibold">Your Library</p>
          </div>
          <div className="flex items-center gap-3">
            <img src={assets.arrow_icon} alt="" className="w-5" />
            <img src={assets.plus_icon} alt="" className="w-5" />
          </div>
        </div>
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
          <h1>Create your first playlist</h1>
          <p className="font-light">Its easy we will help you</p>
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
            Create Playlist
          </button>
        </div>
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
          <h1>Lets find some podcast to follow</h1>
          <p className="font-light">we'll keep you update on episodes</p>
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
            Browse Podcasts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
