import escapeHtml from 'html-escape';

//for saving and resizing images
export function imgName(imgName, size) {
    switch(size) {
        case 'large' :
            return imgName.replace(/(\.[\w\d_-]+)$/i, '-lg$1');
        case 'medium' :
            return imgName.replace(/(\.[\w\d_-]+)$/i, '-med$1');
        case 'small' :
            return imgName.replace(/(\.[\w\d_-]+)$/i, '-sml$1');
        default :
            ''
    }
}

export function formatSearchString(searchTxt) {
    if(searchTxt) {
        let outText = '';

        //remove ._:;, make lowercase
        let formatted = searchTxt.replace(/([\.\_\'\:\;])+/gi, ' ').toLowerCase();

        let sanitized = escapeHtml(formatted);

        //split separate words into array (filter out all blank strings)
        outText = sanitized.split(' ').filter(function(i){return i});

        //converti it back into a comma string
        outText = outText.toString();

        return outText;
    } else {
        return [];
    }

}