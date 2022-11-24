<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Assigned_Mata_Kuliah;

class AssignedMataKuliahController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function get()
    {
        //example
        // $user_data_query = DB::table('mahasiswa as m')
        //                     ->select('m.name', 'm.id', 'f.fakultas', 'm.id_mahasiswa', 'j.jurusan','m.jurusan_id','m.fakultas_id','m.semester_id as semester', 'm.nomor_telepon', 'm.alamat')
        //                     ->leftJoin('fakultas as f','m.fakultas_id','=',"f.id")
        //                     ->leftJoin('jurusan as j','m.jurusan_id','=',"j.id")->get();


        $assigned_query = DB::table('assigned__mata__kuliah as a')
                            ->select('m.name','a.mahasiswa_id','f.fakultas','a.fakultas_id','a.id',
                                        'a.semester_id','m.id_mahasiswa','j.jurusan','a.jurusan_id','mat.mata_kuliah','a.mata_kuliah_id as matkul_relation',
                                        'mat.mata_kuliah_id','a.jadwal_id','jad.hari','jad.waktu','jad.jumlahSKS','mat.dosen_pengajar','mat.jumlahSKS')
                            ->leftJoin('fakultas as f','a.fakultas_id','=',"f.id")
                            ->leftJoin('jurusan as j','a.jurusan_id','=',"j.id")
                            ->leftJoin('mata_kuliah as mat','a.mata_kuliah_id','=',"mat.id")
                            ->leftJoin('jadwal as jad','a.jadwal_id','=',"jad.id")
                            ->leftJoin('mahasiswa as m','a.mahasiswa_id','=',"m.id")->get();

        return response()->json(["data" => $assigned_query]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
            "mahasiswa_id" => "required",
            "fakultas_id" => "required",
            "semester_id" => "required",
            "jurusan_id" => "required",
            "mata_kuliah_id" => "required",
            "jadwal_id" => "required"
        ]);

        $assign = Assigned_Mata_Kuliah::create($formFields);

        return response()->json("success");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Assigned_Mata_Kuliah  $assigned_Mata_Kuliah
     * @return \Illuminate\Http\Response
     */
    public function show(Assigned_Mata_Kuliah $assigned_Mata_Kuliah)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Assigned_Mata_Kuliah  $assigned_Mata_Kuliah
     * @return \Illuminate\Http\Response
     */
    public function edit(Assigned_Mata_Kuliah $assigned_Mata_Kuliah)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Assigned_Mata_Kuliah  $assigned_Mata_Kuliah
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Assigned_Mata_Kuliah $assigned_Mata_Kuliah)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Assigned_Mata_Kuliah  $assigned_Mata_Kuliah
     * @return \Illuminate\Http\Response
     */
    public function destroy(Assigned_Mata_Kuliah $assigned_Mata_Kuliah)
    {
        //
    }
}
