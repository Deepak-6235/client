import
{useState} from 'react';
import
{motion, AnimatePresence} from 'framer-motion';
import
{Maximize2, X, Download} from 'lucide-react';

interface ImageGalleryProps
{
    images: {
        front: string;
        right: string;
        back: string;
        left: string;
    };
    productName: string;
}

export default function ImageGallery(
    {images, productName} : ImageGalleryProps
)
{
    const [selectedImage, setSelectedImage] = useState < string | null > (null);

    const imageData = [
        {
            key: 'front',
            label: 'Front View',
            url: images.front
        },
        {
            key: 'right',
            label: 'Right View',
            url: images.right
        },
        {
            key: 'back',
            label: 'Back View',
            url: images.back
        },
        {
            key: 'left',
            label: 'Left View',
            url: images.left
        },
    ];

    return (
        <>
            <div style={
                {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '24px'
                }
            }>
                {
                imageData.map((img, index) => (
                    <motion.div key={
                            img.key
                        }
                        initial={
                            {
                                opacity: 0,
                                y: 20
                            }
                        }
                        animate={
                            {
                                opacity: 1,
                                y: 0
                            }
                        }
                        transition={
                            {
                                delay: index * 0.1
                            }
                        }
                        whileHover={
                            {
                                y: -5,
                                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)"
                            }
                        }
                        style={
                            {
                                position: 'relative',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                background: 'var(--bg-input)',
                                border: '1px solid var(--glass-border)',
                                cursor: 'pointer',
                                aspectRatio: '1'
                            }
                        }
                        onClick={
                            () => setSelectedImage(img.url)
                    }>
                        <div style={
                            {
                                width: '100%',
                                height: '100%',
                                padding: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'radial-gradient(circle at center, rgba(255,255,255,0.05), transparent)'
                            }
                        }>
                            <img src={
                                    img.url
                                }
                                alt={
                                    `${productName} - ${
                                        img.label
                                    }`
                                }
                                style={
                                    {
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        objectFit: 'contain',
                                        filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.3))'
                                    }
                                }/>
                        </div>

                        {/* Overlay on hover */}
                        <motion.div initial={
                                {opacity: 0}
                            }
                            whileHover={
                                {opacity: 1}
                            }
                            transition={
                                {duration: 0.2}
                            }
                            style={
                                {
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'rgba(0,0,0,0.4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backdropFilter: 'blur(2px)'
                                }
                        }>
                            <Maximize2 color="white"
                                size={24}/>
                        </motion.div>

                        <div style={
                            {
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                padding: '12px',
                                background: 'rgba(0,0,0,0.6)',
                                backdropFilter: 'blur(10px)',
                                borderTop: '1px solid var(--glass-border)',
                                textAlign: 'center'
                            }
                        }>
                            <span style={
                                {
                                    fontSize: '0.85rem',
                                    fontWeight: '500',
                                    color: 'var(--text-muted)'
                                }
                            }>
                                {
                                img.label
                            } </span>
                        </div>
                    </motion.div>
                ))
            } </div>

            <AnimatePresence> {
                selectedImage && (
                    <motion.div initial={
                            {opacity: 0}
                        }
                        animate={
                            {opacity: 1}
                        }
                        exit={
                            {opacity: 0}
                        }
                        style={
                            {
                                position: 'fixed',
                                inset: 0,
                                background: 'rgba(0, 0, 0, 0.95)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 1000,
                                backdropFilter: 'blur(10px)'
                            }
                        }
                        onClick={
                            () => setSelectedImage(null)
                    }>
                        <motion.div initial={
                                {
                                    scale: 0.9,
                                    opacity: 0
                                }
                            }
                            animate={
                                {
                                    scale: 1,
                                    opacity: 1
                                }
                            }
                            exit={
                                {
                                    scale: 0.9,
                                    opacity: 0
                                }
                            }
                            onClick={
                                (e) => e.stopPropagation()
                            }
                            style={
                                {
                                    position: 'relative',
                                    maxWidth: '90vw',
                                    maxHeight: '90vh'
                                }
                        }>
                            <img src={selectedImage}
                                alt={productName}
                                style={
                                    {
                                        maxWidth: '100%',
                                        maxHeight: '85vh',
                                        borderRadius: '12px',
                                        boxShadow: '0 0 50px rgba(0,0,0,0.5)'
                                    }
                                }/>

                            <div style={
                                {
                                    position: 'absolute',
                                    top: '-50px',
                                    right: 0,
                                    display: 'flex',
                                    gap: '12px'
                                }
                            }>
                                <button onClick={
                                        () => setSelectedImage(null)
                                    }
                                    style={
                                        {
                                            background: 'rgba(255,255,255,0.1)',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '40px',
                                            height: '40px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            color: 'white'
                                        }
                                }>
                                    <X size={20}/>
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )
            } </AnimatePresence>
        </>
    );
}
