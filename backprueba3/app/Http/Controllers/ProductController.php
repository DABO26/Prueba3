<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        try {
            return response()->json(Product::orderBy('id', 'desc')->get());
        }catch (\Exception $exception){
            return response()->json([
                'message' => $exception->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        try {
            $fields=$request->validate([
                'name' => 'required',
                'image' => 'required',
                'description' => 'required',
                'price' => 'required',
                'quantity' => 'required',
                'status' => 'required'
            ]);
            $product = Product::create([
                'name' => $fields['name'],
                'image' => $fields['image'],
                'description' => $fields['description'],
                'price' => $fields['price'],
                'quantity' => $fields['quantity'],
                'status' => $fields['status']
            ]);
            return response()->json($product,200);
        }catch (\Exception $exception)
        {
            return response()->json([
                'message' => $exception->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        try{
            $product->delete();
            return response()->json([
                'message' => 'Product deleted successfully'
            ], 200);
        }catch (\Exception $exception){
            throw new \Exception($exception->getMessage());
        }
    }
}
