<?php

declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

final readonly class Logout
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args): ?User
    {
        $guard = Auth::guard('web');
        $user = $guard->user();

        if ($user) {
            $guard->logout();
            request()->session()->invalidate();
            request()->session()->regenerateToken();
        }

        return $user;
    }
}
