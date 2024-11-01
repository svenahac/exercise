export default function UserCard({ user }) {
  return (
    <div className="bg-blue text-white shadow-lg rounded-lg p-8 w-[40rem]">
      <div className="flex items-center">
        <img
          src={`https://dummyimage.com/100x100/DC5A27/fff&text=${user.firstName[0].toUpperCase()}`}
          alt={user.firstName}
          className="rounded-full w-24 h-24" 
        />
        <div className="ml-6">
          <h2 className="text-2xl text-orange font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-lg">{user.email}</p>
          <p className="text-lg">{user.phone}</p>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-lg">Age: {user.age}</p>
        <p className="text-lg">Gender: {user.gender}</p>
      </div>
    </div>
  );
}
