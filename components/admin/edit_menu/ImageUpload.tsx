import { ArrowRight, ArrowRightAlt } from "@mui/icons-material";
import { Icon, Paper } from "@mui/material";
import Image from "next/image";
import { CSSProperties, useState } from "react";
import Dropzone, { DropEvent, FileRejection } from "react-dropzone";


const thumbsContainer: CSSProperties | undefined = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    minHeight: '12rem',
    maxHeight: '30rem',
  };
  
  const thumb: CSSProperties | undefined = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 40,
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
    pic_url?: string, 
    file: IFile | undefined,
    handleOnDrop: (<T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void) | undefined
}

const handleShowPicture = (photoUrl:string) => {
    if(!photoUrl){
        return null
    }

    return <div style={thumb}>
            <div style={thumbInner}>
            <Image
                src={photoUrl} alt="preview image to be upload" 
                width={300}
                height={300}
            />
            </div>
        </div>
    
}

export const ImageUpload = (props: IImageUploadProps) => {
    console.log(props.pic_url);
    return <>
        <Dropzone onDrop={props.handleOnDrop} 
                accept={'image/*'}
                maxFiles={1}
            >
                {({getRootProps, getInputProps}) => (
                    <Paper>
                    <div {...getRootProps()} style={{ display: 'flex', justifyContent:'center' }}>
                        <input {...getInputProps()} />
                        <p>Drag & drop or click to select Image</p>
                    </div>
                      
                    <div style={{ display: 'flex', justifyContent:'center', alignItems:'center',     margin: '20px 0',}}>
                        <aside style={thumbsContainer}>
                            {handleShowPicture(props.pic_url!)}
                            {
                                props.file?.preview && props.pic_url ? <ArrowRightAlt fontSize='large' /> : null
                            }
                            {handleShowPicture(props.file?.preview!)}
                        </aside>
                    </div>

                    </Paper>
                )}
            </Dropzone>
    </>
}