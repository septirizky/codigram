import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../action/Actions";
import { Transition } from "@headlessui/react";

const Profile = () => {
  const { getProfileResult, getProfileLoading, getProfileError } = useSelector(
    (state) => state.list
  );
  const dispatch = useDispatch();

  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    // console.log("1. Use effect component did mount");
    dispatch(getProfile());
  }, [dispatch]);

  function Card({ id, username, email, showCard }) {
    return (
      <Transition
        show={true}
        appear={true}
        enter="transition-opacity duration-5900"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-5900"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{username}</div>
            <p
              className="text-gray-700 text-base overflow-hidden"
              style={{ overflowWrap: "break-word" }}
            >
              {email}
            </p>
          </div>
        </div>
      </Transition>
    );
  }

  return (
    <div className="container mx-auto p-4 flex flex-wrap">
      {getProfileResult ? (
        getProfileResult.map((Users) => {
          return (
            <Card
              key={Users.id}
              username={Users.username}
              email={Users.email}
              showCard={showCards}
            />
          );
        })
      ) : getProfileLoading ? (
        <p>Loading . . .</p>
      ) : (
        <p>{getProfileError ? getProfileError : "Data Kosong"}</p>
      )}
    </div>
  );
};

export default Profile;
