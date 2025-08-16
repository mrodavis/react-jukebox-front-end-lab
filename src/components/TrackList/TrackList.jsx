export default function TrackList({ tracks, onSelect, onDelete, onPlay }) {
  if (!tracks.length) return <p>No tracks yet. Add one!</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
      {tracks.map(t => (
        <li key={t._id} style={{ border: "1px solid #333", borderRadius: 8, padding: 12, background: "#222" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {t.coverArtUrl
              ? <img src={t.coverArtUrl} alt={`${t.title} cover`} width="64" height="64" style={{ borderRadius: 6, objectFit: "cover" }} />
              : <div style={{ width:64, height:64, borderRadius:6, background:"#444" }}/>}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{t.title}</div>
              <div style={{ color: "#aaa" }}>{t.artist}</div>
            </div>
            <button onClick={() => onPlay?.(t)} disabled={!t.soundClipUrl}>Play</button>
            <button onClick={() => onSelect(t)}>Edit</button>
            <button onClick={() => onDelete(t._id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
