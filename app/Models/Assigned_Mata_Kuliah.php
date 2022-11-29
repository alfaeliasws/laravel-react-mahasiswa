<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assigned_Mata_Kuliah extends Model
{
    use HasFactory;

    protected $table = 'assigned__mata__kuliah';

    protected $fillable = [
        'mahasiswa_id',
        'semester_id',
        'fakultas_id',
        'jurusan_id',
        'mata_kuliah_id',
        'jadwal_id',
        'id'
    ];
}
