<?php

namespace App\Mail;

use App\Models\ContactMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewContactMessage extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public ContactMessage $contactMessage)
    {
    }

    public function envelope(): Envelope
    {
        $sujet = $this->contactMessage->sujet ?: 'Nouveau message';

        return new Envelope(
            subject: 'Portfolio : ' . $sujet,
            replyTo: [new Address($this->contactMessage->email, $this->contactMessage->nom)],
        );
    }

    public function content(): Content
    {
        return new Content(view: 'emails.new-contact-message');
    }
}