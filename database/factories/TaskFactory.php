<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title'=> $this->faker->realText(rand(15,40)),
            'image'=> $this->faker->imageUrl(360, 360, 'animals', true, 'cats'),
            'original_image'=> $this->faker->imageUrl(360, 360, 'animals', true, 'cats'),
            'created_at'=> now(),
            'updated_at'=> now(),
        ];
    }
}
