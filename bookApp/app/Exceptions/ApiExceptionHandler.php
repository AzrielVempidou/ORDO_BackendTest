<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

class ApiExceptionHandler
{
    /**
     * Handle exceptions and return a unified error response.
     */
    public static function handleException(Exception $e): JsonResponse
    {
        if ($e instanceof ModelNotFoundException) {
            return response()->json([
                'status' => false,
                'message' => 'Data tidak ditemukan'
            ], 404);
        }

        if ($e instanceof ValidationException) {
            return response()->json([
                'status' => false,
                'message' => 'Validasi gagal: ' . $e->getMessage()
            ], 422);
        }

        return response()->json([
            'status' => false,
            'message' => 'Terjadi kesalahan: ' . $e->getMessage()
        ], 500);
    }
}
