<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['show_login_page', 'authentication', 'logout','dashboard']]);
    }

    function show_login_page()
    {
        return Inertia::render('Login', [
            'title' => 'Check',
            'description' => 'Selamat Datang'
        ]);
    }

    function authentication(Request $request)
    {

        $formFields=$request->validate([
            "login_id" => "required",
            "password" => "required"
        ]);

        $token =  JWTAuth::attempt($formFields);
        // $token =  auth()->guard('api')->attempt($formFields);

        if(!$token )
        {
            return response()->json([
                "status"=>400,
                "message"=>"Login not succeed",
                "next"=>"/login"
            ]);

        }
        else
        {
            JWTAuth::setToken($token);
            Auth::attempt($formFields);
            $request->session()->regenerate();
            return response()->json([
                "status"=>200,
                "message"=>"Login succeed",
                "next"=>"/dashboard",
                "authorisation" => [
                    'token' => $token,
                    'type' => 'bearer'
                ]
            ]);
        }

    }

    public function logout(Request $request)
    {

        $accessToken = $request->accessToken;

        if($accessToken){;
            JWTAuth::setToken($accessToken)->invalidate();
            $request->session()->flush();
            $request->session()->regenerate();
            Auth::logout();
            return response()->json(["with Token",$accessToken]);
        }


        if(!$accessToken){
            $request->session()->flush();
            $request->session()->regenerate();
            Auth::logout();
            return response()->json("Logout success");
        }

        // return response()->json([
        //     "status"=>200,
        //     "request" => $request,
        //     "message"=>"Logout succeed",
        //     "next"=>"/dashboard",
        //     "authorisation" => [
        //         'token' => $token,
        //         'type' => 'bearer'
        //     ]
        // ]);

    }
}
