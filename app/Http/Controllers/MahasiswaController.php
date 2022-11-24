<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MahasiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function get()
    {
        $user_data_query = DB::table('mahasiswa as m')
                            ->select('m.name', 'm.id', 'f.fakultas', 'm.id_mahasiswa', 'j.jurusan','m.jurusan_id','m.fakultas_id','m.semester_id as semester', 'm.nomor_telepon', 'm.alamat')
                            ->leftJoin('fakultas as f','m.fakultas_id','=',"f.id")
                            ->leftJoin('jurusan as j','m.jurusan_id','=',"j.id")->get();

        $nim = DB::table('users as u')->select('u.login_id')->get();

        return response()->json([
            "status"=>200,
            "message"=>"Data Fetched",
            "data"=> $user_data_query,
            "unique_data" => $nim
        ]);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $formFields=$request->validate([
            "name" => "required",
            "id_mahasiswa" => "required",
            "alamat" => "required",
            "semester_id" => "required",
            "nomor_telepon" => "required",
            "jurusan_id" => "required",
            "fakultas_id" => "required"
        ]);

        $user = Mahasiswa::create($formFields);

        return response()->json("creation successful");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Mahasiswa  $mahasiswa
     * @return \Illuminate\Http\Response
     */
    public function show(Mahasiswa $mahasiswa)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Mahasiswa  $mahasiswa
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, $id)
    {

        $formFields=$request->validate([
            "name" => "required",
            "alamat" => "required",
            "semester_id" => "required",
            "nomor_telepon" => "required"
        ]);

        if(!$formFields)
        {
            return response()->json(
            [
                "function not working",
                "status" => 422
            ]);
        }
        else
        {
            $mahasiswa = Mahasiswa::find($id);

            $mahasiswa->name = $request->name;
            $mahasiswa->alamat = $request->alamat;
            $mahasiswa->semester_id = $request->semester_id;
            $mahasiswa->nomor_telepon = $request->nomor_telepon;
            $mahasiswa->save();

            return response()->json(
                [
                    "edit berhasil",
                    "status" => 200
                ]
                );
        };

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Mahasiswa  $mahasiswa
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Mahasiswa $mahasiswa)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Mahasiswa  $mahasiswa
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        DB::table('mahasiswa')->where('id',$id)->delete();

        return response()->json([
            "message"=>"function working",
            "deleted user" => $id,
        ]);
    }
}
