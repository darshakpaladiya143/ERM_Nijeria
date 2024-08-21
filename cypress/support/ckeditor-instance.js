
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

ClassicEditor
    .create(document.querySelector('.ck-editor'))
    .then(editor => {
        console.log('Editor initialized', editor);
    })
    .catch(error => {
        console.error('There was a problem initializing the editor', error);
    });

