import { useState } from "react";

function App() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [image, setImage] = useState<File | null>(null);
  const [productName, setProductName] = useState("");
  const [views, setViews] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const sendToAI = async () => {
    if (!image || !productName) return;

    setLoading(true);
    setViews([]);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("product_name", productName);

    const res = await fetch(`${API_BASE_URL}/ai/image`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setViews([
      data.views.front,
      data.views.right,
      data.views.back,
      data.views.left,
    ]);

    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>AI 360° Product Viewer</h2>

      <input
        placeholder="Product name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />

      <br /><br />

      <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />

      <br /><br />

      <button onClick={sendToAI}>
        {loading ? "Generating..." : "Generate 360 View"}
      </button>

      <br /><br />

      {views.length > 0 && (
        <img
          src={views[index]}
          width={300}
          draggable={false}
          onMouseMove={(e) => {
            if (e.buttons === 1) {
              setIndex((prev) =>
                (prev + (e.movementX > 0 ? 1 : -1) + views.length) % views.length
              );
            }
          }}
        />
      )}

      {views.length > 0 && <p>Drag image to rotate</p>}
    </div>
  );
}

export default App;
