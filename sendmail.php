<?php

$to      = 'vip@wow.is';
$subject = 'business.wow.is';
$message = $_REQUEST['value'];
$headers = 'From: no-reply@wow.is'."\r\n".
    'Reply-To: webmaster@example.com'."\r\n".
    'X-Mailer: PHP/' . phpversion();

if(mail($to, $subject, $message, $headers)) {
    echo 'success';
}
