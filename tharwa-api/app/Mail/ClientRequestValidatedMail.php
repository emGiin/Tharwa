<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ClientRequestValidatedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $userName;
    public $isAccepted;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($userName,$isAccepted)
    {
        $this->userName = $userName;
        $this->isAccepted = $isAccepted;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.requests.client_request_validated');

    }
}
