// import React, {createRef} from 'react';
// import Cropper from 'react-cropper';
// import 'cropperjs/dist/cropper.css'; 

// class CropperInput extends React.Component {
//     cropper = createRef();
//     cropImage = () => {
//     const {setImage} = this.props;
//         if (typeof this.cropper.current.getCroppedCanvas() === 'undefined') {
//             console.log('hello');
//             return;
//         }
//         this.cropper.current.getCroppedCanvas().toBlob(blob => {
//             setImage(blob);
//         }, 'image/jpeg');
//     }
//   render() {
    
//     return (
//       <Cropper
//         ref={this.cropper}
//         src={this.props.imagePreview}
//         style={{height: 200, width: '100%'}}
//         // Cropper.js options
//         aspectRatio={1}
//         preview='.img-preview'
//         guides={false}
//         viewMode={1}
//         dragMode='move'
//         scalable={true}
//         cropBoxMovable={true}
//         cropBoxResizable={true}
//         crop={this.cropImage} />
//     );
// }
// }
// export default CropperInput
import React, {useRef} from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'; 

export default function CropperInput({setImage, imagePreview}) {
    const cropperRef = useRef(null);
    const onCrop = () => {
    const imageElement = cropperRef === null || cropperRef === void 0 ? void 0 : cropperRef.current;
    const cropper = imageElement === null || imageElement === void 0 ? void 0 : imageElement.cropper;
    cropper.getCroppedCanvas().toBlob(blob => {
             setImage(blob)
         }, 'image/jpeg');
            };

  return (
    
      <Cropper
        ref={cropperRef}
        src={imagePreview}
        style={{height: 200, width: '100%'}}
        // Cropper.js options
        initialAspectRatio={1}
        preview='.img-preview'
        guides={false}
        viewMode={1}
        dragMode='move'
        scalable={true}
        cropBoxMovable={true}
        cropBoxResizable={true}
        crop={onCrop} />

  );
};
