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
        Schema::create('mata_kuliah', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("mata_kuliah");
            $table->string("mata_kuliah_id");
            $table->unsignedBigInteger("jurusan_id");
            $table->integer('jumlahSKS');
            $table->string("dosen_pengajar");
            $table->unsignedBigInteger("semester_id");
            $table->foreign("semester_id")->references('id')->on('semester')->onDelete('cascade');
            $table->foreign("jurusan_id")->references('id')->on('jurusan')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mata_kuliah');
    }
};
