export  function createImgFormData(imgFieldName, formProps) {
    // convert to mulipart form data
    let formData = new FormData();

    // append regular fields to formData first
    Object.keys(formProps).forEach(( key ) => {
    	if(key !== imgFieldName) {
    		formData.append(key, formProps[key]);
    	}
    });

    Object.keys(formProps).forEach(( key ) => {
    	if(key === imgFieldName) {
            formProps[key].forEach((item, index) => {
              // append original image fields to formData
              formData.append('image'+'_'+index+'_original', item.originalFile);
              // append cropped image fields to formData
              formData.append('image'+'_'+index+'_cropped', item.croppedFile);
          });
        }
    });

    // append image info to formData
    Object.keys(formProps).forEach(( key ) => {
        if(key === imgFieldName) {
            formProps[key].forEach((item, index) => {
              formData.append('image'+'_'+index+'_info', [item.tag, item.description]);
          });
        }
    });

    // // Display the key/value pairs
    // for (var pair of formData.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]); 
    // }

    return formData;
}