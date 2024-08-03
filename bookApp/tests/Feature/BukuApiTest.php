<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Buku;

class ApiBukuTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_get_all_buku()
    {
        $buku = Buku::factory()->count(3)->create();

        $response = $this->getJson('/api/bukus');

        $response->assertStatus(200)
                 ->assertJson([
                     'status' => true,
                     'message' => 'Data ditemukan',
                     'data' => $buku->map(function ($buku) {
                         return [
                             'id' => $buku->id,
                             'name' => $buku->name,
                             'author' => $buku->author,
                             'coverIMG' => $buku->coverIMG,
                             'status' => $buku->status,
                             'description' => $buku->description,
                         ];
                     })->toArray()
                 ]);
    }

    /** @test */
    public function it_can_create_a_buku()
    {
        $data = [
            'coverIMG' => 'cover_image_url',
            'name' => 'Buku Baru',
            'author' => 'Penulis Baru',
            'status' => 'Available',
            'description' => 'Deskripsi Buku Baru',
        ];

        $response = $this->postJson('/api/bukus', $data);

        $response->assertStatus(201)
                 ->assertJson([
                     'status' => true,
                     'message' => 'Buku berhasil dibuat',
                 ]);

        $this->assertDatabaseHas('bukus', $data);
    }

    /** @test */
    public function it_can_get_a_buku_by_id()
    {
        $buku = Buku::factory()->create();

        $response = $this->getJson("/api/bukus/{$buku->id}");

        $response->assertStatus(200)
                 ->assertJson([
                     'status' => true,
                     'message' => 'Data ditemukan',
                     'data' => [
                         'id' => $buku->id,
                         'name' => $buku->name,
                         'author' => $buku->author,
                         'coverIMG' => $buku->coverIMG,
                         'status' => $buku->status,
                         'description' => $buku->description,
                     ],
                 ]);
    }

    /** @test */
    public function it_can_update_a_buku()
    {
        $buku = Buku::factory()->create();

        $data = [
            'coverIMG' => 'updated_cover_image_url',
            'name' => 'Buku Diperbarui',
            'author' => 'Penulis Diperbarui',
            'status' => 'Unavailable',
            'description' => 'Deskripsi Buku Diperbarui',
        ];

        $response = $this->putJson("/api/bukus/{$buku->id}", $data);

        $response->assertStatus(200)
                 ->assertJson([
                     'status' => true,
                     'message' => 'Buku berhasil diperbarui',
                     'data' => $data,
                 ]);

        $this->assertDatabaseHas('bukus', $data);
    }

    /** @test */
    public function it_can_delete_a_buku()
    {
        $buku = Buku::factory()->create();

        $response = $this->deleteJson("/api/bukus/{$buku->id}");

        $response->assertStatus(200)
                 ->assertJson([
                     'status' => true,
                     'message' => 'Buku berhasil dihapus',
                 ]);

        $this->assertDatabaseMissing('bukus', ['id' => $buku->id]);
    }

    /** @test */
    public function it_can_search_buku_by_name_and_author()
    {
        Buku::factory()->create([
            'name' => 'Buku Dicari',
            'author' => 'Penulis Dicari',
        ]);

        $response = $this->getJson('/api/bukus/search?query=Buku Dicari');

        $response->assertStatus(200)
                 ->assertJson([
                     'status' => true,
                     'message' => 'Data ditemukan',
                     'data' => [
                         [
                             'name' => 'Buku Dicari',
                             'author' => 'Penulis Dicari',
                         ],
                     ],
                 ]);
    }

    /** @test */
    public function it_returns_error_when_search_query_is_empty()
    {
        $response = $this->getJson('/api/bukus/search?query=');

        $response->assertStatus(400)
                 ->assertJson([
                     'status' => false,
                     'message' => 'Query tidak boleh kosong',
                 ]);
    }
}
