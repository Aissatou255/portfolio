<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CvEntry;

class CvEntryController extends Controller
{
    public function index()
    {
        return CvEntry::orderBy('ordre')->orderBy('id')->get();
    }
}