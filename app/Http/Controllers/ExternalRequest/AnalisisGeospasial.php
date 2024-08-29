<?php

namespace App\Http\Controllers\ExternalRequest;

use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
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
        return $this->handleRequest('/precipitation', $request);
    }

    public function vci(Request $request)
    {
        return $this->handleRequest('/vci', $request);
    }

    public function evi(Request $request)
    {
        return $this->handleRequest('/evi', $request);
    }

    private function handleRequest($endpoint, Request $request)
    {
        $geometry = $request->input('geometry');
        $type = $request->input('type');
        $startYear = $request->input('startYear');
        $endYear = $request->input('endYear');

        $client = new Client;

        try {
            $response = $client->post($this->baseUrl . $endpoint, [
                'form_params' => [
                    'geometry' => $geometry,
                    'type' => $type,
                    'startYear' => $startYear,
                    'endYear' => $endYear,
                ]
            ]);

            $responseData = json_decode($response->getBody(), true);
            $statusCode = $response->getStatusCode();

            return response()->json($responseData, $statusCode);
        } catch (RequestException $e) {
            $response = $e->getResponse();

            if ($response) {
                $statusCode = $response->getStatusCode();
                $errorData = json_decode($response->getBody(), true);
            } else {
                $statusCode = 500;
                $errorData = ['error' => 'Server error or no response from the API'];
            }

            return response()->json($errorData, $statusCode);
        }
    }
}
