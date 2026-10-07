<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    // Public : renvoie le profil (le crée avec des valeurs par défaut s'il n'existe pas encore)
    public function show()
    {
        $profile = Profile::first();

        if (! $profile) {
            $profile = Profile::create([
                'nom' => 'Aïssatou Dia',
                'titre' => 'Développeuse Web Full Stack',
                'email' => 'diaaicha2021@gmail.com',
                'telephone' => '+221 77 658 88 79',
                'ville' => 'Dakar, Sénégal',
                'github' => 'https://github.com/Aissatou255',
            ]);
        }

        return $profile;
    }

    // Admin : met à jour le profil
    public function update(Request $request)
    {
        $data = $request->validate([
            'nom' => 'sometimes|string|max:255',
            'titre' => 'sometimes|string|max:255',
            'bio' => 'nullable|string',
            'sous_titre' => 'nullable|string|max:255',
            'photo' => 'nullable|string',
            'email' => 'nullable|string|max:255',
            'telephone' => 'nullable|string|max:50',
            'ville' => 'nullable|string|max:255',
            'github' => 'nullable|string|max:255',
            'linkedin' => 'nullable|string|max:255',
        ]);

        $profile = Profile::first();
        if (! $profile) {
            $profile = Profile::create($data);
        } else {
            $profile->update($data);
        }

        return response()->json($profile);
    }
}