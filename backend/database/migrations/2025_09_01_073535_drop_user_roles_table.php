<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('user_roles', function (Blueprint $table) {
            //
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
{
    Schema::create('user_roles', function (Blueprint $table) {
        $table->string('user_role_id')->primary();
        $table->string('user_id');
        $table->string('role_id');
        $table->timestamps();
    });
}
};
