import { UserContext } from '../../context/UserContext';
import { useContext, useState, useRef } from 'react';
import profilepic from '/noprofilepic.png';
import axios from 'axios';

const EditProfileModal = () => {
  // const [imgType, setImgType] = useState(false)
  const [isURL, setIsURL] = useState(false);
  const { userData, userId } = useContext(UserContext);
  const [userUpdate, setUserUpdate] = useState({
    // email: userData.email,
    // username: userData.username,
    profile_pic: userData.profile_pic || null,
  });
  // get user context for all their info
  // any changes they make here will be saved over the default in the account
  // handle submit with patch route

  const handeInputChange = (e) => {
    let { name, value } = e.target;

    if (name === 'profile_pic' && value === '') {
      value = null;
    }

    setUserUpdate((prevUserUpdate) => ({
      ...prevUserUpdate,
      [name]: value,
    }));
  };

  const handleImgTypeToggle = () => {
    setIsURL(!isURL);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('form data', userUpdate);

    // axios({
    //   method: 'patch',
    //   url: `/users/:${userId}`,
    //   data: { userUpdate },
    // }).then(
    //   (res) => {
    //     console.log(res);
    //   },
    //   (err) => {
    //     console.log(err);
    //   },
    // );
  };

  return (
    <dialog id="profileModal" className="modal">
      <div className="modal-box w-11/12 max-w-3xl">
        <div id="title-ctn" className="w-full flex flex-col gap-5">
          <div className="mx-auto">
            <img
              src={userData.profile_pic || profilepic}
              alt="user profile picture"
              className="w-20 rounded-full"
            />
          </div>

          <div className="mx-auto">
            <h3 className="font-bold text-3xl w-full my-auto">
              <span className="g-orange">{userData.username}</span>
            </h3>
          </div>
        </div>

        <div className="form-control">
          <label className="label justify-center gap-10">
            <span className="label-text cursor-pointer">Image URL</span>
            <input
              onChange={handleImgTypeToggle}
              type="checkbox"
              className="toggle"
              checked={isURL}
            />
            <span className="label-text cursor-pointer">Upload Image</span>
          </label>
        </div>

        <div className="mt-5 w-full">
          {isURL ? (
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
            />
          ) : (
            <>
              <form className="flex flex-row flex-wrap w-full gap-5">
                {/* <label className="form-control w-full">
              <span className="label-text">Username</span>
              <input
                name="username"
                type="text"
                value={userData.username}
                onChange={handeInputChange}
                className="input input-bordered w-full"
              />
            </label> */}

                <label className="form-control w-full">
                  <span className="label-text">Profile Image</span>
                  <input
                    name="profile_pic"
                    type="text"
                    placeholder={
                      userData.profile_pic ? userData.profile_pic : 'none'
                    }
                    onChange={handeInputChange}
                    value={userData.profile_pic}
                    className="input input-bordered w-full"
                  />
                </label>
              </form>
            </>
          )}

          <div className="w-full ">
            <input
              type="submit"
              className="btn btn-primary"
              onClick={(e) => handleSubmit(e)}
            />
          </div>

          <div className="w-full mt-10">
            <button
              className="btn"
              onClick={() => document.getElementById('profileModal').close()}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};
export default EditProfileModal;
