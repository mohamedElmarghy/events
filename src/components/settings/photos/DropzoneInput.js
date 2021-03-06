// import React, {useCallback} from 'react'
// import {useDropzone} from 'react-dropzone'
// import { Header, Icon } from 'semantic-ui-react';

// const DropzoneInput = ({setFiles}) => {
//   const onDrop = useCallback(acceptedFiles => {
//     setFiles(acceptedFiles.map( file => Object.assign(file,{
//       preview : URL.createObjectURL(file)
//     })));
//   }, [setFiles])
//   const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,
//          multiple : false,
//          accept : 'image/*'})

//   return (
//     <div {...getRootProps()} className={'dropzone ' + (isDragActive && 'dropzone--isActive')}>
//       <input {...getInputProps()} />
//       <Icon name='upload' size='huge'/>
//       <Header content='Drop image here'/>
//     </div>
//   )
// }
// export default DropzoneInput
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Icon, Header } from 'semantic-ui-react'

export default function DropzoneInput({setFiles}) {
  const dropzoneStyles = {
     border: 'dashed 3px #eee',
     borderRadius: '5%',
     paddingTop: '30px',
     textAlign: 'center'
 }

 const dropzoneActive = {
     border: 'dashed 3px green'
 }

  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
    })))
  }, [setFiles])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} style={isDragActive ? {...dropzoneStyles, ...dropzoneActive} : dropzoneStyles}>
      <input {...getInputProps()} />
      <Icon name='upload' size='huge' />
      <Header content='Drop image here' />
    </div>
  )
}