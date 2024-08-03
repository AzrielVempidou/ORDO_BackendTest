<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use Illuminate\Http\Request;
use App\Exceptions\ApiExceptionHandler;
use Exception;

class ApiBukuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $data = Buku::orderBy('name', 'asc')->get();
            return response()->json([
                'status' => true,
                'message' => 'Data ditemukan',
                'data' => $data
            ], 200);
        } catch (Exception $e) {
            return ApiExceptionHandler::handleException($e);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {

            $dataBuku = new Buku;
            $dataBuku-> coverIMG = $request->coverIMG;
            $dataBuku-> name = $request->name;
            $dataBuku-> author = $request->author;
            $dataBuku-> status = $request->status;
            $dataBuku-> description = $request->description;
          
            $post = $dataBuku->save();
            return response()->json([
                'status' => true,
                'message' => 'Buku berhasil dibuat',
            ], 201);
        } catch (Exception $e) {
            return ApiExceptionHandler::handleException($e);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $buku = Buku::findOrFail($id);

            return response()->json([
                'status' => true,
                'message' => 'Data ditemukan',
                'data' => $buku
            ], 200);
        } catch (Exception $e) {
            return ApiExceptionHandler::handleException($e);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $buku = Buku::findOrFail($id);

            $request->validate([
                'coverIMG' => 'string',
                'name' => 'string',
                'author' => 'string',
                'status' => 'string',
                'description' => 'string',
            ]);

            $buku->update($request->all());

            return response()->json([
                'status' => true,
                'message' => 'Buku berhasil diperbarui',
                'data' => $buku
            ], 200);
        } catch (Exception $e) {
            return ApiExceptionHandler::handleException($e);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $buku = Buku::findOrFail($id);
            $buku->delete();

            return response()->json([
                'status' => true,
                'message' => 'Buku berhasil dihapus'
            ], 200);
        } catch (Exception $e) {
            return ApiExceptionHandler::handleException($e);
        }
    }

    /**
     * Search for books based on name and author.
     */
    public function search($query)
    {
        try {
            if (empty($query)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Query tidak boleh kosong'
                ], 400);
            }
    
            $books = Buku::where('name', 'LIKE', "%{$query}%")
                         ->orWhere('author', 'LIKE', "%{$query}%")
                         ->get();
    
            return response()->json([
                'status' => true,
                'message' => 'Data ditemukan',
                'data' => $books
            ], 200);
    
        } catch (Exception $e) {
            return ApiExceptionHandler::handleException($e);
        }
    }
    
    
}
