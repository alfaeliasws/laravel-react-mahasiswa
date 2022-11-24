<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Support\Facades\Auth;

class EnsureAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    // protected $auth;

    // public function __construct(Guard $auth)
    // {
    //     $this->auth = $auth;
    // }

    public function handle(Request $request, Closure $next)
    {
        if($request->user() == null)
        {
            return redirect('/')->with('message',"You are not authorized");
        }
        //check if admin
        else if($request->user()->is_admin === 1)
        {
            return $next($request);
        }
        else
        {
            return redirect('/')->with('message',"You are not authorized");
        }
    }
}


