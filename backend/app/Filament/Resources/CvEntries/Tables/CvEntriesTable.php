<?php

namespace App\Filament\Resources\CvEntries\Tables;

use App\Filament\Resources\CvEntries\Schemas\CvEntryForm;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class CvEntriesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('section')
                    ->label('Section')
                    ->badge()
                    ->formatStateUsing(fn ($state) => CvEntryForm::SECTIONS[$state] ?? $state)
                    ->sortable(),
                TextColumn::make('titre')
                    ->label('Titre')
                    ->searchable()
                    ->limit(50),
                TextColumn::make('periode')
                    ->label('Période'),
                TextColumn::make('ordre')
                    ->label('Ordre')
                    ->sortable(),
            ])
            ->defaultSort('ordre')
            ->filters([
                SelectFilter::make('section')
                    ->label('Section')
                    ->options(CvEntryForm::SECTIONS),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}