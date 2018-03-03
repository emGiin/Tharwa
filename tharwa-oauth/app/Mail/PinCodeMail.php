<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class PinCodeMail extends Mailable
{
    use Queueable, SerializesModels;

    public $pincode;
    public $pin_code_expires_at;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($pin,$expires_at)
    {
        $this->pincode = $pin;
        $this->pin_code_expires_at = $expires_at;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.pincode');
    }
}
