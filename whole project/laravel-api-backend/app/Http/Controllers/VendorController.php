<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Mockery\Undefined;
use Illuminate\Support\Facades\Notification;
use App\Notifications\WelcomeNotification;

class VendorController extends Controller
{
    public function register(Request $request)
    {
        $vendor = new Vendor;
        $vendor->name = $request->input('name');
        $vendor->email = $request->input('email');
        $vendor->password = $request->input('password');

        // hashing password
        $vendor->password = bcrypt($vendor->password);

        $user = Vendor::where('email', $request->email)->first();
        if($user != null){
            return ["message"=>"Email taken"];
        }else{
            $vendor->save();
            return ["message" => "Registration success"];         
        }
    }

    

    public function login(Request $request)
    {
        $vendor = Vendor::where('email', $request->email)->first();
        if (!$vendor || !Hash::check($request->password, $vendor->password)) {
            // To display in the login page, needs json (key-value)
            return ["key" => "Invalid Login"];
        } else {
            // auth()->login($vendor);
            return $vendor;
        }
    }
}
