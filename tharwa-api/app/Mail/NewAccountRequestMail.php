<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class NewAccountRequestMail extends Mailable
{
    use Queueable, SerializesModels;

    public $clientName;
    public $accountType;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($clientName,$accountType)
    {
        $this->clientName = $clientName;
        $this->accountType = $accountType;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.accouts.new_account_request');
    }
}
