<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class AccountDeblockedRequestMail extends Mailable
{
    use Queueable, SerializesModels;

    public $clientName;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($clientName)
    {
        $this->clientName = $clientName;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.accouts.account_deblock_request');
    }
}
