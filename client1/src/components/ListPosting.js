import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { getPosting } from "../action/Actions";

const ListPosting = () => {
  const { getListPostingResult, getListPostingLoading, getListPostingError } =
    useSelector((state) => state.list);
  const dispatch = useDispatch();

  const [showCards, setShowCards] = useState(false);
  // console.log(getListPostingResult);

  useEffect(() => {
    // console.log("1. Use effect component did mount");
    dispatch(getPosting());
  }, [dispatch]);

  function Card({ id, image, caption, showCard }) {
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
            <div className="font-bold text-xl mb-2">{image}</div>
            <p
              className="text-gray-700 text-base overflow-hidden"
              style={{ overflowWrap: "break-word" }}
            >
              {caption}
            </p>
          </div>
          {/* <div className="px-6 py-4 flex justify-end">
            <button
              className="bg-blue-500 text-white font-bold text-xs px-2 py-1 rounded mr-2 hover:bg-blue-700"
              onClick={() => updatepost(id, image, caption)}
            >
              Update
            </button>
          </div> */}
        </div>
      </Transition>
    );
  }

  return (
    <div className="container mx-auto p-4 flex flex-wrap">
      {getListPostingResult ? (
        getListPostingResult.map((posting) => {
          return (
            <Card
              key={posting.id}
              image={posting.image}
              caption={posting.caption}
              showCard={showCards}
            />
          );
        })
      ) : getListPostingLoading ? (
        <p>Loading . . .</p>
      ) : (
        <p>{getListPostingError ? getListPostingError : "Data Kosong"}</p>
      )}
    </div>
  );
};

export default ListPosting;
