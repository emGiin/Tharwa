<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ExternTransferBankMail extends Mailable
{
    use Queueable, SerializesModels;

    private $pathToZip;
    private $bank;
    public $date_;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($pathToZip,$bank)
    {
        $this->pathToZip = $pathToZip;
        $this->bank = $bank;
        $this->date_ = \Carbon\Carbon::now()->subDay();
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->subject('Virement emis de Tharwa')
            ->attach($this->pathToZip, [
                'as' => $this->bank.'_'.$this->date_->format('Ymd').'.zip'
            ])
            ->markdown('emails.transfers.extern_transfer_bank');
    }
}
