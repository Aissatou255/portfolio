<?php

namespace App\Filament\Resources\CvEntries;

use App\Filament\Resources\CvEntries\Pages\CreateCvEntry;
use App\Filament\Resources\CvEntries\Pages\EditCvEntry;
use App\Filament\Resources\CvEntries\Pages\ListCvEntries;
use App\Filament\Resources\CvEntries\Schemas\CvEntryForm;
use App\Filament\Resources\CvEntries\Tables\CvEntriesTable;
use App\Models\CvEntry;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class CvEntryResource extends Resource
{
    protected static ?string $model = CvEntry::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'titre';

    protected static ?string $navigationLabel = 'Mon CV';

    protected static ?string $modelLabel = 'élément du CV';

    protected static ?string $pluralModelLabel = 'Éléments du CV';

    public static function form(Schema $schema): Schema
    {
        return CvEntryForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CvEntriesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListCvEntries::route('/'),
            'create' => CreateCvEntry::route('/create'),
            'edit' => EditCvEntry::route('/{record}/edit'),
        ];
    }
}
