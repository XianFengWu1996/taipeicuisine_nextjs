import Image from "next/image";
import { useState } from "react";
import fallbackImg from '../assets/images/fallback.jpeg'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

interface IImageWithFallbackProps {
    label: string,
    src: string,
    height?: number,
    width?: number,
    allow_zoom?: boolean,
}

export const DialogImage = (props: IImageWithFallbackProps) => {
    const [error, setError] = useState(false);

    const handleOnError = () => {
        setError(true);
    }

    return <>
        {
            props.src && props.src.length > 0 ? <Image
                src={error ? fallbackImg.src : props.src}
                alt={`Image for ${props.label}`}
                width={props.width ?? 200}
                height={props.height ?? 200}
                onError={handleOnError}
                layout="fixed"
            /> : null
        }
    </>
}   
export const MenuPreviewImage = (props: IImageWithFallbackProps) => {
    const [error, setError] = useState(false);

    const handleOnError = () => {
        setError(true);
    }

    return <>
        {
            props.src && props.src.length > 0 && <>
                {
                    props.allow_zoom ? <Zoom zoomMargin={40} overlayBgColorEnd={'rgba(0, 0, 0, 0.85)'}> 
                            <Image 
                            src={error ? fallbackImg.src : props.src}
                            alt={`Image for ${props.label}`}
                            width={100}
                            height={100}
                            layout="intrinsic"
                            onError={handleOnError}
                        /> 
                    </Zoom> : <Image 
                        src={error ? fallbackImg.src : props.src}
                        alt={`Image for ${props.label}`}
                        width={100}
                        height={100}
                        layout="intrinsic"
                        onError={handleOnError}
                    /> 
                }
            </>
        }
    </>
}   