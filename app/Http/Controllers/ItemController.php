<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use App\Services\ImageUploadService;
use Illuminate\Support\Facades\Validator;

class ItemController extends Controller
{
    protected $imageUploadService;

    public function __construct(ImageUploadService $imageUploadService)
    {
        $this->imageUploadService = $imageUploadService;
    }

    public function index()
    {
        return view('index');
    }

    public function getItems()
    {
        $items = Item::orderBy('id', 'desc')->get();
        return response()->json($items);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 422);
        }

        $imagePath = $this->imageUploadService->upload($request->file('image'));

        $item = Item::create([
            'name' => $request->name,
            'image' => $imagePath,
        ]);

        return response()->json($item, 201);
    }

    public function update(Request $request, $id)
    {
        // Validate incoming request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Return error response if validation fails
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 422);
        }

        // Find the item by ID or return 404 if not found
        $item = Item::findOrFail($id);

        // Update item name
        $item->name = $request->name;

        // Handle image upload if a new image is provided
        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($item->image) {
                $this->imageUploadService->delete($item->image);
            }

            // Upload new image and update item's image path
            $imagePath = $this->imageUploadService->upload($request->file('image'));
            $item->image = $imagePath;
        }

        // Save the updated item
        $item->save();

        // Return success response with updated item data
        return response()->json($item, 200);
    }

    // Delete Item
    public function destroy($id)
    {
        $item = Item::findOrFail($id);

        // Use the ImageUploadService to delete the image
        $this->imageUploadService->delete($item->image);

        $item->delete();

        return response()->json(['success' => true]);
    }
}
