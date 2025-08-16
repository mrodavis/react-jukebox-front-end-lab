import { useEffect, useState } from "react";

export default function TrackForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: "", artist: "", coverArtUrl: "", soundClipUrl: ""
  });

  useEffect(() => {
    if (initial) setForm({ coverArtUrl: "", soundClipUrl: "", ...initial });
  }, [initial]);

  const change = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = e => {
    e.preventDefault();
    onSubmit({
      title: form.title.trim(),
      artist: form.artist.trim(),
      coverArtUrl: form.coverArtUrl.trim() || undefined,
      soundClipUrl: form.soundClipUrl.trim() || undefined
    });
  };

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 8, maxWidth: 540 }}>
      <h2>{initial?._id ? "Edit Track" : "Add Track"}</h2>
      <input name="title" placeholder="Title" value={form.title} onChange={change} required />
      <input name="artist" placeholder="Artist" value={form.artist} onChange={change} required />
      <input name="coverArtUrl" placeholder="Cover Art URL (optional)" value={form.coverArtUrl} onChange={change} />
      <input name="soundClipUrl" placeholder="Sound Clip URL (optional)" value={form.soundClipUrl} onChange={change} />
      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit">{initial?._id ? "Update" : "Create"}</button>
        {initial?._id && <button onClick={(e)=>{e.preventDefault(); onCancel?.();}}>Cancel</button>}
      </div>
    </form>
  );
}
