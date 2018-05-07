@component('mail::message')
#Bonjour,

M.{{ $userName }}


Vous avez {{ ['effecté','recu', '' ][$type] }} un nouveau virement {{ ['entre vous comptes','', '' ][$type] }} {{ $status ? ', Dans un Etat : '. $status:'' }}.

@component('mail::panel')
Montant de {{ $amount }}, de {{ $_from }} {{ $_to ? 'vers '. $_to.' .' : '.' }}
@endcomponent


Merci pour votre confiance,<br>
{{ config('app.name') }}
@endcomponent
