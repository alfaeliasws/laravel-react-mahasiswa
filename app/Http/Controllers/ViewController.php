<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ViewController extends Controller
{
    function homepage()
    {

        $setData = [
            "login_id" => Auth::user()->login_id,
            "is_admin" => Auth::user()->is_admin,
            "auth" => "Yes"
        ];

        return Inertia::render('HomepageAuth', [
            "user" => $setData,
            "data" => Auth::user()->userData()
        ]);
    }

    function dashboard()
    {

        $setData = [
            "login_id" => Auth::user()->login_id,
            "is_admin" => Auth::user()->is_admin,
            "user_data" => Auth::user()->userData(),
            "auth" => "Yes"
        ];


        return Inertia::render('Dashboard', [
            "user" => $setData
        ]);
    }

    function welcome()
    {
        return Inertia::render('Homepage', [
            'title' => 'Check',
            'description' => 'Selamat Datang']);
    }
}
