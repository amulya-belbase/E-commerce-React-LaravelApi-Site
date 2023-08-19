<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function addproduct(Request $request)
    {

        $product = new Product;
        $product->user_id = $request->input('user_id');   // getting user_id from request 
        $product->product = $request->input('product');
        $product->pdimg = $request->file('pdimg')->store('products_image');
        $product->tags = $request->input('tags');
        $product->manufacturer = $request->input('manufacturer');
        $product->price = $request->input('price');
        $product->quantity = $request->input('quantity');
        $product->description = $request->input('description');

        $product->save();
        // return $product;
    }

    public function allproducts()
    {
        return Product::all();
    }

    public function delete($id)
    {
        $result = Product::where('id', $id)->delete();
        if ($result) {
            return ["result" => "Product has been deleted"];
        } else {
            return ["result" => "Product doesn't exist"];
        }
    }

    public function getProduct($id)
    {
        return Product::find($id);
    }


    public function update(Request $request, $id)
    {

        $product = Product::find($id);
        $product->product = $request->input('product');
        $product->tags = $request->input('tags');
        $product->manufacturer = $request->input('manufacturer');
        $product->price = $request->input('price');
        $product->quantity = $request->input('quantity');
        $product->description = $request->input('description');

        if($request->file('pdimg')){
            $product->pdimg = $request->file('pdimg')->store('products_image');
        }

        $product->save();

        return "success";

       /*  $formData = $request->validate([
            'product' => 'required',
            'manufacturer' => ['required'],
            'price' => 'required',
            'quantity' => 'required',
            'tags' => 'required',
            'description' => 'required'
        ]);
        
        if($request->hasFile('pdimg')){
            $formData['pdimg'] = $request->file('pdimg')->store('products_image');
        }

        $id->update($formData);

        return "Success"; */
    }

    public function search($key){
        return Product::where('product','Like',"%$key%")
            ->orWhere('description','like',"%$key%")
            ->orWhere('tags','like',"%$key%")
            ->orWhere('manufacturer','like',"%$key%")->get();
    }

    }

