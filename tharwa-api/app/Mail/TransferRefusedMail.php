<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class TransferRefusedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $clientName;
    public $transDate;
    public $amount;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($clientName,$transDate,$amount)
    {
        $this->clientName = $clientName;
        $this->transDate = $transDate;
        $this->amount = $amount;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.accouts.transfer_refused');
    }
}
