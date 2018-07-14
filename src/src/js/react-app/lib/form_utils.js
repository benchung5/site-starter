export  function createImgFormData(imgFieldName, formProps) {
    // convert to mulipart form data
    let formData = new FormData();

    // append reqular fields to formData first
    Object.keys(formProps).forEach(( key ) => {
    	if(key !== imgFieldName) {
    		formData.append(key, formProps[key]);
    	}
    });

    // append image fields to formData last
    Object.keys(formProps).forEach(( key ) => {
    	if(key === imgFieldName) {
            formProps[key].forEach((item) => {
              //multer just accepts a series of files with the same key name
              formData.append('image', item);
          });
        }
    });

    // // Display the key/value pairs
    // for (var pair of formData.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]); 
    // }

    return formData;
}