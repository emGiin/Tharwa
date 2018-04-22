
<virement>
    <numero>{{ $code }}</numero>
    <date>{{ $date }}</date>
    <titulaire>
        <nom>{{ $senderName }}</nom>
        <banque>THW</banque>
        <compte>{{ $senderAccount }}</compte>
    </titulaire>
    <destinataire>
        <nom>{{ $receiverName }}</nom>
        <banque>{{ $receiverBank }}</banque>
        <compte>{{ $receiverAccount }}</compte>
    </destinataire>
    <montant>{{ $amount }}</montant>
    <motif>{{ $reason }}</motif>
</virement>