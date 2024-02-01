import { UserContext } from '../../context/UserContext';
import { useContext, useState, useEffect } from 'react';
import nopic from '/noprofilepic.png';
import axios from 'axios';
import toast from 'react-hot-toast';

const EditProfileModal = () => {
  const [isImgFile, setIsImgFile] = useState(false);
  const { userData, setUserData, getUser, userId } = useContext(UserContext);
  const [urlPic, setUrlPic] = useState(userData.profile_pic || null);
  const [imgPic, setImgPic] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  console.log('modal userContext:', userData);

  const handleImgUrlChange = (e) => {
    const { files, value } = e.target;

    if (files && files.length > 0) {
      const objectUrl = URL.createObjectURL(files[0]);
      setImagePreview(objectUrl);
    } else {
      setImagePreview(null);
    }

    setUrlPic(value);
  };

  const handleImgFileChange = (e) => {
    const { files } = e.target;

    if (files && files.length > 0) {
      const objectUrl = URL.createObjectURL(files[0]);
      setImagePreview(objectUrl);
    } else {
      setImagePreview(null);
    }

    setImgPic(files[0]);
  };

  //clear img inputs if toggled
  const handleImgTypeToggle = () => {
    setImgPic(null);
    setUrlPic(null);
    setImagePreview(null);
    setIsImgFile(!isImgFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Add data based on whether it's an image file or URL
    if (isImgFile) {
      if (imgPic) {
        formData.append('uploaded_pic', imgPic);
      } else {
        console.error('Image file is empty');
        toast.error('Image file is empty');
        return;
      }
    } else {
      // Add validation for URL
      if (urlPic && urlPic.trim() !== '') {
        formData.append('profile_pic', urlPic.trim());
      } else {
        console.error('URL is empty');
        toast.error('URL is empty');
        return;
      }
    }

    if (isImgFile) {
      // imgfile route
      try {
        const response = await axios({
          method: 'patch',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          url: `/users/${userId}`,
          data: formData,
        });

        if (response.status === 200) {
          console.log('img update success:');
          await getUser();
          toast.success('profile pic updated');
        }
      } catch (err) {
        console.error(err);
        toast.error(err);
      }
    }
    //url route
    else {
      try {
        const response = await axios({
          method: 'patch',
          url: `/users/${userId}`,
          data: { profile_pic: urlPic },
        });

        if (response.status === 200) {
          console.log('img update success:');
          await getUser();
          toast.success('profile pic updated');
        }
      } catch (err) {
        console.error(err);
        toast.error(err);
      }
    }

    document.getElementById('profileModal').close();
  };

  return (
    <dialog id="profileModal" className="modal">
      <div className="modal-box w-11/12 max-w-3xl">
        <div id="title-ctn" className="w-full flex flex-col gap-5">
          <div className="mx-auto">
            <img
              src={userData.profile_pic || nopic}
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
              checked={isImgFile}
            />
            <span className="label-text cursor-pointer">Upload Image</span>
          </label>
        </div>

        <div className="mt-5 w-full">
          {isImgFile ? (
            <input
              type="file"
              name="uploaded_pic"
              className="file-input file-input-bordered w-full max-w-xs"
              onChange={(e) => handleImgFileChange(e)}
            />
          ) : (
            <>
              <form className="flex flex-row flex-wrap w-full gap-5">
                <label className="form-control w-full">
                  <span className="label-text">Profile Image</span>
                  <input
                    name="profile_pic"
                    type="text"
                    placeholder="profile pic url here"
                    onChange={(e) => handleImgUrlChange(e)}
                    value={urlPic}
                    className="input input-bordered w-full"
                  />
                </label>
              </form>
            </>
          )}

          <label className="label justify-center gap-10">
            <div className="mx-auto">
              <span className="label-text cursor-pointer">New Pic Below</span>
              {isImgFile ? (
                <img
                  src={imagePreview || nopic}
                  alt="user profile picture"
                  className="w-20 h-20 rounded-full"
                />
              ) : (
                <img
                  src={urlPic || nopic}
                  alt="user profile picture"
                  className="w-20 h-20 rounded-full"
                />
              )}
            </div>
          </label>

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
