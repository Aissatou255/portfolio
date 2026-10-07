<?php

namespace App\Filament\Resources\Profiles\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ProfileForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('nom')
                    ->label('Nom')
                    ->required()
                    ->maxLength(255),
                TextInput::make('titre')
                    ->label('Titre professionnel')
                    ->required()
                    ->maxLength(255),
                TextInput::make('sous_titre')
                    ->label('Sous-titre')
                    ->maxLength(255),
                Textarea::make('bio')
                    ->label('Biographie')
                    ->rows(6)
                    ->columnSpanFull(),
                FileUpload::make('photo')
                    ->label('Photo de profil')
                    ->image()
                    ->avatar()
                    ->disk('public')
                    ->visibility('public')
                    ->directory('profile')
                    ->imageEditor()
                    ->columnSpanFull(),
                TextInput::make('email')
                    ->label('Email')
                    ->email()
                    ->maxLength(255),
                TextInput::make('telephone')
                    ->label('Téléphone')
                    ->tel()
                    ->maxLength(50),
                TextInput::make('ville')
                    ->label('Ville')
                    ->maxLength(255),
                TextInput::make('github')
                    ->label('GitHub')
                    ->url()
                    ->maxLength(255),
                TextInput::make('linkedin')
                    ->label('LinkedIn')
                    ->url()
                    ->maxLength(255),
            ]);
    }
}