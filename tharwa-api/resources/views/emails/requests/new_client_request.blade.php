@component('mail::message')
# Bonjour,

Une nouvelle demande de creation de compte par :

@component('mail::panel')
M . {{ $clientName }}
@endcomponent

Merci,<br>
{{ config('app.name') }}
@endcomponent
