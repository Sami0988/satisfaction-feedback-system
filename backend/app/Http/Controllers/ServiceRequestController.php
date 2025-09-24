<?php

namespace App\Http\Controllers;

use App\Models\ServiceRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ServiceRequestController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'service_id' => 'required|exists:services,service_id',
        ]);

        $serviceCode = str_pad(mt_rand(1, 999999), 6, '0', STR_PAD_LEFT);

        $serviceRequest = ServiceRequest::create([
            'service_id' => $request->service_id,
            'service_code' => $serviceCode,
        ]);

       return response()->json([
    'message' => "Your request is sent successfully with service code {$serviceCode} save this service code."
]);
    }
}
