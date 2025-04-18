<?php

declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\User;

final readonly class Register
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        // $validated = validator($args, [
        //     'email' => 'required|email|unique:users,email',
        //     'name' => 'required|string|max:255',
        //     'password' => 'required|min:6',
        // ])->validate();

        $user = User::create([
            'name' => $args['name'],
            'email' => $args['email'],
            'password' => $args['password'],
        ]);
    }
}
