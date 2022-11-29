<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mahasiswa extends Model
{
    use HasFactory;

    protected $table = 'mahasiswa';

    protected $fillable = [
        'name',
        'alamat',
        'nomor_telepon',
        'fakultas_id',
        'jurusan_id',
        'semester_id',
        'id_mahasiswa',
        'id'
    ];
}
