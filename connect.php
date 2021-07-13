<?php
  // $db_host = 'localhost';
  // $db_user = 'root';
  // $db_password = 'root';
  // $db_db = 'bgARM';
 
  // $mysqli = @new mysqli(
  //   $db_host,
  //   $db_user,
  //   $db_password,
  //   $db_db
  // );
   
  // if ($mysqli->connect_error) {
  //   echo 'Errno: '.$mysqli->connect_errno;
  //   echo '<br>';
  //   echo 'Error: '.$mysqli->connect_error;
  //   exit();
  // }

  // echo '<script>console.log("Success: A proper connection to MySQL was made.")</script>';
  // $mysqli->close();

//$mysql = new mysqli('localhost', 'y76629_uyshop_us', 'bwefbefwbiwefubuiefa','y76629_uyshop');
$mysql = new mysqli('localhost', 'root', 'root','bgARM');
@mysqli_set_charset($mysql, 'utf8');

?>