<?php

declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

final readonly class Register
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args): User
    {
        $user = User::create([
            'name' => $args['name'],
            'email' => $args['email'],
            'password' => $args['password'],
        ]);

        $guard = Auth::guard('web');
        $guard->login($user);

        return $user;
    }
}
