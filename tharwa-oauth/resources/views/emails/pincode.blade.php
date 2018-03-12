@component('mail::message')
# Bonjour,

Voici votre code pin :

@component('mail::panel')
{{ $pincode }}
@endcomponent

## NB : ce code pin est valide pour une heure ( jusqu'à {{ $pin_code_expires_at }} )

Merci,<br>
{{ config('app.name') }}
@endcomponent
