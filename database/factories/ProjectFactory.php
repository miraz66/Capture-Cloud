<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use GuzzleHttp\Client;

class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Create a new Guzzle client
        $client = new Client();

        // Define your desired image category
        $categories = ['landscape', 'macro', 'wildlife', 'aerial', 'underwater', 'time_lapse', 'panoramic', 'abstract_nature', 'seasonal', 'night_sky', 'nature_textures', 'botanical_illustrations', 'environmental_impact', 'sunrise_and_sunset', 'natural_phenomena', 'sustainable_agriculture'];

        // Choose a random category
        $category = $this->faker->randomElement($categories);

        // Make a request to Unsplash API to get a random photo
        $response = $client->request('GET', 'https://api.unsplash.com/search/photos', [
            'query' => [
                'query' => $category,
                'client_id' => env('UNSPLASH_ACCESS_KEY')
            ]
        ]);

        // Decode the response JSON
        $responseData = json_decode($response->getBody()->getContents(), true);

        // Initialize image URL as null
        $imageUrl = "https://i.postimg.cc/RFQmKZCK/pngegg.png";

        // Check if the response contains results
        if (isset($responseData['results']) && count($responseData['results']) > 0) {
            // Select a random result from the response
            $randomResult = $this->faker->randomElement($responseData['results']);

            // Extract image URL from the selected result
            $imageUrl = $randomResult['urls']['regular'] ?? null;
        }

        // Provide a default image URL if no valid URL is found
        $defaultImageUrl = 'your_default_image_url_here';

        return [
            'feature' => $category,
            'image_path' => $imageUrl ?? $defaultImageUrl,
            'address' => $this->faker->address(),
            'description' => $this->faker->text(),
            'created_by' => 1,
            'updated_by' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
