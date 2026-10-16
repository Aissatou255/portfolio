<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CvEntry extends Model
{
    use HasFactory;

    protected $fillable = ['section', 'titre', 'periode', 'details', 'ordre'];
}