import
{useState} from "react";
import
{motion, AnimatePresence} from "framer-motion";
import
{
    Upload,
    Rotate3d,
    Package,
    Clock,
    Loader2,
    Sparkles,
    Image as ImageIcon
} from "lucide-react";
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

    const containerVariants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: {
            y: 20,
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <motion.div initial="hidden" animate="visible"
            variants={containerVariants}
            style={
                {
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "40px 20px",
                    fontFamily: "'Inter', sans-serif"
                }
        }>
            <header style={
                {
                    marginBottom: "60px",
                    textAlign: "center"
                }
            }>


                <motion.p variants={itemVariants}
                    style={
                        {
                            color: "var(--text-muted)",
                            fontSize: "1.2em",
                            maxWidth: "600px",
                            margin: "0 auto"
                        }
                }>
                    Transform standard product photos into immersive 3D experiences instantly.
                </motion.p>
            </header>

            <div style={
                {
                    display: "grid",
                    gap: "40px",
                    gridTemplateColumns: response ? "1fr 1fr" : "1fr max-content 1fr"
                }
            }>

                {/* Input Section - If no response, center it. If response, move to side? Actually let's keep it simple for now and stack or split. 
            Let's keep it centered if no response, or persistent at top. 
            Let's go with a persistent card layout.
        */}

                <motion.div variants={itemVariants}
                    style={
                        {
                            gridColumn: response ? "1" : "2",
                            background: "var(--bg-panel)",
                            border: "1px solid var(--glass-border)",
                            padding: "40px",
                            borderRadius: "24px",
                            boxShadow: "var(--shadow-sm)",
                            height: "fit-content",
                            position: "relative",
                            overflow: "hidden"
                        }
                }>
                    <div style={
                        {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "4px",
                            background: "var(--gradient-primary)"
                        }
                    }/>

                    <div style={
                        {marginBottom: "24px"}
                    }>
                        <label style={
                            {
                                display: "block",
                                marginBottom: "8px",
                                fontWeight: "600",
                                color: "var(--text-main)"
                            }
                        }>
                            Product Name
                        </label>
                        <div style={
                            {position: "relative"}
                        }>
                            <Package size={20}
                                style={
                                    {
                                        position: "absolute",
                                        left: "14px",
                                        top: "14px",
                                        color: "var(--text-muted)"
                                    }
                                }/>
                            <input placeholder="e.g. Neon Cyberpunk Headphones"
                                value={productName}
                                onChange={
                                    (e) => setProductName(e.target.value)
                                }
                                style={
                                    {
                                        width: "100%",
                                        padding: "14px 14px 14px 44px",
                                        borderRadius: "12px",
                                        border: "1px solid var(--glass-border)",
                                        background: "var(--bg-input)",
                                        color: "white",
                                        fontSize: "16px",
                                        outline: "none",
                                        transition: "all 0.2s"
                                    }
                                }
                                onFocus={
                                    (e) => e.target.style.borderColor = "var(--primary)"
                                }
                                onBlur={
                                    (e) => e.target.style.borderColor = "var(--glass-border)"
                                }/>
                        </div>
                    </div>

                    <div style={
                        {marginBottom: "32px"}
                    }>
                        <label style={
                            {
                                display: "block",
                                marginBottom: "8px",
                                fontWeight: "600",
                                color: "var(--text-main)"
                            }
                        }>
                            Product Image
                        </label>
                        <div style={
                                {
                                    border: "2px dashed var(--glass-border)",
                                    borderRadius: "16px",
                                    padding: "32px",
                                    textAlign: "center",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    background: image ? "rgba(99, 102, 241, 0.1)" : "transparent",
                                    borderColor: image ? "var(--primary)" : "var(--glass-border)"
                                }
                            }
                            onClick={
                                () => document.getElementById("file-upload") ?. click()
                        }>
                            <input id="file-upload" type="file" accept="image/*" hidden
                                onChange={
                                    (e) => setImage(e.target.files ?. [0] || null)
                                }/> {
                            image ? (
                                <div style={
                                    {
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        gap: "10px"
                                    }
                                }>
                                    <ImageIcon size={40}
                                        color="var(--primary)"/>
                                    <span style={
                                        {
                                            color: "var(--primary)",
                                            fontWeight: "500"
                                        }
                                    }>
                                        {
                                        image.name
                                    }</span>
                                </div>
                            ) : (
                                <div style={
                                    {
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        gap: "10px"
                                    }
                                }>
                                    <Upload size={40}
                                        color="var(--text-muted)"/>
                                    <span style={
                                        {color: "var(--text-muted)"}
                                    }>Click to upload image</span>
                                </div>
                            )
                        } </div>
                    </div>

                    <motion.button whileHover={
                            {
                                scale: 1.02,
                                boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)"
                            }
                        }
                        whileTap={
                            {scale: 0.98}
                        }
                        onClick={sendToAI}
                        disabled={loading}
                        style={
                            {
                                width: "100%",
                                padding: "16px",
                                background: "var(--gradient-primary)",
                                color: "white",
                                border: "none",
                                borderRadius: "14px",
                                fontSize: "16px",
                                fontWeight: "600",
                                cursor: loading ? "not-allowed" : "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "10px",
                                opacity: loading ? 0.7 : 1
                            }
                    }>
                        {
                        loading ? (
                            <>
                                <Loader2 className="animate-spin"
                                    size={20}/>
                                Generating Assets...
                            </>
                        ) : (
                            <>
                                <Sparkles size={20}/>
                                Generate
                            </>
                        )
                    } </motion.button>

                    <AnimatePresence> {
                        error && (
                            <motion.div initial={
                                    {
                                        height: 0,
                                        opacity: 0
                                    }
                                }
                                animate={
                                    {
                                        height: "auto",
                                        opacity: 1
                                    }
                                }
                                exit={
                                    {
                                        height: 0,
                                        opacity: 0
                                    }
                                }
                                style={
                                    {
                                        background: "rgba(239, 68, 68, 0.1)",
                                        border: "1px solid var(--error)",
                                        color: "var(--error)",
                                        padding: "12px",
                                        borderRadius: "12px",
                                        marginTop: "20px",
                                        fontSize: "14px",
                                        textAlign: "center"
                                    }
                            }>
                                {error} </motion.div>
                        )
                    } </AnimatePresence>
                </motion.div>

                {/* Loading & Results Section */}
                <AnimatePresence mode="wait">
                    {
                    loading && (
                        <motion.div key="loader"
                            initial={
                                {
                                    opacity: 0,
                                    scale: 0.9
                                }
                            }
                            animate={
                                {
                                    opacity: 1,
                                    scale: 1
                                }
                            }
                            exit={
                                {
                                    opacity: 0,
                                    scale: 0.9
                                }
                            }
                            style={
                                {
                                    gridColumn: response ? "2" : "1 / -1",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: "var(--bg-panel)",
                                    borderRadius: "24px",
                                    padding: "40px",
                                    border: "1px solid var(--glass-border)",
                                    minHeight: "400px"
                                }
                        }>
                            <div style={
                                {
                                    position: "relative",
                                    width: "100px",
                                    height: "100px",
                                    marginBottom: "30px"
                                }
                            }>
                                <motion.div animate={
                                        {rotate: 360}
                                    }
                                    transition={
                                        {
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }
                                    }
                                    style={
                                        {
                                            width: "100%",
                                            height: "100%",
                                            border: "3px solid transparent",
                                            borderTopColor: "var(--primary)",
                                            borderRadius: "50%",
                                            position: "absolute"
                                        }
                                    }/>
                                <motion.div animate={
                                        {rotate: -360}
                                    }
                                    transition={
                                        {
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }
                                    }
                                    style={
                                        {
                                            width: "70%",
                                            height: "70%",
                                            border: "3px solid transparent",
                                            borderTopColor: "var(--accent)",
                                            borderRadius: "50%",
                                            position: "absolute",
                                            top: "15%",
                                            left: "15%"
                                        }
                                    }/>
                            </div>
                            <h3 style={
                                {
                                    fontSize: "1.5rem",
                                    marginBottom: "10px"
                                }
                            }>Analyzing Geometry...</h3>
                            <p style={
                                {color: "var(--text-muted)"}
                            }>This usually takes about 30-45 seconds</p>
                        </motion.div>
                    )
                }

                    {
                    response && (
                        <motion.div key="results"
                            initial={
                                {
                                    opacity: 0,
                                    x: 50
                                }
                            }
                            animate={
                                {
                                    opacity: 1,
                                    x: 0
                                }
                            }
                            style={
                                {width: "100%"}
                        }>
                            <div style={
                                {
                                    background: "var(--bg-panel)",
                                    borderRadius: "24px",
                                    padding: "32px",
                                    border: "1px solid var(--glass-border)",
                                    marginBottom: "24px"
                                }
                            }>
                                <div style={
                                    {
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: "24px"
                                    }
                                }>
                                    <h2 style={
                                        {
                                            fontSize: "1.5rem",
                                            fontWeight: "600"
                                        }
                                    }>Generated Assets</h2>
                                    <div style={
                                        {
                                            display: "flex",
                                            gap: "16px"
                                        }
                                    }>
                                        <div style={
                                            {
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "6px",
                                                color: "var(--success)",
                                                fontSize: "0.9rem",
                                                background: "rgba(34, 197, 94, 0.1)",
                                                padding: "6px 12px",
                                                borderRadius: "100px"
                                            }
                                        }>
                                            <Clock size={14}/> {
                                            response.generation_time_seconds
                                        }s
                                        </div>
                                    </div>
                                </div>

                                <ImageGallery images={
                                        response.side_views
                                    }
                                    productName={
                                        response.product_name
                                    }/>
                            </div>
                        </motion.div>
                    )
                } </AnimatePresence>
            </div>

            {/* Global CSS for spinner if needed, though framer handles it */}
            <style>{`
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
        </motion.div>
    );
}

export default App;
