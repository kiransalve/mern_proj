import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo, fetchCurrentUser } from "../../../store/userSlice";
import { useState, useEffect } from "react";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // States for edit mode and input values
  const [isEditPhone, setIsEditPhone] = useState(false);
  const [isEditDob, setIsEditDob] = useState(false);
  const [editPhone, setEditPhone] = useState(user?.phone || "");
  const [editDob, setEditDob] = useState(user?.dob || "");

  // Update state values when the user object changes
  useEffect(() => {
    if (user) {
      setEditPhone(user.phone);
      setEditDob(user.dob);
    }
  }, [user]);

  // Function to handle updating user information
  const handleUpdateUserInfo = () => {
    dispatch(
      updateUserInfo({
        id: user?._id,
        data: {
          phone: editPhone,
          dob: editDob,
        },
      })
    );
    dispatch(fetchCurrentUser()); // Refetch user data after updating
    setIsEditPhone(false); // Exit edit mode
    setIsEditDob(false); // Exit edit mode
  };

  return (
    <div className="">
      <div className="lg:p-4 p-2 shadow-xl">
        <div className="heading mb-2">{user.role} Profile</div>
        <div className="flex flex-col gap-5">
          {/* Display name */}
          <div className="">
            <div className="">Name:</div>
            <span className="opacity-90">{`${user.firstName} ${user.lastName}`}</span>
          </div>
          <div className="">
            {/* Display email */}
            <div className="">Email:</div>
            <span className="opacity-90">{user.email}</span>
          </div>

          {/* Phone editing */}
          <div className="">
            Phone :
            {!isEditPhone ? (
              <div
                className=""
                onClick={() => {
                  setIsEditPhone(true);
                  setIsEditDob(false); // Close DOB editing
                }}
              >
                {editPhone}
              </div>
            ) : (
              <div className="">
                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="bg-[#8570ed] text-white placeholder:text-white border-none outline-none"
                />
              </div>
            )}
          </div>

          {/* DOB editing */}
          <div className="">
            <label htmlFor="">Birth Date:</label>
            {!isEditDob ? (
              <div
                className=""
                onClick={() => {
                  setIsEditDob(true);
                  setIsEditPhone(false); // Close phone editing
                }}
              >
                {new Date(editDob).toLocaleDateString()}
              </div>
            ) : (
              <input
                type="date"
                value={editDob}
                onChange={(e) => setEditDob(e.target.value)}
                className="ml-2 pl-2 bg-[#8570ed] text-white placeholder:text-white border-none outline-none"
              />
            )}
          </div>
        </div>
        {/* Update button */}
        <div className="mt-4">
          <button className="btn border" onClick={handleUpdateUserInfo}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
