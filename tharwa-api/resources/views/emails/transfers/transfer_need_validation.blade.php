@component('mail::message')
# Bonjour,

Un nouveau virement qu'a besoin de validation, effectue par :

@component('mail::panel')
M . {{ $clientName }}
@endcomponent

Merci,<br>
{{ config('app.name') }}
@endcomponent
