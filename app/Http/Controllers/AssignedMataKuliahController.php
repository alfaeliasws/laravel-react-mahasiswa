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
                                        'mat.mata_kuliah_id','a.jadwal_id','jad.hari','jad.waktu','jad.jumlahSKS','mat.dosen_pengajar','mat.jumlahSKS as target_sks')
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

        $prev_id = DB::table('assigned__mata__kuliah')->select('id')->latest('id')->first();
        $id = $prev_id->id + 1;
        $formFields["id"] = $id;

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
    public function edit($id)
    {

        $edit_query = DB::table('assigned__mata__kuliah as a')
        ->select('m.name','a.mahasiswa_id','f.fakultas','a.fakultas_id','a.id',
                    'a.semester_id','m.id_mahasiswa','j.jurusan','a.jurusan_id','mat.mata_kuliah','a.mata_kuliah_id as matkul_relation',
                    'mat.mata_kuliah_id','a.jadwal_id','jad.hari','jad.waktu','jad.jumlahSKS','mat.dosen_pengajar','mat.jumlahSKS')
        ->leftJoin('fakultas as f','a.fakultas_id','=',"f.id")
        ->leftJoin('jurusan as j','a.jurusan_id','=',"j.id")
        ->leftJoin('mata_kuliah as mat','a.mata_kuliah_id','=',"mat.id")
        ->leftJoin('jadwal as jad','a.jadwal_id','=',"jad.id")
        ->leftJoin('mahasiswa as m','a.mahasiswa_id','=',"m.id")
        ->where("a.id", $id)->get();

        return response()->json($edit_query);
    }


    public function mydata($id)
    {

        $query = DB::table('assigned__mata__kuliah as a')
        ->select('m.name','a.mahasiswa_id','f.fakultas','a.fakultas_id','a.id',
                    'a.semester_id','m.id_mahasiswa','j.jurusan','a.jurusan_id','mat.mata_kuliah','a.mata_kuliah_id as matkul_relation',
                    'mat.mata_kuliah_id','a.jadwal_id','jad.hari','jad.waktu','jad.jumlahSKS','mat.dosen_pengajar','mat.jumlahSKS as target_sks')
        ->leftJoin('fakultas as f','a.fakultas_id','=',"f.id")
        ->leftJoin('jurusan as j','a.jurusan_id','=',"j.id")
        ->leftJoin('mata_kuliah as mat','a.mata_kuliah_id','=',"mat.id")
        ->leftJoin('jadwal as jad','a.jadwal_id','=',"jad.id")
        ->leftJoin('mahasiswa as m','a.mahasiswa_id','=',"m.id")
        ->where("m.id_mahasiswa", $id)->get();

        return response()->json($query);
        // return response()->json("function working");
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Assigned_Mata_Kuliah  $assigned_Mata_Kuliah
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $formFields=$request->validate([
            "mahasiswa_id" => "required",
            "fakultas_id" => "required",
            "semester_id" => "required",
            "jurusan_id" => "required",
            "mata_kuliah_id" => "required",
            "jadwal_id" => "required"
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
            $assigned = Assigned_Mata_Kuliah::find($id);

            $assigned->mahasiswa_id = $request->mahasiswa_id;
            $assigned->fakultas_id = $request->fakultas_id;
            $assigned->semester_id = $request->semester_id;
            $assigned->jurusan_id = $request->jurusan_id;
            $assigned->mata_kuliah_id = $request->mata_kuliah_id;
            $assigned->jadwal_id = $request->jadwal_id;
            $assigned->save();

            return response()->json(
                [
                    "edit berhasil",
                    "status" => 200
                ]
                );
        };

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Assigned_Mata_Kuliah  $assigned_Mata_Kuliah
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::table('assigned__mata__kuliah')->where('id',$id)->delete();

        return response()->json("delete succeed");
    }
}
