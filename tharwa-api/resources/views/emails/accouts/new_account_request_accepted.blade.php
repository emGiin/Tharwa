@component('mail::message')
# Bonjour,

Votre demande de creation de compte {{ $type }} a est accpetée

Merci,<br>
{{ config('app.name') }}
@endcomponent
