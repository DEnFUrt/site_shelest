<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$name = $_POST['name'];
$email = $_POST['email'];
$text = $_POST['question'];
$mail = new PHPMailer\PHPMailer\PHPMailer();

if (!trim($name) or (!filter_var(trim($email), FILTER_VALIDATE_EMAIL)) or (!trim($text))) {
    header('HTTP/1.0 403 Forbidden');
    echo "Сообщение не было отправлено. Проверьте заполнение полей и адрес вашей почты";
	exit();
}

try {
    $msg = "ok";

    // Настройки SMTP
    $mail->isSMTP();
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    $mail->SMTPDebug = 0;
    $mail->Encoding = 'base64';
    $mail->isHTML(true);

    //Обход проверки CA сертификата отключить на реальном хостинге
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );
    // Настройки вашей почты
    $mail->Host       = 'ssl://smtp.gmail.com'; // SMTP сервера GMAIL
    $mail->Username   = 'mail@gmail.com'; // Логин на почте
    $mail->Password   = 'password'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('Shelest.ckcco@gmail.com', 'Сообщение с сайта СК ССО Шелест'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('Nevrolog.pav@yandex.ru');  // Ещё один, если нужен
    $mail->addAddress('musorov@gmail.com');

    // Прикрепление файлов к письму необходимо реализовать на форме обратной связи блок для прикрепление файла
    // if (!empty($_FILES['myfile']['name'][0])) {
    //     for ($ct = 0; $ct < count($_FILES['myfile']['tmp_name']); $ct++) {
    //         $uploadfile = tempnam(sys_get_temp_dir(), sha1($_FILES['myfile']['name'][$ct]));
    //         $filename = $_FILES['myfile']['name'][$ct];
    //         if (move_uploaded_file($_FILES['myfile']['tmp_name'][$ct], $uploadfile)) {
    //             $mail->addAttachment($uploadfile, $filename);
    //         } else {
    //             $msg .= 'Неудалось прикрепить файл ' . $uploadfile;
    //         }
    //     }
    // }

    // -----------------------
    // Само письмо
    // -----------------------
    $mail->Subject = 'Запрос с сайта Шелест';
    $mail->Body    = "<b>Имя:</b> $name <br>
        <b>Почта:</b> $email<br><br>
        <b>Сообщение:</b><br>$text";
    $mail->AltBody    = "Имя: $name ,
        Почта: $email ,
        Сообщение:$text";

    // Проверяем отравленность сообщения
    if ($mail->send()) {
        echo "$msg";
        //Чистим переменные перед отправкой подтверждения о доставке отравителю
        $mail->ClearAddresses();
        $mail->ClearAttachments();
        $mail->IsHTML(false);
        $mail->Subject = 'СК ССО Шелест';
        $mail->Body    = "Привет, $name ! <br>
        Вы оставили сообщение на сайте <a href='http://ск-шелест72.рф'><b>ск-шелест72.рф</b></a> <br>
        Спасибо за проявленный интерес к нашей команде.<br>
        В ближайшее время мы с Вами свяжемся по адресу электронной почты: <b>$email</b> <br><br>
        С уважением, команда СК ССО Шелест.";
        $mail->IsHTML(true);
        $mail->AltBody = "Привет, $name !
        Вы оставили сообщение на сайте ск-шелест72.рф
        Спасибо за проявленный интерес к нашей команде.
        В ближайшее время мы с Вами свяжемся по адресу электронной почты: $email
        С уважением, команда СК ССО Шелест.";
        $mail->addAddress($email);
        $mail->send();
    } else {
        header('HTTP/1.0 403 Forbidden');
        echo "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
    }
} catch (Exception $e) {
    header('HTTP/1.0 403 Forbidden');
    echo "Сообщение не было отправлено. Описание ошибки: {$mail->ErrorInfo}";
}
