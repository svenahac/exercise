import logo from "../assets/logo.png";
import SidebarItem from "./sidebarItem";

export default function Sidebar({ users, selectedUser, onUserClick }) {
  return (
    <aside className="w-64 h-screen bg-syyclopsBlue text-white p-4 flex flex-col items-center">
      <img src={logo} alt="Logo" />
      <ul className="flex flex-col items-center w-full -mt-10">
        {users.map((user) => (
          <SidebarItem
            key={user.id}
            user={user}
            isSelected={selectedUser?.id === user.id}
            onUserClick={onUserClick}
          />
        ))}
      </ul>
    </aside>
  );
}
