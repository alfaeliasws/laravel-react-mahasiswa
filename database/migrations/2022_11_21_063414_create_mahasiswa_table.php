<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mahasiswa', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("name");
            $table->string("id_mahasiswa");
            $table->foreign("id_mahasiswa")->references('login_id')->on('users')->onDelete('cascade');
            $table->longText("alamat");
            $table->integer("nomor_telepon");
            $table->unsignedBigInteger("fakultas_id");
            $table->unsignedBigInteger("jurusan_id");
            $table->unsignedBigInteger("semester_id");
            $table->foreign("fakultas_id")->references('id')->on('fakultas')->onDelete('cascade');
            $table->foreign("jurusan_id")->references('id')->on('jurusan')->onDelete('cascade');
            $table->foreign("semester_id")->references('id')->on('semester')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mahasiswa');
    }
};
