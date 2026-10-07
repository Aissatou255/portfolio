<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index()
    {
        return Skill::orderBy('ordre')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'icone' => 'nullable|string',
            'ordre' => 'nullable|integer',
        ]);

        return response()->json(Skill::create($data), 201);
    }

    public function update(Request $request, Skill $skill)
    {
        $data = $request->validate([
            'titre' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'icone' => 'nullable|string',
            'ordre' => 'nullable|integer',
        ]);

        $skill->update($data);

        return response()->json($skill);
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();

        return response()->json(['message' => 'Compétence supprimée']);
    }
}