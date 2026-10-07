<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use Illuminate\Http\Request;

class AchievementController extends Controller
{
    // Public : liste des réalisations pour la page portfolio
    public function index()
    {
        return Achievement::orderBy('ordre')->orderByDesc('created_at')->get();
    }

    // Admin : créer une réalisation
    public function store(Request $request)
    {
        $data = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|string',
            'lien' => 'nullable|string',
            'ordre' => 'nullable|integer',
        ]);

        $achievement = Achievement::create($data);

        return response()->json($achievement, 201);
    }

    // Admin : modifier une réalisation
    public function update(Request $request, Achievement $achievement)
    {
        $data = $request->validate([
            'titre' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'image' => 'nullable|string',
            'lien' => 'nullable|string',
            'ordre' => 'nullable|integer',
        ]);

        $achievement->update($data);

        return response()->json($achievement);
    }

    // Admin : supprimer une réalisation
    public function destroy(Achievement $achievement)
    {
        $achievement->delete();

        return response()->json(['message' => 'Réalisation supprimée']);
    }
}