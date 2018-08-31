/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
    // Define changes to default configuration here. For example:
    config.language = 'vi';
    config.height = 150; //or '150px'
    // config.uiColor = '#AADC6E';

    //config.toolbarGroups = [
    //    { name: 'document', groups: ['mode', 'document', 'doctools'] },
    //    { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
    //    { name: 'styles', groups: ['styles'] },
    //    { name: 'clipboard', groups: ['clipboard', 'undo'] },
    //    { name: 'insert', groups: ['insert'] },
    //    { name: 'tools', groups: ['tools'] },
    //    '/',
    //    { name: 'forms', groups: ['forms'] },
    //    { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
    //    { name: 'colors', groups: ['colors'] },
    //    { name: 'links', groups: ['links'] },
    //    { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
    //    { name: 'about', groups: ['about'] },
    //    { name: 'others', groups: ['others'] }
    //];

    //config.removeButtons = 'ShowBlocks,Source,PasteFromWord,Anchor,About,FontSize,Font,Styles,CopyFormatting,RemoveFormat,Link,Unlink,Replace,Subscript,Superscript,Cut,Copy,Paste,PasteText,Blockquote,BidiLtr,BidiRtl,Table,Find';

    config.toolbar = [
        { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike'] },
        { name: 'styles', items: ['Format'] },
        { name: 'clipboard', items: ['Undo', 'Redo'] },
        { name: 'insert', items: ['HorizontalRule', 'SpecialChar'] },
        '/',
        { name: 'paragraph', items: ['NumberedList', 'BulletedList', 'Outdent', 'Indent', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
        { name: 'colors', items: ['TextColor', 'BGColor'] },
        { name: 'tools', items: ['Maximize'] }
    ];

    config.toolbarCanCollapse = true;

    config.resize_dir = 'vertical';
};
