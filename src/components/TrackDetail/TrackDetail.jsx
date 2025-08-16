// src/components/TrackDetail/TrackDetail.jsx
export default function TrackDetail({ track, onBack, onEdit, onDelete }) {
  if (!track) return null;
  return (
    <section style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16 }}>
      <button onClick={onBack}>&larr; Back</button>
      <h2 style={{ marginTop: 8 }}>{track.title}</h2>
      <p style={{ marginTop: -8, color: "#555" }}>{track.artist}</p>
      {track.coverArtUrl ? (
        <img src={track.coverArtUrl} alt={`${track.title} cover`} width="240" style={{ borderRadius: 8 }} />
      ) : null}
      {track.soundClipUrl ? (
        <audio controls src={track.soundClipUrl} style={{ display: "block", marginTop: 12, width: "100%" }} />
      ) : null}
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button onClick={() => onEdit(track)}>Edit</button>
        <button onClick={() => onDelete(track._id)}>Delete</button>
      </div>
    </section>
  );
}
