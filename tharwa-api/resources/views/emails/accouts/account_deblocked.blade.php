@component('mail::message')
# Bonjour,

Votre compte est débloqué

@component('mail::panel')
N° de compte {{ $accountNumber }}
@endcomponent

## Motif :
{{ $motif }}

Merci,<br>
{{ config('app.name') }}
@endcomponent
