<?php 

include("conn/connect.php");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


$projectname = $_GET['projectname'];
$hours = $_GET['hours'];
$min = $_GET['min'];
$sum_min = $_GET['sum_min'];
$sec = $_GET['sec'];
$weight = $_GET['weight'];
$temp_limit = $_GET['temp_limit'];
$temp_start = $_GET['temp_start'];
$date = $_GET['date'];
//$FT = $_GET['FT'];
// date_default_timezone_set('asia/bangkok');
//     $date = date("Y-m-d\TH:i:sP");
//     echo "$date";
  

$sql = "INSERT INTO project (projectname,hours,min,sum_min,sec,weight,temp_limit,temp_start,date)
VALUES ('$projectname','$hours','$min','$sum_min','$sec','$weight','$temp_limit','$temp_start','$date')";

$result = mysqli_query($con,$sql);

if ($result){
  $callback = array(
    'status' => 1
    ,'msg' => 'Insert Success'
  );
}else{
    $callback = array(
      'status' => 0
      ,'msg'=>'Fail Snsert'
    );
  }
// if ($con->query($sql) === TRUE) {
//   echo "New record created successfully";
// } else {
//   echo "Error: " . $sql . "<br>" . $con->error;
// }
echo json_encode($callback)

?>