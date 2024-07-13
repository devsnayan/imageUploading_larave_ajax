$(document).ready(function() {
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
    });

    function fetchItems() {
        $.get('/items', function(response) {
            let cards = '';
            response.forEach(item => {
                let imageUrl = item.image ? `/storage/${item.image}` : '';
                cards += `
                    <div class="col-lg-3 col-md-4 col-sm-12 mt-2" id="item-${item.id}">
                        <div class="card">
                            <img src="${imageUrl}" class="card-img-top" alt="${item.name}">
                            <div class="card-body">
                                <h5 class="card-title">${item.id}. ${item.name}</h5>
                                <button class="btn btn-info btn-sm edit-item" data-id="${item.id}" data-name="${item.name}">Edit</button>
                                <button class="btn btn-danger btn-sm delete-item" data-id="${item.id}">Delete</button>
                            </div>
                        </div>
                    </div>
                `;
            });
            $('#items-cards').html(cards);
        });
    }

    function resetForm() {
        $('#name').val('');
        Dropzone.forElement("#dropzoneForm").removeAllFiles(true);
    }

    function showError(message) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message,
            showConfirmButton: false,
            timer: 3000 // 3 seconds
        });
    }

    $('#add-item').click(function() {
        let name = $('#name').val();
        let formData = new FormData();
        formData.append('name', name);
        let dropzoneFiles = Dropzone.forElement("#dropzoneForm").files;
        if (dropzoneFiles.length > 0) {
            formData.append('image', dropzoneFiles[0]);
        }

        $.ajax({
            url: '/items',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                let imageUrl = response.image ? `/storage/${response.image}` : '';
                $('#items-cards').prepend(`
                    <div class="col-lg-3 cl-md-4 col-sm-12 mt-2" id="item-${response.id}">
                        <div class="card">
                            <img src="${imageUrl}" class="card-img-top" alt="${response.name}">
                            <div class="card-body">
                                <h5 class="card-title">${response.id}. ${response.name}</h5>
                                <button class="btn btn-info btn-sm edit-item" data-id="${response.id}" data-name="${response.name}">Edit</button>
                                <button class="btn btn-danger btn-sm delete-item" data-id="${response.id}">Delete</button>
                            </div>
                        </div>
                    </div>
                `);
                $('#addItemModal').modal('hide');
                resetForm();
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Item added successfully!',
                });
            },
            error: function(xhr) {
                showError(xhr.responseJSON.message);
            }
        });
    });

    $(document).on('click', '.edit-item', function() {
        $('#edit-id').val($(this).data('id'));
        $('#edit-name').val($(this).data('name'));
        $('#editModal').modal('show');
    });

    $('#update-item').click(function() {
        let id = $('#edit-id').val();
        let name = $('#edit-name').val();
        let formData = new FormData();
        formData.append('name', name);
        let dropzoneFiles = Dropzone.forElement("#dropzoneEditForm").files;
        if (dropzoneFiles.length > 0) {
            formData.append('image', dropzoneFiles[0]);
        }

        $.ajax({
            url: '/items/' + id,
            type: 'POST', // Use POST with method spoofing
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                'X-HTTP-Method-Override': 'PUT' // Method spoofing for PUT request
            },
            success: function(response) {
                let imageUrl = response.image ? `/storage/${response.image}` : '';
                $(`#item-${id} .card-title`).text(`${response.id}. ${response.name}`);
                $(`#item-${id} .card-img-top`).attr('src', imageUrl);
                $('#editModal').modal('hide');
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Item updated successfully!',
                });
            },
            error: function(xhr) {
                showError(xhr.responseJSON.message);
            }
        });
    });

    $(document).on('click', '.delete-item', function() {
        let id = $(this).data('id');
        $('#delete-id').val(id);
        $('#deleteModal').modal('show');
    });

    $('#delete-item').click(function() {
        let id = $('#delete-id').val();
        $.ajax({
            url: `/items/${id}`,
            type: 'DELETE',
            success: function(response) {
                $(`#item-${id}`).remove();
                $('#deleteModal').modal('hide');
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Item deleted successfully!',
                });
            },
            error: function(xhr) {
                showError(xhr.responseJSON.message);
            }
        });
    });

    fetchItems();
});

// Dropzone Configuration
Dropzone.options.dropzoneForm = {
    autoProcessQueue: false,
    maxFiles: 1,
    acceptedFiles: 'image/*',
    init: function() {
        this.on('addedfile', function(file) {
            if (this.files.length > 1) {
                this.removeFile(this.files[0]);
            }
        });
    }
};

Dropzone.options.dropzoneEditForm = {
    autoProcessQueue: false,
    maxFiles: 1,
    acceptedFiles: 'image/*',
    init: function() {
        this.on('addedfile', function(file) {
            if (this.files.length > 1) {
                this.removeFile(this.files[0]);
            }
        });
    }
};
