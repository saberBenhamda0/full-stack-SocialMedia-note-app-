"use state"
import Image from "next/image";

  
  const SideBarIcons = (props) => {

    return(
    <div onClick={props.onClick} className="relative flex items-center justify-center w-12 h-12 mx-auto mt-2 mb-2 text-green-500 transition-all duration-300 ease-linear bg-gray-800 shadow-lg cursor-pointer hover:bg-blue-300 hover:text-white rounded-3xl hover:rounded-xl group">
      <Image src={props.icons} />
        <span className="absolute w-auto p-2 m-2 text-xs font-bold text-white transition-all duration-100 origin-left scale-0 bg-gray-900 rounded-md shadow-md min-w-max left-14 group-hover:scale-100" >{props.title}</span>
    </div>
    )
  }

  export default SideBarIcons;