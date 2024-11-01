export default function SidebarItem({ user, isSelected, onUserClick }) {
  return (
    <li className="mb-2">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault(); 
          onUserClick(user); 
        }}
        className={`cursor-pointer hover:text-orange ${
          isSelected ? "text-orange font-semibold" : "text-white"
        }`}
      >
        {user.firstName} {user.lastName}
      </a>
    </li>
  );
}
