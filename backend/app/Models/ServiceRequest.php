<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ServiceRequest extends Model
{
    use HasFactory;

    protected $table = 'service_request';
    protected $primaryKey = 'request_id';
    public $timestamps = true;

    protected $fillable = [
        'service_id',
        'service_code',
        'status',
    ];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class, 'service_id', 'service_id');
    }

    public function serviceRequestDone(): HasOne
    {
        return $this->hasOne(ServiceRequestDone::class, 'request_id', 'request_id');
    }
}
