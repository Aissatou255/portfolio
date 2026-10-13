<?php

namespace Database\Seeders;

use App\Models\Achievement;
use App\Models\Skill;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        $competences = [
            ['titre' => 'Développement Front-End', 'description' => "HTML, CSS, JavaScript — création d'interfaces web modernes et responsives.", 'icone' => 'front'],
            ['titre' => 'Développement Back-End', 'description' => "PHP, Laravel, MySQL — construction d'API et de logique serveur robuste.", 'icone' => 'back'],
            ['titre' => 'Git & GitHub', 'description' => 'Gestion de versions et collaboration sur des projets de code.', 'icone' => 'git'],
            ['titre' => 'Tailwind CSS', 'description' => "Intégration rapide et propre d'interfaces avec des design systems modernes.", 'icone' => 'css'],
            ['titre' => 'Design graphique', 'description' => 'Création de logos et de cartes de visite sur mesure.', 'icone' => 'design'],
            ['titre' => 'Vidéaste', 'description' => 'Montage de vidéos publicitaires, du tournage à la version finale.', 'icone' => 'video'],
        ];

        foreach ($competences as $i => $competence) {
            Skill::updateOrCreate(
                ['titre' => $competence['titre']],
                $competence + ['ordre' => $i + 1]
            );
        }

        $realisations = [
            [
                'titre' => 'AgriSn',
                'description' => "Plateforme d'opportunités agricoles connectant les jeunes Sénégalais (18-35 ans) à l'agriculture, l'élevage, la production locale et la transformation. Projet réalisé lors d'un hackathon avec l'équipe NextGen Coders.",
                'lien' => 'https://github.com/PaulPhilippe08/AgriSn.git',
            ],
            [
                'titre' => 'Red Product',
                'description' => "Plateforme d'administration de gestion d'hôtels : backend Laravel, frontend React/Tailwind, authentification, upload d'images Cloudinary. Frontend déployé sur Vercel, backend sur Render.",
                'lien' => 'https://red-product-frontend-three.vercel.app',
            ],
        ];

        foreach ($realisations as $i => $realisation) {
            Achievement::updateOrCreate(
                ['titre' => $realisation['titre']],
                $realisation + ['ordre' => $i + 1]
            );
        }
    }
}