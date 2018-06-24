@component('mail::message')
# Bonjour,

Veuillez trouver ci-joint les fichiers XML des virement emis du Tharwa vers vous compts (sous format zip)

@component('mail::panel')
pour la journée {{ $date_->format('Y-m-d') }}
@endcomponent

Merci,<br>
{{ config('app.name') }}
@endcomponent
