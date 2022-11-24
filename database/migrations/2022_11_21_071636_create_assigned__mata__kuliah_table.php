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
        Schema::create('assigned__mata__kuliah', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger("mahasiswa_id");
            $table->unsignedBigInteger("semester_id");
            $table->unsignedBigInteger("fakultas_id");
            $table->unsignedBigInteger("jurusan_id");
            $table->unsignedBigInteger("mata_kuliah_id");
            $table->unsignedBigInteger("jadwal_id");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('assigned__mata__kuliah');
    }
};
