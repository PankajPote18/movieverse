<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SettingsPage;

class SettingsPageSeeder extends Seeder
{
    public function run(): void
    {
        $pages = [
            [
                'title' => 'About Us',
                'slug' => 'about-us',
                'short_description' => 'Learn more about our company and mission.',
                'full_content' => '<h2>Welcome to MovieVerse</h2><p>We are a leading provider of digital content.</p>',
                'status' => true,
            ],
            [
                'title' => 'Privacy Policy',
                'slug' => 'privacy-policy',
                'short_description' => 'How we handle your data.',
                'full_content' => '<h2>Privacy Policy</h2><p>We take your privacy seriously. All data is encrypted.</p>',
                'status' => true,
            ],
            [
                'title' => 'Refund Policy',
                'slug' => 'refund-policy',
                'short_description' => 'Our policy for handling refunds.',
                'full_content' => '<h2>Refund Policy</h2><p>Refunds are processed within 5-7 business days if applicable.</p>',
                'status' => true,
            ],
            [
                'title' => 'Terms and Conditions',
                'slug' => 'terms-and-conditions',
                'short_description' => 'Rules and guidelines for using our service.',
                'full_content' => '<h2>Terms and Conditions</h2><p>By using this service, you agree to abide by our rules.</p>',
                'status' => true,
            ],
        ];

        foreach ($pages as $page) {
            SettingsPage::updateOrCreate(
                ['slug' => $page['slug']],
                $page
            );
        }
    }
}
