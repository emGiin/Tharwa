@component('mail::message')
# Bonjour,

Une demande de déblocage d'un compte a été effectué par:

@component('mail::panel')
M . {{ $clientName }}
@endcomponent

Merci,<br>
{{ config('app.name') }}
@endcomponent
