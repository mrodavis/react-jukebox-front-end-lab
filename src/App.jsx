// src/App.jsx
import { useEffect, useState } from "react";
import { TrackAPI } from "./services/trackService";
import TrackList from "./components/TrackList/TrackList.jsx";
import TrackDetail from "./components/TrackDetail/TrackDetail.jsx";
import TrackForm from "./components/TrackForm/TrackForm.jsx";
import NowPlaying from "./components/NowPlaying/NowPlaying.jsx";
import "./App.css";

export default function App() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null); // track for detail view
  const [editing, setEditing] = useState(null);   // track for edit form
  const [nowPlaying, setNowPlaying] = useState(null);

  async function load() {
    try {
      setLoading(true); setError("");
      const data = await TrackAPI.list();
      setTracks(Array.isArray(data) ? data : data.items || []);
    } catch (e) { setError(e.message || "Failed to load"); }
    finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  async function createTrack(payload) {
    try {
      const created = await TrackAPI.create(payload);
      setTracks((prev) => [created, ...prev]);
    } catch (e) { alert(e.message); }
  }

  async function updateTrack(payload) {
    try {
      const updated = await TrackAPI.update(editing._id, payload);
      setTracks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      setEditing(null);
      setSelected(updated);
    } catch (e) { alert(e.message); }
  }

  async function deleteTrack(id) {
    if (!confirm("Delete this track?")) return;
    try {
      await TrackAPI.delete(id);
      setTracks((prev) => prev.filter((t) => t._id !== id));
      if (selected?._id === id) setSelected(null);
      if (editing?._id === id) setEditing(null);
    } catch (e) { alert(e.message); }
  }

  function handlePlay(t) { setNowPlaying(t); }

  return (
    <main style={{ padding: 24, display: "grid", gap: 24, maxWidth: 1000, margin: "0 auto" }}>
      <h1>Reactville Jukebox</h1>

      {editing
        ? <TrackForm initial={editing} onSubmit={updateTrack} onCancel={() => setEditing(null)} />
        : <TrackForm onSubmit={createTrack} />
      }

      {loading ? <p>Loading…</p> :
        error ? <p style={{ color: "crimson" }}>{error}</p> :
        selected
          ? <TrackDetail
              track={selected}
              onBack={() => setSelected(null)}
              onEdit={(t) => setEditing(t)}
              onDelete={deleteTrack}
            />
          : <TrackList 
              tracks={tracks} 
              onSelect={setSelected} 
              onDelete={deleteTrack} 
              // onDetails={setDetail} 
              onPlay={handlePlay} />
      }

      <NowPlaying track={nowPlaying} onClear={() => setNowPlaying(null)} />
    </main>
  );
}
