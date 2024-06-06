<?php

// app/Providers/UnsplashService.php
namespace App\Providers;

use GuzzleHttp\Client;

class UnsplashService
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => 'https://api.unsplash.com/',
            'headers' => [
                'Accept-Version' => 'v1',
                'Authorization' => 'ZKtrh4DYSC7gHvf7DUubAjDEw44h7JIoAtANXWOrDBs',
            ],
        ]);
    }

    public function getRandomPhoto()
    {
        $response = $this->client->request('GET', 'photos/random');
        $photoData = json_decode($response->getBody()->getContents(), true);
        return $photoData['urls']['regular'];
    }
}
