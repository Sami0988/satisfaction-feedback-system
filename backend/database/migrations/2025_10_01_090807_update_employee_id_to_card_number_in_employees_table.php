<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */public function up(): void
    {
        // STEP 1: Temporarily drop all foreign key constraints from CHILD tables.
        // We drop these FIRST to remove the dependency on the 'employees' table.

        // Dependency 1: service_request_done
        Schema::table('service_request_done', function (Blueprint $table) {
            $table->dropForeign(['employee_id']);
        });

        // Dependency 2: service_requests (Conditional check added)
        if (Schema::hasColumn('service_requests', 'employee_id')) {
            Schema::table('service_requests', function (Blueprint $table) {
                $table->dropForeign(['employee_id']);
            });
        }

        // Dependency 3: feedback table (NEW REQUIREMENT)
        if (Schema::hasColumn('feedback', 'employee_id')) {
            Schema::table('feedback', function (Blueprint $table) {
                $table->dropForeign(['employee_id']);
            });
        }

        // STEP 2: Drop the Primary Key constraint on the PARENT table.
        // This must be done after foreign keys are dropped.
        Schema::table('employees', function (Blueprint $table) {
            $table->dropPrimary('employees_employee_id_primary');
        });

        // STEP 3: Change the column type in the PARENT table.
        Schema::table('employees', function (Blueprint $table) {
            $table->string('employee_id', 50)->change();
        });

        // STEP 4: Change the column type in the CHILD table(s).
        Schema::table('service_request_done', function (Blueprint $table) {
            $table->string('employee_id', 50)->change();
        });

        if (Schema::hasColumn('service_requests', 'employee_id')) {
            Schema::table('service_requests', function (Blueprint $table) {
                $table->string('employee_id', 50)->change();
            });
        }

        // Dependency 3: feedback table (NEW REQUIREMENT)
        if (Schema::hasColumn('feedback', 'employee_id')) {
            Schema::table('feedback', function (Blueprint $table) {
                $table->string('employee_id', 50)->change();
            });
        }

        // STEP 5: Re-apply primary and unique constraints on the PARENT table.
        Schema::table('employees', function (Blueprint $table) {
            $table->unique('employee_id');
            $table->primary('employee_id');
        });

        // STEP 6: Re-apply foreign key constraints on the CHILD table(s).
        Schema::table('service_request_done', function (Blueprint $table) {
            $table->foreign('employee_id')->references('employee_id')->on('employees')->cascadeOnDelete();
        });

        if (Schema::hasColumn('service_requests', 'employee_id')) {
            Schema::table('service_requests', function (Blueprint $table) {
                $table->foreign('employee_id')->references('employee_id')->on('employees')->cascadeOnDelete();
            });
        }

        // Dependency 3: feedback table (NEW REQUIREMENT)
        if (Schema::hasColumn('feedback', 'employee_id')) {
            Schema::table('feedback', function (Blueprint $table) {
                $table->foreign('employee_id')->references('employee_id')->on('employees')->cascadeOnDelete();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // 1. Drop Foreign Keys
        Schema::table('service_request_done', function (Blueprint $table) {
            $table->dropForeign(['employee_id']);
        });
        if (Schema::hasColumn('service_requests', 'employee_id')) {
            Schema::table('service_requests', function (Blueprint $table) {
                $table->dropForeign(['employee_id']);
            });
        }
        // Dependency 3: feedback table (NEW REQUIREMENT)
        if (Schema::hasColumn('feedback', 'employee_id')) {
            Schema::table('feedback', function (Blueprint $table) {
                $table->dropForeign(['employee_id']);
            });
        }

        // 2. Drop Primary Key
        Schema::table('employees', function (Blueprint $table) {
            $table->dropPrimary('employees_employee_id_primary');
        });

        // 3. Change Types back to UUID
        Schema::table('employees', function (Blueprint $table) {
            $table->uuid('employee_id')->change();
            $table->primary('employee_id');
        });

        Schema::table('service_request_done', function (Blueprint $table) {
            $table->uuid('employee_id')->change();
        });
        if (Schema::hasColumn('service_requests', 'employee_id')) {
            Schema::table('service_requests', function (Blueprint $table) {
                $table->uuid('employee_id')->change();
            });
        }
        // Dependency 3: feedback table (NEW REQUIREMENT)
        if (Schema::hasColumn('feedback', 'employee_id')) {
            Schema::table('feedback', function (Blueprint $table) {
                $table->uuid('employee_id')->change();
            });
        }

        // 4. Re-apply Foreign Keys
        Schema::table('service_request_done', function (Blueprint $table) {
            $table->foreign('employee_id')->references('employee_id')->on('employees')->cascadeOnDelete();
        });
        if (Schema::hasColumn('service_requests', 'employee_id')) {
            Schema::table('service_requests', function (Blueprint $table) {
                $table->foreign('employee_id')->references('employee_id')->on('employees')->cascadeOnDelete();
            });
        }
        // Dependency 3: feedback table (NEW REQUIREMENT)
        if (Schema::hasColumn('feedback', 'employee_id')) {
            Schema::table('feedback', function (Blueprint $table) {
                $table->foreign('employee_id')->references('employee_id')->on('employees')->cascadeOnDelete();
            });
        }
    }
};
