@component('mail::message')
# Bonjour,

Votre ordre de virement qui a été effectué a {{ $transDate }}

@component('mail::panel')
A été accepté
@endcomponent

Merci,<br>
{{ config('app.name') }}
@endcomponent
