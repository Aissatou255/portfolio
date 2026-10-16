<?php

namespace Database\Seeders;

use App\Models\CvEntry;
use App\Models\Profile;
use Illuminate\Database\Seeder;

class CvSeeder extends Seeder
{
    public function run(): void
    {
        $profil = Profile::first() ?? Profile::create([
            'nom' => 'Aïssatou Dia',
            'titre' => 'Développeuse Web Full Stack',
        ]);

        if (blank($profil->cv_intro)) {
            $profil->update([
                'cv_intro' => "Étudiante en Licence 2 en développement web à AFI l'UE, sérieuse, dynamique et motivée. Capable de gérer des situations imprévues et de travailler sous pression.",
            ]);
        }

        $elements = [
            ['formation', "Licence 2 en développement web — AFI l'UE", '2026', null],
            ['formation', 'Baccalauréat — David Diop Mendès', '2024', null],
            ['competences', 'Développement web (bases)', null, null],
            ['competences', 'Gestion du stress et des situations imprévues', null, null],
            ['competences', 'Travail en équipe', null, null],
            ['competences', 'Communication', null, null],
            ['experience', 'Participante — compétition nationale de débat', '2023/2024', "Développement de la communication orale\nArgumentation et esprit critique\nGestion du stress et des situations de tension"],
            ['langues', 'Français', null, null],
            ['langues', 'Anglais', null, null],
            ['objectifs', 'Acquérir une expérience professionnelle en développement web.', null, null],
            ['interets', 'Débats', null, null],
            ['interets', 'Technologie', null, null],
            ['interets', 'Travail collaboratif', null, null],
        ];

        foreach ($elements as $i => [$section, $titre, $periode, $details]) {
            CvEntry::updateOrCreate(
                ['section' => $section, 'titre' => $titre],
                ['periode' => $periode, 'details' => $details, 'ordre' => $i + 1]
            );
        }
    }
}