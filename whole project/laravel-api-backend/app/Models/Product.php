<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product',
        'pdimg',
        'tags',
        'manufacturer',
        'price',
        'quantity',
        'description',
    ];

    // many products -> one vendor
    public function Vendor(){
        return $this->belongsTo(Vendor::class,'user_id');
    }


}
