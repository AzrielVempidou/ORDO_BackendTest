<?php

namespace Database\Seeders;

use App\Models\Buku;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BukuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {   
        $faker = \Faker\Factory::create('id-ID');
        $statuses = ['Published', 'Not Published']; // Contoh status buku
        
        for ($i = 0; $i < 10; $i++) {
            Buku::create([
                'coverIMG' => $faker->imageUrl(),  // Menghasilkan URL gambar palsu
                'name' => $faker->sentence(3),  // Nama buku dengan 3 kata
                'author' => $faker->name(),  // Nama penulis
                'status' => $faker->randomElement($statuses),  // Status acak dari array
                'description' => $faker->paragraph(),  // Deskripsi buku
            ]);
        }
        // DB::table('buku')->insert([
            // 'coverIMG' => 'example.jpg',
            // 'name' => 'Contoh Buku',
            // 'author' => 'Penulis Contoh',
            // 'status' => 'Available',
            // 'description' => 'Deskripsi buku contoh',
        // ]);
    }
}
