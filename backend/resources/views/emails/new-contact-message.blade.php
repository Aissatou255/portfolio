<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
</head>
<body style="font-family: Arial, sans-serif; color: #111111;">
    <h2>Nouveau message depuis votre portfolio</h2>

    <p><strong>Nom :</strong> {{ $contactMessage->nom }}</p>
    <p><strong>Email :</strong> {{ $contactMessage->email }}</p>
    <p><strong>Sujet :</strong> {{ $contactMessage->sujet ?: 'Aucun sujet' }}</p>

    <p><strong>Message :</strong></p>
    <p style="white-space: pre-line;">{{ $contactMessage->message }}</p>
</body>
</html>