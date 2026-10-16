<?php

namespace App\Filament\Widgets;

use App\Models\ContactMessage;
use Filament\Widgets\ChartWidget;

class MessagesChart extends ChartWidget
{
    protected ?string $heading = 'Messages reçus (30 derniers jours)';

    protected static ?int $sort = 2;

    protected int | string | array $columnSpan = 'full';

    protected function getData(): array
    {
        $debut = now()->subDays(29)->startOfDay();

        $parJour = ContactMessage::where('created_at', '>=', $debut)
            ->get()
            ->groupBy(fn ($message) => $message->created_at->format('Y-m-d'))
            ->map(fn ($groupe) => $groupe->count());

        $jours = collect(range(29, 0))->map(fn ($i) => now()->subDays($i));

        return [
            'datasets' => [
                [
                    'label' => 'Messages',
                    'data' => $jours->map(fn ($jour) => $parJour->get($jour->format('Y-m-d'), 0))->all(),
                    'borderColor' => '#ec4899',
                    'backgroundColor' => 'rgba(236, 72, 153, 0.15)',
                    'fill' => true,
                    'tension' => 0.3,
                ],
            ],
            'labels' => $jours->map(fn ($jour) => $jour->format('d/m'))->all(),
        ];
    }

    protected function getOptions(): array
    {
        return [
            'scales' => [
                'y' => [
                    'beginAtZero' => true,
                    'ticks' => ['precision' => 0],
                ],
            ],
            'plugins' => [
                'legend' => ['display' => false],
            ],
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}