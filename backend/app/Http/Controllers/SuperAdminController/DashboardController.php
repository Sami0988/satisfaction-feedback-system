<?php

namespace App\Http\Controllers\SuperAdminController;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\Employee;
use App\Models\ServiceRequest;
use App\Models\ServiceRequestDone; // Assuming you have this model
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with key metrics.
     */
    public function show()
    {
        // Retrieve the total number of departments
        $totalDepartments = Department::count();

        // Retrieve the number of active departments (assuming an 'active' column exists)
        //$activeDepartments = Department::where('active', true)->count();

        // Retrieve the total number of employees
        $totalEmployees = Employee::count();


        // Retrieve the total amount of requested services
        $totalRequestedServices = ServiceRequest::count();

        // Retrieve the number of provided services (from the 'service_request_done' table)
        // Note: You must have a 'ServiceRequestDone' model that corresponds to your table.
        $totalProvidedServices = ServiceRequestDone::count();

        // Create an array to hold all the data
        $dashboardData = [
            'departments' => [
                'total' => $totalDepartments,

            ],

            'employees' => [
                'total' => $totalEmployees,
            ],
            'services' => [
                'requested' => $totalRequestedServices,
                'provided' => $totalProvidedServices,
            ],
        ];

        // Pass the data to the dashboard view
        return response()->json([
    'message' => "the supper Admin Dashboard information will be diplayed."
]);

    }
}
