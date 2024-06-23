<?php

namespace App\Http\Controllers\Frontpage;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LayerController extends Controller
{
    public function dataLayer()
    {
        $data = [
            [
                "id" => 1,
                'typeLayerName' => 'Pertanian',
                "layers" => [
                    [
                        "id" => 1,
                        "name" => "Tanaman Pangan",
                        "subLayers" => [
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

        return response()->json($data);
    }
}
