@component('mail::message')
# Bonjour,

M.{{ $userName }}

Aprés une étude de votre demande de creation de compte, l'admisnistration a decidée de

@component('mail::panel')
{{ ($isAccepted === 1) ? 'Acceptée votre demmande' : 'Rejtée votre demmande' }}
@endcomponent

##{{ ($isAccepted === 1) ? 'Nous somme content de vous voire !' : 'Nous somme désole pour cette nouvelle' }}

Merci pour votre confiance,<br>
{{ config('app.name') }}
@endcomponent
