@extends('layout')

@section('content')
<h2 class="mb-4 text-center">Item Management (Laravel, Ajax CRUD)</h2>
    <div class="text-center">
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addItemModal">Add Item</button>
    </div>
    <!-- Add Item Modal -->
    <div class="modal fade" id="addItemModal" tabindex="-1" aria-labelledby="addItemModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addItemModalLabel">Add New Item</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="text" id="name" class="form-control mb-2" placeholder="Item name">
                    <form action="/items/upload" class="dropzone" id="dropzoneForm"> 
                        <div class="dz-message">
                            <i class="fas fa-cloud-upload-alt fa-4x"></i>
                            <p class="mt-3">Drag and drop image here or click to upload.</p>
                        </div>
                    </form>
                    <button type="button" class="btn btn-secondary mt-2" data-bs-dismiss="modal">Close</button>
                    <button id="add-item" class="btn btn-primary mt-2">Add Item</button>
                </div>
            </div>
        </div>
    </div>

    <hr>
    <div class="row">
        <div class="col-12">
            <div id="items-cards" class="row">
                <!-- Items will be loaded here -->
            </div>
        </div>
    </div>
@endsection

