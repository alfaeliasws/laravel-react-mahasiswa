<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Mahasiswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

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

            // $user_data_query = DB::raw('select m.name, m.id, f.fakultas, m.id_mahasiswa, j.jurusan, m.jurusan_id, m.fakultas_id, m.semester_id as semester, m.nomor_telepon, m.alamat from mahasiswa m left join fakultas f on m.fakultas_id = f.id left join jurusan j on m.jurusan_id = j.id');

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


        $prev_id_mhs = DB::table('mahasiswa')->select('id')->latest('id')->first();
        $id_mhs = $prev_id_mhs->id + 1;
        $formFields["id"] = $id_mhs;

        $prev_id_usr = DB::table('users')->select('id')->latest('id')->first();
        $id_usr = $prev_id_usr->id + 1;

        $user_create=$request->validate([
            "id_mahasiswa" => "required",
            "password" => "required"
        ]);

        if($formFields && $user_create){
            $user = Mahasiswa::create($formFields);

            $user = new User;

            $user->login_id = $request->id_mahasiswa;
            $user->password = Hash::make($request->password);
            $user->is_admin = 0;
            $user->id = $id_usr;
            $user->save();

            return response()->json($formFields);
        }
        else{
            return response()->json("error ocurred");
        }


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

        $user_create=$request->validate([
            "id_mahasiswa" => "required",
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
            $id_mahasiswa = $request->id_mahasiswa;
            $mahasiswa = Mahasiswa::find($id);

            $mahasiswa->name = $request->name;
            $mahasiswa->alamat = $request->alamat;
            $mahasiswa->semester_id = $request->semester_id;
            $mahasiswa->nomor_telepon = $request->nomor_telepon;
            $mahasiswa->save();

            $user = User::where('login_id',$id_mahasiswa)->first();
            if($request->password)
            {
                $user->password = Hash::make($request->password);
                $user->save();
                return response()->json(
                    [
                        "edit berhasil",
                        "status" => 200
                    ]
                    );
            }
            else
            {
                return response()->json(
                    [
                        "edit berhasil no password changed",
                        "status" => 200
                    ]
                    );
            }

        };

            // return response()->json(
            //     $request
            // );
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
        $mahasiswa = DB::table('mahasiswa')->where('id',$id)->first();

        $user = DB::table('users')->where('login_id',$mahasiswa->id_mahasiswa)->delete();

        DB::table('mahasiswa')->where('id',$id)->delete();

        return response()->json([
            "message"=>"function working",
            "deleted user" => $mahasiswa,
        ]);
    }
}
