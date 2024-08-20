// cypress/support/ckeditor-instance.js

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

async function initializeCKEditor(selector) {
    try {
        const editor = await ClassicEditor.create(document.querySelector(selector));
        // Use unique key for each CKEditor instance if multiple instances exist
        window.editorInstances = window.editorInstances || {};
        window.editorInstances[selector] = editor;
        console.log(`CKEditor instance initialized for ${selector}`);
        return editor;
    } catch (error) {
        console.error('Error initializing CKEditor:', error);
    }
}

// Initialize CKEditor when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeCKEditor('.ck-editor'); // Adjust the selector if needed
});

