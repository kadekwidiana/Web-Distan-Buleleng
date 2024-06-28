<?php

namespace App\Http\Controllers\Frontpage;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MapsController extends Controller
{
    public function index()
    {
        $subLayersData = [
            [
                "name" => "Padi",
                "icon" => "/assets/icons/icon-layer/padi.png",
                "latitude" => "1212",
                "longitude" => "2121"
            ],
            [
                "name" => "Jagung",
                "icon" => "/assets/icons/icon-layer/jagung.png",
                "latitude" => "1234",
                "longitude" => "2345"
            ],
            [
                "name" => "Kedelai",
                "icon" => "/assets/icons/icon-layer/kedelai.png",
                "latitude" => "1256",
                "longitude" => "2567"
            ],
        ];

        $dataSubLayers = array_map(function ($data, $i) {
            return [
                "id" => $i + 1,  
                "name" => $data["name"],
                "icon" => $data["icon"],
                "latitude" => $data["latitude"],
                "longitude" => $data["longitude"]
            ];
        }, $subLayersData, array_keys($subLayersData));

        $data = [
            [
                "id" => 1,
                'typeLayerName' => 'Pertanian',
                "layers" => [
                    [
                        "id" => 1,
                        "name" => "Tanaman Pangan",
                        "subLayers" => $dataSubLayers,
                    ],
                    [
                        "id" => 2,
                        "name" => "Holtikultura",
                        "subLayers" => [
                            [
                                "id" => 1,
                                "name" => "Sayur",
                                "icon" => "/assets/icons/icon-layer/sayur.png",
                                "latitude" => "1212",
                                "longitude" => "2121"
                            ],
                            [
                                "id" => 2,
                                "name" => "Buah",
                                "icon" => "/assets/icons/icon-layer/buah.png",
                                "latitude" => "1212",
                                "longitude" => "2121"
                            ]
                        ]
                    ]
                ]
            ],
            [
                "id" => 2,
                'typeLayerName' => 'Perkebunan',
                "layers" => [
                    [
                        "id" => 1,
                        "name" => "Padi",
                        "icon" => "/assets/icons/icon-layer/padi.png",
                        "latitude" => "1212",
                        "longitude" => "2121"
                    ],
                    [
                        "id" => 2,
                        "name" => "Jagung",
                        "icon" => "/assets/icons/icon-layer/jagung.png",
                        "latitude" => "1212",
                        "longitude" => "2121"
                    ]
                ]
            ]
        ];

        return Inertia::render('Frontpage/Maps/Index', [
            "dataLayers" => $data
        ]);
    }
}
