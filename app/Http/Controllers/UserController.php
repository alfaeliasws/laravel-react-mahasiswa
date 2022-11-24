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

        // $token =  JWTAuth::attempt($formFields);
        $token =  auth()->guard('api')->attempt($formFields);

        if(!$token)
        {
            return response()->json([
                "status"=>400,
                "message"=>"Login not succeed",
                "next"=>"/"
            ]);

        }
        else
        {
            Auth::attempt($formFields);

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
        JWTAuth::invalidate($request->$accessToken);
        $request->session()->flush();
        $request->session()->regenerate();
        Auth::logout();

        return response()->json("Logout success");

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

        // $this->validate($request->$accessToken, ['token' => 'required']);
        // try {
        //     JWTAuth::invalidate($request->$accessToken);
        //     return response()->json(['success' => true]);
        // } catch (JWTException $e) {
        //     return response()->json(['success' => false, 'error' => 'Failed to logout, please try again.'], 500);
        // }

        // $logout_guard = $this->guard()->logout();
        // $request_flush = $request->session()->flush();
        // $request_session = $request->session()->regenerate();

        // if($logout_guard && $request_flush && $request_session){
        //     return response()->json([
        //         "status"=>200,
        //         "message"=>"Logout succeed",
        //         "next"=>"/"
        //     ]);
        // }
        // else
        // {
        //     return response()->json([
        //         "status"=>400,
        //         "message"=>"Logout unsuccessful",
        //         "next"=>"/dashboard"
        //     ]);
        // }
    }
}
