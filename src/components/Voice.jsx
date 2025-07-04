import React, { useState } from "react";
import {
  createLocalAudioTrack,
  Room,
  RoomEvent,
} from "livekit-client";

/* helper ─────────────────────────────────────────── */
function generateLiveKitInfo(userId) {
  const sessionId = crypto.randomUUID().slice(0, 8);
  return {
    sessionId,
    roomName : `room_${userId}_${sessionId}`,
    identity : `user_${userId}_${sessionId}`,
  };
}

/* component ──────────────────────────────────────── */
const VoiceChat = () => {
  const [room, setRoom]           = useState(null);
  const [connected, setConnected] = useState(false);

  const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";
  const userId   = "user123";      // ⬅️ replace with your auth user-id

  /* -------------------- start chat ---------------- */
  const startVoiceChat = async () => {
    const info = generateLiveKitInfo(userId);

    /* 1️⃣  LiveKit token */
    const tokenRes = await fetch(`${API_BASE}/api/get-livekit-token`, {
      method : "POST",
      headers: { "Content-Type": "application/json" },
      body   : JSON.stringify({ room: info.roomName, identity: info.identity }),
    });
    if (!tokenRes.ok) return console.error("❌ token fetch failed");
    const { token } = await tokenRes.json();

    /* 2️⃣  connect */
    const lkRoom = new Room();
    await lkRoom.connect("wss://ds-nl2qsdc2.livekit.cloud", token, {
      autoSubscribe: true,
    });

    /* 3️⃣  publish mic so the participant exists */
    const micTrack = await createLocalAudioTrack();
    await lkRoom.localParticipant.publishTrack(micTrack);

    /* give LiveKit Cloud a moment to index the participant */
    await new Promise((r) => setTimeout(r, 10000));   // 1 second

    /* 4️⃣  now launch backend agent */
    const backendRes = await fetch(`${API_BASE}/ai/start_voice_agent`, {
      method : "POST",
      headers: { "Content-Type": "application/json" },
      body   : JSON.stringify({
        user_id   : userId,
        session_id: info.sessionId,
        room      : info.roomName,
        identity  : info.identity,
      }),
    });
    if (!backendRes.ok) return console.error("❌ voice-agent start failed");

    /* 5️⃣  play incoming bot audio */
    lkRoom.on(RoomEvent.TrackSubscribed, (track) => {
      if (track.kind === "audio") {
        const el = new Audio();
        track.attach(el);
        el.play().catch((e) => console.error("audio play", e));
      }
    });

    lkRoom.on(RoomEvent.Disconnected, () => setConnected(false));

    setRoom(lkRoom);
    setConnected(true);
  };

  /* -------------------- leave chat --------------- */
  const leaveRoom = () => {
    room?.disconnect();
    setConnected(false);
  };

  /* -------------------- ui ------------------------ */
  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md max-w-md mx-auto text-center">
      <h2 className="text-xl font-bold mb-4">Voice Chat</h2>

      {connected ? (
        <>
          <p>✅ Connected</p>
          <button
            onClick={leaveRoom}
            className="bg-red-500 px-4 py-2 rounded mt-2"
          >
            Leave Chat
          </button>
        </>
      ) : (
        <button
          onClick={startVoiceChat}
          className="bg-green-500 px-4 py-2 rounded mt-2"
        >
          Start Chat
        </button>
      )}
    </div>
  );
};

export default VoiceChat;
