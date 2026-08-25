import React, {useState} from 'react'
import { FaDashcube } from "react-icons/fa"; 
import { BiSolidDashboard } from "react-icons/bi";
import { FaLessThan} from "react-icons/fa";

const ProfileSidebar = ({ collapsed, setCollapsed,currentTab, setCurrentTab }) => {
     const [activeNav, setActiveNav] = useState("dashboard"); 
  const menuItem = [ 
    {id: "Personal information",icon: BiSolidDashboard,label: "Personal information"},
    {id: "Change password",icon: BiSolidDashboard,label: "Change password",},
    {id: "Orders",icon: BiSolidDashboard,label: "orders",}
  ];

  return (
    <div className={`"bg-white ${collapsed ? "w-20" : " min-w-[300px]"} fixed sm:static top-[80px] left-0 h-screen flex flex-col px-4 max-w-max bg-white z-[1000] `} >
      <div className="border-b border-neutral-400 relative ">
        <div className={` rounded-lg my-10 min-h-[48px] flex justify-start items-center gap-2 ${!collapsed && "p-4 bg-slate-200"}`} >
          <div className="bg-gradient-to-tr from-neutral-600 to-neutral-700 text-white p-3 text-2xl rounded-lg shadow-xl"> <FaDashcube /> </div>
          {!collapsed && ( <div>
              <h1 className="text-xl font-bold text-neutral-900 ">Settings</h1>
              <p className="text-xs text-neutral-600">User Panel</p>
            </div>
          )}
        </div>

        <div className={`absolute bottom-0 cursor-pointer -right-8 bg-slate-300 p-4 text-xs rounded-full ${collapsed && "rotate-180"}`} onClick={() => setCollapsed(!collapsed)} > <FaLessThan /></div>
      </div>
      
      <div className="overflow-y-auto flex-1">
        <div className=" mt-4 overflow-auto space-y-0.5">
          {menuItem?.map((item, i) => {
            return (
                <div onClick={()=> setCurrentTab(item.id)} key={item.id} className={`flex justify-between items-center ${item.id === currentTab ? "bg-neutral-800 text-white " : "text-neutral-800/90 hover:bg-neutral-300  "} transition-all duration-300 p-3 rounded-lg cursor-pointer`} >
                  <div className={`flex items-center justify-start   gap-2`}>
                    <div className="text-xl "> <item.icon /> </div>
                    {!collapsed && <p className="text-base">{item.label}</p>}
                  </div>
                </div>
            );
          })}
        </div>
      </div>
    </div>
  )}

export default ProfileSidebar