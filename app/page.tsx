"use client";

import { useState } from "react";

export default function Home() {
  const [nama, setNama] = useState("");
  const [shareLocation, setShareLocation] = useState("");
  const [estimasiLuas, setEstimasiLuas] = useState("");
  const [status, setStatus] = useState<{ message: string; type: "success" | "error" | "loading" } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz0D7NZ88YFdqs4HN4GtIr4Sa5gGDL0orutZuI4acGOMMR-ggL1XQoUBm1sklURx6T6/exec";

  const submitData = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (submitting) return;

    if (!nama.trim()) {
      setStatus({ message: "Mohon isi nama", type: "error" });
      return;
    }

    if (!shareLocation.trim()) {
      setStatus({ message: "Mohon masukkan share lokasi tanah", type: "error" });
      return;
    }

    if (!estimasiLuas.trim()) {
      setStatus({ message: "Mohon isi estimasi luas tanah", type: "error" });
      return;
    }

    setSubmitting(true);
    setStatus({ message: "⏳ Mengirim data...", type: "loading" });

    const iframe = document.createElement("iframe");
    iframe.name = "hidden_iframe_" + Date.now();
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    const form = document.createElement("form");
    form.method = "POST";
    form.action = SCRIPT_URL;
    form.target = iframe.name;
    form.style.display = "none";

    const inputNama = document.createElement("input");
    inputNama.type = "hidden";
    inputNama.name = "nama";
    inputNama.value = nama;
    form.appendChild(inputNama);

    const inputMaps = document.createElement("input");
    inputMaps.type = "hidden";
    inputMaps.name = "mapsUrl";
    inputMaps.value = shareLocation;
    form.appendChild(inputMaps);

    const inputLuas = document.createElement("input");
    inputLuas.type = "hidden";
    inputLuas.name = "estimasiLuas";
    inputLuas.value = estimasiLuas;
    form.appendChild(inputLuas);

    document.body.appendChild(form);

    const cleanup = () => {
      if (form.parentNode) form.remove();
      if (iframe.parentNode) iframe.remove();
    };

    try {
      form.submit();

      setTimeout(() => {
        cleanup();
        setStatus({ message: "✓ Data berhasil dikirim!", type: "success" });
        setNama("");
        setShareLocation("");
        setEstimasiLuas("");
        setSubmitting(false);
        
        setTimeout(() => setStatus(null), 3000);
      }, 1500);
    } catch {
      cleanup();
      setStatus({ message: "Gagal mengirim data. Coba lagi.", type: "error" });
      setSubmitting(false);
    }
  };

  return (
    <main>
      <div className="container">
        <h1>Pengisian Calon Redistribusi Tanah Desa Sidomulyo Tahun 2026</h1>

        <form onSubmit={submitData}>
          <div className="form-group">
            <label htmlFor="nama">Nama</label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Input nama"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="estimasiLuas">Estimasi Luas Tanah (m²)</label>
            <input
              type="number"
              id="estimasiLuas"
              name="estimasiLuas"
              value={estimasiLuas}
              onChange={(e) => setEstimasiLuas(e.target.value)}
              placeholder="Contoh: 500"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="shareLocation">Share Lokasi Tanah</label>
            <input
              type="text"
              id="shareLocation"
              name="mapsUrl"
              value={shareLocation}
              onChange={(e) => setShareLocation(e.target.value)}
              placeholder="Masukkan link share lokasi tanah"
              required
            />
          </div>

          <button 
            className="btn btn-submit" 
            type="submit"
            disabled={submitting}
          >
            {submitting ? "⏳ Mengirim..." : "Kirim Data"}
          </button>
        </form>

        {status && (
          <div className={`status show ${status.type}`}>
            {status.message}
          </div>
        )}
      </div>
    </main>
  );
}