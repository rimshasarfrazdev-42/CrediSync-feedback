
import { notificationsData } from "../../constants/dashboardData/notifications";
import {NotificationItem } from "./NotificationItem";
import { useNavigate } from "react-router-dom";
export const NotificationsCard = () => {
  const navigate =useNavigate();
  const handleClick =() =>{
    navigate ('/notification');
  }
  return (
    <div className="flex flex-col w-full  p-6 mt-6  bg-white border shadow-sm rounded-xl hover:shadow-md border-tertiary/10">
      <h2 className="text-xl font-semibold text-black">Recent Notifications</h2>
      <p className="mb-3 text-sm text-tertiary">Important updates and alerts</p>
      <div className="flex-grow space-y-2">
        {notificationsData.map((item) => (
          <NotificationItem key={item.id} {...item} />
        ))}
      </div>
      <button 
      onClick={handleClick}
      className="w-full py-2 mt-2 font-medium text-white transition duration-200 rounded-md shadow-md bg-primary hover:bg-">
        View All Notifications
      </button>
    </div>
  );
};
