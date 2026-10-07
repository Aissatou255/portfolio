<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\NewContactMessage;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'required|email',
            'sujet' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        $contactMessage = ContactMessage::create($data);

        // Envoi de l'e-mail : si ça échoue, le message reste enregistré en base.
        try {
            Mail::to(config('mail.from.address'))->send(new NewContactMessage($contactMessage));
        } catch (\Throwable $e) {
            report($e);
        }

        return response()->json(['message' => 'Message envoyé avec succès']);
    }

    public function index()
    {
        return ContactMessage::orderByDesc('created_at')->get();
    }

    public function markAsRead(ContactMessage $contactMessage)
    {
        $contactMessage->update(['lu' => true]);
        return response()->json($contactMessage);
    }

    public function destroy(ContactMessage $contactMessage)
    {
        $contactMessage->delete();
        return response()->json(['message' => 'Message supprimé']);
    }
}