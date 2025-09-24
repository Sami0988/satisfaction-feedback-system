<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('service_request', function (Blueprint $table) {
            $table->id('request_id');
           $table->uuid('service_id');
            $table->string('service_code', 6)->unique();
            $table->enum('status', ['pending', 'done'])->default('pending');
            $table->timestamps();

            // Define the foreign key constraint
            $table->foreign('service_id')->references('service_id')->on('services')->onDelete('cascade');
        });
    }

    public function down(): void {
        Schema::dropIfExists('service_request');
    }
};
