<?php

namespace App\Filament\Resources\Achievements\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class AchievementForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('titre')
                    ->label('Titre')
                    ->required()
                    ->maxLength(255),
                Textarea::make('description')
                    ->label('Description')
                    ->required()
                    ->rows(5)
                    ->columnSpanFull(),
                FileUpload::make('image')
                    ->label('Image du projet')
                    ->image()
                    ->disk('public')
                    ->visibility('public')
                    ->directory('achievements')
                    ->imageEditor()
                    ->columnSpanFull(),
                TextInput::make('lien')
                    ->label('Lien du projet')
                    ->url()
                    ->maxLength(255),
                TextInput::make('ordre')
                    ->label("Ordre d'affichage")
                    ->numeric()
                    ->default(0),
            ]);
    }
}