<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class TransferOrdreRefusedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $creationDate;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($creationDate)
    {
        $this->creationDate = $creationDate;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.accouts.transfer_ordre_refused');
    }
}
