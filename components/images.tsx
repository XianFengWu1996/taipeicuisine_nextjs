import Image from "next/image";
import { useState } from "react";
import fallbackImg from '../assets/images/fallback.jpeg'

interface IImageWithFallbackProps {
    label: string,
    src: string,
    height?: number,
    width?: number,
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
            props.src && props.src.length > 0 && <Image
                src={error ? fallbackImg.src : props.src}
                alt={`Image for ${props.label}`}
                width={150}
                height={150}
                layout="intrinsic"
                onError={handleOnError}
            /> 
        }
    </>
}   