<?php

namespace App\Http\Controllers\ExternalRequest;

use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class AnalisisGeospasial extends Controller
{
    private $baseUrl;

    public function __construct()
    {
        $this->baseUrl = env("URL_SERVICES_RS");
    }

    public function precipitation(Request $request)
    {
        $geometry = $request->input('geometry');
        $type = $request->input('type');
        $startYear = $request->input('startYear');
        $endYear = $request->input('endYear');

        $client = new Client;

        $url = $this->baseUrl . "/precipitation";
        $response = $client->post($url, [
            // 'headers' => $headers,
            'form_params' => [
                'geometry' => $geometry,
                'type' => $type,
                'startYear' => $startYear,
                'endYear' => $endYear,
            ]
        ]);
        $responseData = json_decode($response->getBody(), true);

        return response()->json($responseData);
    }

    public function vci(Request $request)
    {
        $geometry = $request->input('geometry');
        $type = $request->input('type');
        $startYear = $request->input('startYear');
        $endYear = $request->input('endYear');

        $client = new Client;
        $url = $this->baseUrl . "/vci";
        $response = $client->post($url, [
            'form_params' => [
                'geometry' => $geometry,
                'type' => $type,
                'startYear' => $startYear,
                'endYear' => $endYear,
            ]
        ]);
        $responseData = json_decode($response->getBody(), true);

        return response()->json($responseData);
    }

    public function evi(Request $request)
    {
        $geometry = $request->input('geometry');
        $type = $request->input('type');
        $startYear = $request->input('startYear');
        $endYear = $request->input('endYear');

        $client = new Client;
        $url = $this->baseUrl . "/evi";
        $response = $client->post($url, [
            'form_params' => [
                'geometry' => $geometry,
                'type' => $type,
                'startYear' => $startYear,
                'endYear' => $endYear,
            ]
        ]);
        $responseData = json_decode($response->getBody(), true);

        return response()->json($responseData);
    }
}
