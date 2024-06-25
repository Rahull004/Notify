import React, { useState, useEffect } from "react";
import { NoteCard } from "../components/NoteCard";
import { NewNoteCard } from "../components/NewNoteCard";
import {
  getCommunityNotes,
  getCurrentUser,
  getPersonalNotes,
  saveUser,
} from "../appwrite/api";
import { avatars } from "../appwrite/config";

export const AllNotes = () => {
  const [showNewNoteCard, setShowNewNoteCard] = useState(false);
  const [activeTab, setActiveTab] = useState("PERSONAL");
  const [user, setUser] = useState({});
  const [communityNotes, setCommunityNotes] = useState([]);
  const [personalNotes, setPersonalNotes] = useState([]);

  useEffect(() => {
    const getUserNotes = async () => {
      try {
        const data = await getCurrentUser();
        const account = data[1];
        const user = data[3];
        if (!account) {
          navigate("/login");
          return;
        }
        if (!user) {
          const accountId = account.$id;
          const avatar = avatars.getInitials(account.name);
          const newUser = await saveUser({
            accountid: accountId,
            email: account.email,
            url: avatar,
            fullname: account.name,
          });
          setUser(newUser);
        }
        setUser(user);
        const communityNotesData = await getCommunityNotes(user.$id);
        setCommunityNotes(communityNotesData.documents);
        const personalNotesData = await getPersonalNotes(user.$id);
        setPersonalNotes(personalNotesData.documents);
      } catch (error) {
        console.log(error);
      }
    };
    getUserNotes();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAddClick = () => {
    setShowNewNoteCard(true);
  };

  const handleClosePopup = () => {
    setShowNewNoteCard(false);
  };

  return (
    <div className="bg-gray200 w-screen h-screen font-rob">
      <div className="bg-white flex p-4 items-center shadow-lg">
        <div className="w-full flex items-center gap-4 px-8">
          <div className="relative mx-auto w-full">
            <input
              className="bg-gray200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue400 placeholder:pl-6"
              type="text"
              placeholder="Search"
            />
            <img
              src="../../public/vector.png"
              alt=""
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5"
            />
          </div>
          <button
            className="bg-blue400 px-4 rounded-3xl py-2 md:py-3  w-24 md:w-28 text-white"
            onClick={handleAddClick}
          >
            + Add
          </button>
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
              </div>
              {activeTab === "PERSONAL" ? (
                <div className="flex">
                  <div className="border-[1px] border-blue400 w-1/2"></div>
                  <div className="border-[1px] border-black/10 w-1/2"></div>
                </div>
              ) : (
                <div className="flex">
                  <div className="border-[1px] border-black/10 w-1/2"></div>
                  <div className="border-[1px] border-blue400 w-1/2"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-12 mt-10 grid grid-cols-2 max-sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {activeTab === "PERSONAL"
          ? personalNotes.map((note) => <NoteCard key={note.$id} note={note} />)
          : communityNotes.map((note) => (
              <NoteCard key={note.$id} note={note} />
            ))}
      </div>

      {showNewNoteCard && (
        <div className="fixed inset-0 bg-black bg-opacity-35 z-50 w-full h-full">
          <NewNoteCard />
        </div>
      )}
    </div>
  );
}


