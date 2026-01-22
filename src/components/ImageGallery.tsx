import
{useState} from 'react';

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
        <div style={
            {marginTop: '30px'}
        }>
            <h3 style={
                {marginBottom: '20px'}
            }>Product Views</h3>

            <div style={
                {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '20px',
                    marginBottom: '20px'
                }
            }>
                {
                imageData.map((img) => (
                    <div key={
                            img.key
                        }
                        style={
                            {
                                border: '2px solid #333',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                transition: 'transform 0.2s, border-color 0.2s'
                            }
                        }
                        onClick={
                            () => setSelectedImage(img.url)
                        }
                        onMouseEnter={
                            (e) => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.borderColor = '#646cff';
                            }
                        }
                        onMouseLeave={
                            (e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.borderColor = '#333';
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
                                    width: '100%',
                                    height: '200px',
                                    objectFit: 'contain',
                                    background: '#f5f5f5'
                                }
                            }/>
                        <div style={
                            {
                                padding: '10px',
                                textAlign: 'center',
                                background: '#1a1a1a',
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: '500'
                            }
                        }>
                            {
                            img.label
                        } </div>
                    </div>
                ))
            } </div>

            {/* Lightbox for enlarged view */}
            {
            selectedImage && (
                <div style={
                        {
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1000,
                            cursor: 'pointer'
                        }
                    }
                    onClick={
                        () => setSelectedImage(null)
                }>
                    <img src={selectedImage}
                        alt={productName}
                        style={
                            {
                                maxWidth: '90%',
                                maxHeight: '90%',
                                objectFit: 'contain'
                            }
                        }/>
                    <button style={
                            {
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                background: '#646cff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                fontSize: '24px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }
                        }
                        onClick={
                            (e) => {
                                e.stopPropagation();
                                setSelectedImage(null);
                            }
                    }>
                        ×
                    </button>
                </div>
            )
        } </div>
    );
}
