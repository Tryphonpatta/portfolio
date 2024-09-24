import { Home, Briefcase, Mail, MapPin, Hexagon, Gamepad } from "lucide-react";
export default function TopNav() {
  const menuItem = [
    { name: "Home", url: "/", icon: Home },
    { name: "Experience", url: "/experience", icon: Briefcase },
    { name: "Hobby", url: "/hobby", icon: Gamepad },
    { name: "Contact", url: "/contact", icon: Mail },
    { name: "Location", url: "/location", icon: MapPin },
  ];
  return (
    <div className="flex items-center justify-between h-16 w-full ">
      <div className="flex justify-center items-center mx-4">
        <Hexagon />
      </div>
      <div className="flex justify-center gap-4 mx-10">
        {menuItem.map((item, index) => {
          return (
            <div key={index} className="flex border p-2 rounded-md">
              <a href={item.url} className="flex gap-2">
                <item.icon />
                <p>{item.name}</p>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
