import
{useState} from "react";
import ImageGallery from "./components/ImageGallery";

interface SideViews
{
    front: string;
    right: string;
    back: string;
    left: string;
}

interface ApiResponse
{
    status: string;
    product_name: string;
    analysis: any;
    model_3d: {
        url: string;
        type: string;
        format: string;
    };
    side_views: SideViews;
    generation_time_seconds: number;
}

function App()
{
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [image, setImage] = useState < File | null > (null);
    const [productName, setProductName] = useState("");
    const [response, setResponse] = useState < ApiResponse | null > (null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState < string | null > (null);


    const sendToAI = async () => {
        if (!image || !productName)
        {
            setError("Please provide both product name and image");
            return;
        }

        setLoading(true);
        setError(null);
        setResponse(null);

        try
        {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("product_name", productName);

            const res = await fetch(`${API_BASE_URL}/ai/image`,
            {
                method: "POST",
                body: formData
            });

            const data = await res.json();

            if (data.status === "error")
            {
                setError(data.message || "Failed to process image");
            }
            else
            {
                setResponse(data);
            }
        } catch (err)
        {
            setError("Network error: " + (
                err as Error
            ).message);
        } finally
        {
            setLoading(false);
        }
    };

    return (
        <div style={
            {
                padding: 40,
                maxWidth: "1200px",
                margin: "0 auto"
            }
        }>
            <h1 style={
                {
                    fontSize: "2.5em",
                    marginBottom: "10px",
                    background: "linear-gradient(135deg, #646cff 0%, #535bf2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                }
            }>
                {/* AI 360° Product Viewer */} </h1>
            <p style={
                {
                    color: "#888",
                    marginBottom: "30px"
                }
            }>
                Upload a product image and let AI generate a 360° rotatable view
            </p>

            {/* Upload Form */}
            <div style={
                {
                    background: "#1a1a1a",
                    padding: "30px",
                    borderRadius: "12px",
                    marginBottom: "30px"
                }
            }>
                <div style={
                    {marginBottom: "20px"}
                }>
                    <label style={
                        {
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: "500"
                        }
                    }>
                        Product Name
                    </label>
                    <input placeholder="e.g., Nike Air Max Shoe"
                        value={productName}
                        onChange={
                            (e) => setProductName(e.target.value)
                        }
                        style={
                            {
                                width: "100%",
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #333",
                                background: "#242424",
                                color: "white",
                                fontSize: "16px"
                            }
                        }/>
                </div>

                <div style={
                    {marginBottom: "20px"}
                }>
                    <label style={
                        {
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: "500"
                        }
                    }>
                        Product Image
                    </label>
                    <input type="file" accept="image/*"
                        onChange={
                            (e) => setImage(e.target.files ?. [0] || null)
                        }
                        style={
                            {
                                width: "100%",
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #333",
                                background: "#242424",
                                color: "white",
                                cursor: "pointer"
                            }
                        }/>
                </div>

                <button onClick={sendToAI}
                    disabled={loading}
                    style={
                        {
                            width: "100%",
                            padding: "14px",
                            background: loading ? "#555" : "linear-gradient(135deg, #646cff 0%, #535bf2 100%)",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "16px",
                            fontWeight: "600",
                            cursor: loading ? "not-allowed" : "pointer",
                            transition: "transform 0.2s"
                        }
                    }
                    onMouseEnter={
                        (e) => !loading && (e.currentTarget.style.transform = "scale(1.02)")
                    }
                    onMouseLeave={
                        (e) => (e.currentTarget.style.transform = "scale(1)")
                }>
                    {
                    loading ? "🔄 Generating 3D View..." : "✨ Generate 360° View"
                } </button>
            </div>

            {/* Error Message */}
            {
            error && (
                <div style={
                    {
                        background: "#ff4444",
                        color: "white",
                        padding: "15px",
                        borderRadius: "8px",
                        marginBottom: "20px"
                    }
                }>
                    ⚠️ {error} </div>
            )
        }

            {/* Loading State */}
            {
            loading && (
                <div style={
                    {
                        textAlign: "center",
                        padding: "40px",
                        background: "#1a1a1a",
                        borderRadius: "12px"
                    }
                }>
                    <div style={
                        {
                            width: "60px",
                            height: "60px",
                            border: "4px solid #333",
                            borderTop: "4px solid #646cff",
                            borderRadius: "50%",
                            margin: "0 auto 20px",
                            animation: "spin 1s linear infinite"
                        }
                    }/>
                    <p style={
                        {color: "#888"}
                    }>
                        AI is analyzing your product and generating views...
                    </p>
                    <p style={
                        {
                            color: "#666",
                            fontSize: "14px",
                            marginTop: "10px"
                        }
                    }>
                        This may take 30-60 seconds
                    </p>
                </div>
            )
        }

            {/* Results */}
            {
            response && response.side_views && (
                <div> {/* Content */}
                    <div style={
                        {
                            background: "#1a1a1a",
                            borderRadius: "12px",
                            padding: "20px",
                            minHeight: "500px"
                        }
                    }>
                        <ImageGallery images={
                                response.side_views
                            }
                            productName={
                                response.product_name
                            }/>
                    </div>

                    {/* Stats */}
                    <div style={
                        {
                            marginTop: "20px",
                            padding: "15px",
                            background: "#1a1a1a",
                            borderRadius: "8px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }
                    }>
                        <span style={
                            {color: "#888"}
                        }>
                            ⏱️ Generated in {
                            response.generation_time_seconds
                        }s
                        </span>
                        <span style={
                            {color: "#888"}
                        }>
                            📦 Product: {
                            response.product_name
                        } </span>
                    </div>
                </div>
            )
        }

            {/* CSS Animation */}
            <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}

export default App;
