import { Paper } from "@mui/material";
import Image from "next/image";
import { CSSProperties } from "react";
import Dropzone, { DropEvent, FileRejection } from "react-dropzone";


const thumbsContainer: CSSProperties | undefined = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };
  
  const thumb: CSSProperties | undefined = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 150,
    height: 150,
    padding: 4,
    boxSizing: 'border-box'
  };
  
  const thumbInner: CSSProperties | undefined = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };

interface IImageUploadProps {
    file: IFile | undefined,
    handleOnDrop: (<T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void) | undefined
}

export const ImageUpload = (props: IImageUploadProps) => {
    return <>
        <Dropzone onDrop={props.handleOnDrop} 
                accept={'image/*'}
                maxFiles={1}
            >
                {({getRootProps, getInputProps}) => (
                    <Paper>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag {'n'} drop or click to select Image</p>
                    </div>
                    {
                        props.file?.preview ? <aside style={thumbsContainer}>
                        <div style={thumb}>
                            <div style={thumbInner}>
                                <Image
                                    src={props.file?.preview} alt="preview image to be upload" 
                                    width={300}
                                    height={300}
                                />
                            </div>
                            </div>
                        </aside> : null
                    }
                    </Paper>
                )}
            </Dropzone>
    </>
}