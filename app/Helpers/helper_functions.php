<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Storage;

function generateUnsplashImage($folder_name) {
    $filename = uniqid() . '.jpg';

    // Storage::disk('public')->put($folder_name . '/' . $filename, file_get_contents('https://source.unsplash.com/random'));
    Storage::disk('public')->put($folder_name . '/' . $filename, file_get_contents('https://picsum.photos/200/300'));
    // Storage::disk('public')->put($folder_name . '/' . $filename, file_get_contents('https://loremflickr.com/320/240'));

    return 'storage/' . $folder_name . '/' . $filename;
}

function deleteStorageImage($url) {
    $path = str_replace('storage/', '', $url);

    if (Storage::disk('public')->exists($path)) {
        Storage::disk('public')->delete($path);
    }
}
