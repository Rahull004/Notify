import React, { useState, useEffect, useMemo } from "react";
import { NoteCard } from "../components/NoteCard";
import { NewNoteCard } from "../components/NewNoteCard";
import {
  getCommunityNotes,
  getPersonalNotes,
  getDraftNotes,
} from "../appwrite/api";
import { useUserContext } from "../AuthContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";

export const AllNotes = () => {
  const [showNewNoteCard, setShowNewNoteCard] = useState(false);
  const [activeTab, setActiveTab] = useState("PERSONAL");
  const { user, isLoading } = useUserContext();
  const [input, setInput] = useState("");
  const navigated = useNavigate();

  const [communityNotes, setCommunityNotes] = useState([]);
  const [personalNotes, setPersonalNotes] = useState([]);
  const [draftNotes, setDraftNotes] = useState([]);

  const memoizedUser = useMemo(() => user, [user]);

  
  const getUserNotes = async () => {
    try {

      const communityNotesData = await getCommunityNotes(memoizedUser?.$id);
      const filteredCommunityNotes = communityNotesData.documents.filter(
        (note) =>
          note.title.includes(searchQuery) ||
          note.description.includes(searchQuery),
      );
      setCommunityNotes(filteredCommunityNotes);

      // Fetch and filter personal notes
      const personalNotesData = await getPersonalNotes(memoizedUser?.$id);
      const filteredPersonalNotes = personalNotesData.documents.filter(
        (note) =>
          note.title.includes(searchQuery) ||
          note.description.includes(searchQuery),
      );
      setPersonalNotes(filteredPersonalNotes);

      const draftNotesData = await getDraftNotes(memoizedUser?.$id);
      setDraftNotes(draftNotesData.documents);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    if (memoizedUser.id === "" && !isLoading) {
      navigated("/signin");
      return;
    }

    if (memoizedUser?.$id) {
      getUserNotes();
    }
  }, [memoizedUser, isLoading,navigated]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAddClick = () => {
    setShowNewNoteCard(true);
  };

  const handleClosePopup = () => {
    setShowNewNoteCard(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <RingLoader color="#0362e9" loading size={120} speedMultiplier={1} />.
      </div>
    );
  }

  if (user.email === "" && !isLoading) {
    navigated("/signin");
  }
  

  const handleChange = (value) => {
    setInput(value);
    getUserNotes(value);
  };

  return (
    <div className="bg-gray200 w-screen h-screen font-rob">
      <div className="bg-white flex p-4 items-center shadow-lg">
        <div className="w-full flex items-center gap-4 px-8">
          <div className="relative mx-auto w-full">
            <input
              className="bg-gray200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue400 "
              type="text"
              placeholder="Search"
              style={{ paddingLeft: "2.3rem" }}
              onChange={(e) => handleChange(e.target.value)}
            />
            <img
              src="../../public/vector.png"
              alt=""
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5"
            />
          </div>
          <button
            className="bg-blue-500 px-4 rounded-3xl py-2 md:py-3 w-24 md:w-28 text-white"
            onClick={handleAddClick}
          >
            + Add
          </button>
          <Link className="w-20 h-10 m-2" to={"/profile"}>
            {user.avatar === "" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                data-name="Layer 1"
                viewBox="0 0 512 512"
                id="profile"
              >
                <g data-name="<Group>">
                  <path
                    fill="#ed664c"
                    d="M389.25 403.71v24.83a218.018 218.018 0 0 1-266.5 0V403.71a133.25 133.25 0 0 1 266.5 0zM304.09 124.82a67.514 67.514 0 1 1-47.64-19.67A67.064 67.064 0 0 1 304.09 124.82z"
                  ></path>
                  <path
                    fill="#fdc75b"
                    d="M256,38c120.4,0,218,97.6,218,218a217.579,217.579,0,0,1-84.75,172.54V403.71a133.25,133.25,0,0,0-266.5,0v24.83A217.579,217.579,0,0,1,38,256C38,135.6,135.6,38,256,38Zm67.76,134.46a67.158,67.158,0,1,0-19.67,47.63A67.064,67.064,0,0,0,323.76,172.46Z"
                  ></path>
                  <path d="M256,28A228.09,228.09,0,0,0,52.1,358.141a230.034,230.034,0,0,0,64.528,78.309,228.02,228.02,0,0,0,278.735,0A230.007,230.007,0,0,0,459.9,358.141,228.045,228.045,0,0,0,256,28ZM132.75,423.557V403.71a123.25,123.25,0,0,1,246.5,0v19.847a208.024,208.024,0,0,1-246.5,0Zm266.5-16.749v-3.1c0-78.988-64.262-143.25-143.25-143.25A143.257,143.257,0,0,0,112.75,403.71v3.1A206.439,206.439,0,0,1,48,256C48,141.309,141.309,48,256,48s208,93.309,208,208A206.444,206.444,0,0,1,399.25,406.808Z"></path>
                  <path d="M256.45,95.15a77.158,77.158,0,1,0,54.713,22.6A76.787,76.787,0,0,0,256.45,95.15Zm40.566,117.872a57.513,57.513,0,1,1,16.745-40.562A56.931,56.931,0,0,1,297.016,213.022Z"></path>
                </g>
              </svg>
            ) : (
              <img
                src={user.url}
                alt="user"
                className="w-10 h-10 rounded-full"
              />
            )}
          </Link>
        </div>
      </div>

      <div>
        <div className="flex justify-between mt-6 px-12 flex-col items-start gap-8">
          <h1 className="text-2xl font-semibold text-gray900">Your notes</h1>
          <div className="flex">
            <div>
              <div>
                <button
                  className={`mr-4 ${activeTab === "PERSONAL" ? "text-blue500" : "text-gray900-60"}`}
                  onClick={() => handleTabClick("PERSONAL")}
                >
                  PERSONAL
                </button>
                <button
                  className={`mx-4 ${activeTab === "COMMUNITY" ? "text-blue500" : "text-gray900-60"}`}
                  onClick={() => handleTabClick("COMMUNITY")}
                >
                  COMMUNITY
                </button>
                <button
                  className={`mx-4 ${activeTab === "DRAFT" ? "text-blue500" : "text-gray900-60"}`}
                  onClick={() => handleTabClick("DRAFT")}
                >
                  DRAFT
                </button>
              </div>
              <div className="flex">
                <div
                  className={`border-[1px] ${activeTab === "PERSONAL" ? "border-blue400" : "border-black/10"} w-1/3`}
                ></div>
                <div
                  className={`border-[1px] ${activeTab === "COMMUNITY" ? "border-blue400" : "border-black/10"} w-1/3`}
                ></div>
                <div
                  className={`border-[1px] ${activeTab === "DRAFT" ? "border-blue400" : "border-black/10"} w-1/3`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-12 mt-10 grid grid-cols-2 max-sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {activeTab === "PERSONAL" &&
          personalNotes.map((note) => (
            <NoteCard key={note.$id} note={note} user={user} />
          ))}
        {activeTab === "COMMUNITY" &&
          communityNotes.map((note) => <NoteCard key={note.$id} note={note} />)}
        {activeTab === "DRAFT" &&
          draftNotes.map((note) => <NoteCard key={note.$id} note={note} />)}
      </div>

      {showNewNoteCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 w-full h-full">
          <NewNoteCard
            onClose={handleClosePopup}
            showNewNoteCard={showNewNoteCard}
            user={user}
            type={"NEW"}
          />
        </div>
      )}
    </div>
  );
};
