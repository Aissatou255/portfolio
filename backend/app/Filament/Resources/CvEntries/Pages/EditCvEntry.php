<?php

namespace App\Filament\Resources\CvEntries\Pages;

use App\Filament\Resources\CvEntries\CvEntryResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditCvEntry extends EditRecord
{
    protected static string $resource = CvEntryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
