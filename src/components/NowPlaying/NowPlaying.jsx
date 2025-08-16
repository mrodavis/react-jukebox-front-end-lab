export default function NowPlaying({ track, onClear }) {
  if (!track) return null;

  return (
    <section style={{ marginTop: 16, padding: 16, border: "1px solid #333", borderRadius: 8, background: "#1b1b1b" }}>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        {track.coverArtUrl
          ? <img src={track.coverArtUrl} alt={`${track.title} cover`} width="96" height="96" style={{ borderRadius: 8, objectFit: "cover" }} />
          : <div style={{ width:96, height:96, borderRadius:8, background:"#444" }}/>}
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0 }}>Now Playing</h3>
          <div><strong>Title:</strong> {track.title}</div>
          <div><strong>Artist:</strong> {track.artist}</div>
          {track.soundClipUrl ? (
            <audio key={track.soundClipUrl} controls autoPlay src={track.soundClipUrl} style={{ width: "100%", marginTop: 8 }}>
              Your browser does not support the audio element.
            </audio>
          ) : (
            <p style={{ color: "#aaa", marginTop: 8 }}>No preview available for this track.</p>
          )}
        </div>
        <button onClick={onClear}>×</button>
      </div>
    </section>
  );
}
