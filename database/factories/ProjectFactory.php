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
        $categories = [
            'Animals',
            'Architecture',
            'Art',
            'Automotive',
            'Backgrounds',
            'Beauty',
            'Black and White',
            'Blogs',
            'Business',
            'Celebrities',
            'Cityscapes',
            'Commercial',
            'Computers',
            'Conceptual',
            'Creative',
            'Culture',
            'Dance',
            'Design',
            'Documentary',
            'Dramatic',
            'Education',
            'Emotions',
            'Environmental',
            'Events',
            'Family',
            'Fashion',
            'Festivals',
            'Fine Art',
            'Fitness',
            'Food',
            'Gardens',
            'Health',
            'Hobbies',
            'Holidays',
            'Home',
            'Industrial',
            'Interior Design',
            'Jewelry',
            'Journals',
            'Kids',
            'Landscape',
            'Lifestyle',
            'Love',
            'Macro',
            'Medical',
            'Minimalism',
            'Mobile',
            'Monochrome',
            'Mountains',
            'Music',
            'Nature',
            'News',
            'Night',
            'Ocean',
            'Outdoors',
            'Patterns',
            'People',
            'Performance',
            'Pets',
            'Plants',
            'Portraits',
            'Real Estate',
            'Religion',
            'Rural',
            'Science',
            'Seasons',
            'Shopping',
            'Signs',
            'Social Media',
            'Space',
            'Sports',
            'Still Life',
            'Street',
            'Summer',
            'Technology',
            'Textures',
            'Time-lapse',
            'Tourism',
            'Transportation',
            'Travel',
            'Trees',
            'Typography',
            'Urban',
            'Vintage',
            'Water',
            'Weather',
            'Wellness',
            'Wildlife',
            'Winter',
            'Workplace',
            'Yoga',
            'Zen',
            'Architecture & Interiors',
            'Street Photography',
            '3D Renders',
            'Spirituality',
            'Athletics',
            'Editorial',
            'Experimental',
            'Film',
            'Fashion & Beauty',
            'Interiors',
            'Business & Work',
            'Colorful',
            'History',
            'Night Sky',
            'Seasonal Events',
            'Sustainable Agriculture',
            'Natural Phenomena',
            'Botanical Illustrations',
            'Environmental Impact',
            'Sunrise and Sunset',
            'Sustainable Living',
            'Technology Innovations',
            'Adventure',
            'Artistic Photography',
            'Aesthetic',
            'Urban Exploration',
            'Candid Moments',
            'Family Gatherings',
            'Cultural Events',
            'Photographic Art',
            'Nature Textures',
            'Panoramic Views',
            ' Lifestyle Photography',
            'Travel Diaries',
            'Architectural Marvels',
            'Environmental Awareness',
            'Street Art',
            'Iconic Landmarks',
            'Historical Moments',
            'Culinary Arts',
            'Festive Celebrations'
        ];

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
