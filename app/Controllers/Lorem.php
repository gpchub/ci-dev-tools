<?php

namespace App\Controllers;

class Lorem extends BaseController
{
    public function index(): string
    {
        $page_title = 'Lorem Ipsum Generator';
        return view('lorem', compact('page_title'));
    }

    public function listGenerator()
    {
        $page_title = 'Tạo danh sách';
        $categories = [
            // General Interest
            "News and Current Events",
            "Lifestyle",
            "Entertainment",
            "Travel",
            "Food and Cooking",

            // Specific Interests
            "Technology",
            "Business and Finance",
            "Science and Nature",
            "Arts and Culture",
            "History and Biography",
            "Hobbies and Crafts",
            "Sports",
            "Health and Wellness",
            "Parenting",

            // Niche Interests
            "Gaming",
            "Anime and Manga",
            "Cosplay",
            "Sci-Fi and Fantasy",
            "Horror",

            // Additional Categories
            "Fashion",
            "Beauty",
            "Fitness",
            "Home Decor",
            "Interior Design",
            "Gardening",
            "DIY",
            "Photography",
            "Writing",
            "Music",
            "Art",
            "Literature",
            "Poetry",
            "Visual Arts",
            "Design",
            "Architecture",
            "Psychology",
            "Sociology",
            "Philosophy",
            "Religion",
            "Spirituality",
            "Politics",
            "Economics",
            "Education",
            "Careers",
            "Automotive",
            "Pets",
            "Outdoor Activities",
            "Adventure",
            "Luxury",
            "Sustainable Living",
            "Social Issues",
        ];

        return view('lorem/list-generator', compact('page_title', 'categories'));
    }


}
