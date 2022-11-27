<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Admin;
use App\Models\Mahasiswa;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'password',
        'is_admin'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    //get mahasiswa row
    public function userData()
    {
        $user_data = Mahasiswa::where('id_mahasiswa',Auth::user()->login_id)->first();

        $user_data_query = DB::table('mahasiswa as m')
                            ->select('m.name', 'f.fakultas', 'j.jurusan', 'm.semester_id as semester', 'm.nomor_telepon', 'm.alamat')
                            ->leftJoin('fakultas as f','m.fakultas_id','=',"f.id")
                            ->leftJoin('jurusan as j','m.jurusan_id','=',"j.id")
                            ->where('id_mahasiswa',Auth::user()->login_id)->first();

        if($user_data)
        {
            return $user_data_query;
        }
        else if(Admin::where('admin_id',Auth::user()->login_id))
        {
            return Admin::where('admin_id',Auth::user()->login_id)->first();
        }
        else
        {
            return "";
        }

    }


}
