import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function ChatPage() {
  const [chats, setchats] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const { data } = await axios.get("/api/chats");
      console.log(data);
      setchats(data.chats);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (chats.length === 0) {
    return <p>Loading....</p>;
  }
  return (
    <div>
      {chats.map((chat) => (
        <h3 key={chat._id}>{chat.chatName}</h3>
      ))}
    </div>
  );
}
