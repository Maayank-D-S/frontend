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
  const userId   = "user123"; // replace with real user ID

  /* -------------------- start chat ---------------- */
  const startVoiceChat = async () => {
    const info = generateLiveKitInfo(userId);
    console.log("🔧 Generated LiveKit info:", info);

    // 1️⃣ Get LiveKit Token
    console.log("🔐 Fetching LiveKit token...");
    const tokenRes = await fetch(`${API_BASE}/api/get-livekit-token`, {
      method : "POST",
      headers: { "Content-Type": "application/json" },
      body   : JSON.stringify({ room: info.roomName, identity: info.identity }),
    });
    if (!tokenRes.ok) return console.error("❌ Token fetch failed");
    const { token } = await tokenRes.json();
    console.log("✅ Token received",token);

    // 2️⃣ Connect to room
    console.log("🔗 Connecting to LiveKit room...");
    const lkRoom = new Room();
    await lkRoom.connect("wss://ds-nl2qsdc2.livekit.cloud", token, {
      autoSubscribe: true,
    });
    console.log("✅ Connected to room");

    // 3️⃣ Publish mic
    console.log("🎙️ Publishing mic track...");
    const micTrack = await createLocalAudioTrack();
    await lkRoom.localParticipant.publishTrack(micTrack);
    console.log("✅ Mic track published");

    // 4️⃣ Delay to ensure participant registration
    console.log("⏳ Waiting for LiveKit to index participant...");
    await new Promise((r) => setTimeout(r, 10000)); // 10 seconds

    // 5️⃣ Start backend voice agent
    console.log("🚀 Launching backend voice agent...");
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
    if (!backendRes.ok) return console.error("❌ Voice-agent start failed");
    console.log("✅ Backend voice agent launched");

    // 6️⃣ Subscribe to bot audio
    lkRoom.on(RoomEvent.TrackSubscribed, (track, pub, participant) => {
      if (track.kind === "audio") {
        console.log(`🔊 Subscribed to audio from: ${participant.identity}`);
        const el = new Audio();
        track.attach(el);
        el.play().catch((e) => console.error("⚠️ Audio play error:", e));
      }
    });

    lkRoom.on(RoomEvent.ParticipantConnected, (participant) => {
      console.log(`👤 Participant joined: ${participant.identity}`);
    });

    lkRoom.on(RoomEvent.ParticipantDisconnected, (participant) => {
      console.log(`👋 Participant left: ${participant.identity}`);
    });

    lkRoom.on(RoomEvent.Disconnected, () => {
      console.log("❌ Room disconnected");
      setConnected(false);
    });

    setRoom(lkRoom);
    setConnected(true);
  };

  /* -------------------- leave chat --------------- */
  const leaveRoom = () => {
    console.log("🚪 Leaving room...");
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
