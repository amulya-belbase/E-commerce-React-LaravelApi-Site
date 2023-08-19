<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;

class VendorController extends Controller
{
    public function register(Request $request){
        $vendor = new Vendor;
        $vendor -> name = $request->input('name');
        $vendor -> email = $request->input('email');
        $vendor -> password = $request->input('password');

        // hashing password
        $vendor -> password = bcrypt($vendor -> password);
        $vendor -> save();
        // create user
        return $vendor;
    }

    public function login(Request $request){
        $vendor = Vendor::where('email', $request->email)->first();
        if(!$vendor || !Hash::check($request->password,$vendor->password)){
            $arrayVariable = ["key"=>"Invalid Login"];  // To display in the login page, needs json (key-value)
            return $arrayVariable;
        }else{
            // auth()->login($vendor);
            return $vendor;
        }
    }

}
