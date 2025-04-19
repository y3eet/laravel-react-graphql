<?php

declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\User;
use Dotenv\Exception\ValidationException;
use Illuminate\Support\Facades\Auth;

final readonly class Register
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args): User
    {
        User::create([
            'name' => $args['name'],
            'email' => $args['email'],
            'password' => $args['password'],
        ]);

        Auth::attempt(['email' => $args['email'], 'password' => $args['password']]);
        return Auth::user();
    }
}
