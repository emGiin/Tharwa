<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class AccountDeblockedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $accountNumber;
    public $motif;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($accountNumber,$motif)
    {
        $this->accountNumber = $accountNumber;
        $this->motif = $motif;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.accouts.account_deblocked');
    }
}
