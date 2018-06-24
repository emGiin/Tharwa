@component('mail::message')
# Bonjour,

Une nouvelle demande de creation d'un compte {{ $accountType }} par :

@component('mail::panel')
M . {{ $clientName }}
@endcomponent

Merci,<br>
{{ config('app.name') }}
@endcomponent
