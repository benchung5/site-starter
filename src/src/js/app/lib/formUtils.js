// import clone from 'lodash/clone';
import { flattenObjArray } from './utils';

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
          formData.append('image'+'_'+index+'_info', [item.tag_id, item.description]);
        });
      }
    });

    // // Display the key/value pairs
    // for (var pair of formData.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]); 
    // }

    return formData;
}

export function formatOutFormFields(formProps, multiselectFields) {
    //prepare form data to be sent over the network prperly
    //let formpropsClone = clone(formProps);

    let formpropsClone = parse(JSON.stringify(formProps));

    //important to error handle when using JSON.parse...
    function parse(str) {
      try {
        return JSON.parse(str);
      }
      catch(e) {
        return false;
      }
    }

    
    //convert null values to empty strings
    Object.keys(formpropsClone).forEach((key) => {
      if (formpropsClone[key] == null) {
        formpropsClone[key]  = "";
      }
    });

    //convert arrays to comma separated strings
    multiselectFields.map((field) => {
      // let arr = flattenObjArray(formpropsClone[field], 'value');
      // if (arr) {
      //   formpropsClone[field] = arr.toString();
      // }

      if (formpropsClone[field]) {
        if (Array.isArray(formpropsClone[field])) {
          formpropsClone[field] = formpropsClone[field].toString();
        }
      }

    });

    return formpropsClone;
}

export function checkFieldErrors(form, fieldsData) {
    let hasErrors = false;
    const fields = Array.from(form.querySelectorAll('.form-group'));
    fields.map((fieldEl) => {
      let fieldVal = fieldEl.querySelector('.form-control').value;
      let fieldErrorDisplay = fieldEl.querySelector('.error');

      fieldsData.map((field) => {
        if(fieldEl.dataset.name == field.name) {
          if(field.type == 'dateInput') {
            let isValid = false;
            if (fieldVal == '') {
              isValid = true;
            } else {
              isValid = validateDate(fieldVal);
            }
            if(!isValid) {
              fieldErrorDisplay.innerHTML = 'please enter a valid date';
              hasErrors = true;
            } else {
              fieldErrorDisplay.innerHTML = '';
            }
          }
          if(field.condition == 'required') {
            if(!fieldVal) {
              fieldErrorDisplay.innerHTML = field.error;
              hasErrors = true;
            } else {
              fieldErrorDisplay.innerHTML = '';
            }
          }
        }
      });
    });
    return hasErrors;
}

export function validateDate(val) {
  //validte YYYY-MM-DD
  let date_regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
  if (date_regex.test(val)) {
      return true;
  }
  return false;
}