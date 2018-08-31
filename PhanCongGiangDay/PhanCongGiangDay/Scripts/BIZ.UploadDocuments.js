function InitUploadDocuments() {
    var maxFileSize = $('#maxFileSize').val();
	var maxFiles = $('#maxFiles').val();
    var uploadMultiple = maxFiles > 1; 
    var acceptedFiles = $('#acceptedFiles').val();

	Dropzone.options.dropzoneForm = {
		autoProcessQueue: false,
		maxFilesize: maxFileSize,
		maxFiles: maxFiles,
		uploadMultiple: uploadMultiple,
		parallelUploads: maxFiles,
		acceptedFiles: acceptedFiles,
		init: function () {
			var myDropzone = this;
			$('#uploadDocument').on('click', function (e) {
				e.preventDefault();
				e.stopPropagation();
				myDropzone.processQueue();
			});
			myDropzone.on("addedfile", function (file) {
				// Prevent BITRUNG files
				if (myDropzone.files.length) {
					var _i, _len;
					for (_i = 0, _len = myDropzone.files.length; _i < _len - 1; _i++) // -1 to exclude current file
					{
						if (myDropzone.files[_i].name === file.name && myDropzone.files[_i].size === file.size && myDropzone.files[_i].lastModifiedDate.toString() === file.lastModifiedDate.toString()) {
							myDropzone.removeFile(file);
						}
					}
				}

				// Add button remove to remove document what you don't want anymore
				var removeButton = Dropzone.createElement('<div class="dz-remove" style="text-alagin:center; margin-top: 5px" data-dz-remove><button class="btn btn-danger" ><i class="fa fa-trash"></i></button></div>');

				removeButton.addEventListener('click', function () {
					myDropzone.removeFile(file);
				});

				file.previewElement.appendChild(removeButton);

			});
			myDropzone.on("maxfilesexceeded", function (file) {
				myDropzone.removeFile(file);
			});
		},
		success: function (file, response) {
		    if (!response.IsSuccess) {
		        $.notify({ message: "Cập nhật hình đại diện không thành công" }, { type: "danger" });
		    } else {
                $.notify({ message: "Cập nhật hình đại diện thành công" }, { type: "success" });
		        
		    }
        },
		complete: function () {
		    $('#modal').modal("hide");
            hideLoadingOverlay();
		    window.location.reload();
		}
	};

    Dropzone.discover();
}