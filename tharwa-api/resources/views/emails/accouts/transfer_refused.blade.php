@component('mail::message')
# Bonjour,

Votre virement vers {{ $clientName }}, effectué a {{ $transDate }} avec le montant {{ $amount }}

@component('mail::panel')
A ete refusé
@endcomponent

Merci,<br>
{{ config('app.name') }}
@endcomponent

