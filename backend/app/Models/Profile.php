<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom', 'titre', 'bio', 'sous_titre', 'photo',
        'email', 'telephone', 'ville', 'github', 'linkedin',
    ];

    protected $appends = ['photo_url'];

    protected function photoUrl(): Attribute
    {
        return Attribute::get(
            fn () => $this->photo ? asset('storage/' . $this->photo) : null
        );
    }
}