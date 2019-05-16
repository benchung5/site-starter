import escapeHtml from 'html-escape';

//for saving and resizing images
export function imgName(imgName, size) {
    switch(size) {
        case 'medium' :
            return imgName ? imgName.replace(/(\.[\w\d_-]+)$/i, '-med$1') : '';
        case 'small' :
            return imgName ? imgName.replace(/(\.[\w\d_-]+)$/i, '-sml$1') : '';
        default :
            ''
    }
}

export function formatSearchString(searchTxt) {
    if(searchTxt) {
        let outText = '';

        // //remove ._:;, make lowercase
        // let formatted = searchTxt.replace(/([\.\_\'\:\;])+/gi, ' ').toLowerCase();

        // let sanitized = escapeHtml(formatted);

        let sanitized = sanitizeInputString(searchTxt);

        //split separate words into array (filter out all blank strings)
        outText = sanitized.split(' ').filter(function(i){return i});

        //converti it back into a comma string
        outText = outText.toString();

        return outText;
    } else {
        return [];
    }
}

export function sanitizeInputString(str) {
    //remove ._:;, make lowercase
    let formatted = str.replace(/([\.\_\'\:\;])+/gi, ' ').toLowerCase();
    let sanitized = escapeHtml(formatted);

    return sanitized;
}