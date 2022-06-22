<?php

namespace App\Models;

use App\Models\Measurment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Part extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function type()
    {
        return $this->belongsTo(Type::class);
    }
    public function measurments()
    {
        return $this->hasMany(Measurment::class);
    }
}
