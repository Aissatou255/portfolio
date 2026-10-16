<?php

namespace App\Filament\Widgets;

use App\Models\Achievement;
use App\Models\ContactMessage;
use App\Models\Profile;
use App\Models\Skill;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class PortfolioStats extends StatsOverviewWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $total = ContactMessage::count();
        $nonLus = ContactMessage::where('lu', false)->count();

        $debutMois = now()->startOfMonth();
        $debutMoisPrecedent = now()->startOfMonth()->subMonth();
        $finMoisPrecedent = $debutMoisPrecedent->copy()->endOfMonth();

        $ceMois = ContactMessage::where('created_at', '>=', $debutMois)->count();
        $moisPrecedent = ContactMessage::whereBetween('created_at', [$debutMoisPrecedent, $finMoisPrecedent])->count();
        $tendance = $moisPrecedent > 0 ? (int) round((($ceMois - $moisPrecedent) / $moisPrecedent) * 100) : null;

        $derniersJours = collect(range(6, 0))
            ->map(fn ($i) => ContactMessage::whereDate('created_at', now()->subDays($i))->count())
            ->all();

        $nbCompetences = Skill::count();
        $nbRealisations = Achievement::count();
        $avecImage = Achievement::whereNotNull('image')->where('image', '!=', '')->count();

        $champs = ['nom', 'titre', 'sous_titre', 'bio', 'photo', 'email', 'telephone', 'ville', 'github', 'linkedin'];
        $profil = Profile::first();
        $remplis = $profil ? collect($champs)->filter(fn ($champ) => filled($profil->{$champ}))->count() : 0;
        $pourcentage = (int) round(($remplis / count($champs)) * 100);

        return [
            Stat::make('Messages reçus', $total)
                ->description('Depuis le début')
                ->descriptionIcon('heroicon-m-envelope')
                ->chart($derniersJours)
                ->color('primary'),

            Stat::make('Messages non lus', $nonLus)
                ->description($nonLus > 0 ? 'À lire dans « Contact messages »' : 'Tout est lu')
                ->descriptionIcon($nonLus > 0 ? 'heroicon-m-bell-alert' : 'heroicon-m-check-circle')
                ->color($nonLus > 0 ? 'warning' : 'success'),

            Stat::make('Messages ce mois-ci', $ceMois)
                ->description($tendance === null
                    ? 'Pas de comparaison possible'
                    : (($tendance >= 0 ? '+' : '') . $tendance . ' % par rapport au mois dernier'))
                ->descriptionIcon($tendance !== null && $tendance < 0
                    ? 'heroicon-m-arrow-trending-down'
                    : 'heroicon-m-arrow-trending-up')
                ->color($tendance !== null && $tendance < 0 ? 'danger' : 'success'),

            Stat::make('Compétences', $nbCompetences)
                ->description('Affichées dans « Ce que je fais »')
                ->descriptionIcon('heroicon-m-light-bulb')
                ->color('info'),

            Stat::make('Réalisations', $nbRealisations)
                ->description($avecImage . ' avec image sur ' . $nbRealisations)
                ->descriptionIcon('heroicon-m-photo')
                ->color($nbRealisations > 0 && $avecImage < $nbRealisations ? 'warning' : 'success'),

            Stat::make('Profil complété', $pourcentage . ' %')
                ->description($remplis . ' champs remplis sur ' . count($champs))
                ->descriptionIcon('heroicon-m-user-circle')
                ->color($pourcentage >= 80 ? 'success' : 'warning'),
        ];
    }
}