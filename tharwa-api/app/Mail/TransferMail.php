<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class TransferMail extends Mailable
{
    use Queueable, SerializesModels;

    public $userName;
    public $type;
    public $status;
    public $_from;
    public $_to;
    public $amount;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($userName,$type ,$_from,$_to,$amount,$status)
    {
        $this->userName = $userName;
        $this->type = $type;
        $this->_from = $_from;
        $this->_to = $_to;
        $this->amount = $amount;
        $this->status = $status;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.transfers.transfer');
    }
}
