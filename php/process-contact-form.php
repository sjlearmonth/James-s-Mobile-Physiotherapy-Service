<?php
//
// © 2024 Stephen J Learmonth stephen.j.learmonth@gmail.com 
//

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require '/home/selficte/public_html/PHPMailer-master/src/Exception.php';
require '/home/selficte/public_html/PHPMailer-master/src/PHPMailer.php';
require '/home/selficte/public_html/PHPMailer-master/src/SMTP.php';
  
// Check if at least one field is not empty
if (strlen($_POST['firstName']) > 0 ||
    strlen($_POST['lastName']) > 0 ||
    strlen($_POST['mobileNumber']) > 0 ||
    strlen($_POST['emailAddress']) > 0 ||
    strlen($_POST['enquiryMessage']) > 0) {

    ////////////////////////////////////
    // At least one field is not empty//
    ////////////////////////////////////

    // Check if firstName field is empty or invalid
    $firstName = $_POST['firstName'];
    $firstName_regex = "/^[A-Za-z .'-]+$/";
    if (!preg_match($firstName_regex, $firstName)) {
        echo "<script type='text/javascript'>alert('The first name is missing or does not appear to be valid. Please try again');window.location.href='/index.html';</script>";
        exit();
    }

    // Check if lastName field is empty or invalid
    $lastName = $_POST['lastName'];
    $lastName_regex = "/^[A-Za-z .'-]+$/";
    if (!preg_match($lastName_regex, $lastName)) {
        echo "<script type='text/javascript'>alert('The last name is missing or does not appear to be valid.  Please try again');window.location.href='/index.html';</script>";
        exit();
    }

    //
    // Check if mobileNumber field is empty or is invalid
    //
    // read mobile number
    $mobileNumber = $_POST['mobileNumber'];

    // remove all spaces from mobileNumber
    $mobileNumber = str_replace(' ', '', $mobileNumber);

    // compose regular expression for match
    $mobileNumber_regex = '/^(07|\+447)[0-9]+$/';

    // Check if there is a valid mobile number beginning 07... or +44...
    if (!preg_match($mobileNumber_regex, $mobileNumber) || ( substr($mobileNumber, 0, 2) != '07' && substr($mobileNumber, 0, 4) != '+447' ) || ( strlen($mobileNumber) != 11 && strlen($mobileNumber) != 13) ) {
        echo "<script type='text/javascript'>alert('The mobile number is missing or does not appear to be a valid mobile number. Please try again');window.location.href='/index.html';</script>";
        exit();
    }

    // Format phone number correctly
    if (substr($mobileNumber, 0, 2) == '07') {
        $mobileNumber = '+44' . substr($mobileNumber, 1);
    }
    
    // Check if emailAddress field is empty or is invalid
    $emailAddress = $_POST['emailAddress'];
    $emailAddress_regex = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
    if (!preg_match($emailAddress_regex, $emailAddress)) {
        echo "<script type='text/javascript'>alert('The email address is missing or does not appear to be valid. Please try again');window.location.href='/index.html';</script>";
        exit();
    }

    // Check if enquiryMessage field is empty
    $enquiryMessage = $_POST['enquiryMessage'];
    if (strlen($enquiryMessage) == 0) {
        echo "<script type='text/javascript'>alert('Your message is missing. Please try again');window.location.href='/index.html';</script>";
        exit();
    }

    //////////////////////////////////
    // Buid SMS message and send it //
    //////////////////////////////////

    // PHP function to send an SMS message
    function sendSMSMessage($mobileNumber, $message) {

        // Base URL and send PHP script
        $url = "https://api-mapper.clicksend.com/http/v2/send.php";
        
        // Build sender ID for SMS message
        $senderid = "Unknown";

        // build the array for the API call
        $data = array("username" => "stephen.j.learmonth@gmail.com", "key" => "28D18077-60B1-2372-43C3-C5EA50029D5F", "to" => $mobileNumber, "senderid" => $senderid, "message" => $message);
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
        // Send the SMS message
        $response = curl_exec($ch);
    
        // Close the connection
        curl_close($ch);

        // return response
        return $response;
    }

    // PHP function to send an email
    function sendmail($to, $nameto, $subject, $message)  {
        $from  = "stephen.j.learmonth@gmail.com"    ; 
        $namefrom = "Stephen J Learmonth";
        $mail = new PHPMailer();
        $mail->SMTPDebug = 0;
        $mail->CharSet = 'UTF-8';
        $mail->isSMTP();
        $mail->SMTPAuth = true;
        $mail->Host = "smtp.gmail.com";
        $mail->Port       = 465;
        $mail->Username   = $from;
        $mail->Password = "zrfeihypvktdxzbv";
        $mail->SMTPSecure = "ssl";
        $mail->setFrom($from,$namefrom);
        $mail->Subject  = $subject;
        $mail->isHTML(true);
        $mail->Body = $message;
        $mail->addAddress($to, $nameto);
        return $mail->send();
      }
    
    $clientMobileNumber = "+447971818756";
    // $clientMobileNumber = "+447757782537";
    
    // Build SMS message body
    $clientMessage  = "You have a physiotherapy enquiry from a potential client. Here are the details.". "\n\n";
    $clientMessage .= "First Name: " . $firstName . "\n";
    $clientMessage .= "Last Name: " . $lastName . "\n";
    $clientMessage .= "Email Address: " . $emailAddress . "\n";
    $clientMessage .= "Phone Number: " . $mobileNumber . "\n";
    $clientMessage .= "Enquiry Message: " . $enquiryMessage;
    
    $response = sendSMSMessage($clientMobileNumber, $clientMessage);
    // $response = "Success";

    // check that the SMS message has been sent successfully
    if (strpos($response, "Success") == true) {

        $SMSSentSuccessfully = true;

        // send SMS to developer to confirm client SMS message was sent successfully
        $developerMobileNumber = "+447757782537";
        $DeveloperSMSMessage  = "A physiotherapy enquiry by SMS has been successfully sent to client: James PG Underwood.";
        
        sendSMSMessage($developerMobileNumber, $DeveloperSMSMessage);
    
    } else {

        $SMSSentSuccessfully = false;

        // Send an email to notify developer that SMS message was not sent successfully
        
        $emailDeveloper = "jamespgunderwoodeenquiries@gmail.com";
        $emailSubject = "Regarding www.juphysiotherapy.co.uk";
        $emailMessage = "A physiotherapy enquiry by SMS was not sent successfully to client: James PG Underwood.";
        
        sendmail($emailDeveloper, "Stephen J Learmonth.", $emailSubject, $emailMessage, "");        

    }

    ////////////////////////////////////
    // Buid email message and send it //
    ////////////////////////////////////

    // Build email address of client
    $emailClient = 'contactus@juphysiotherapy.co.uk';
    // $emailClient = 'jamespgunderwoodenquiries@gmail.com';

    // Build email subject
    $emailSubject = "You have a physiotherapy enquiry!";
    
    // Build the email body
    $emailMessage = "You have a physiotherapy enquiry from a potential client. Here are the details.". "<br /><br />";
    $emailMessage .= "First Name: " . $firstName . "<br /><br />";
    $emailMessage .= "Last Name: " . $lastName . "<br /><br />";
    $emailMessage .= "Email Address: " . $emailAddress . "<br /><br />";
    $emailMessage .= "Mobile Number: " . $mobileNumber . "<br /><br />";
    $emailMessage .= "Enquiry Message: " . $enquiryMessage;

    $emailSentSuccessfully = sendmail($emailClient, "James PG Underwood", $emailSubject, $emailMessage);

    if ( $emailSentSuccessfully ) {

        // Build email to confirm email has been successfully sent to client

        $emailDeveloper = "jamespgunderwoodenquiries@gmail.com";
        $emailSubject = "Regarding www.juphysiotherapy.co.uk";
        $emailMessage = "A physiotherapy enquiry by email has been sent successfully to client: James PG Underwood.";
    
        // send email
        sendmail($emailDeveloper, "Stephen J Learmonth.", $emailSubject, $emailMessage);
            
    } else {
        
        // Send an SMS text message to notify developer that email was not sent successfully
        $developerMobileNumber = "+447757782537";

        $developerMessage = "A physiotherapy enquiry by email was not sent successfully to client: James PG Underwood";
        
        sendSMSMessage($developerMobileNumber, $developerMessage);

    }

    // Check if both SMS message and email have both been sent successfully
    if ($SMSSentSuccessfully && $emailSentSuccessfully) {

        echo "<script type='text/javascript'>alert('Thank you. Your message has been sent.');window.location.href='/index.html';</script>";

    } else {

        echo "<script type='text/javascript'>alert('There was a problem sending your message. Please contact the developer at stephen.j.learmonth@gmail.com.');window.location.href='/index.html';</script>";

    }

} else {
    
    // All fields are empty so display error message to user
    echo "<script type='text/javascript'>alert('All fields are empty. Please try again.');window.location.href='/index.html';</script>";            
}
?>
