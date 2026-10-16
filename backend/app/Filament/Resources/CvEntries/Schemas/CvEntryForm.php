<?php

namespace App\Filament\Resources\CvEntries\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class CvEntryForm
{
    public const SECTIONS = [
        'formation' => 'Formation',
        'competences' => 'Compétences',
        'experience' => 'Expérience',
        'langues' => 'Langues',
        'objectifs' => 'Objectifs',
        'interets' => "Centres d'intérêt",
    ];

    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('section')
                    ->label('Section du CV')
                    ->options(self::SECTIONS)
                    ->required()
                    ->helperText('Formation et Expérience affichent un titre et une période. Les autres sections affichent seulement le titre, une ligne par élément.'),
                TextInput::make('titre')
                    ->label('Titre')
                    ->required()
                    ->maxLength(255),
                TextInput::make('periode')
                    ->label('Période (facultatif)')
                    ->placeholder('2023/2024')
                    ->maxLength(100),
                Textarea::make('details')
                    ->label('Détails (facultatif : une ligne = une puce)')
                    ->rows(4)
                    ->columnSpanFull()
                    ->helperText('Surtout utile pour une expérience.'),
                TextInput::make('ordre')
                    ->label("Ordre d'affichage")
                    ->numeric()
                    ->default(0),
            ]);
    }
}