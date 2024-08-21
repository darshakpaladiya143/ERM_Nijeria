import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

window.addEventListener('DOMContentLoaded', (event) => {
    ClassicEditor
      .create(document.querySelector('.ck.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline.ck-blurred'))
      .then(editor => {
        window.editorInstance = editor; // Expose CKEditor instance to window
        console.log(window.editorInstance);
      })
      .catch(error => {
        console.error('Error initializing CKEditor:', error);
      });
  });
  

