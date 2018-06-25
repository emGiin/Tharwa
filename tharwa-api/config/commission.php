<?php

//Courant vers épargne Gratuit
//Epargne vers courant 0.10 % du montant
//Courant vers devise 2.00 % du montant
//Devise vers courant 1.5% du montant converti
//Vers un autre client THARWA 1% du montant
//Vers un client d’une autre banque 2% du montant
//Virement reçu depuis une autre banque 0.5% du montant
//Commission mensuelle frais de gestion compte courant //100 DA
//Commission mensuelle frais de gestion compte épargne //50 DA
//Commission mensuelle frais de gestion compte devise  //200 DA

return [

    'COUR_EPART' => 0,
    'EPART_COUR' => 0.001, //0.10 %
    'COUR_DEV' => 0.02,//2.00 %
    'DEV_COUR' => 0.015,//1.5%
    'COUR_COUR' => 0.01, //1%
    'SENDEXTBANK' => 0.02,
    'RECVEXTBANK' => 0.005,

    'MONTHCOUR' => 100,//100 DA
    'MONTHEPART' => 50,//50 DA
    'MONTHDEV' => 200,//200 DA
];