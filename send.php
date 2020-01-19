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
    $mail->Username   = 'Shelest.ckcco@gmail.com'; // Логин на почте
    $mail->Password   = 'Ljr72vip'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('Shelest.ckcco@gmail.com', 'Обращение с сайта'); // Адрес самой почты и имя отправителя
    
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
    $mail->Subject = 'Сообщение с сайта Шелест';
    $mail->Body    = "<b>Имя:</b> $name <br>
        <b>Почта:</b> $email<br><br>
        <b>Сообщение:</b><br>$text";

    // Проверяем отравленность сообщения
    if ($mail->send()) {
        echo "$msg";
    } else {
        echo "Сообщение не было отправлено. Неверно указаны настройки вашей почты";
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    }
} catch (Exception $e) {
    echo "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}
